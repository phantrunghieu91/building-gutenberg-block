# WordPress Docker Template

A Docker Compose setup for local WordPress development with Nginx, PHP 8.3, MySQL 8.0, and Adminer database management.

## Overview

This project provides a complete Docker environment for WordPress development. It includes:
- **Nginx** web server with SSL/TLS support (self-signed certificates)
- **PHP 8.3 FPM** runtime with WordPress CLI
- **MySQL 8.0** database
- **Adminer** for database management
- Pre-configured for local development with self-signed HTTPS support

## Requirements

- Docker and Docker Compose installed on your machine
- macOS, Linux, or Windows with Docker Desktop

## Project Structure

```
wp-docker-template/
├── docker-compose.yml          # Docker Compose configuration
├── .env.sample                 # Sample environment variables (web server)
├── .env.db.sample              # Sample environment variables (database)
├── nginx/
│   ├── Dockerfile              # Nginx image configuration
│   ├── default.conf            # Main WordPress server configuration
│   ├── adminer.conf            # Adminer proxy configuration
│   └── certs/                  # Self-signed SSL certificates
├── php/
│   └── Dockerfile              # PHP 8.3 FPM image with WordPress CLI
├── mysql/                      # MySQL data volume (created at runtime)
└── wordpress/                  # WordPress root directory (manual installation)
```

## Setup Instructions

### 1. Clone or Initialize the Project

```bash
cd wp-docker-template
```

### 2. Create Environment Files

Copy the sample environment files and configure them:

```bash
cp .env.sample .env
cp .env.db.sample .env.db
```

Edit `.env` and `.env.db` with your desired configuration.

### 3. Download WordPress

**Note:** The `wordpress/` folder is not included in this repository and must be manually downloaded.

Download WordPress from [wordpress.org](https://wordpress.org/download/) and extract it into the `wordpress/` directory:

```bash
mkdir -p wordpress
# Download and extract WordPress into the wordpress/ folder
```

### 4. Start the Docker Environment

```bash
docker-compose up -d --build
```

This will:
- Build the Nginx and PHP images
- Start all services (webserver, database, php, adminer)
- Mount the WordPress folder for development

### 5. Access Your Site

- **WordPress:** https://localhost or your configured `SERVER_NAME`
- **Adminer:** https://adminer.localhost (or your configured domain)

**Note:** Browsers may show SSL warnings due to self-signed certificates—this is expected for local development.

## Configuration

### Web Server Configuration (`.env`)

```
NGINX_PORT=          # Port for HTTP (default: 80)
SERVER_NAME=         # Server domain name (default: jin-dev.test)
```

### Database Configuration (`.env.db`)

```
MYSQL_DATABASE=      # Database name for WordPress
MYSQL_USER=          # Database user
MYSQL_PASSWORD=      # Database password
MYSQL_ROOT_PASSWORD= # MySQL root password

# Adminer Configuration (use same values as above)
ADMINER_DRIVER=      # Database driver (default: server)
ADMINER_SERVER=      # Database host
ADMINER_USERNAME=    # Database username
ADMINER_PASSWORD=    # Database password
ADMINER_DB=          # Database name
```

## Services

### Webserver (nginx)
- Alpine-based Nginx stable image
- Configured for WordPress with PHP FastCGI
- SSL/TLS support with self-signed certificates
- Proxies Adminer requests to the Adminer container

### PHP
- PHP 8.3 FPM on Alpine Linux
- Pre-installed extensions: mysqli, PDO, PDO_MySQL
- Includes WordPress CLI (wp-cli)
- Mounted volume: `/var/www/html` (WordPress root)

### Database (mysql)
- MySQL 8.0
- Persistent volume: `./mysql/` directory
- Configured via `.env.db` environment variables

### Adminer
- Web-based database management tool
- Accessible at `adminer.{SERVER_NAME}` via HTTPS
- Auto-login configured with database credentials from `.env.db`

## Usage

### Running Commands

#### Access PHP Container

```bash
docker-compose exec php bash
```

#### Use WordPress CLI

```bash
docker-compose exec php wp --allow-root <command>
```

Example: Create a new WordPress user

```bash
docker-compose exec php wp user create admin admin@example.com --allow-root
```

#### Connect to MySQL

```bash
docker-compose exec database mysql -u root -p
```

### Stopping Services

```bash
# Stop services (preserve data)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, and volumes
docker-compose down -v
```

## Development Workflow

1. Edit WordPress files directly in the `wordpress/` folder
2. Changes are immediately reflected due to volume mounting
3. Use Adminer for database management
4. Access logs via Docker:
   ```bash
   docker-compose logs -f <service_name>
   ```

## File Mounting

Both `webserver` and `php` services have the same WordPress volume mount:
- **Host Path:** `./wordpress/`
- **Container Path:** `/var/www/html`
- **Mode:** delegated (optimized for macOS performance)

## SSL Certificates

Self-signed SSL certificates are included in `nginx/certs/`. For production use, replace these with valid certificates from a trusted Certificate Authority.

## Important Notes

- The `wordpress/` directory must be manually populated with WordPress files from [wordpress.org](https://wordpress.org)
- Adminer database credentials are automatically populated from `.env.db`
- Ensure ports 80 and 443 are available, or modify `NGINX_PORT` in `.env`
- Data is persisted in the `mysql/` volume—delete it with `docker-compose down -v`

## Troubleshooting

### Port Already in Use

If port 80 or 443 is in use, modify the `NGINX_PORT` in `.env` or stop the conflicting service.

### Database Connection Errors

Verify that `.env.db` matches the database credentials and that the database service is running:

```bash
docker-compose ps
```

### Permission Issues

If you encounter permission issues with the `wordpress/` folder, ensure it has appropriate permissions or use:

```bash
docker-compose exec php chown -R www-data:www-data /var/www/html
```

## License

This template is provided as-is for local development purposes.
