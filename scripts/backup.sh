#!/bin/bash

# Backup Script
# Creates backups of WordPress files and database

set -e

# Configuration
BACKUP_DIR="/home/$(whoami)/oatmeal/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[BACKUP]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Create backup directory
mkdir -p "$BACKUP_DIR"

cd ~/oatmeal

# Backup WordPress database
log_info "Backing up WordPress database..."
docker-compose -f docker-compose.prod.yml exec -T db mysqldump -u root -p"${DB_ROOT_PASSWORD}" wordpress > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Compress database backup
gzip "$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Backup WordPress files
log_info "Backing up WordPress files..."
docker-compose -f docker-compose.prod.yml exec -T wordpress tar czf - /var/www/html > "$BACKUP_DIR/files_backup_$TIMESTAMP.tar.gz"

# Backup environment file
cp .env "$BACKUP_DIR/env_backup_$TIMESTAMP"

# Clean up old backups (keep last 7 days)
log_info "Cleaning up old backups..."
find "$BACKUP_DIR" -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "files_backup_*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "env_backup_*" -mtime +$RETENTION_DAYS -delete

log_info "Backup complete: $TIMESTAMP"
log_info "Files saved to: $BACKUP_DIR"

# Optional: Upload to S3 (uncomment if configured)
# if command -v aws &> /dev/null; then
#     log_info "Uploading to S3..."
#     aws s3 sync "$BACKUP_DIR" s3://your-bucket-name/backups/
# fi
