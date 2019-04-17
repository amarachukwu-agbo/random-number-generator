[![CircleCI](https://circleci.com/gh/amarachukwu-agbo/random-number-generator.svg?style=svg)](https://circleci.com/gh/amarachukwu-agbo/random-number-generator)
[![Maintainability](https://api.codeclimate.com/v1/badges/a5251b4518478195b3aa/maintainability)](https://codeclimate.com/github/amarachukwu-agbo/random-number-generator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a5251b4518478195b3aa/test_coverage)](https://codeclimate.com/github/amarachukwu-agbo/random-number-generator/test_coverage)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)
# random-number-generator
A simple web application that generates phone numbers for a telephone company. Generated phone numbers are also saved to the user's file system for record keeping.

## Hosting
* The API is hosted on https://amara-random-number-generator.herokuapp.com/api/v1/
* The Application is hosted on hhttps://amara-random-number-generator.herokuapp.com/

## Technologies used
* [JavaScript](https://www.javascript.com/) - A programming language for the web
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime environment built using Chrome's v8 engine that makes it possible to run JavaScript on the server.
* [ExpressJS](https://expressjs.com/) - A lightweight JavaScript framework that lets you organize web applications in an MVC architecture on the server-side.
* [React](https://www.reactjs.org/) - A JavaScript front-end library used for building user interfaces with components.

## Features
* Users can generate phone numbers in batches and save them
* Users can sort numbers in ascending or descending order
* Users can view phone numbers for each batch
* Users can view total, maximum and minimum numbers for each batch

## Installation and setup
1. Install [`NodeJS`](https://nodejs.org/en/download/)
2. Clone the repository using the command
    ```
    git clone https://github.com/amarachukwu-agbo/random-number-generator.git
    ```
4. Change directory to the project's folder using the command
    ```
    cd random-number-generator
    ```
5. Install project's dependencies using the command
    ```
    yarn
    ```
6. Start the application
    * Start the server with ```
    yarn run server:start-dev ```
    * Start the client with ```
    yarn run client:start-dev ```
10. Open the browser and run the application on the address
    ```
    http://127.0.0.1:1234/
    ```

## Testing
  Run the command
  ```
    yarn test
  ```
## License
This project is licensed under the [MIT License](https://github.com/amarachukwu-agbo/random-number-generator/blob/develop/LICENSE)
