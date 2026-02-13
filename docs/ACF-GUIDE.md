# Connecting Homepage to WordPress ACF Fields

This guide shows how to customize the homepage content using WordPress ACF (Advanced Custom Fields).

## How It Works

```
WordPress Admin (ACF Fields)
         ↓
    GraphQL API
         ↓
Next.js Server Component
         ↓
    Render Page
```

## Step 1: Import ACF Fields

1. **Log into WordPress Admin:**
   - URL: http://localhost:8080/wp-login.php
   - Username: `admin`
   - Password: `admin123`

2. **Install ACF Plugin:**
   - Go to **Plugins → Add New**
   - Search "Advanced Custom Fields"
   - Install and activate

3. **Import Field Groups:**
   - Go to **Custom Fields → Tools**
   - Click **Import**
   - Select the file: `acf-export.json` (in project root)
   - Click **Import**

4. **Verify Fields:**
   - Go to **Custom Fields → Field Groups**
   - You should see "Homepage Fields"

## Step 2: Create Homepage Page

1. Go to **Pages → Add New**
2. Title: "Homepage"
3. **IMPORTANT:** Set the slug to "homepage" (no spaces)
4. Fill in the ACF fields:
   - Hero Headline: "Your Custom Headline"
   - Hero Subheadline: "Your custom description"
   - CTA Button Text: "Get Started"
   - CTA Button Link: Select a page
   - Show Badge: Yes/No
   - Features Section fields...
5. Click **Publish**

## Step 3: Test GraphQL

Open this URL in your browser:
```
http://localhost:8080/graphql?query={page(id:"homepage",idType:URI){homepageFields{heroHeadline heroSubheadline heroCtaText heroShowBadge}}}
```

You should see JSON with your content!

## Step 4: View Your Site

Visit: http://localhost:3000

You should see your custom headline and content from WordPress!

## Data Flow Example

### WordPress (Content Editor)
```
Hero Headline: "Build Amazing Websites"
Hero Subheadline: "With our powerful platform"
CTA Text: "Start Free Trial"
```

### GraphQL Response
```json
{
  "data": {
    "page": {
      "homepageFields": {
        "heroHeadline": "Build Amazing Websites",
        "heroSubheadline": "With our powerful platform",
        "heroCtaText": "Start Free Trial"
      }
    }
  }
}
```

### Next.js (What renders)
```tsx
<h1>Build Amazing Websites</h1>
<p>With our powerful platform</p>
<button>Start Free Trial</button>
```

## Available Fields

### Hero Section
- **Hero Headline** - Main H1 text
- **Hero Subheadline** - Supporting paragraph
- **CTA Button Text** - Primary button label
- **CTA Button Link** - Where button goes
- **Show Badge** - Show/hide the "Now with Next.js 16" badge

### Features Section
- **Features Eyebrow** - Small text above headline (e.g., "Features")
- **Features Headline** - Section title
- **Features Description** - Supporting text

## What Happens When You Update?

1. Editor updates content in WordPress
2. Click "Update" to save
3. Next.js fetches new data (every 60 seconds with ISR)
4. Refresh http://localhost:3000 to see changes

## Troubleshooting

**Page not found?**
- Make sure page slug is exactly "homepage"
- Check that ACF fields are imported

**Fields not showing?**
- Verify WPGraphQL for ACF plugin is activated
- Check field group location rules (should be Page = Homepage)

**Changes not appearing?**
- Clear Next.js cache: `rm -rf .next`
- Wait 60 seconds for ISR revalidation
- Or restart dev server

## Next Steps

Now that the homepage is connected, you can:
1. Customize all text from WordPress
2. Add more ACF fields for other sections
3. Connect other pages (About, Pricing, etc.)
4. Add image fields for dynamic images

The content team can now edit the website without touching code!