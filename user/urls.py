from django.urls import path

from . import views

app_name = 'user'

urlpatterns = [
    path('user/<str:username>/', views.get_user, name='get_user'),
    path('user/<str:username>/subscribe/', views.subscribe, name='subscribe'),
    path('profile/', views.profile, name='profile'),
    path('signin/', views.signin),
    path('signup/', views.signup),
    path('logout/', views.logout_view),
    path('search/', views.SearchUserView.as_view(), name='search')
]