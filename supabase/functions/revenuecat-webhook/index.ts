import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const REVENUECAT_WEBHOOK_SECRET = Deno.env.get('REVENUECAT_WEBHOOK_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Events that grant or maintain pro access
const PRO_GRANT_EVENTS = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'UNCANCELLATION',
  'PRODUCT_CHANGE',
]);

// Events that revoke pro access
const PRO_REVOKE_EVENTS = new Set([
  'EXPIRATION',
  'BILLING_ISSUE',
]);

// Cancellation: user is still pro until period ends, just mark status
const CANCELLATION_EVENTS = new Set([
  'CANCELLATION',
]);

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  // Validate webhook secret via Bearer token
  if (REVENUECAT_WEBHOOK_SECRET) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (token !== REVENUECAT_WEBHOOK_SECRET) {
      console.error('Invalid webhook secret');
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }
  } else {
    console.warn('REVENUECAT_WEBHOOK_SECRET not set — skipping auth check');
  }

  try {
    const body = await req.json();
    const event = body?.event;

    if (!event) {
      return jsonResponse({ error: 'Missing event payload' }, 400);
    }

    const eventType: string = event.type;
    const appUserId: string | undefined = event.app_user_id;

    console.log(`RevenueCat webhook: ${eventType} for user ${appUserId}`);

    if (!appUserId) {
      console.error('No app_user_id in event');
      return jsonResponse({ error: 'Missing app_user_id' }, 400);
    }

    // app_user_id from RevenueCat should be the Supabase user UUID
    // (set via Purchases.logIn(supabaseUserId) on the client)
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (PRO_GRANT_EVENTS.has(eventType)) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_pro: true,
          subscription_status: 'active',
        })
        .eq('id', appUserId);

      if (error) {
        console.error('Error granting pro:', error);
        return jsonResponse({ error: 'Database error' }, 500);
      }

      console.log(`Pro granted for user ${appUserId}`);
    } else if (CANCELLATION_EVENTS.has(eventType)) {
      // User cancelled but still has access until period ends
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_pro: true, // still active until expiration
          subscription_status: 'cancelled',
        })
        .eq('id', appUserId);

      if (error) {
        console.error('Error updating cancellation:', error);
        return jsonResponse({ error: 'Database error' }, 500);
      }

      console.log(`Subscription cancelled (still active) for user ${appUserId}`);
    } else if (PRO_REVOKE_EVENTS.has(eventType)) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          is_pro: false,
          subscription_status: eventType === 'BILLING_ISSUE' ? 'billing_issue' : 'expired',
        })
        .eq('id', appUserId);

      if (error) {
        console.error('Error revoking pro:', error);
        return jsonResponse({ error: 'Database error' }, 500);
      }

      console.log(`Pro revoked for user ${appUserId} (${eventType})`);
    } else {
      console.log(`Unhandled event type: ${eventType}`);
    }

    // Always return 200 to acknowledge receipt (RevenueCat retries on non-2xx)
    return jsonResponse({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return jsonResponse({ error: 'Internal error' }, 500);
  }
});
