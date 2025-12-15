# Supabase Setup Guide

This guide will help you set up Supabase for your multi-tenant ecommerce application.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `ecommerce-ai` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Click "Create new project"

## 2. Get Your API Keys

1. Go to your project dashboard
2. Click on "Settings" (gear icon)
3. Go to "API" section
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. Create Database Schema

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `tenants` table (for multi-tenant stores)
- `products` table
- `orders` table
- `order_items` table
- `cart_items` table
- `wishlist_items` table
- Row Level Security (RLS) policies

## 5. Test the Connection

You can test if Supabase is working by:

1. Starting your dev server: `npm run dev`
2. Visiting a tenant route like `/demo-store`
3. The app should fetch tenant data from Supabase

## 6. Using Supabase in Your Code

### Server Components

```typescript
import { createServerSupabase } from '@/lib/supabase/server';

export default async function MyPage() {
  const supabase = await createServerSupabase();
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId);
  
  // Use data...
}
```

### Client Components

```typescript
'use client';
import { createClientSupabase } from '@/lib/supabase/client';

export default function MyComponent() {
  const supabase = createClientSupabase();
  
  // Use supabase client...
}
```

## 7. Row Level Security (RLS)

The schema includes RLS policies to ensure:
- Users can only see their own orders, cart, and wishlist
- Products are publicly readable
- Tenants are publicly readable

## 8. Generate TypeScript Types (Optional)

To generate TypeScript types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
```

## Troubleshooting

### Connection Issues
- Make sure your `.env.local` file has the correct keys
- Restart your dev server after adding environment variables

### RLS Policy Errors
- Check that your RLS policies are correctly set up
- For admin operations, use the service role key (server-side only)

### Type Errors
- Update `lib/supabase/database.types.ts` with your actual schema
- Or run the type generation command above

## Next Steps

1. Customize the schema for your needs
2. Add more tables as needed (categories, reviews, etc.)
3. Set up Supabase Storage for product images
4. Configure email templates in Supabase Auth (if using)

