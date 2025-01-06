FROM php:8.2-apache

WORKDIR /var/www/html

# 必要な PHP 拡張をインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY ./src/composer.json ./src/composer.lock ./
COPY ./src/.env /var/www/html/.env
# RUN composer install

# Apacheの設定
COPY ./abi-cms.conf /etc/apache2/sites-available/
RUN a2enmod rewrite && \
    a2ensite abi-cms.conf && \
    a2dissite 000-default.conf && \
    service apache2 restart

CMD ["apache2-foreground"]
