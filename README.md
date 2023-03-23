# ExeChange

## Installation

1. **Install** [poetry](https://python-poetry.org/docs/#installing-with-the-official-installer)
2. **Install** [Node.js/NPM v19.6.0](https://nodejs.org/en/) (steps to install Node will depend on your system, recommended to use a package manager like [brew](https://formulae.brew.sh/formula/node)).
3. **Install** [PostgreSQL](https://formulae.brew.sh/formula/postgresql@14).
4. Run the following shell commands

```shell
cd ExeChange
poetry config virtualenvs.in-project true   # Enables your editor to work with the Poetry environment
poetry install                              # Installs packages for python/django backend
npm install                                 # Installs packages for typescript/vite/react frontend
```

5. :bangbang: Before running anything **copy** `.env.example` to `.env` and change any relevant settings. :bangbang:

> Windows can encounter some issues installing Poetry, therefore if you are not intending to contribute towards it is recommended to run ExeChange using [docker](#running-production-with-docker).

## Running Development Locally

1. In **two seperate** terminal windows run the following commands:

First terminal:

```shell
poetry run migrate  # Updates the Django database
poetry run dev      # Run the backend Django server (API & Database interface)
```

Second terminal:

```shell
npm run dev     # Render the React frontend (.tsx, css, react components)
```

2. Now visit <http://127.0.0.1:8000/> to view the website

> Note, various django aliases have been made in `pyproject.toml`. To run any other commands from manage.py use `poetry run python backend/manage.py`

## Running Production Locally

1. Run the following shell commands

```shell
npm run build           # Compiles the frontend into singular .js & .css files
poetry run build        # Collects all the static files Django needs to serve
poetry run prod         # Runs the dynamic Django routes with gunicorn
```

2. Now visit <http://127.0.0.1:8000/> to view the website.

If you want Django to serve static files change change `FORCE_SERVE_STATIC=True` (This should only be used for testing!). Otherwise, setup a webserver to serve the files in `backend/staticfiles` and map it to `www.yourdomain.com/static/`.

## Running Production with Docker

This builds the app into a lightweight virtual environment image so that it can consistently be deployed. Use this for hosting on sites like AWS, but this is overkill for testing the production environment. The default docker compose does not include a PostgreSQL database, as this is hosted separately by Amazon RDS. You can either setup your own PostgreSQL database or set `FORCE_DEBUG_DB=True` in your `.env` file to use the debug SQLite database.

1. Make sure [Docker](https://docs.docker.com/get-docker/) (and docker-compose) are installed.
2. Copy the `.env` file. Set `DEBUG=False`, `FORCE_SERVE_STATIC=False` & `USE_POSTGRES_DB=False`

```shell
docker-compose up   # Build and run the required Docker images.
```

Now visit <http://localhost> to view the website. If you make any changes to the source code you may have to **delete the ExeChange docker volume** and force rebuild the images with

```shell
docker-compose up --build --force-recreate
```

## Technologies

- **Django** - Python web framework
- **Vite** - Packages React & typescript into a single javascript bundle
- **TypeScript** - JavaScript with types
- **React** - Front-end library for interactive & reusable UI
- **TailwindCSS** - CSS utility framework
- **Poetry** - Python dependency & package manager
- **npm** - Package manager for javascript

## Project Structure - Important Files & Folders

```
.
├── .github                 GitHub Actions for CI/CD
│   └── workflows
├── backend                 All Django backend files
│   ├── apps                    Django apps
│   │   ├── api                     REST API Folder, backend logic lives here
│   │   │   ├── routes                  Different API Routes
│   │   │   │   ├── login.py                maps to /api/login etc.
│   │   │   │   │   ...
│   │   │   │   └── upload.py
│   │   │   ├── tests
│   │   │   ├── authentication.py       Handles JWT user authentication
│   │   │   ├── models.py               Database models
│   │   │   ├── serializer.py           Convert database models to JSON
│   │   │   └── urls.py                 API URLs
│   │   └── frontend                Serves/links frontend files
│   ├── backend                 Django Project
│   │   ├── settings.py             Settings
│   │   └── urls.py                 Main URLs
│   ├── manage.py
│   └── scripts.py              Django & Poetry Aliases
├── frontend                React Frontend
│   ├── components              Shared components
│   ├── pages                   Specific pages & their components
│   │   ├── Authentication
│   │   │   ...
│   │   └── Upload
│   ├── index.css               Extra css, majority of CSS exists in .tsx files
│   ├── index.html
│   ├── main.tsx                Main React Router, handles frontend URLs
│   └── vite-env.d.ts
├── nginx                   Nginx Config for serving static files
│   ├── Dockerfile
│   └── default.conf
├── .env.example            Example environment variables
├── Dockerfile              Builds the frontend and backend into a single image
├── docker-compose.yaml     Combines ExeChange image with Nginx server
├── package.json            Node/NPM package settings
└── pyproject.toml          Python/Poetry package settings
```

## Setting up email verification

If you have not already create new credentials on Google Cloud Console, and enable the GMAIL API. Then, in your .env file input your google_client_id, google_secret and project id.

Now set `SEND_VERIFICATION_EMAIL` to `True` in your .env, and start the server. On server start you will find that it asks you to go to a link, follow this link and the google cloud services will do the rest, it may give you a warning that the app is unverified, if this is the case you can click advanced, and continue. You will be redirected to a localhost uri, paste this into your terminal where prompted. Now a credentials.json file will have been generated for you, so on server restart you will not have to follow this process again.

## Contributions

### Sprint 1

- **General setup**: Jonathan
- **AWS / Dockerisation:** Jonathan
- **Logging in / registration backend**: Harry
- **Token authentication frontend / backend:** Harry
- **Front-end Logging in / registration:** Vihan (& Harry)
- **Marketplace frontend:** Gabby & Maddie
- **Marketplace backend:** Jonathan & Vihan
- **Upload frontend / backend**: Jonathan & Vihan
- **Trade request frontend:** Augustijn & Gabby
- **Trade request backend:** Harry & Maddie
- **Profile frontend:** Maddie (& Harry)
- **Profile backend:** Maddie & Harry
- **Navbar:** Augustijn & Jonathan

### Sprint 2

- **Trading:** Jonathan & Vihan
- **Marketplace Improvements:** Vihan & Jonathan
- **Email Verification:** Harry
- **Profile:** Augustijn & Maddie
- **Profile Location Badges:** Harry & Jonathan & Gabby
- **Profile Routing:** Gabby
- **HTTPS / NGNIX:** Jonathan
- **SMTP / Cloudflare:** Jonathan
- **Legal Work:** Augustijn
