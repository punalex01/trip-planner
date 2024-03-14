# Wayfinder

Wayfinder is a group trip planner web application. 

Wayfinder is developed with a React/Typescript/Tailwind frontend, Python/Flask backend, and SQLAlchemy ORM with PostgreSQL.

## Installation

To run the development environment, you will need Docker.

1. Clone the repository
 
```bash
git clone https://github.com/punalex01/wayfinder.git
```

2. In ```~/frontend/.env.example``` folder, edit the ```JWT_SECRET_KEY``` value and rename the file to ```.env```.
```bash
JWT_SECRET_KEY = 'SECRET KEY' # <-- INSERT OWN SECRET KEY
```

3. In the project root directory, run the following commands:
```bash
docker compose build
docker compose run
```

4. In the ```api``` container, use Docker Desktop or ```docker exec``` to run:
```bash
./init-db.sh
``` 

Edits to code on the host computer will automatically restart the application to reflect code changes.

## Usage
The web application can be accessed on ```localhost:8080/home```. The API can be accessed on ```localhost:1337/api```.