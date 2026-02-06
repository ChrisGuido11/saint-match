const ALLOWED_ORIGINS = Deno.env.get('ALLOWED_ORIGINS')?.split(',') ?? ['*'];

export function getCorsHeaders(origin?: string | null): Record<string, string> {
  const allowedOrigin =
    ALLOWED_ORIGINS.includes('*') ? '*'
    : (origin && ALLOWED_ORIGINS.includes(origin)) ? origin
    : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
  };
}

// Default headers for backward compatibility (used at module level)
export const corsHeaders = getCorsHeaders();
