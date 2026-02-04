import { Saint, MicroAction, Emotion, MoodOption, Mood, Milestone, MilestoneType } from '../types';

// ── Mood options (reframed for positivity: 3 support + 3 growth) ─────────────────
// Each mood maps to a legacy emotion for saint matching while providing uplifting language

export const MOODS: MoodOption[] = [
  // Support — reframed as growth opportunities
  { 
    id: 'seeking-peace', 
    label: 'Seeking Peace', 
    subtitle: 'Find calm within', 
    emoji: '\u{1F54A}\u{FE0F}', 
    color: '#8BA8A0',
    category: 'support',
    legacyEmotion: 'anxious'
  },
  { 
    id: 'need-focus', 
    label: 'Need Focus', 
    subtitle: 'Center your energy', 
    emoji: '\u{1F9ED}', 
    color: '#7B8FA3',
    category: 'support',
    legacyEmotion: 'scattered'
  },
  { 
    id: 'want-to-grow', 
    label: 'Want to Grow', 
    subtitle: 'Build inner strength', 
    emoji: '\u{1F331}', 
    color: '#9E8B83',
    category: 'support',
    legacyEmotion: 'overwhelmed'
  },
  // Growth — celebrate and amplify the good
  { 
    id: 'feeling-grateful', 
    label: 'Feeling Grateful', 
    subtitle: 'Share your gratitude', 
    emoji: '\u{1F64F}', 
    color: '#C49A6C',
    category: 'growth',
    legacyEmotion: 'grateful'
  },
  { 
    id: 'full-of-joy', 
    label: 'Full of Joy', 
    subtitle: 'Spread the light', 
    emoji: '\u{2600}\u{FE0F}', 
    color: '#D4A85E',
    category: 'growth',
    legacyEmotion: 'joyful'
  },
  { 
    id: 'ready-to-serve', 
    label: 'Ready to Serve', 
    subtitle: 'Give to others', 
    emoji: '\u{1F932}', 
    color: '#8B9D83',
    category: 'growth',
    legacyEmotion: 'peaceful'
  },
];

// ── Milestones for streak celebration ─────────────────

export const MILESTONES: Record<MilestoneType, Milestone> = {
  'first-challenge': {
    id: 'first-challenge',
    title: 'First Step',
    description: 'You\'ve begun your journey with the saints!',
    emoji: '\u{1F195}',
    color: '#8B9D83',
  },
  'streak-3': {
    id: 'streak-3',
    title: 'Rising Star',
    description: '3 days of intentional living!',
    emoji: '\u{2B50}',
    color: '#D4A85E',
  },
  'streak-7': {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'A full week of virtue practice!',
    emoji: '\u{1F3C6}',
    color: '#C49A6C',
  },
  'streak-14': {
    id: 'streak-14',
    title: 'Fortnight of Faith',
    description: 'Two weeks strong! You\'re building a habit.',
    emoji: '\u{1F525}',
    color: '#D4735E',
  },
  'streak-30': {
    id: 'streak-30',
    title: 'Virtue Master',
    description: '30 days! This is who you are now.',
    emoji: '\u{1F3C5}',
    color: '#8B9D83',
  },
  'streak-50': {
    id: 'streak-50',
    title: 'Saint in Training',
    description: '50 days of transformation!',
    emoji: '\u{1F451}',
    color: '#D4A85E',
  },
  'streak-100': {
    id: 'streak-100',
    title: 'Living Saint',
    description: '100 days! You inspire us all.',
    emoji: '\u{1F31F}',
    color: '#D4735E',
  },
  'virtue-seeker': {
    id: 'virtue-seeker',
    title: 'Virtue Seeker',
    description: 'Completed challenges across all moods',
    emoji: '\u{1F48E}',
    color: '#8B9D83',
  },
  'saint-friend': {
    id: 'saint-friend',
    title: 'Saint Friend',
    description: 'Met 5 different saints',
    emoji: '\u{1F91D}',
    color: '#7B8FA3',
  },
  'consistent-soul': {
    id: 'consistent-soul',
    title: 'Consistent Soul',
    description: 'Completed a full month without breaks',
    emoji: '\u{1F4C5}',
    color: '#C49A6C',
  },
};

// ── Legacy export for backward compatibility ─────────────────

export const EMOTIONS = MOODS.map(m => ({
  id: m.legacyEmotion,
  label: m.label,
  description: m.subtitle,
  emoji: m.emoji,
  color: m.color,
}));

// ── Saints ────────────────────────────────────────────────────────────

export const SAINTS: Saint[] = [
  {
    id: 'st-benedict',
    name: 'St. Benedict',
    feastDay: 'July 11',
    bio: 'Father of Western monasticism who created the Rule of St. Benedict. His famous motto "Ora et Labora" (pray and work) teaches us to find God in daily rhythms, turning overwhelming chaos into ordered peace through structured balance.',
    virtues: ['order', 'balance', 'peace'],
    emotions: ['overwhelmed', 'scattered'],
    initials: 'SB',
  },
  {
    id: 'st-therese',
    name: 'St. Th\u{00E9}r\u{00E8}se of Lisieux',
    feastDay: 'October 1',
    bio: 'The "Little Flower" who discovered the "Little Way" of spiritual childhood. She transformed ordinary moments into extraordinary grace through small acts of love, proving holiness doesn\'t require grand gestures but patient, daily faithfulness.',
    virtues: ['patience', 'humility', 'love'],
    emotions: ['joyful', 'grateful'],
    initials: 'ST',
  },
  {
    id: 'st-francis-de-sales',
    name: 'St. Francis de Sales',
    feastDay: 'January 24',
    bio: 'Bishop of Geneva known for extraordinary gentleness. He taught that anxiety comes from desiring to be free from anxiety. His "Introduction to the Devout Life" shows how to cultivate calm through gentle self-acceptance and trust in Providence.',
    virtues: ['gentleness', 'calm', 'trust'],
    emotions: ['anxious', 'joyful'],
    initials: 'FS',
  },
  {
    id: 'st-thomas-more',
    name: 'St. Thomas More',
    feastDay: 'June 22',
    bio: 'Lawyer, statesman, and martyr who maintained humor and focus under immense political pressure. He balanced demanding public life with deep interior peace, proving that faithfulness can coexist with professional excellence and worldly responsibility.',
    virtues: ['focus', 'courage', 'integrity'],
    emotions: ['scattered', 'overwhelmed'],
    initials: 'TM',
  },
  {
    id: 'st-padre-pio',
    name: 'St. Padre Pio',
    feastDay: 'September 23',
    bio: 'Capuchin friar who bore the stigmata for fifty years. Despite immense suffering, he counseled thousands with warmth and directness. His motto "Pray, hope, and don\'t worry" remains the simplest antidote to modern anxiety and overthinking.',
    virtues: ['trust', 'hope', 'surrender'],
    emotions: ['anxious', 'overwhelmed', 'grateful'],
    initials: 'PP',
  },
  {
    id: 'st-josemaria',
    name: 'St. Josemar\u{00ED}a Escriv\u{00E1}',
    feastDay: 'June 26',
    bio: 'Founder of Opus Dei who taught the sanctification of ordinary work. He showed that every task\u{2014}from filing reports to washing dishes\u{2014}can be offered to God, transforming monotonous routine into meaningful spiritual practice.',
    virtues: ['diligence', 'sanctification', 'joy'],
    emotions: ['scattered', 'joyful'],
    initials: 'JE',
  },
  {
    id: 'st-monica',
    name: 'St. Monica',
    feastDay: 'August 27',
    bio: 'Mother of St. Augustine who prayed with unwavering patience for her son\'s conversion for seventeen years. Her persistent hope through seemingly hopeless circumstances teaches the power of patient endurance and trust in God\'s timing.',
    virtues: ['patience', 'perseverance', 'hope'],
    emotions: ['anxious', 'grateful'],
    initials: 'SM',
  },
  {
    id: 'st-philip-neri',
    name: 'St. Philip Neri',
    feastDay: 'May 26',
    bio: 'The "Apostle of Rome" known for his infectious joy and holy humor. He used laughter and lightheartedness as spiritual tools, teaching that joy is a form of prayer and that taking ourselves too seriously blocks grace.',
    virtues: ['joy', 'humor', 'lightness'],
    emotions: ['joyful', 'overwhelmed', 'grateful'],
    initials: 'PN',
  },
  {
    id: 'st-teresa-avila',
    name: 'St. Teresa of \u{00C1}vila',
    feastDay: 'October 15',
    bio: 'Carmelite mystic and Doctor of the Church who reformed her order while managing chronic illness. Her "Interior Castle" maps the soul\'s journey to God, showing how to find still waters even amid life\'s most turbulent storms.',
    virtues: ['contemplation', 'courage', 'peace'],
    emotions: ['anxious', 'scattered', 'peaceful'],
    initials: 'TA',
  },
  {
    id: 'st-maximilian-kolbe',
    name: 'St. Maximilian Kolbe',
    feastDay: 'August 14',
    bio: 'Franciscan friar who volunteered to die in place of a stranger at Auschwitz. His radical self-giving in humanity\'s darkest hour proves that peace and purpose can exist even in impossible circumstances through total surrender to love.',
    virtues: ['courage', 'sacrifice', 'peace'],
    emotions: ['overwhelmed', 'peaceful', 'grateful'],
    initials: 'MK',
  },
  {
    id: 'st-gianna-molla',
    name: 'St. Gianna Beretta Molla',
    feastDay: 'April 28',
    bio: 'Modern Italian pediatrician, wife, and mother who balanced demanding career with family life. She proves that professional women can live deep faith practically, finding God not despite busy schedules but through purposeful presence in each moment.',
    virtues: ['balance', 'presence', 'dedication'],
    emotions: ['overwhelmed', 'scattered', 'grateful'],
    initials: 'GM',
  },
  {
    id: 'st-ignatius',
    name: 'St. Ignatius of Loyola',
    feastDay: 'July 31',
    bio: 'Founder of the Jesuits who developed the Spiritual Exercises after a cannonball shattered his leg and his vanity. His method of discernment teaches how to read interior movements, turning emotional chaos into clear-eyed spiritual decision-making.',
    virtues: ['discernment', 'focus', 'discipline'],
    emotions: ['scattered', 'joyful', 'peaceful'],
    initials: 'IL',
  },
];

// ── Micro-actions ─────────────────────────────────────────────────────

export const MICRO_ACTIONS: MicroAction[] = [
  // St. Benedict — overwhelmed, scattered
  { id: 'ma-1', saintId: 'st-benedict', emotion: 'overwhelmed', actionText: 'Try Ora et Labora today: work for 50 minutes, then pause for 2 minutes of quiet breathing. Repeat this rhythm 3 times. Let the rhythm replace the chaos.', estimatedMinutes: 10 },
  { id: 'ma-2', saintId: 'st-benedict', emotion: 'scattered', actionText: 'Write down your 3 most important tasks. Do them in order, one at a time. When tempted to multitask, whisper "one thing" and return to your list.', estimatedMinutes: 5 },

  // St. Th\u00e9r\u00e8se — joyful, grateful
  { id: 'ma-3', saintId: 'st-therese', emotion: 'joyful', actionText: 'Channel your joy into Th\u00e9r\u00e8se\'s "Little Way": do three tiny acts of hidden kindness today. Hold a door, leave an encouraging note, clean something that isn\'t yours. Let joy overflow in secret love.', estimatedMinutes: 10 },
  { id: 'ma-4', saintId: 'st-therese', emotion: 'grateful', actionText: 'Write a letter of gratitude to someone who shaped you\u2014a parent, teacher, friend. Th\u00e9r\u00e8se wrote that "the smallest act of pure love is of more value than all other works combined." Let gratitude become love on paper.', estimatedMinutes: 15 },

  // St. Francis de Sales — anxious, joyful
  { id: 'ma-5', saintId: 'st-francis-de-sales', emotion: 'anxious', actionText: 'Place your hand on your heart for 60 seconds. Breathe slowly and repeat: "Do not look forward to what may happen tomorrow. The same Father who cares for you today will care for you tomorrow."', estimatedMinutes: 5 },
  { id: 'ma-6', saintId: 'st-francis-de-sales', emotion: 'joyful', actionText: 'Carry your joy into your next conversation with radical gentleness. Francis de Sales said "A spoonful of honey catches more flies than a barrel of vinegar." Respond to everyone today with one extra degree of warmth.', estimatedMinutes: 5 },

  // St. Thomas More — scattered, overwhelmed
  { id: 'ma-7', saintId: 'st-thomas-more', emotion: 'scattered', actionText: 'Set a 15-minute timer. Work on one task with your phone in another room. When the timer rings, take 1 minute to close your eyes and breathe before deciding your next move.', estimatedMinutes: 15 },
  { id: 'ma-8', saintId: 'st-thomas-more', emotion: 'overwhelmed', actionText: 'Write a brief note of encouragement to a colleague who seems stressed. Thomas More lifted others even facing execution. A small kindness breaks the spell of self-focus.', estimatedMinutes: 10 },

  // St. Padre Pio — anxious, overwhelmed, grateful
  { id: 'ma-9', saintId: 'st-padre-pio', emotion: 'anxious', actionText: 'Write down your three biggest worries right now. For each one, write: "I cannot control this. I release it." Then physically tear up the paper. Let go of what you cannot hold.', estimatedMinutes: 10 },
  { id: 'ma-10', saintId: 'st-padre-pio', emotion: 'overwhelmed', actionText: 'Choose one task you\'ve been avoiding. Set a timer for just 5 minutes and start. Padre Pio said "Pray, hope, don\'t worry." Sometimes beginning is the prayer.', estimatedMinutes: 5 },
  { id: 'ma-25', saintId: 'st-padre-pio', emotion: 'grateful', actionText: 'Padre Pio said "Pray, hope, and don\'t worry." Take 5 minutes to list 10 specific things you\'re grateful for today\u2014not big things, small ones. The coffee, the light, a kind word. Let gratitude sharpen your vision.', estimatedMinutes: 5 },

  // St. Josemar\u00eda — scattered, joyful
  { id: 'ma-11', saintId: 'st-josemaria', emotion: 'scattered', actionText: 'Choose your most boring task today. Before starting, silently dedicate it to someone specific you love. Do the task with full attention as if it were a gift to them.', estimatedMinutes: 10 },
  { id: 'ma-12', saintId: 'st-josemaria', emotion: 'joyful', actionText: 'Sanctify your joy: pick one ordinary task today\u2014washing dishes, answering emails, commuting\u2014and do it with full presence and gratitude. Josemar\u00eda taught that all work, done with love, becomes holy. Let your joy make the mundane sacred.', estimatedMinutes: 10 },

  // St. Monica — anxious, grateful
  { id: 'ma-13', saintId: 'st-monica', emotion: 'anxious', actionText: 'Set a "worry window": allow yourself 5 minutes to fully worry about everything. Then close the window. Monica waited 17 years. You can set worry aside for the rest of today.', estimatedMinutes: 5 },
  { id: 'ma-14', saintId: 'st-monica', emotion: 'grateful', actionText: 'Think of someone whose growth you\'ve witnessed\u2014a child, a friend, a coworker. Send them a message telling them how far they\'ve come. Monica\'s decades of prayer were answered beyond her wildest hopes. Celebrate answered prayers.', estimatedMinutes: 10 },

  // St. Philip Neri — joyful, overwhelmed, grateful
  { id: 'ma-15', saintId: 'st-philip-neri', emotion: 'joyful', actionText: 'Spread your joy! Text three people something specific you appreciate about them. Philip Neri\'s infectious laughter transformed all of Rome. Your joy has the same power in your own corner of the world.', estimatedMinutes: 5 },
  { id: 'ma-16', saintId: 'st-philip-neri', emotion: 'overwhelmed', actionText: 'Take a 10-minute walk outside. Notice 3 beautiful things you pass\u2014a tree, a child laughing, light on a building. Philip Neri found God in Rome\'s streets. You can too.', estimatedMinutes: 10 },
  { id: 'ma-26', saintId: 'st-philip-neri', emotion: 'grateful', actionText: 'Philip Neri turned everything into a celebration. Find something ordinary in your day\u2014your lunch, your commute, a conversation\u2014and find genuine reasons to be delighted by it. Share your delight with someone nearby.', estimatedMinutes: 5 },

  // St. Teresa of \u00c1vila — anxious, scattered, peaceful
  { id: 'ma-17', saintId: 'st-teresa-avila', emotion: 'anxious', actionText: 'Find a quiet spot. Close your eyes for 3 minutes and imagine a peaceful room inside your heart. Teresa called this the "Interior Castle." Visit it when anxiety knocks.', estimatedMinutes: 5 },
  { id: 'ma-18', saintId: 'st-teresa-avila', emotion: 'scattered', actionText: 'Before your next task, spend 60 seconds in complete stillness. No phone, no planning\u2014just presence. Teresa taught that "God is also among the pots and pans." Be fully where you are.', estimatedMinutes: 5 },
  { id: 'ma-27', saintId: 'st-teresa-avila', emotion: 'peaceful', actionText: 'Your peace is a gift\u2014deepen it. Spend 10 minutes in Teresa\'s "Prayer of Quiet": sit in silence, not asking for anything, simply resting in God\'s presence. Let stillness expand into the rest of your day.', estimatedMinutes: 10 },

  // St. Maximilian Kolbe — overwhelmed, peaceful, grateful
  { id: 'ma-19', saintId: 'st-maximilian-kolbe', emotion: 'overwhelmed', actionText: 'Ask yourself: "What is one small thing I can do right now for someone else?" Then do it. Kolbe found freedom in the worst prison on earth by choosing love. Choose one act of love today.', estimatedMinutes: 10 },
  { id: 'ma-20', saintId: 'st-maximilian-kolbe', emotion: 'peaceful', actionText: 'You\'re in a good place\u2014extend it. Write a note of gratitude to someone who helped you recently. Let your peace flow outward. Kolbe\'s peace in Auschwitz calmed an entire cell block.', estimatedMinutes: 10 },
  { id: 'ma-28', saintId: 'st-maximilian-kolbe', emotion: 'grateful', actionText: 'Kolbe gave everything\u2014including his life\u2014freely. Today, give something away: your time, a possession, a compliment. Let gratitude transform into generosity. The most grateful heart is the most generous one.', estimatedMinutes: 10 },

  // St. Gianna Molla — overwhelmed, scattered, grateful
  { id: 'ma-21', saintId: 'st-gianna-molla', emotion: 'overwhelmed', actionText: 'Identify the one relationship that matters most today. Give that person 15 minutes of completely undivided attention\u2014no phone, no multitasking. Gianna showed that presence beats productivity.', estimatedMinutes: 15 },
  { id: 'ma-22', saintId: 'st-gianna-molla', emotion: 'scattered', actionText: 'Before switching tasks, take 3 deep breaths and ask: "What matters most right now?" Gianna balanced medicine and motherhood by being fully present in each role. Choose one role right now.', estimatedMinutes: 5 },
  { id: 'ma-29', saintId: 'st-gianna-molla', emotion: 'grateful', actionText: 'Gianna found holiness in the everyday\u2014in her patients, her children, her husband. Take 5 minutes to write down the names of 5 people you\'re grateful for and one specific reason for each. Then tell at least one of them.', estimatedMinutes: 10 },

  // St. Ignatius — scattered, joyful, peaceful
  { id: 'ma-23', saintId: 'st-ignatius', emotion: 'scattered', actionText: 'Try the Ignatian Examen: spend 5 minutes reviewing your morning. What moment gave you energy (consolation)? What drained you (desolation)? This afternoon, move toward consolation.', estimatedMinutes: 5 },
  { id: 'ma-24', saintId: 'st-ignatius', emotion: 'joyful', actionText: 'Ignatius taught that joy is a sign of the Holy Spirit. Spend 5 minutes in his Examen, but focus only on consolation: What brought you alive today? Who made you smile? Follow that thread. Let joy be your compass.', estimatedMinutes: 5 },
  { id: 'ma-30', saintId: 'st-ignatius', emotion: 'peaceful', actionText: 'Peace is discernment\'s foundation. Try Ignatius\'s "First Principle": ask yourself, "What am I most free to do right now?" Not obligated\u2014free. Act from that freedom. Ignatius said we\'re made "to praise, reverence, and serve." Let peace guide your service.', estimatedMinutes: 5 },
];

export function getMicroActionsForEmotion(saintId: string, emotion: Emotion): MicroAction[] {
  return MICRO_ACTIONS.filter((ma) => ma.saintId === saintId && ma.emotion === emotion);
}

export function getSaintsForEmotion(emotion: Emotion): Saint[] {
  return SAINTS.filter((s) => s.emotions.includes(emotion));
}

// Helper to find mood by ID
export function getMoodById(moodId: Mood): MoodOption | undefined {
  return MOODS.find(m => m.id === moodId);
}

// Helper to get legacy emotion from mood
export function getEmotionFromMood(moodId: Mood): Emotion {
  const mood = getMoodById(moodId);
  return mood?.legacyEmotion ?? 'peaceful';
}

// Get milestone for current streak
export function getMilestoneForStreak(streakCount: number): Milestone | null {
  if (streakCount >= 100) return MILESTONES['streak-100'];
  if (streakCount >= 50) return MILESTONES['streak-50'];
  if (streakCount >= 30) return MILESTONES['streak-30'];
  if (streakCount >= 14) return MILESTONES['streak-14'];
  if (streakCount >= 7) return MILESTONES['streak-7'];
  if (streakCount >= 3) return MILESTONES['streak-3'];
  if (streakCount >= 1) return MILESTONES['first-challenge'];
  return null;
}

// Check if streak is a milestone
export function isMilestoneStreak(streakCount: number): boolean {
  return [1, 3, 7, 14, 30, 50, 100].includes(streakCount);
}

// Get personalized greeting based on streak
export function getGreetingMessage(streakCount: number): string {
  if (streakCount === 0) {
    const messages = [
      "Today is the perfect day to start!",
      "Every saint started with day one!",
      "Your journey begins today!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
  if (streakCount === 1) return "Day one complete! Keep it going!";
  if (streakCount < 3) return "Building your streak!";
  if (streakCount < 7) return `You're on a ${streakCount}-day streak! 🔥`;
  if (streakCount === 7) return "One week strong! You're amazing! 💪";
  if (streakCount < 14) return `${streakCount} days! You're unstoppable!`;
  if (streakCount === 14) return "Two weeks! You're incredible! 🌟";
  if (streakCount < 30) return `${streakCount} days of excellence!`;
  if (streakCount === 30) return "A whole month! You're a legend! 👑";
  if (streakCount < 50) return `${streakCount} days! Keep shining!`;
  if (streakCount === 50) return "50 days! Absolutely amazing! ⭐";
  if (streakCount < 100) return `${streakCount} days! You're extraordinary!`;
  return "100+ days! Living like a saint! 🏆";
}
