## WordPress + Next.js Headless Blog

This is a headless blog website built with Next.js and WordPress as the backend CMS. It fetches data from WordPress REST API and displays posts with pagination, search, and filtering by categories, tags, and authors.

### Features

-   List all blog posts with pagination
-   Search posts by keywords
-   Filter posts by categories, tags, and authors
-   Server-side data fetching for SEO and performance
-   Responsive design with clean UI components

### Tech Stack

-   Next.js
-   WordPress REST API (Headless CMS)
-   TypeScript
-   Tailwind CSS (for styling)
-   Shadcn (for UI components)

### Configuration

Create a .env.local file in the root of the project and add your WordPress site URL:

```env
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-site-name.local
```

### Enable Revalidation

To automatically update your Next.js site when WordPress content changes, you need to set up ISR (Incremental Static Regeneration) revalidation.

#### Step 1: Install WordPress Plugin

-   Download the NextJS Revalidate plugin from: https://github.com/dhananjaykuber/wp-nextjs-revalidate
-   Upload and activate the plugin in your WordPress admin
-   Go to NextJS Revalidate in WordPress admin sidebar

#### Step 2: Configure WordPress Plugin

In the WordPress admin settings:

-   Next.js URL: http://localhost:3000 (development) or https://your-nextjs-app.com (production)
-   Webhook Secret: Create a secure random string (e.g., your-super-secret-webhook-token-2024)

#### Step 3: Add Environment Variables

Add to your .env file:

```env
envNEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-site-name.local
WEBHOOK_SECRET=your-super-secret-webhook-token-2024
```

### Screenshots

![screencapture-localhost-3003-2025-06-07-17_21_24](https://github.com/user-attachments/assets/9047c40c-d416-4f20-a47b-01b117a2134d)

![screencapture-localhost-3003-what-is-acf-advanced-custom-fields-2025-06-07-17_21_46](https://github.com/user-attachments/assets/19ebbf68-3331-4fc9-92b7-5241f9afb04f)
