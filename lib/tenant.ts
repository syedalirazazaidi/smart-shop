import { createServerSupabase } from '@/lib/supabase/server';

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  domain?: string;
  created_at?: string;
  updated_at?: string;
}

export async function getTenantFromSlug(slug: string): Promise<Tenant | null> {
  try {
    const supabase = await createServerSupabase();
    
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) {
      // Fallback to mock data for development
      if (slug === 'demo-store' || slug === 'example') {
        return {
          id: '1',
          slug: slug,
          name: slug === 'demo-store' ? 'Demo Store' : 'Example Store',
        };
      }
      return null;
    }
    
    return data as Tenant;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    // Fallback to mock data for development
    if (slug === 'demo-store' || slug === 'example') {
      return {
        id: '1',
        slug: slug,
        name: slug === 'demo-store' ? 'Demo Store' : 'Example Store',
      };
    }
    return null;
  }
}

export async function getTenantFromDomain(domain: string): Promise<Tenant | null> {
  // TODO: Fetch tenant from database by domain
  // For subdomain-based multi-tenancy
  return null;
}

export function extractTenantSlug(pathname: string): string | null {
  // Extract tenant slug from pathname
  // Examples: /store-slug/products -> store-slug
  //           /admin/dashboard -> null (admin routes)
  //           /sign-in -> null (auth routes)
  
  const segments = pathname.split('/').filter(Boolean);
  
  // Skip admin, auth, and other system routes
  const systemRoutes = ['admin', 'sign-in', 'sign-up', 'api', 'studio'];
  if (segments.length === 0 || systemRoutes.includes(segments[0])) {
    return null;
  }
  
  // First segment is the tenant slug
  return segments[0];
}

