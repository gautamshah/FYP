from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Saved(models.Model):
	user = models.ForeignKey(User)
	conf = models.TextField()
	
	class Meta:	app_label = 'matching'
