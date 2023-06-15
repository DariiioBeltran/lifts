# Generated by Django 4.1.6 on 2023-06-15 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("pr_tracking_web", "0001_initial")]

    operations = [
        migrations.RemoveField(model_name="performance", name="date"),
        migrations.AddField(
            model_name="performance",
            name="created_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="exercise",
            name="exercise",
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name="workout",
            name="exercise_name",
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name="workout",
            name="workout_name",
            field=models.CharField(max_length=128),
        ),
        migrations.DeleteModel(name="GymRat"),
    ]
