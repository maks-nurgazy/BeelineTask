# Beeline Task

A one paragraph description about the container.

## Getting Started

These instructions will cover usage information and for the docker container

#### Environment Variables

* `DJANGO_SETTINGS_MODULE` - BeelineTask.settings.settings
* `DB_HOST` - db
* `DB_NAME` - postgres
* `DB_USER` - postgres
* `DB_PASS` - postgres

## Built With

* Django v3.2
* DRF v3.12
* PostgreSQL v12.0
* React v16.13

## Author

* **Maksatbek Bolushov** - - [GITHUB](https://github.com/maks-nurgazy)

### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

Clone this repository

```shell
git clone https://github.com/maks-nurgazy/BeelineTask.git
```

Change directory to project root directory where docker-compose file located <br/>
Run docker-compose command

```docker
docker-compose up
```

Create superuser, Open another terminal window and run

```docker
docker ps
```
Copy "CONTAINER ID" where IMAGE name is "beelinetask_backend" from result of previous command <br/>
Then Run


```docker
docker exec -it <container_id> bash
python manage.py createsuperuser
```
<b>DONE</b>

Admin site URL
```
http://127.0.0.1:8000/admin
```

Frontend URL
```
http://127.0.0.1:3000
```


