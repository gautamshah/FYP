from django.conf.urls import patterns, url

from matching import views

urlpatterns = patterns('',
    url(r'^$', views.leAdder)
)
