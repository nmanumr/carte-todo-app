# Todo App

A sample TODO app with django backend and react frontend. 

## How to run locally?

* Create a new file `.env` and copy the content from `.env.example` 
* With docker and docker compose installed run
    ```shell
    docker compose up # OR use docker-compose on linux
    ```
  This will pull pyhton-3.9 and postgreSQL images and run thr django server
* Now move to `ui/` directory and run:
    ```shell
    npm run dev
    ```
  This will run the nextjs development server.
* Now open [localhost:3000](http://localhost:3000/) in your browser.

## Tech Stack

* Backend
  * Django
  * Django Rest framework
  * PostgreSQL
* Frontend
  * Next js
  * React (with Typescript)
  * Axios
  * SWR (with Axios)
  * TailwindCss
  * Headless UI

All the UI components are custom tailored and can be found in `ui/components/` directory.
