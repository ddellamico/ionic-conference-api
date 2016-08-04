RESTful APIs for Ionic Conference App
=====================================

RESTful APIs for [Ionic Conference App](https://github.com/ddellamico/ionic-conference-ui) application.
The sole purpose of this app is to provide a simple oAuth2 implementation for [Ionic Conference App](https://github.com/ddellamico/ionic-conference-ui).

**Note: This project is under development.**

## Features
  * Koa 2 ( async/await replace generator functions) : <https://github.com/koajs/koa/tree/v2.x>
  * Simple oAuth2 password flow implementation with oauth2orize : <https://github.com/jaredhanson/oauth2orize/>
  * Docker and Docker-compose
  * ES6 support via [babel](https://babeljs.io)
  * ES6 modules ( transpiled with babel )
  * Moongoose.js (for MongoDB interaction): <http://mongoosejs.com/>
  * JSON Web Token ([JWT](http://jwt.io)) authentication

## Requirements

* [NodeJs](http://nodejs.org) >= 6.x
* [Docker](https://www.docker.com/products/docker) and [Docker compose](https://docs.docker.com/compose)

## Install

  ```bash
  $ git clone https://github.com/ddellamico/ionic-conference-api
  ```

  Finally run `cd ionic-conference-api && docker-compose up` in the project dir to create and start the container.

  The app should then be running on your docker daemon on port **3000**.

  **NOTE:** [dotenv](https://github.com/motdotla/dotenv) is used to manage environment variables from a `.env` file.
  Place in root project a `.env` file and "overwrite" the default values.
  In `development` env, you can set the env variables by doing:

  ```
  cp .env.example .env
  ```

  and replace the values there.

## Tests

```sh
$ npm test
```

## License

MIT