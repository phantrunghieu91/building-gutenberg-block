# WordPress Docker Development Environment

Local WordPress development stack using Docker Compose, Nginx, PHP-FPM, and MySQL.

## Stack

- **Nginx**: `nginx:stable-alpine`
- **PHP**: `php:8.3-fpm-alpine`
- **Database**: `mysql:8.0`
- **WordPress files**: mounted from `./wordpress`
- **MySQL data**: persisted in `./mysql`
- **WP-CLI**: installed in the PHP container

## Project Structure

```text
.
├── docker-compose.yml
├── .env
├── .env.db
├── nginx/
│   ├── Dockerfile
│   ├── default.conf
│   └── certs/
├── php/
│   └── Dockerfile
├── wordpress/
└── mysql/
```

## Requirements

- Docker
- Docker Compose
- A local hosts entry for the configured domain
- Download latest wordpress from https://wordpress.org/download/

## Local Domain

Nginx is configured to serve WordPress at:

```text
jin-dev.test
```

Add this entry to your local hosts file:

```text
127.0.0.1 jin-dev.test
```

On macOS or Linux, edit:

```bash
sudo nano /etc/hosts
```

## Environment Files

`.env` controls the exposed Nginx HTTP port:

```env
NGINX_PORT=80
SERVER_NAME=jin.dev
```

The current Nginx config uses `jin-dev.test` directly in `nginx/default.conf`. `SERVER_NAME` is not currently consumed by Docker Compose or Nginx.

`.env.db` configures MySQL:

```env
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
```

The WordPress config points to the Compose database service:

```php
define( 'DB_HOST', 'database' );
```

## Start The Project

Build and start the containers:

```bash
docker compose up -d --build
```

Open the site:

```text
http://jin-dev.test
https://jin-dev.test
```

The HTTPS server uses the self-signed certificates in `nginx/certs`.

## Stop The Project

```bash
docker compose down
```

To stop the project and remove the database volume data stored in this repo, remove the `mysql` directory only if you intentionally want to delete the local database files.

## Useful Commands

View running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Open a shell in the PHP container:

```bash
docker compose exec php sh
```

Run WP-CLI:

```bash
docker compose exec php wp --allow-root --path=/var/www/html plugin list
```

Open a MySQL shell:

```bash
docker compose exec database mysql -u wp_root -p wp
```

## Services

### `webserver`

Builds from `./nginx`, exposes port `80` through `${NGINX_PORT}`, and exposes HTTPS on `443`.

The WordPress directory is mounted into Nginx at:

```text
/var/www/html
```

### `php`

Builds from `./php`, installs the required PHP MySQL extensions, enables `pdo_mysql`, and installs WP-CLI.

The WordPress directory is mounted into PHP at:

```text
/var/www/html
```

### `database`

Uses the official MySQL 8.0 image and reads credentials from `.env.db`.

Database files are persisted at:

```text
./mysql
```

## Notes

- WordPress core files are stored in `./wordpress`.
- Installed plugins include Query Monitor and Akismet.
- Installed themes include Twenty Twenty-Three, Twenty Twenty-Four, and Twenty Twenty-Five.
- The local database files are stored directly inside this project under `./mysql`.
