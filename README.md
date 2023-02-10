# ExeChange

## Installation

First **install** [poetry](#how-to-install-poetry) and Node.js/npm (steps to install Node will depend on your system, recommended to use a package manager like [brew](https://formulae.brew.sh/formula/node)).

```shell
cd ExeChange 
poetry config virtualenvs.in-project true   # Enables your editor to work with the Poetry environment
poetry install                              # Installs packages for python/django backend
npm install                                 # Installs packages for typescript/vite/react frontend
```

:bangbang: **Before running anything** copy `.env.example` to `.env` and change any relevant settings. :bangbang:

## Running Development Locally

In **two seperate** terminal windows run the following commands:

First terminal:

```shell
poetry run python backend/manage.py migrate     # Updates the Django database
poetry run python backend/manage.py runserver   # Run the backend Django server (API & Database interface)
```

Second terminal:

```shell
npm run dev     # Render the React frontend (.tsx, css, react components)
```

Now visit <http://127.0.0.1:8000/> to view the website

## Running Production Locally

```shell
npm run build                                       # Compiles the frontend into singular .js & .css files
poetry run python backend/manage.py migrate         # Updates the Django database
poetry run python backend/manage.py collectstatic   # Collects all the static files Django needs to serve
poetry run gunicorn --chdir backend backend.wsgi     # Runs the dynamic Django routes with gunicorn
```

Now visit <http://127.0.0.1:8000/> to view the website.

If you want Django to serve static files change change `FORCE_SERVE_STATIC=True` (This should only be used for testing!). Otherwise, setup a webserver to serve the files in `backend/staticfiles` and map it to `www.yourdomain.com/static/`.

## Running Production with Docker

This builds the app into a lightweight virtual environment image so that it can consistently be deployed. **Use this for hosting on sites like AWS, but this is overkill for testing the production evironment.**

Make sure [Docker](https://docs.docker.com/get-docker/) (and docker-compose) are installed.

```shell
docker-compose up   # Build and run the required Docker images.
```

Now visit <http://localhost> to view the website

## How to install Poetry

**Linux, macOS, Windows (WSL)**

```shell
curl -sSL https://install.python-poetry.org | python3 -
```

**Windows (Powershell)**

```shell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

See the [Poetry documentation](https://python-poetry.org/docs/).

## Technologies

- **Django** - Python web framework
- **Poetry** - Python dependency & package manager
- **Black**, Pylint, flake8, isort - Python formatters & linters
- **mypy** - Type checking for python
- **PostgreSQL** - Database
- **npm** - Package manager for javascript
- **TypeScript** - Strongly typed javascript
- **React** - front-end javascript library for interactive & reusable UI
- **TailwindCSS** - CSS utility framework
- **Vite** - packages React & typescript into a single javascript bundle

## Project Structure

```
├── documents    - Documentation, planning & design files
├── backend    - All Django & Backend related files
│   ├── apps    - Django App Files
│   │   ├── api    - REST API Files: This is where the majority of the backend lives
│   │   │   ├── admin.py
│   │   │   │   ...
│   │   │   └── views.py
│   │   └── frontend    - Frontend Adapter: Serves Vite frontend through Django, should not really be edited
│   │       ├── templates
│   │       │   ...
│   │       └── apps.py
│   ├── backend    - Django project folder
│   │   ├── staticfiles    - Where Django collects all its static files to (e.g. from Vite)
│   │   │   └── ...
│   │   ├── asgi.py
│   │   ├── settings.py    - Django settings file
│   │   ├── urls.py    - Django URL routes
│   │   └── wsgi.py
│   └── manage.py
├── frontend    - Vite & React Files
│   ├── dist    - Where everything gets compiled down to, should not be edited
│   │   └── ...
│   ├── index.css    - Main app CSS
│   ├── index.html    - Development index.html, changes made here are NOT visible in production
│   ├── main.tsx    - Main React component
│   └── ...
├── nginx    - Nginx (static file hosting) configuration
│   ├── Dockerfile    - Configures how Docker builds the NGINX image
│   └── default.conf    - NGINX config
├── .dockerignore
├── .env    - Environment variables & settings, DO NOT SHARE!
├── .env.example    - Example environment variables
├── .gitignore
├── .prettierignore
├── Dockerfile    - Configures how Docker builds the Backend image
├── README.md
├── docker-compose.yaml    - Configures how Docker should run NGINX & the Backend together
├── package-lock.json
├── package.json    - Javascript/Vite package config
├── poetry.lock
├── postcss.config.cjs
├── pyproject.toml    - Python/Django package config
├── tailwind.config.cjs    - Tailwind Config
├── tsconfig.json    - Typescript configs
├── tsconfig.node.json
└── vite.config.ts    - Vite configs
```

## Stack Diagram
**Developer Environment:**
![developer environment](https://raw.githubusercontent.com/jonathanharg/ExeChange-Docs/main/Diagrams/dev-diagram.png)

**Production Environment:**
![production environment](https://raw.githubusercontent.com/jonathanharg/ExeChange-Docs/main/Diagrams/production-diagram.png)

## TODO

- [x] Create a docker file for building a docker image
- [x] Get gunicorn working
- [x] clean django app files for frontend / less boilerplate
- [x] Images/static files Working on DEV and in Production
- [x] Get Nginx working
- [x] Create a docker-compose.yml
- [x] Use environemnt variables / create an .env.example file
- [ ] scripts for poetry/npm for linting/formatting/running in dev/running in prod
- [ ] github actions
- [ ] aws deployment & database (for dev & prod)
- [ ] get a domain name working
- [ ] Setup sensible gunicorn defaults
- [ ] Testing in both python and ts
- [ ] Test linting in both python and ts
- [ ] typecheck python with mypy
