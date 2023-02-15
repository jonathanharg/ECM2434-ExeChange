import subprocess, os

def runserver():
    try:
        subprocess.run(["python", "./backend/manage.py", "runserver"])
    except KeyboardInterrupt:
        pass

def black():
    try:
        subprocess.run(["black", "."])
    except KeyboardInterrupt:
        pass

def black_check():
    try:
        subprocess.run(["black", "--check", "."])
    except KeyboardInterrupt:
        pass

def migrate():
    try:
        subprocess.run(["python", "./backend/manage.py", "migrate"])
    except KeyboardInterrupt:
        pass

def build():
    try:
        subprocess.run(["python", "./backend/manage.py", "collectstatic"])
    except KeyboardInterrupt:
        pass

def run_prod():
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

