# N8N Blogs Category Fix

## Problem

Existing published blogs were not appearing in category pages and category counts were not reflecting the actual number of blogs.

## Root Causes

1. **Missing Revalidation Hooks**: N8N blogs weren't triggering Next.js cache revalidation when published
2. **Inconsistent Category Data**: Some blogs may have full category names (e.g., "Resume by Country / Region") instead of slugs (e.g., "resume-by-country")
3. **Cache Issues**: Long cache times prevented immediate updates

## Solution Applied

### 1. Added Revalidation Hooks

Created `/src/collections/N8NBlogs/hooks/revalidateN8NBlog.ts` with:

- `afterChange` hook to revalidate pages when blogs are published/unpublished
- `afterDelete` hook to revalidate when blogs are deleted
- Category change handling to update both old and new category pages

### 2. Data Normalization API

Created `/src/app/api/n8n-blogs/normalize-categories/route.ts` to:

- Convert full category names to slugs
- Fix missing or null categories
- Ensure all blogs have valid category slugs

### 3. Improved Debugging

Enhanced logging in:

- `BlogCategoriesServer.tsx` - logs raw and normalized counts
- `/api/n8n-blogs/categories` - logs category aggregation results

### 4. Reduced Cache Times

- Category API cache: 1 hour → 5 minutes
- This makes counts more responsive to changes

## How to Fix Existing Data

### Step 1: Start the Development Server

\`\`\`bash
pnpm dev
\`\`\`

### Step 2: Run the Normalization API

\`\`\`bash
curl -X POST http://localhost:3000/api/n8n-blogs/normalize-categories
\`\`\`

Or visit in browser:

- Open browser dev tools
- Navigate to: http://localhost:3000/api/n8n-blogs/normalize-categories
- Use POST request (can use Postman or similar tool)

This will:

- Find all blogs with full category names and convert them to slugs
- Set default category for blogs with missing categories
- Return a report of all changes made

### Step 3: Verify the Fix

Check the debug endpoint:
\`\`\`bash
curl http://localhost:3000/api/n8n-blogs/debug-categories
\`\`\`

This shows:

- Total published blogs
- Blogs grouped by category
- Sample blog titles per category
- Aggregation results

### Step 4: Clear Cache and Verify

1. Visit `/blogs` page
2. Check that category counts are correct
3. Click on each category to verify blogs appear
4. Publish a new blog and verify it appears immediately in its category

## Expected Category Slugs

All blogs should use one of these category values:

- `resume-by-country`
- `resume-by-job-profile`
- `resume-cv-tips`
- `linkedin-tips`
- `project-portfolio`
- `leadership-executive`
- `career-transition`
- `personal-branding`
- `job-search-trends`

## Monitoring

After the fix, monitor the console logs when:

- Publishing a blog (should see "Revalidating N8N blog at path...")
- Visiting /blogs page (should see "Raw category counts" and "Normalized category counts")

## Prevention

The revalidation hooks will ensure future blogs automatically:

- Appear in their categories immediately when published
- Update category counts in real-time
- Get removed from categories when unpublished
