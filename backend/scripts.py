import os
import subprocess


def runserver() -> None:
    try:
        subprocess.run(["python", "./backend/manage.py", "runserver"])
    except KeyboardInterrupt:
        pass

def runshell() -> None:
    try:
        subprocess.run(["python", "./backend/manage.py", "shell"])
    except KeyboardInterrupt:
        pass

def black() -> None:
    try:
        subprocess.run(["black", "."])
        subprocess.run(["isort", "."])
    except KeyboardInterrupt:
        pass


def black_check() -> None:
    try:
        subprocess.run(["black", "--check", "."])
        subprocess.run(["isort", "--check", "."])
    except KeyboardInterrupt:
        pass


def migrate() -> None:
    try:
        subprocess.run(["python", "./backend/manage.py", "migrate"])
    except KeyboardInterrupt:
        pass


def build() -> None:
    try:
        subprocess.run(["python", "./backend/manage.py", "collectstatic"])
    except KeyboardInterrupt:
        pass


def run_prod() -> None:
    try:
        subprocess.run(["gunicorn", "--chdir", "backend", "backend.wsgi"])
    except KeyboardInterrupt:
        pass


# def pylint():
#     lint_env = os.environ.copy()
#     lint_env["PYTHONPATH"] = lint_env["PYTHONPATH"] + ":" + list_env["PWD"] + "/backend"
#     subprocess.run(["PYTHONPATH=$PYTHONPATH:$PWD/backend", "pylint", "backend/apps"], env=lint_env)

# def pytest():
#     subprocess.run(["pytest"])

# def pytest_coverage():
#     subprocess.run(["pytest"])
