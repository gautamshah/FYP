from django.conf.urls import patterns, url

from matching.views import leAdder, input
from portal.views import register, login, logout

urlpatterns = patterns('',
		url(r'^matching$', leAdder),
    url(r'^input/$', input),
    url(r'^register/$', register),
    url(r'^login/$', login),
    url(r'^logout/$', logout),
)
