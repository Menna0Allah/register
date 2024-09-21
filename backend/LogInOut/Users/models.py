from django.db import models

# Create your models here.

class note(models.Model):
    note = models.CharField(max_length=100)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.note