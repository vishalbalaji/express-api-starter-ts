# Modular Express

This repo contains a base [Express.js](https://www.npmjs.com/package/express) API with various popular libraries that integrate with it pre-configured on different branches. The idea here is that you will be able to select which frameworks you need and add them to the repo via `git merge`.

## Usage

Clone this repo locally and merge in any of the branches that you want into the `main` branch. For example, you can merge the branch `lint-airbnb`, using the following command:

```sh
git merge --no-edit --no-ff lint-airbnb
```

The `--no-edit` here is optional and is there so that you don't have to add in a commit message manually.

One downside of this merge approach is that since not all the lines in `package.json` end with a comma, depending on what order you merge the branches, the `package.json` file may break. To get around this, you can either manually go in and fix it or use a tool called [jsonrepair](https://www.npmjs.com/package/jsonrepair). 

To use jsonrepair, you will need to install it globally before using it as you cannot use npx with a broken `package.json`. You can do this using:

```sh
npm i -g jsonrepair
jsonrepair --overwrite package.json
```

If you are as neurotic as me and need your dependencies and dev dependencies in alphabetical order, you can do so using [sort-package-json](https://www.npmjs.com/package/sort-package-json) as follows:

```sh
npx sort-package-json
```

You can install dependencies and run the API with `npm`, `yarm` or `pnpm` by using the following commands:

```sh
# With npm
npm install
npm run dev

# With yarn
yarn install
yarn run dev

# With pnpm
pnpm install
pnpm run dev
```

Each branch contains its own separate documentation that is named the same as the branch in the `docs` folder. Upon merge, you should end up with the documentation for just the selected branches bundled together next to this README.

## Docker

The express API is also configured with Docker and Docker Compose by default for both development and production. You can start up the API for development using:

```sh
docker compose up
# or #
docker compose up api
```

To run the production version of the API, you can do so using:

```sh
docker compose -f docker-compose.prod.yml up
# or #
docker compose -f docker-compose.prod.yml up api
```

## Available Branches

The repos in this branch are split into 3 main categories: `lint`, `db` and `auth`. The branches available are listed below. For more details about each branch, check out the documentation in the `docs` folder of that branch of the respective branch.

### Linting 

* `lint-airbnb`: Eslint configured with the `Airbnb` configuration.
* `lint-standard`: Eslint configured with the `Standard` configuration.
* `lint-xo`: Eslint configured with the `XO` configuration.

### DB

* `db-base`: MongoDB, PostgresSQL and MySQL configured using Docker and Docker Compose.
* `db-prisma`: Basic configuration of the Prisma ORM.
* `db-knex`: *To be implemented.*
* `db-typeorm`: *To be implemented.*
* `db-mongoose`: *To be implemented.*
* `db-objection`: *To be implemented.*

### Auth

* `auth-passport`: Basic Passport.js configuration for authentication.
* `auth-grant`: *To be implemented.* 


## Some Notes

1. I am very new to both Typescript and all of these libraries. I primarily made this project as a way to learn these different libraries and not go through the hassle of setting them up every time I use them. Therefore, the code may be very scuffed, so please feel free let me know if any improvements can be made anywhere.
2. Being based on git merges, it is inevitable that merge conflicts may arise somewhere, sometime, so beware of that.
3. The intended use case for this repo is that you merge your required branches, delete the original `.git` folder and initiate a fresh new repo. So... Do what you will with that, I guess.
