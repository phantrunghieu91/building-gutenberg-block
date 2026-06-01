FROM php:8.3-fpm-alpine

RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-enable pdo_mysql

RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x /usr/local/bin/wp