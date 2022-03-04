from django.db import models

from apps.user.models import User


class TaskLabel(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class UserTask(models.Model):
    PRIORITY_CHOICES = (
        ('HI', 'High'),
        ('MD', 'Medium'),
        ('LO', 'Low')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    priority = models.CharField(max_length=255, choices=PRIORITY_CHOICES)
    labels = models.ManyToManyField(TaskLabel)

    def __str__(self):
        return self.title
