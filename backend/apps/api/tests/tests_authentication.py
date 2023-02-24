"""
authentication.py test file!
"""

import ast

import pytest
from apps.api.models import ExeChangeUser  # type: ignore
from apps.api.user_authentication import gen_token  # type: ignore
from django.contrib.auth import authenticate
from django.test import TestCase


@pytest.mark.django_db
def test_user_create() -> None:
    ExeChangeUser.objects.create_user("test_user", "test@test.com", "testpassword")
    assert ExeChangeUser.objects.count() == 1


@pytest.mark.django_db
def test_user_authenticate() -> None:
    ExeChangeUser.objects.create_user("test_user", "test@test.com", "testpassword")
    assert authenticate(username="test_user", password="testpassword") is not None


@pytest.mark.django_db
def test_user_not_authenticated() -> None:
    ExeChangeUser.objects.create_user("test_user", "test@test.com", "testpassword")
    assert authenticate(username="test_user", password="WRONG_PASSWORD") is None


class RequestTests(TestCase):
    """
    These tests run in an almost isolated database environment, they are never stored!
    """

    def setUp(self) -> None:
        self.user = ExeChangeUser.objects.create_user(
            username="test_harry", password="SUPER_SECURE"
        )

    def test_gen_token(self) -> None:
        test_token = gen_token(self.user)
        assert test_token is not None

    def test_register(self) -> None:
        # send login data
        response = self.client.post(
            "/api/register",
            {
                "user": "new_test_harry",
                "email": "new_test_harry@exeter.ac.uk",
                "password": "SUPER_SECURE",
                "confirmPwd": "SUPER_SECURE",
            },
            follow=True,
        )
        # Converting response to a string dictionary
        response_dict = response.content.decode("UTF-8")
        response_dict = ast.literal_eval(response_dict)

        self.assertEqual(response_dict["status"], "OK")  # type: ignore

    def test_register_unqiue_error(self) -> None:
        # send login data
        response = self.client.post(
            "/api/register",
            {
                "user": "test_harry",
                "email": "new_test_harry@exeter.ac.uk",
                "password": "SUPER_SECURE",
                "confirmPwd": "SUPER_SECURE",
            },
            follow=True,
        )

        # Converting response to a string dictionary
        response_dict = response.content.decode("UTF-8")
        response_dict = ast.literal_eval(response_dict)

        self.assertEqual(response_dict["status"], "UNIQUE_ERROR")  # type: ignore

    def test_login(self) -> None:
        # send login data
        response = self.client.post(
            "/api/login",
            {"user": "test_harry", "password": "SUPER_SECURE"},
            follow=True,
        )

        # Converting response to a string dictionary
        response_dict = response.content.decode("UTF-8")
        response_dict = ast.literal_eval(response_dict)

        self.assertEqual(response_dict["status"], "OK")  # type: ignore

    def test_login_fail(self) -> None:
        response = self.client.post(
            "/api/login",
            {"user": "test_harry", "password": "WRONG_PASSWORD"},
            follow=True,
        )

        # Converting response to a string dictionary
        response_dict = response.content.decode("UTF-8")
        response_dict = ast.literal_eval(response_dict)

        self.assertEqual(response_dict["status"], "BAD")  # type: ignore
