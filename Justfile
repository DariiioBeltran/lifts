lint:
    pre-commit run --all-files

setup-dev:
    docker-compose up --build
    poetry install

# Django Commands
make-migrations:
    poetry run python manage.py makemigrations
migrate:
    poetry run python manage.py migrate
create-superuser:
    poetry run python manage.py createsuperuser
collectstatic:
    poetry run python manage.py collectstatic --noinput
run:
    just collectstatic
    poetry run gunicorn monolith.wsgi