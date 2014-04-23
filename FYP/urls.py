from django.conf.urls import patterns, url

from matching import views

urlpatterns = patterns('',
		url(r'^matching$', views.leAdder),
    url(r'^input$', views.input),
)
