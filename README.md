# node-express-postgres-boilerplate

Hello! This is a simple production-grade express.js app with postgresql. It has the following features:

1.  precommit hook: [Husky](https://github.com/typicode/husky).
2.  Code prettifier: [Prettier](https://github.com/prettier/prettier).
3.  Code linter: [ESLint](https://www.npmjs.com/package/eslint).
4.  [Lint-staged](https://www.npmjs.com/package/lint-staged) precommit hook.
5.  [Nodemon](https://www.npmjs.com/package/nodemon) for development environment.
6.  Database: Postgresql with [Sequelize](https://sequelize.org)
7.  Sequelize shortcut commands to create, drop, migrate, and seed.
8.  Concurrency control with transactions.
9.  Request validation: request data validation using [Express-validator](https://www.npmjs.com/package/express-validator).
10. Custom UUID validation middleware.
11. [dotenv](https://www.npmjs.com/package/dotenv) for handling env variables.
12. Production-grade Logger using [winston](https://github.com/winstonjs/winston).
13. Error handling: centralized error handling class
14. Secure HTTP headers using [helmet](https://helmetjs.github.io/).
15. Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors).
16. Utility middlewares in `src/middlewares`: Global error middleware, unmatched routes middleware, etc.
17. Async router using [express-async-errors](https://www.npmjs.com/package/express-async-errors).
18. development & production configurations.
19. Common utility functions in `src/utils`
20. Basic build script in `/build.sh`
21. Apps constants in `src/constants`.
22. MVC folder structure.
23. Database connection pooling
24. Custom load-test [script](https://github.com/hanoak/node-express-postgresql-boilerplate/blob/main/load-test/script.sh) in bash - forked repo(<https://github.com/hanoak/source-request-simulator>)
25. Concurrency control example routes.

## Prerequisites

1. Node.js & NPM
2. Mongodb

## Quick Start

    git clone https://github.com/hanoak/node-express-mongodb-boilerplate.git

## Installing

    npm i

## Commands

1.  Update the env variables in `/.env file`.
2.  For local development run `npm run dev`.
3.  And for production, `bash build.sh` && `cd dist` && `npm run start`

## Environment variables

Environmental variables can be found in /.env.example:

    PORT=5000
    NODE_ENV=development
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=

## Routes

Sample routes can be found in `src/routes`

`GET /posts` - get all posts  
`GET /posts/latest` - get the latest post
`GET /posts/:id` - get a single post
`POST /posts` - add a post  
`DELETE /posts/:id` - delete a post

## Project Structure

    src\
     |--config\         # Environment variables and app's configuration
     |--constants\      # App's string constants
     |--controllers\    # App's controller layer
     |--errors\         # App's global error handler class
     |--logger\         # HTTP logger
     |--middlewares\    # Custom express middlewares
     |--models\         # Mongoose models: data layer
     |--routes\         # App's Routes
     |--services\       # App's business logic: service layer
     |--utils\          # Utility functions
     |--validators\     # Request data validation schemas
     |--database.js     # Seed mongodb collections
     |--index.js        # App's entry point

## Load/concurrency-control testing

update concurrency-control request parameters in /load-test/config.json:

      {
    "url": "localhost:5000/api/v1/concurrency/count/fixed-3/590a37d2-8d66-429e-b850-43524dc163cc",
    "method": "GET",
    "payload": "{\"key\":\"value\"}",
    "headers": ["Content-Type: application/json", "Authorization: Bearer abc123"],
    "log_file": "load-test/requests_log.txt",
    "num_requests": 10,
    "duration": "1s",
    "concurrent_requests": 10
    }

To run the concurrent request's script, execute:

    bash load-test/script.sh -f load-test/config.json

## License

[MIT](https://github.com/hanoak/node-express-mongodb-boilerplate/blob/main/LICENSE)
