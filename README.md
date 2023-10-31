## serene-client
This is a simple music storage client that allows you to manage and enjoy your music collection. You can upload your favorite songs and albums, search for them, and download music from youtube.

## Installation

To install project dependencies, run:
```shell
pnpm install
```

start the client
```shell
pnpm dev
```


<img src="https://github.com/kocierik/swiftClient/assets/41591336/5df44af7-4f71-46e5-bf51-fe7d3da90712" alt="App Screenshot" height="300" width="700">
<img src="https://github.com/kocierik/swiftClient/assets/41591336/4a73c2cb-6655-4696-896f-5acbc407323f" alt="App Screenshot" height="300" width="700">

### Run with Docker compose

You can use Docker Compose to run the client alongside the server. Here's a Docker Compose configuration:

```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  frontend:
    build:
      context: ./swiftFrontend
      dockerfile: Dockerfile
    container_name: frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build:
      context: ./swiftBackend
      dockerfile: Dockerfile
    container_name: backend
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
    volumes:
      - /etc/music:/etc/music
    ports:
      - "4000:4000"
    depends_on:
      - db

volumes:
  postgres-data:
```


### Note
The use of Next.js in this project is for experimentation purposes 
