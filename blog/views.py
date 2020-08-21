from django.utils import timezone
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.views.generic import ListView
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.views.decorators.http import require_POST

from . models import Post

def index(request):
    popular = Post.objects.all().filter(
        date__range=[
            timezone.now() - timezone.timedelta(1),
            timezone.now()
        ]
    ).order_by('-views')[:5]

    last_posts = Post.objects.all().filter(
        date__range=[
            timezone.now() - timezone.timedelta(30),
            timezone.now()
        ]
    ).order_by('-date')

    if request.user.is_authenticated:
        user = request.user.profile
        follows = user.subscriptions.all()
        posts_of_follows = list()
        for i in follows:
            for j in i.post_set.all():
                posts_of_follows.append(j)

        context = {'object_list': posts_of_follows,
                   'popular': popular,
                   'last_posts': last_posts}

        return render(request, 'blog/index.html', context)
                      
    else:
        context = {'object_list': [],
                   'popular': popular,
                   'last_posts': last_posts}
        return render(request, 'blog/index.html', context)


@login_required(login_url='/accounts/signin/')
def publish(request):
    if request.method == "POST":
        print(request.POST.get("post"))
        new_post = request.user.post_set.create(
            title=request.POST.get("title"),
            content=request.POST.get("post"),
            date=timezone.now())

        return redirect(reverse('blog:post', args=(new_post.id,)))
    else:
        return render(request, 'blog/publish.html')


def post(request, post_id):

    last_posts = Post.objects.all().order_by('-id')[:5]

    try:  
        p = Post.objects.get(id=post_id)
        p.views += 1
        p.save(update_fields=['views'])

        comment_list = p.comment_set.all().order_by('-id')
        context = {"post": p,
                   "date": str(p.date.strftime("%d %B %Y %H:%M")),
                   "last_posts": last_posts,
                   "comment_list": comment_list}

        return render(request, "blog/post.html", context)
    except BaseException as ex:
        raise Http404(f"{ex}")


@require_POST
def add_comment(request, post_id):
    Post.objects.get(id=post_id).comment_set.create(
        author=request.user,
        content=request.POST.get('comment'))
    return redirect(reverse('blog:post', args=(post_id,)))


class SearchPostView(ListView):

    model = Post
    template_name = 'blog/search.html'

    def get_queryset(self):
        query = self.request.GET.get('q')
        if query is not None and query != "":
            object_list = Post.objects.filter(
                Q(title__icontains=query)
            )
            return object_list
