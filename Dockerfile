# SETUP Python base
FROM python:3.11.1-slim as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.3.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

RUN apt-get update && apt-get install --no-install-recommends -y curl build-essential libpq-dev gcc

RUN curl -sSL https://install.python-poetry.org | python

WORKDIR $PYSETUP_PATH
COPY poetry.lock pyproject.toml ./

RUN poetry install --no-dev

# BUILD Frontend
FROM node:19-slim as node-base

ENV NODE_ENV = "production"
ADD . /src
WORKDIR /src
RUN npm i && npm run build # TODO: Lint & Test

# SETUP Backend
FROM python-base as production
EXPOSE 5000
CMD ["gunicorn", "--chdir", "backend", "backend.wsgi", "--bind=0.0.0.0:5000"]

RUN rm -rf /app/backend/staticfiles
COPY --from=python-base $PYSETUP_PATH $PYSETUP_PATH
COPY --from=node-base /src/frontend/dist/ /app/frontend/dist/
COPY --from=node-base /src/backend/ /app/backend/
WORKDIR /app
RUN python ./backend/manage.py migrate && python ./backend/manage.py collectstatic
# RUN python ./backend/manage.py collectstatic
