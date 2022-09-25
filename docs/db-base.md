# Base DB Configuration

This branch is configured with 3 different databases: [PostgresSQL](https://hub.docker.com/_/postgres), [MySQL](https://hub.docker.com/_/mysql) and [MongoDB](https://hub.docker.com/_/mongo), using docker compose in the [docker-compose.db.yml](../docker-compose.db.yml) file so that you can spin up a database for local development without needing to install it on your machine. 

By default, `postgres` is selected as the default service and will spin up when `docker compose up` is run. If you want to run just the `db` service, then you can do so by specifying just the `db` service in the up command as so:

```sh
docker compose up db
```

To use a particular DB, update the `service` property under the `db` service to one of these three values: `postgres`, `mysql` or `mongo` in [docker-compose.yml](../docker-compose.yml) . For example, to use Postgres, update the [docker-compose.yml](../docker-compose.yml)  file as follows:

```yaml
services:
  # other services
  db:
    extends:
      file: docker-compose.db.yml
      service: postgres
    # other settings
```

> NOTE: This config is made with a development environment in mind and the following instructions as written as such.

## Environment Variables

The environment variables for all of these services are unified and can be configured using the .env file as shown here and in .env.sample:

```sh
DB_SERVER=localhost
DB_PORT=3000
DB_USERNAME=dbuser
DB_PASSWORD=dbpassword
DB_NAME=sampledb
```

* `DB_SERVER`: Keep it as `localhost` unless running both the API and DB using docker compose, in which case, change it to `db`.
* `DB_PORT`: The port on which the DB should run on your local machine.
* `DB_USERNAME`: Username to access the DB.
* `DB_PASSWORD`: Password to access the DB.
* `DB_NAME`: Name of the DB used for this particular project.

In addition to these, 3 more variables are configured based on the above variables to form connection strings for each db. It is done so with the help of [dotenv-expand](https://www.npmjs.com/package/dotenv-expand), so updating the above mentioned variables should automatically update the connection strings when running the API.

> NOTE: `DB_USERNAME` is irrelevant for the `mysql` service as it requires the user to have root permissions and any newly created user won't. It is much simpler to just use the `root` user to access the DB and hence it is configured to just do so by default..

## Volume Management

The data of each DB is persisted using docker volumes, called `postgres-data`, `mysql-data` and `mongo-data` that map to the actual data directories within the containers. A new docker volume will be created for each DB config.

After running the container once, the newly created volumes can be listed using the command:

```sh
docker volume ls
```

The output of which would probably look like:

```
DRIVER    VOLUME NAME
local     express-api-starter-ts_node_modules
local     express-api-starter-ts_postgres-data
# other volumes... probably...
```

Here, the volume ending with 'postgres-data' is the volume created when the postgres service is spun up and will apply to the other DB services as well. If the database needs to be flushed manually for some reason, this volume along with all the data in it can be deleted with the following command:

```sh
docker volume rm express-api-starter-ts_postgres-data
```
