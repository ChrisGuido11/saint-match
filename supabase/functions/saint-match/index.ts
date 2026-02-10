import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, getCorsHeaders } from '../_shared/cors.ts';

// ── Env var validation ──────────────────────────────────────────────────

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const MISSING_VARS = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  .filter((v) => !Deno.env.get(v));

if (MISSING_VARS.length > 0) {
  console.error(`Missing required env vars: ${MISSING_VARS.join(', ')}`);
}

const VALID_EMOTIONS = [
  'anxious',
  'overwhelmed',
  'scattered',
  'impatient',
  'frustrated',
  'peaceful',
  'grateful',
  'joyful',
] as const;

const CACHE_DURATION_HOURS = 6;

// ── Saints data (embedded for local fallback) ──────────────────────────

interface Saint {
  id: string;
  name: string;
  feastDay: string;
  bio: string;
  virtues: string[];
  emotions: string[];
  initials: string;
}

interface MicroAction {
  id: string;
  saintId: string;
  emotion: string;
  actionText: string;
  estimatedMinutes: number;
}

const SAINTS: Saint[] = [
  { id: 'st-benedict', name: 'St. Benedict', feastDay: 'July 11', bio: 'Father of Western monasticism who created the Rule of St. Benedict. His famous motto "Ora et Labora" (pray and work) teaches us to find God in daily rhythms, turning overwhelming chaos into ordered peace through structured balance.', virtues: ['order', 'balance', 'peace'], emotions: ['overwhelmed', 'scattered'], initials: 'SB' },
  { id: 'st-therese', name: 'St. Th\u00e9r\u00e8se of Lisieux', feastDay: 'October 1', bio: 'The "Little Flower" who discovered the "Little Way" of spiritual childhood. She transformed ordinary moments into extraordinary grace through small acts of love, proving holiness doesn\'t require grand gestures but patient, daily faithfulness.', virtues: ['patience', 'humility', 'love'], emotions: ['impatient', 'frustrated'], initials: 'ST' },
  { id: 'st-francis-de-sales', name: 'St. Francis de Sales', feastDay: 'January 24', bio: 'Bishop of Geneva known for extraordinary gentleness. He taught that anxiety comes from desiring to be free from anxiety. His "Introduction to the Devout Life" shows how to cultivate calm through gentle self-acceptance and trust in Providence.', virtues: ['gentleness', 'calm', 'trust'], emotions: ['anxious', 'frustrated'], initials: 'FS' },
  { id: 'st-thomas-more', name: 'St. Thomas More', feastDay: 'June 22', bio: 'Lawyer, statesman, and martyr who maintained humor and focus under immense political pressure. He balanced demanding public life with deep interior peace, proving that faithfulness can coexist with professional excellence and worldly responsibility.', virtues: ['focus', 'courage', 'integrity'], emotions: ['scattered', 'overwhelmed'], initials: 'TM' },
  { id: 'st-padre-pio', name: 'St. Padre Pio', feastDay: 'September 23', bio: 'Capuchin friar who bore the stigmata for fifty years. Despite immense suffering, he counseled thousands with warmth and directness. His motto "Pray, hope, and don\'t worry" remains the simplest antidote to modern anxiety and overthinking.', virtues: ['trust', 'hope', 'surrender'], emotions: ['anxious', 'overwhelmed'], initials: 'PP' },
  { id: 'st-josemaria', name: 'St. Josemar\u00eda Escriv\u00e1', feastDay: 'June 26', bio: 'Founder of Opus Dei who taught the sanctification of ordinary work. He showed that every task\u2014from filing reports to washing dishes\u2014can be offered to God, transforming monotonous routine into meaningful spiritual practice.', virtues: ['diligence', 'sanctification', 'joy'], emotions: ['scattered', 'frustrated'], initials: 'JE' },
  { id: 'st-monica', name: 'St. Monica', feastDay: 'August 27', bio: 'Mother of St. Augustine who prayed with unwavering patience for her son\'s conversion for seventeen years. Her persistent hope through seemingly hopeless circumstances teaches the power of patient endurance and trust in God\'s timing.', virtues: ['patience', 'perseverance', 'hope'], emotions: ['impatient', 'anxious'], initials: 'SM' },
  { id: 'st-philip-neri', name: 'St. Philip Neri', feastDay: 'May 26', bio: 'The "Apostle of Rome" known for his infectious joy and holy humor. He used laughter and lightheartedness as spiritual tools, teaching that joy is a form of prayer and that taking ourselves too seriously blocks grace.', virtues: ['joy', 'humor', 'lightness'], emotions: ['frustrated', 'overwhelmed'], initials: 'PN' },
  { id: 'st-teresa-avila', name: 'St. Teresa of \u00c1vila', feastDay: 'October 15', bio: 'Carmelite mystic and Doctor of the Church who reformed her order while managing chronic illness. Her "Interior Castle" maps the soul\'s journey to God, showing how to find still waters even amid life\'s most turbulent storms.', virtues: ['contemplation', 'courage', 'peace'], emotions: ['anxious', 'scattered'], initials: 'TA' },
  { id: 'st-maximilian-kolbe', name: 'St. Maximilian Kolbe', feastDay: 'August 14', bio: 'Franciscan friar who volunteered to die in place of a stranger at Auschwitz. His radical self-giving in humanity\'s darkest hour proves that peace and purpose can exist even in impossible circumstances through total surrender to love.', virtues: ['courage', 'sacrifice', 'peace'], emotions: ['overwhelmed', 'peaceful'], initials: 'MK' },
  { id: 'st-gianna-molla', name: 'St. Gianna Beretta Molla', feastDay: 'April 28', bio: 'Modern Italian pediatrician, wife, and mother who balanced demanding career with family life. She proves that professional women can live deep faith practically, finding God not despite busy schedules but through purposeful presence in each moment.', virtues: ['balance', 'presence', 'dedication'], emotions: ['overwhelmed', 'scattered'], initials: 'GM' },
  { id: 'st-ignatius', name: 'St. Ignatius of Loyola', feastDay: 'July 31', bio: 'Founder of the Jesuits who developed the Spiritual Exercises after a cannonball shattered his leg and his vanity. His method of discernment teaches how to read interior movements, turning emotional chaos into clear-eyed spiritual decision-making.', virtues: ['discernment', 'focus', 'discipline'], emotions: ['scattered', 'impatient'], initials: 'IL' },
];

const MICRO_ACTIONS: MicroAction[] = [
  { id: 'ma-1', saintId: 'st-benedict', emotion: 'overwhelmed', actionText: 'Try Ora et Labora today: work for 50 minutes, then pause for 2 minutes of quiet breathing. Repeat this rhythm 3 times. Let the rhythm replace the chaos.', estimatedMinutes: 10 },
  { id: 'ma-2', saintId: 'st-benedict', emotion: 'scattered', actionText: 'Write down your 3 most important tasks. Do them in order, one at a time. When tempted to multitask, whisper "one thing" and return to your list.', estimatedMinutes: 5 },
  { id: 'ma-3', saintId: 'st-therese', emotion: 'impatient', actionText: 'The next time you wait today\u2014in line, on hold, in traffic\u2014silently offer that wait for someone you love. Turn dead time into a small gift of love.', estimatedMinutes: 5 },
  { id: 'ma-4', saintId: 'st-therese', emotion: 'frustrated', actionText: 'Do one invisible act of kindness: hold a door without being noticed, clean something that isn\'t yours, or compliment someone behind their back. Make it small and hidden.', estimatedMinutes: 5 },
  { id: 'ma-5', saintId: 'st-francis-de-sales', emotion: 'anxious', actionText: 'Place your hand on your heart for 60 seconds. Breathe slowly and repeat: "Do not look forward to what may happen tomorrow. The same Father who cares for you today will care for you tomorrow."', estimatedMinutes: 5 },
  { id: 'ma-6', saintId: 'st-francis-de-sales', emotion: 'frustrated', actionText: 'Before your next difficult conversation, pause for 10 seconds and choose your gentlest tone. Respond to irritation with one degree more warmth than you feel. Just one degree.', estimatedMinutes: 5 },
  { id: 'ma-7', saintId: 'st-thomas-more', emotion: 'scattered', actionText: 'Set a 15-minute timer. Work on one task with your phone in another room. When the timer rings, take 1 minute to close your eyes and breathe before deciding your next move.', estimatedMinutes: 15 },
  { id: 'ma-8', saintId: 'st-thomas-more', emotion: 'overwhelmed', actionText: 'Write a brief note of encouragement to a colleague who seems stressed. Thomas More lifted others even facing execution. A small kindness breaks the spell of self-focus.', estimatedMinutes: 10 },
  { id: 'ma-9', saintId: 'st-padre-pio', emotion: 'anxious', actionText: 'Write down your three biggest worries right now. For each one, write: "I cannot control this. I release it." Then physically tear up the paper. Let go of what you cannot hold.', estimatedMinutes: 10 },
  { id: 'ma-10', saintId: 'st-padre-pio', emotion: 'overwhelmed', actionText: 'Choose one task you\'ve been avoiding. Set a timer for just 5 minutes and start. Padre Pio said "Pray, hope, don\'t worry." Sometimes beginning is the prayer.', estimatedMinutes: 5 },
  { id: 'ma-11', saintId: 'st-josemaria', emotion: 'scattered', actionText: 'Choose your most boring task today. Before starting, silently dedicate it to someone specific you love. Do the task with full attention as if it were a gift to them.', estimatedMinutes: 10 },
  { id: 'ma-12', saintId: 'st-josemaria', emotion: 'frustrated', actionText: 'The next time frustration rises, pause and find one thing to be genuinely grateful for in this exact moment. Not in general\u2014right now, in this situation. Name it aloud.', estimatedMinutes: 5 },
  { id: 'ma-13', saintId: 'st-monica', emotion: 'impatient', actionText: 'Think of one situation where you\'re waiting for change in someone else. Write them a text of pure encouragement\u2014no advice, no hints. Just genuine love. Then let go of the timeline.', estimatedMinutes: 10 },
  { id: 'ma-14', saintId: 'st-monica', emotion: 'anxious', actionText: 'Set a "worry window": allow yourself 5 minutes to fully worry about everything. Then close the window. Monica waited 17 years. You can set worry aside for the rest of today.', estimatedMinutes: 5 },
  { id: 'ma-15', saintId: 'st-philip-neri', emotion: 'frustrated', actionText: 'Find something absurd or funny in your current frustration. Text a friend about it. Philip Neri said "A joyful heart is more easily made perfect." Let laughter crack the tension.', estimatedMinutes: 5 },
  { id: 'ma-16', saintId: 'st-philip-neri', emotion: 'overwhelmed', actionText: 'Take a 10-minute walk outside. Notice 3 beautiful things you pass\u2014a tree, a child laughing, light on a building. Philip Neri found God in Rome\'s streets. You can too.', estimatedMinutes: 10 },
  { id: 'ma-17', saintId: 'st-teresa-avila', emotion: 'anxious', actionText: 'Find a quiet spot. Close your eyes for 3 minutes and imagine a peaceful room inside your heart. Teresa called this the "Interior Castle." Visit it when anxiety knocks.', estimatedMinutes: 5 },
  { id: 'ma-18', saintId: 'st-teresa-avila', emotion: 'scattered', actionText: 'Before your next task, spend 60 seconds in complete stillness. No phone, no planning\u2014just presence. Teresa taught that "God is also among the pots and pans." Be fully where you are.', estimatedMinutes: 5 },
  { id: 'ma-19', saintId: 'st-maximilian-kolbe', emotion: 'overwhelmed', actionText: 'Ask yourself: "What is one small thing I can do right now for someone else?" Then do it. Kolbe found freedom in the worst prison on earth by choosing love. Choose one act of love today.', estimatedMinutes: 10 },
  { id: 'ma-20', saintId: 'st-maximilian-kolbe', emotion: 'peaceful', actionText: 'You\'re in a good place\u2014extend it. Write a note of gratitude to someone who helped you recently. Let your peace flow outward. Kolbe\'s peace in Auschwitz calmed an entire cell block.', estimatedMinutes: 10 },
  { id: 'ma-21', saintId: 'st-gianna-molla', emotion: 'overwhelmed', actionText: 'Identify the one relationship that matters most today. Give that person 15 minutes of completely undivided attention\u2014no phone, no multitasking. Gianna showed that presence beats productivity.', estimatedMinutes: 15 },
  { id: 'ma-22', saintId: 'st-gianna-molla', emotion: 'scattered', actionText: 'Before switching tasks, take 3 deep breaths and ask: "What matters most right now?" Gianna balanced medicine and motherhood by being fully present in each role. Choose one role right now.', estimatedMinutes: 5 },
  { id: 'ma-23', saintId: 'st-ignatius', emotion: 'scattered', actionText: 'Try the Ignatian Examen: spend 5 minutes reviewing your morning. What moment gave you energy (consolation)? What drained you (desolation)? This afternoon, move toward consolation.', estimatedMinutes: 5 },
  { id: 'ma-24', saintId: 'st-ignatius', emotion: 'impatient', actionText: 'Before making your next decision today, pause for 30 seconds. Ask: "Am I rushing from anxiety or moving from clarity?" Ignatius taught that good spirits bring peace, not pressure. Choose peace.', estimatedMinutes: 5 },
];

// ── Helper functions ───────────────────────────────────────────────────

function matchLocally(emotion: string) {
  const matchingSaints = SAINTS.filter((s) => s.emotions.includes(emotion));
  const saint =
    matchingSaints[Math.floor(Math.random() * matchingSaints.length)] ??
    SAINTS[0];

  const actions = MICRO_ACTIONS.filter(
    (ma) => ma.saintId === saint.id && ma.emotion === emotion
  );
  const action =
    actions[Math.floor(Math.random() * actions.length)] ?? actions[0];

  return {
    saint_name: saint.name,
    feast_day: saint.feastDay,
    bio: saint.bio,
    micro_action: action?.actionText ?? 'Spend 5 minutes in quiet reflection.',
    estimated_minutes: action?.estimatedMinutes ?? 5,
  };
}

interface ClaudeResponse {
  saintName: string;
  feastDay: string;
  bio: string;
  virtues?: string[];
  microAction: string;
  estimatedMinutes: number;
}

function isValidClaudeResponse(obj: unknown): obj is ClaudeResponse {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.saintName === 'string' && r.saintName.length > 0 &&
    typeof r.feastDay === 'string' &&
    typeof r.bio === 'string' &&
    typeof r.microAction === 'string' && r.microAction.length > 0 &&
    typeof r.estimatedMinutes === 'number' && r.estimatedMinutes > 0
  );
}

function buildPrompt(input: { emotion?: string; customMood?: string }): string {
  if (input.customMood) {
    return `You are a Catholic spiritual director. The user describes how they feel in their own words:

"${input.customMood}"

First, identify the key emotional themes in their words (e.g., anxiety, loneliness, gratitude, confusion, hope).
Then recommend ONE saint who specifically addressed those emotional struggles or joys, and ONE concrete 5-15 minute micro-action they can do today.
Pick a saint that uniquely fits their specific situation — not a generic match.
Respond ONLY in JSON: {"saintName": "", "feastDay": "", "bio": "50 words max", "virtues": ["keyword1", "keyword2", "keyword3"], "microAction": "", "estimatedMinutes": 10}`;
  }

  return `You are a Catholic spiritual director. The user is feeling ${input.emotion}. Recommend ONE saint who overcame this struggle and ONE specific 5-15 minute micro-action they can do today inspired by this saint's virtue. The action should be concrete and modern (actual behavioral action, not just prayer). Pick a different saint each time — surprise the user with variety from the full calendar of saints. Respond ONLY in JSON: {"saintName": "", "feastDay": "", "bio": "50 words max", "virtues": ["keyword1", "keyword2", "keyword3"], "microAction": "", "estimatedMinutes": 10}`;
}

async function callClaude(
  input: { emotion?: string; customMood?: string }
): Promise<ClaudeResponse | null> {
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return null;
  }

  try {
    console.log('Calling Claude API with model claude-haiku-4-5-20251001...');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        temperature: 1,
        messages: [
          {
            role: 'user',
            content: buildPrompt(input),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Claude API error ${response.status}: ${errBody}`);
      return null;
    }

    const data = await response.json();
    console.log('Claude API response received, source: claude');
    let text = data.content?.[0]?.text;
    if (!text) return null;

    // Strip markdown code fences and extra whitespace that Haiku may add
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    // Extract JSON object if there's surrounding text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON object found in Claude response:', text.slice(0, 200));
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    if (!isValidClaudeResponse(parsed)) {
      console.error('Invalid Claude response structure:', JSON.stringify(parsed).slice(0, 200));
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Claude API call exception:', err);
    return null;
  }
}

function getWeekStart(): { weekStartStr: string; nextMonday: Date } {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0=Sun, 1=Mon
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const weekStart = new Date(now);
  weekStart.setUTCDate(now.getUTCDate() + mondayOffset);
  weekStart.setUTCHours(0, 0, 0, 0);

  const nextMonday = new Date(weekStart);
  nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);

  return { weekStartStr: weekStart.toISOString().slice(0, 10), nextMonday };
}

async function checkAndIncrementUsage(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<boolean> {
  const { weekStartStr, nextMonday } = getWeekStart();

  // Use atomic RPC to prevent TOCTOU race condition
  const { data, error } = await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_week_start: weekStartStr,
    p_reset_at: nextMonday.toISOString(),
    p_weekly_limit: 3,
  });

  if (error) {
    console.error('increment_usage RPC error:', error);
    // Fallback: allow the request rather than blocking on DB error
    return true;
  }

  return data === true;
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = corsHeaders
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

// ── Main handler ───────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const headers = getCorsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  // Early exit if required env vars are missing
  if (MISSING_VARS.length > 0) {
    return jsonResponse(
      { error: `Server misconfigured: missing ${MISSING_VARS.join(', ')}`, code: 'SERVER_ERROR' },
      500,
      headers
    );
  }

  try {
    // 1. Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return jsonResponse(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        401,
        headers
      );
    }

    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const supabaseUser = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return jsonResponse(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        401,
        headers
      );
    }

    // 2. Validate input — wrap in try/catch for malformed body
    let emotion: string | undefined;
    let customMood: string | undefined;
    try {
      const body = await req.json();
      emotion = body.emotion;
      customMood = body.customMood;
    } catch {
      return jsonResponse(
        { error: 'Invalid request body', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    // Validate: must have either a valid emotion or a custom mood string
    const hasValidEmotion = emotion && VALID_EMOTIONS.includes(emotion as typeof VALID_EMOTIONS[number]);
    const hasValidCustomMood = typeof customMood === 'string' && customMood.trim().length > 0 && customMood.trim().length <= 120;

    if (!hasValidEmotion && !hasValidCustomMood) {
      return jsonResponse(
        { error: 'Invalid emotion or customMood', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    if (hasValidCustomMood) {
      customMood = customMood!.trim();
    }

    // 3. Usage limits disabled for free beta — all users get unlimited matches
    // Re-enable by uncommenting the block below:
    // const { data: profile } = await supabaseAdmin
    //   .from('profiles')
    //   .select('is_pro')
    //   .eq('id', user.id)
    //   .single();
    //
    // if (!profile?.is_pro) {
    //   const canUse = await checkAndIncrementUsage(supabaseAdmin, user.id);
    //   if (!canUse) {
    //     return jsonResponse(
    //       { error: 'Weekly limit reached', code: 'USAGE_LIMIT_REACHED' },
    //       429,
    //       headers
    //     );
    //   }
    // }

    // 4. Call Claude API (skip cache for dynamic variety)
    const claudeInput = hasValidCustomMood
      ? { customMood: customMood! }
      : { emotion: emotion! };
    const claudeResult = await callClaude(claudeInput);

    if (claudeResult) {
      const expiresAt = new Date(
        Date.now() + CACHE_DURATION_HOURS * 60 * 60 * 1000
      ).toISOString();

      // Store in cache (use customMood as emotion field for analytics)
      await supabaseAdmin.from('match_cache').insert({
        emotion: emotion ?? customMood,
        saint_name: claudeResult.saintName,
        feast_day: claudeResult.feastDay,
        bio: claudeResult.bio,
        micro_action: claudeResult.microAction,
        estimated_minutes: claudeResult.estimatedMinutes,
        source: 'claude',
        expires_at: expiresAt,
      });

      return jsonResponse({
        saint_name: claudeResult.saintName,
        feast_day: claudeResult.feastDay,
        bio: claudeResult.bio,
        virtues: claudeResult.virtues ?? [],
        micro_action: claudeResult.microAction,
        estimated_minutes: claudeResult.estimatedMinutes,
        source: 'claude',
      }, 200, headers);
    }

    // 6. Local fallback
    const fallbackEmotion = emotion ?? VALID_EMOTIONS[Math.floor(Math.random() * VALID_EMOTIONS.length)];
    const localMatch = matchLocally(fallbackEmotion);
    return jsonResponse({ ...localMatch, source: 'local' }, 200, headers);
  } catch (error) {
    console.error('saint-match error:', error);
    return jsonResponse(
      { error: 'Internal error', code: 'INTERNAL_ERROR' },
      500,
      headers
    );
  }
});
