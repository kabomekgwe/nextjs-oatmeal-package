# Deployment Guide

This guide covers deploying the Oatmeal application to an EC2 instance with Docker.

## Prerequisites

- AWS Account with EC2 access
- Domain name configured in Route 53 (or other DNS provider)
- SSH key pair for EC2 access
- Docker and Docker Compose installed locally (for testing)

## Infrastructure Setup

### 1. Create EC2 Instance

1. **Launch Instance:**
   - AMI: Ubuntu 22.04 LTS
   - Instance Type: t3.medium (minimum) or t3.large (recommended)
   - Storage: 30GB GP3 SSD
   - Security Group:
     - SSH (22): Your IP only
     - HTTP (80): 0.0.0.0/0
     - HTTPS (443): 0.0.0.0/0

2. **Configure DNS:**
   - Create A record: `yourdomain.com` → EC2 IP
   - Create A record: `wp.yourdomain.com` → EC2 IP

### 2. Server Setup

1. **SSH into the server:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nextjs-oatmeal.git ~/oatmeal
   cd ~/oatmeal
   ```

3. **Run the deployment script:**
   ```bash
   export DOMAIN="yourdomain.com"
   export EMAIL="admin@yourdomain.com"
   ./scripts/deploy.sh
   ```

   The script will:
   - Install Docker and Docker Compose
   - Generate SSL certificates
   - Build and start containers
   - Setup automated backups

4. **Configure environment variables:**
   ```bash
   nano ~/oatmeal/.env
   ```
   
   Update these values:
   ```env
   DOMAIN=yourdomain.com
   DB_ROOT_PASSWORD=your-secure-password
   DB_PASSWORD=your-secure-password
   JWT_SECRET_KEY=your-secret-key
   ```

5. **Restart services:**
   ```bash
   cd ~/oatmeal
   docker-compose -f docker-compose.prod.yml up -d
   ```

### 3. WordPress Setup

1. **Complete WordPress installation:**
   - Visit: `https://wp.yourdomain.com`
   - Follow the setup wizard
   - Note down the admin credentials

2. **Install required plugins:**
   - WPGraphQL
   - WPGraphQL for Advanced Custom Fields
   - WPGraphQL JWT Authentication
   - Advanced Custom Fields Pro

3. **Configure WPGraphQL:**
   - Go to GraphQL → Settings
   - Enable "Enable GraphQL Debug Mode" for development
   - Save permalinks (Settings → Permalinks → Post name)

4. **Import ACF fields:**
   - Go to Custom Fields → Tools
   - Import field groups from `acf-export.json`

### 4. SSL Certificate (Let's Encrypt)

After DNS propagation:

```bash
sudo certbot --nginx -d yourdomain.com -d wp.yourdomain.com
```

Follow the prompts to complete SSL setup.

## Environment Variables

### Required Variables

Create a `.env` file in the project root:

```env
# Domain
DOMAIN=yourdomain.com

# Database (generate secure passwords)
DB_ROOT_PASSWORD=change-me-32-char-min
DB_NAME=wordpress
DB_USER=wordpress
DB_PASSWORD=change-me-32-char-min

# JWT Secret (generate with: openssl rand -base64 64)
JWT_SECRET_KEY=your-64-char-secret-key

# WordPress Admin
WP_ADMIN_USER=admin
WP_ADMIN_PASSWORD=change-me
WP_ADMIN_EMAIL=admin@yourdomain.com
```

### Next.js Environment

Create `.env.local` for Next.js:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://wp.yourdomain.com
WORDPRESS_GRAPHQL_ENDPOINT=/graphql
WORDPRESS_PREVIEW_SECRET=your-preview-secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Maintenance

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f nextjs
docker-compose -f docker-compose.prod.yml logs -f wordpress
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Backup

Manual backup:
```bash
cd ~/oatmeal
./scripts/backup.sh
```

Backups are stored in `~/oatmeal/backups/` and include:
- Database dump (compressed)
- WordPress files (compressed)
- Environment file

Automated backups run daily at 2 AM via cron.

### Updates

**Update application code:**
```bash
cd ~/oatmeal
git pull origin main
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

**Update Docker images:**
```bash
cd ~/oatmeal
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

**Renew SSL certificates:**
```bash
sudo certbot renew
```

### Monitoring

Check service health:
```bash
# Container status
docker-compose -f docker-compose.prod.yml ps

# Resource usage
docker stats

# Disk usage
df -h
```

## Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Restart services
docker-compose -f docker-compose.prod.yml restart

# Rebuild from scratch
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database connection issues

```bash
# Check if database is running
docker-compose -f docker-compose.prod.yml exec db mysql -u root -p

# Reset WordPress (WARNING: data loss)
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml up -d
```

### SSL certificate issues

```bash
# Test certificate
openssl x509 -in docker/nginx/ssl/cert.pem -text -noout

# Regenerate self-signed
cd docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/CN=yourdomain.com"
```

### Performance issues

1. **Enable OPcache** in WordPress (already configured in php.ini)
2. **Enable Nginx caching** (configured in nginx.conf)
3. **Monitor resources:**
   ```bash
   htop
   docker stats
   ```

## Security Checklist

- [ ] Change default passwords
- [ ] Enable UFW firewall
- [ ] Disable password authentication for SSH
- [ ] Enable automatic security updates
- [ ] Configure fail2ban
- [ ] Regular backups
- [ ] SSL certificates installed
- [ ] Security headers enabled
- [ ] WordPress security plugins (optional)

## Rollback

If you need to rollback:

```bash
cd ~/oatmeal

# Restore from backup
# 1. Stop services
docker-compose -f docker-compose.prod.yml down

# 2. Restore database
gunzip -c backups/db_backup_TIMESTAMP.sql.gz | docker-compose -f docker-compose.prod.yml exec -T db mysql -u root -p"${DB_ROOT_PASSWORD}" wordpress

# 3. Restore files
docker-compose -f docker-compose.prod.yml exec -T wordpress tar xzf - < backups/files_backup_TIMESTAMP.tar.gz

# 4. Start services
docker-compose -f docker-compose.prod.yml up -d
```

## Support

For issues:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Review this documentation
3. Open an issue on GitHub

## Resources

- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)