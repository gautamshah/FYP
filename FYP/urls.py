from django.conf.urls import patterns, url

from matching.views import leAdder, input, save, saved
from portal.views import register, login, logout

urlpatterns = patterns('',
		url(r'^matching$', leAdder),
		url(r'^matching/(?P<savedId>\d+)$', leAdder),
		url(r'^input/$', input),
    url(r'^register/$', register),
    url(r'^login/$', login),
    url(r'^logout/$', logout),
    url(r'^save/$', save),
    url(r'^saved/$', saved),
)
