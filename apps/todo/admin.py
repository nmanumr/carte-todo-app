from django.contrib import admin

from . import models


@admin.register(models.TaskLabel)
class LabelAdmin(admin.ModelAdmin):
    list_display = ('public_id', 'title')


@admin.register(models.UserTask)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('public_id', 'title', 'priority')
