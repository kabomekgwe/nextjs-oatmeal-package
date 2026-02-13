#!/bin/bash

# Deployment Script for EC2
# This script deploys the Oatmeal application to an EC2 instance

set -e

echo "🚀 Starting deployment..."

# Configuration
DOMAIN=${DOMAIN:-"example.com"}
EMAIL=${EMAIL:-"admin@example.com"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   log_error "Please do not run as root"
   exit 1
fi

# Update system
log_info "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    log_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    log_warn "Please log out and log back in for Docker permissions to take effect"
    exit 0
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    log_info "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create necessary directories
log_info "Creating directories..."
mkdir -p ~/oatmeal/backups
mkdir -p ~/oatmeal/docker/nginx/ssl

# Generate self-signed SSL certificate for initial setup
if [ ! -f ~/oatmeal/docker/nginx/ssl/cert.pem ]; then
    log_info "Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ~/oatmeal/docker/nginx/ssl/key.pem \
        -out ~/oatmeal/docker/nginx/ssl/cert.pem \
        -subj "/CN=$DOMAIN"
fi

# Create environment file if not exists
if [ ! -f ~/oatmeal/.env ]; then
    log_info "Creating environment file..."
    cat > ~/oatmeal/.env << EOF
# Database
DB_ROOT_PASSWORD=$(openssl rand -base64 32)
DB_NAME=wordpress
DB_USER=wordpress
DB_PASSWORD=$(openssl rand -base64 32)

# JWT
JWT_SECRET_KEY=$(openssl rand -base64 64)

# Domain
DOMAIN=$DOMAIN

# WordPress
WP_ADMIN_USER=admin
WP_ADMIN_PASSWORD=$(openssl rand -base64 16)
WP_ADMIN_EMAIL=$EMAIL
EOF
    log_warn "Environment file created at ~/oatmeal/.env - Please update with your values"
fi

# Pull latest changes
cd ~/oatmeal

# Build and start containers
log_info "Building and starting containers..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
log_info "Waiting for services to start..."
sleep 30

# Check health
docker-compose -f docker-compose.prod.yml ps

# Setup SSL with Certbot (optional - requires DNS to be configured)
if command -v certbot &> /dev/null; then
    log_info "Setting up SSL with Let's Encrypt..."
    read -p "Is DNS configured for $DOMAIN? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo certbot --nginx -d $DOMAIN -d wp.$DOMAIN --non-interactive --agree-tos --email $EMAIL
        log_info "SSL certificate installed successfully"
    else
        log_warn "Skipping SSL setup. Run certbot manually after configuring DNS."
    fi
fi

# Setup backup cron job
log_info "Setting up automated backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * cd ~/oatmeal && ./scripts/backup.sh >> ~/oatmeal/backups/backup.log 2>&1") | crontab -

log_info "✅ Deployment complete!"
log_info "Your site should be available at: https://$DOMAIN"
log_info "WordPress admin: https://wp.$DOMAIN/wp-admin"
log_info ""
log_info "Next steps:"
log_info "1. Configure DNS to point to this server"
log_info "2. Run: docker-compose -f docker-compose.prod.yml logs -f"
log_info "3. Complete WordPress setup at https://wp.$DOMAIN"
log_info "4. Install required WordPress plugins"
