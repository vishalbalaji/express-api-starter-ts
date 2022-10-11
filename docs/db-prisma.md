# Prisma Configuration

This branch is configured with Prisma. For more information on Prisma, visit: [prisma.io](https://www.prisma.io/). This branch also extends from the `db-base` branch and contains its DB docker configurations.

## Base Configuration

The packages [prisma](https://www.npmjs.com/package/prisma)  and [@prisma/client](https://www.npmjs.com/package/@prisma/client) are installed and Prisma is initialized with `npx prisma init`.

The base configuration can be found in [prisma/schema.prisma](../prisma/schema.prisma). By default, it is set to connect to PostgresSQL with the `POSTGRES_URL` environment variable as its connection string. To connect to other types of databases, refer to [https://www.prisma.io/docs/reference/database-reference/connection-urls](https://www.prisma.io/docs/reference/database-reference/connection-urls). A simple example model called `User` is also set up in the [schema.prisma](../prisma/schema.prisma) file.

Finally, the [src/utils/db.ts](../src/utils/db.ts) file exports an instance of `PrismaClient` so that unnecessary connections to the DB can be avoided.

Additionally, it is recommended that [zod](https://www.npmjs.com/package/zod) is installed for schema validation:

```sh
npm install zod
```

## Push and Pull from the DB

If you are connected to an existing database, then the schemas of the tables in that database can be pulled into the [schema.prisma](../prisma/schema.prisma) file by running the following command:

```sh
npx prisma db pull
```

For relational DBs, such as PostgresSQL or MySQL, schemas can be migrated to the DB by running the following command:

```sh
npx prisma migrate dev --name <name>
```

The `<name>` property is optional and can be passed in by the user in order to keep track of changes more easily.

For no-SQL DBs like MongoDB, data needs to be pushed using the following command:

```sh
npx prisma db push
```

You can also view and manage the DB using [Prisma Studio](https://www.prisma.io/studio) by running:

```sh
npx prisma studio
```

For more information on Prisma migrations, refer to: [https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started](https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started).

## Using Prisma

As mentioned previously, the [src/utils/db.ts](../src/utils/db.ts) file exports an instance of `PrismaClient`, which can be imported throughout the app as such:

```javascript
import db from '@/utils/db';
```

The `@` is just an alias to the `src` directory and the import can be made relatively as well. For more information on how to use this client, refer to: [https://www.prisma.io/docs/concepts/components/prisma-client#](https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database).
