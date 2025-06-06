from django.urls import path

from .views import (
    UserListView,
    UserCreateView,
    UserUpdateView,
    UserDeleteView,
    PostListView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    CommentListView,
    CommentCreateView,
    CommentUpdateView,
    CommentDeleteView,
    MovieListView,
    MovieDetailView,
    MovieCreateView,
    MovieUpdateView,
    MovieDeleteView,
    AdminMovieListGet,
    AdminMovieListCreate,
    UserDetailView,
    CommentdetailView,
    login_view,
    UserCommentCreateView
)

urlpatterns = [
    path('login/',login_view , name='login'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('users/create/', UserCreateView.as_view(), name='user_create'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='user_update'),
    path('users/<int:pk>/delete/', UserDeleteView.as_view(), name='user_delete'),
    path('posts/', PostListView.as_view(), name='post_list'),
    path('posts/create/<int:user_id>', PostCreateView.as_view(), name='post_create'),
    path('posts/<int:post>/comments/', CommentdetailView.as_view(), name='post_comments'),
    path('posts/<int:pk>/update/', PostUpdateView.as_view(), name='post_update'),
    path('user/<int:user_id>/post/<int:post_id>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('comments/', CommentListView.as_view(), name='comment_list'),
    path('comments/create/', CommentCreateView.as_view(), name='comment_create'),
    path('user/<int:userid>/post/<int:postid>/comments/create/', UserCommentCreateView.as_view(), name='user_comment_create'),

    # path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment_detail'),
    path('comments/<int:pk>/update/', CommentUpdateView.as_view(), name='comment_update'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment_delete'),
    path('movies/', MovieListView.as_view(), name='movie_list'),
    path('movies/create/', MovieCreateView.as_view(), name='movie_create'),
    path('movies/<int:pk>/', MovieDetailView.as_view(), name='movie_detail'),
    path('movies/<int:pk>/update/', MovieUpdateView.as_view(), name='movie_update'),
    path('movies/<int:pk>/delete/', MovieDeleteView.as_view(), name='movie_delete'),
    # Admin Movie URLs
    path('admin/movies/', AdminMovieListGet.as_view(), name='admin_movie_list'),
    path('admin/movies/create/', AdminMovieListCreate.as_view(), name='admin_movie_create'),
    ]
