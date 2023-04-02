from django.contrib import admin

# Register your models here.
from .models import Movie, Post, Comment,User
admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Post)
admin.site.register(Comment)