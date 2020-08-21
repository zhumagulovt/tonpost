from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.generic import ListView
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.views.decorators.http import require_POST

from .models import Profile


def signup(request):
    if request.user.is_authenticated:
        return redirect(reverse('user:get_user',
                                args=(request.user.username,)))
    else:
        if request.method == "POST":
            POST = request.POST

            if User.objects.filter(
                        username=POST['login']).exists():

                    return render(request, 'user/signup.html',
                                {'error': 'Имя пользователя занято'})

            else:
                user = User.objects.create_user(POST['login'],
                                                POST['email'],
                                                POST['password'])
                login(request, user)
                if 'next' in request.GET:
                    return redirect(request.GET['next'])

                else:
                    return redirect(reverse('user:get_user',
                                            args=(user.username,)))
        else:
            return render(request, 'user/signup.html')


def signin(request):
    if request.user.is_authenticated:
        return redirect(reverse('user:get_user',
                                args=(request.user.username,)))
    else:
        if request.method == "POST":

            user = authenticate(username=request.POST['login'],
                                password=request.POST['password'])
            if user is not None:

                if user.is_active:

                    login(request, user)

                    if 'next' in request.GET:
                        return redirect(request.GET['next'])

                    else:
                        return redirect(reverse('user:get_user',
                                                args=(user.username,)))
                else:
                    return render(request, "user/signin.html",
                              {'error': 'Ваша учетная запись не активна'})

            else:
                return render(request, "user/signin.html",
                              {'error': 'Неверный пароль или логин'})
        else:
            url_to_signup = '/accounts/signup'
            if 'next' in request.GET:
                url_to_signup += "?next=" + request.GET['next']

            return render(request, 'user/signin.html',
                          {'url_to_signup': url_to_signup})


def get_user(request, username):
    is_profile = False

    if username == request.user.username:
        is_profile = True

    try:
        user = User.objects.get(username=username)

        follower = user.profile.followers.all().filter(
            username__exact=request.user.username)

        btn = "Отписаться" if follower.exists() else "Подписаться"

        data = {'username': user.username,
                'followers_len': len(user.profile.followers.all()),
                'subs_len': len(user.profile.subscriptions.all()),
                'btn': btn, 'is_profile': is_profile,
                'followers': user.profile.followers.all(),
                'subs': user.profile.subscriptions.all()}

        return render(request, "user/user.html", context=data)

    except User.DoesNotExist:
        raise Http404("Такого пользователя не существует")

@login_required(login_url='/accounts/signin/')
def profile(request):
    return redirect(reverse('user:get_user', args=(request.user.username,)))


def logout_view(request):
    logout(request)
    return redirect('/')


@require_POST
def subscribe(request, username):
    user = User.objects.get(username=username)

    if (request.POST.get('subscribe') == "Отписаться") \
            or (request.POST.get('subscribe') == "Подписаться"):

        followers = user.profile.followers.all().filter(
            username__exact=request.user.username)

        if followers.exists():
            user.profile.followers.remove(request.user)
            request.user.profile.subscriptions.remove(user)
        else:
            user.profile.followers.add(request.user)
            request.user.profile.subscriptions.add(user)

    return redirect(reverse('user:get_user', args=(username,)))



class SearchUserView(ListView):

    model = User
    template_name = "user/search_user.html"

    def get_queryset(self):
        query = self.request.GET.get('q')
        if query is not None and query != "":
            object_list = User.objects.filter(
                Q(username__icontains=query)
            )
            return object_list

