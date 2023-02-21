import subprocess


def runserver() -> None:
    try:
        subprocess.run(["poetry", "run", "python", "./backend/manage.py", "runserver"])
    except KeyboardInterrupt:
        pass


def black() -> None:
    try:
        subprocess.run(["poetry", "run", "black", "."])
        subprocess.run(["poetry", "run", "isort", "."])
    except KeyboardInterrupt:
        pass


def black_check() -> None:
    try:
        subprocess.run(["poetry", "run", "black", "--check", "."])
        subprocess.run(["poetry", "run", "isort", "--check", "."])
    except KeyboardInterrupt:
        pass


def migrate() -> None:
    try:
        subprocess.run(["poetry", "run", "python", "./backend/manage.py", "migrate"])
    except KeyboardInterrupt:
        pass


def build() -> None:
    try:
        subprocess.run(
            ["poetry", "run", "python", "./backend/manage.py", "collectstatic"]
        )
    except KeyboardInterrupt:
        pass


def run_prod() -> None:
    try:
        subprocess.run(
            ["poetry", "run", "gunicorn", "--chdir", "backend", "backend.wsgi"]
        )
    except KeyboardInterrupt:
        pass


# def pylint():
#     os.chdir(os.environ["PWD"] + "/backend")
#     subprocess.run(["poetry", "run", "pylint", "apps/api"])

# def pytest():
#     subprocess.run(["pytest"])

# def pytest_coverage():
#     subprocess.run(["pytest"])
