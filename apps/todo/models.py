from django.db import models

from apps.user.models import User
from todo.ext.public_model import PublicModel

PRIORITY_CHOICES = (
    ('HI', 'High'),
    ('MD', 'Medium'),
    ('LO', 'Low')
)


class TaskLabel(PublicModel):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class UserTask(PublicModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    priority = models.CharField(max_length=255, choices=PRIORITY_CHOICES)
    labels = models.ManyToManyField(TaskLabel)

    def __str__(self):
        return self.title
