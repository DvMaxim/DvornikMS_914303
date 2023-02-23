from django.contrib import admin
from users.models import *
from django.contrib.auth.admin import UserAdmin 



# Now register the new UserModelAdmin...
admin.site.register(User)
