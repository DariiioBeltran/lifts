# lifts

## Setup
Before starting make sure to get a `.env` file.
1. `brew install pyenv`
2. `pyenv install 3.10.13`
3. Add the following content to your .zshrc file
```
if which pyenv-virtualenv-init > /dev/null; then eval "$(pyenv virtualenv-init -)"; fi
export PYENV_ROOT="$HOME/.pyenv"
export PATH=/Users/dariobeltraniii/.local/bin:$PYENV_ROOT/shims:$PATH
```
4. `curl -sSL https://install.python-poetry.org | python3 -``` to install poetry
5. `poetry install`
6. `brew install node`
7. `brew install docker`
8. `docker-compose up --build`
