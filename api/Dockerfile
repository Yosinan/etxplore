FROM php:7.4-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    libssl1.0.0 \
    && docker-php-ext-install pdo_mysql

# Copy application files
COPY . /app

# Set working directory
WORKDIR /app

# Run the application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]