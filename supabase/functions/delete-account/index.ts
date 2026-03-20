import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  console.log('=== delete-account invoked ===', req.method, req.url);

  if (req.method === 'OPTIONS') {
    console.log('Responding to OPTIONS preflight');
    return new Response('ok', { headers: getCorsHeaders(req.headers.get('origin')) });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const headers = { ...getCorsHeaders(req.headers.get('origin')), 'Content-Type': 'application/json' };

  console.log('Env vars present — URL:', !!SUPABASE_URL, 'ANON:', !!SUPABASE_ANON_KEY, 'SERVICE:', !!SUPABASE_SERVICE_ROLE_KEY);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    console.log('EARLY EXIT: missing env vars');
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500, headers });
  }

  // Validate the caller's JWT
  const authHeader = req.headers.get('authorization');
  console.log('Auth header present:', !!authHeader);
  if (!authHeader) {
    console.log('EARLY EXIT: no auth header');
    return new Response(JSON.stringify({ error: 'Missing authorization header' }), { status: 401, headers });
  }

  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { authorization: authHeader } },
  });

  console.log('Calling getUser()...');
  const { data: { user }, error: authError } = await anonClient.auth.getUser();
  console.log('User resolved:', user?.id ?? 'NONE', '| email:', user?.email ?? 'anon', '| authError:', authError?.message ?? 'none');

  if (authError || !user) {
    console.log('EARLY EXIT: auth failed');
    return new Response(JSON.stringify({ error: 'Invalid or expired session' }), { status: 401, headers });
  }

  // Use service role to delete all user data + auth record
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Delete public table data first (FK constraints require this before auth deletion)
  const tables = [
    { table: 'active_challenges', column: 'user_id' },
    { table: 'completions', column: 'user_id' },
    { table: 'user_novenas', column: 'user_id' },
    { table: 'patience_scores', column: 'user_id' },
    { table: 'usage', column: 'user_id' },
    { table: 'streaks', column: 'user_id' },
    { table: 'profiles', column: 'id' },
  ];

  for (const { table, column } of tables) {
    console.log(`Deleting from ${table} where ${column}=${user.id}...`);
    const { error: tableError } = await adminClient.from(table).delete().eq(column, user.id);
    if (tableError) {
      console.error(`Failed to delete from ${table}:`, tableError.message);
    } else {
      console.log(`Deleted from ${table}: ok`);
    }
  }

  // Delete the auth.users record (requires service_role)
  console.log('Calling admin.deleteUser for:', user.id);
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);
  console.log('admin.deleteUser result:', deleteError?.message ?? 'success');

  if (deleteError) {
    console.log('RETURNING 500: auth delete failed');
    return new Response(
      JSON.stringify({ error: 'Failed to delete auth record', detail: deleteError.message }),
      { status: 500, headers },
    );
  }

  console.log('=== delete-account complete — returning 200 ===');
  return new Response(JSON.stringify({ success: true }), { status: 200, headers });
});
