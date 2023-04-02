from rest_framework import viewsets, permissions, generics ,status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404 
from .models import User, Post, Comment, Movie
from .serializers import UserSerializer, PostSerializer, CommentSerializer, MovieSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        password = data['password']
        users = User.objects.filter(name=name, password=password)
        print(users)
        if users.exists():
            user = users.first()
            print(user.password)
            return JsonResponse({'success': True, 'user_id': user.id})
        else:
            return JsonResponse({'success': False, 'error': 'User not found'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

# @csrf_exempt
# def login_view(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         name = data['name']
#         password = data['password']
#         user = authenticate(name=name, password=password)
#         print(user)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'success': True})
#         else:
#             return JsonResponse({'success': False, 'error': 'Invalid credentials'})
#     else:
#         return JsonResponse({'success': False, 'error': 'Invalid request method'})

# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         name = data['name']
#         password = data['password']
#         email = data['email']
#         bio = data['bio']
#         try:
#             user = User.objects.create_user(name, email, password, bio)
#             user.save()
#             return JsonResponse({'success': True})
#         except:
#             return JsonResponse({'success': False, 'error': 'Failed to create user'})
#     else:
#         return JsonResponse({'success': False, 'error': 'Invalid request method'})


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # lookup_field = 'pk'


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'User deleted successfully'})


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]


class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
        user_id = self.kwargs['user_id']
        user = User.objects.get(pk=user_id)

        post = Post.objects.create(
            user=user,
            title=serializer.validated_data.get('title'),
            content=serializer.validated_data.get('content')
        )
        serializer = PostSerializer(post)
        return Response(serializer.data)


class PostUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()


# class PostDeleteView(generics.DestroyAPIView):
#     queryset = Post.objects.all()
#     # permission_classes = [permissions.IsAuthenticated]

#     def delete(self, request, *args, **kwargs):
#         post = self.get_object()
#         if post.user != request.user:
#             return Response({'error': 'You are not authorized to delete this post'})
#         post.delete()
#         return Response({'message': 'Post deleted successfully'})

class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = User.objects.filter(id=self.kwargs.get('user_id')).first()
        post = Post.objects.filter(user=user, id=self.kwargs.get('post_id')).first()
        print(user)
        post.delete()
        return Response({'message': 'Post deleted successfully'})

# class PostDeleteView(generics.DestroyAPIView):
#     # queryset = Post.objects.all()
#     # lookup_field = ('user__id', 'id')
#     # permission_classes = [permissions.IsAuthenticated]

#     def delete(self, request, *args, **kwargs):
#         user_id = self.kwargs['user_id']
#         post_id = self.kwargs['post_id']
#         post = Post.objects.filter(id=post_id, user=user_id)
#         print(post)
#         # try:
#         #     post = Post.objects.filter(id=post_id, user=user_id)
#         #     print(post)
#             # post = self.get_queryset().get(user__id=user_id, id=post_id)
#         # except Post.DoesNotExist:
#         #     return Response({'error': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

#         # if post.user != request.user:
#         #     return Response({'error': 'You are not authorized to delete this post'}, status=status.HTTP_401_UNAUTHORIZED)
    
#         post.delete()
#         return Response({'message': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class CommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [permissions.IsAuthenticated]


class CommentdetailView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post']
        return Comment.objects.filter(post=post_id)


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserCommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        user_id = self.kwargs['userid']
        user = User.objects.get(pk=user_id)
        post_id = self.kwargs['postid']
        post= Post.objects.get(pk=post_id)
        print(user,post)
        comment = Comment.objects.create(
            user=user,
            post=post,
            content=serializer.validated_data.get('content')
        )
        serializer = CommentSerializer(comment)


class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()

class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            return Response({'error': 'You are not authorized to delete this comment'})
        comment.delete()
        return Response({'message': 'Comment deleted successfully'})


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MovieCreateView(generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MovieUpdateView(generics.UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # permission_classes = [permissions.IsAuthenticated]

class MovieDeleteView(generics.DestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        movie = get_object_or_404(Movie, pk=kwargs['pk'], user=request.user)
        return self.destroy(request, *args, **kwargs)

class AdminMovieListGet(generics.ListAPIView):
    queryset = Movie.objects.filter(admin_post=True)
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminMovieListCreate(generics.CreateAPIView):
    queryset = Movie.objects.filter(admin_post=True)
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAdminUser]