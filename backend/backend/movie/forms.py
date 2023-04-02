from django import forms
from .models import User

class MyForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    password = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get("name")
        email = cleaned_data.get("email")
        password = cleaned_data.get("password")

        # Check if user exists with given name and email
        user = User.objects.filter(username=name, email=email,password = password).first()
        if not user:
            raise forms.ValidationError("Name , email and password combination not found.")
