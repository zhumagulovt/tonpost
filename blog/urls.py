from django.urls import path

from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.index, name='index'),
    path('publish/', views.publish),
    path('post/<int:post_id>/', views.post, name="post"),
    path('post/<int:post_id>/add_comment/', views.add_comment, name='add_comment'),
    path('search/', views.SearchPostView.as_view(), name='search'),
]