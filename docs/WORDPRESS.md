# WordPress Setup Guide

This guide covers setting up WordPress as a headless CMS with WPGraphQL, ACF, and JWT authentication.

## Quick Start with Docker

1. **Start WordPress:**
   ```bash
   docker-compose up -d
   ```

2. **Access WordPress:**
   - WordPress: http://localhost:8080
   - phpMyAdmin: http://localhost:8081
   - GraphiQL IDE: http://localhost:8080/wp-admin/graphql/ide/

3. **Complete WordPress Installation:**
   - Visit http://localhost:8080
   - Select language
   - Set site title: "Oatmeal Headless CMS"
   - Create admin account
   - Complete installation

## Required Plugins

Install and activate the following plugins:

### 1. WPGraphQL (Free)
- **Purpose:** GraphQL API for WordPress
- **Installation:**
  1. Go to Plugins → Add New
  2. Search for "WPGraphQL"
  3. Install and activate
  4. Visit `/wp-admin/graphql/ide/` to test

### 2. WPGraphQL for ACF (Free)
- **Purpose:** Exposes ACF fields in GraphQL schema
- **Installation:**
  1. Go to Plugins → Add New
  2. Search for "WPGraphQL for Advanced Custom Fields"
  3. Install and activate

### 3. Advanced Custom Fields PRO (Paid)
- **Purpose:** Custom field management
- **Installation:**
  1. Download from ACF website or use license
  2. Go to Plugins → Add New → Upload
  3. Install and activate

### 4. WPGraphQL JWT Authentication (Free)
- **Purpose:** JWT authentication for preview mode
- **Installation:**
  1. Download from GitHub: https://github.com/wp-graphql/wp-graphql-jwt-authentication
  2. Go to Plugins → Add New → Upload
  3. Install and activate

### 5. WPGraphQL Block Editor (Optional)
- **Purpose:** Better Gutenberg block support
- **Installation:**
  1. Search "WPGraphQL Block Editor" in Plugins → Add New
  2. Install and activate

## WordPress Configuration

### 1. Permalinks Setup
1. Go to Settings → Permalinks
2. Select "Post name" structure
3. Save changes

### 2. CORS Configuration
The CORS headers are already configured in `docker-compose.yml` via the `WORDPRESS_CONFIG_EXTRA` environment variable.

### 3. Media Settings
1. Go to Settings → Media
2. Set appropriate image sizes for your theme

## Verifying GraphQL Setup

### Test the Endpoint
Visit: http://localhost:8080/graphql

You should see the GraphQL endpoint working.

### Test with GraphiQL
Visit: http://localhost:8080/wp-admin/graphql/ide/

Run a test query:
```graphql
query GetGeneralSettings {
  generalSettings {
    title
    description
    url
  }
}
```

## Next Steps

After WordPress is set up:

1. **Import ACF Field Groups:**
   - Use the ACF import feature
   - Import field groups from `acf-export.json`

2. **Configure JWT Authentication:**
   - Set secret key in `wp-config.php` (already done via Docker)
   - Test authentication with GraphiQL

3. **Create Content:**
   - Add pages: Home, Pricing, About, Contact
   - Configure ACF fields for each page
   - Add blog posts
   - Set up menus

## Troubleshooting

### GraphQL endpoint not accessible
- Check if WPGraphQL plugin is activated
- Verify permalinks are set to "Post name"
- Check WordPress error logs

### CORS errors
- Verify `WORDPRESS_CONFIG_EXTRA` in docker-compose.yml
- Check browser console for specific errors

### JWT authentication not working
- Verify JWT secret is set in wp-config.php
- Check that WPGraphQL JWT Authentication is activated
- Test token generation in GraphiQL

## Useful Links

- [WPGraphQL Documentation](https://www.wpgraphql.com/docs/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [GraphiQL IDE](http://localhost:8080/wp-admin/graphql/ide/)