setup-dev:
    docker-compose up --build
    poetry install

lint:
    pre-commit run --all-files

run:
    poetry run gunicorn monolith.monolith.wsgi
