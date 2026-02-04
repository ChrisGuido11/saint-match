import { Saint, MicroAction, Emotion, EmotionOption } from '../types';

export const EMOTIONS: EmotionOption[] = [
  { id: 'anxious', label: 'Anxious', emoji: '\u{1F630}', color: '#8B9D83' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '\u{1F4A8}', color: '#7B8FA3' },
  { id: 'scattered', label: 'Scattered', emoji: '\u{1F300}', color: '#9E8B83' },
  { id: 'impatient', label: 'Impatient', emoji: '\u{23F1}\u{FE0F}', color: '#D4735E' },
  { id: 'frustrated', label: 'Frustrated', emoji: '\u{1F624}', color: '#B8736B' },
  { id: 'peaceful', label: 'Peaceful', emoji: '\u{2728}', color: '#8BA89D' },
];

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
    emotions: ['impatient', 'frustrated'],
    initials: 'ST',
  },
  {
    id: 'st-francis-de-sales',
    name: 'St. Francis de Sales',
    feastDay: 'January 24',
    bio: 'Bishop of Geneva known for extraordinary gentleness. He taught that anxiety comes from desiring to be free from anxiety. His "Introduction to the Devout Life" shows how to cultivate calm through gentle self-acceptance and trust in Providence.',
    virtues: ['gentleness', 'calm', 'trust'],
    emotions: ['anxious', 'frustrated'],
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
    emotions: ['anxious', 'overwhelmed'],
    initials: 'PP',
  },
  {
    id: 'st-josemaria',
    name: 'St. Josemar\u{00ED}a Escriv\u{00E1}',
    feastDay: 'June 26',
    bio: 'Founder of Opus Dei who taught the sanctification of ordinary work. He showed that every task\u{2014}from filing reports to washing dishes\u{2014}can be offered to God, transforming monotonous routine into meaningful spiritual practice.',
    virtues: ['diligence', 'sanctification', 'joy'],
    emotions: ['scattered', 'frustrated'],
    initials: 'JE',
  },
  {
    id: 'st-monica',
    name: 'St. Monica',
    feastDay: 'August 27',
    bio: 'Mother of St. Augustine who prayed with unwavering patience for her son\'s conversion for seventeen years. Her persistent hope through seemingly hopeless circumstances teaches the power of patient endurance and trust in God\'s timing.',
    virtues: ['patience', 'perseverance', 'hope'],
    emotions: ['impatient', 'anxious'],
    initials: 'SM',
  },
  {
    id: 'st-philip-neri',
    name: 'St. Philip Neri',
    feastDay: 'May 26',
    bio: 'The "Apostle of Rome" known for his infectious joy and holy humor. He used laughter and lightheartedness as spiritual tools, teaching that joy is a form of prayer and that taking ourselves too seriously blocks grace.',
    virtues: ['joy', 'humor', 'lightness'],
    emotions: ['frustrated', 'overwhelmed'],
    initials: 'PN',
  },
  {
    id: 'st-teresa-avila',
    name: 'St. Teresa of \u{00C1}vila',
    feastDay: 'October 15',
    bio: 'Carmelite mystic and Doctor of the Church who reformed her order while managing chronic illness. Her "Interior Castle" maps the soul\'s journey to God, showing how to find still waters even amid life\'s most turbulent storms.',
    virtues: ['contemplation', 'courage', 'peace'],
    emotions: ['anxious', 'scattered'],
    initials: 'TA',
  },
  {
    id: 'st-maximilian-kolbe',
    name: 'St. Maximilian Kolbe',
    feastDay: 'August 14',
    bio: 'Franciscan friar who volunteered to die in place of a stranger at Auschwitz. His radical self-giving in humanity\'s darkest hour proves that peace and purpose can exist even in impossible circumstances through total surrender to love.',
    virtues: ['courage', 'sacrifice', 'peace'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'MK',
  },
  {
    id: 'st-gianna-molla',
    name: 'St. Gianna Beretta Molla',
    feastDay: 'April 28',
    bio: 'Modern Italian pediatrician, wife, and mother who balanced demanding career with family life. She proves that professional women can live deep faith practically, finding God not despite busy schedules but through purposeful presence in each moment.',
    virtues: ['balance', 'presence', 'dedication'],
    emotions: ['overwhelmed', 'scattered'],
    initials: 'GM',
  },
  {
    id: 'st-ignatius',
    name: 'St. Ignatius of Loyola',
    feastDay: 'July 31',
    bio: 'Founder of the Jesuits who developed the Spiritual Exercises after a cannonball shattered his leg and his vanity. His method of discernment teaches how to read interior movements, turning emotional chaos into clear-eyed spiritual decision-making.',
    virtues: ['discernment', 'focus', 'discipline'],
    emotions: ['scattered', 'impatient'],
    initials: 'IL',
  },
];

export const MICRO_ACTIONS: MicroAction[] = [
  // St. Benedict - overwhelmed, scattered
  { id: 'ma-1', saintId: 'st-benedict', emotion: 'overwhelmed', actionText: 'Try Ora et Labora today: work for 50 minutes, then pause for 2 minutes of quiet breathing. Repeat this rhythm 3 times. Let the rhythm replace the chaos.', estimatedMinutes: 10 },
  { id: 'ma-2', saintId: 'st-benedict', emotion: 'scattered', actionText: 'Write down your 3 most important tasks. Do them in order, one at a time. When tempted to multitask, whisper "one thing" and return to your list.', estimatedMinutes: 5 },

  // St. Therese - impatient, frustrated
  { id: 'ma-3', saintId: 'st-therese', emotion: 'impatient', actionText: 'The next time you wait today\u{2014}in line, on hold, in traffic\u{2014}silently offer that wait for someone you love. Turn dead time into a small gift of love.', estimatedMinutes: 5 },
  { id: 'ma-4', saintId: 'st-therese', emotion: 'frustrated', actionText: 'Do one invisible act of kindness: hold a door without being noticed, clean something that isn\'t yours, or compliment someone behind their back. Make it small and hidden.', estimatedMinutes: 5 },

  // St. Francis de Sales - anxious, frustrated
  { id: 'ma-5', saintId: 'st-francis-de-sales', emotion: 'anxious', actionText: 'Place your hand on your heart for 60 seconds. Breathe slowly and repeat: "Do not look forward to what may happen tomorrow. The same Father who cares for you today will care for you tomorrow."', estimatedMinutes: 5 },
  { id: 'ma-6', saintId: 'st-francis-de-sales', emotion: 'frustrated', actionText: 'Before your next difficult conversation, pause for 10 seconds and choose your gentlest tone. Respond to irritation with one degree more warmth than you feel. Just one degree.', estimatedMinutes: 5 },

  // St. Thomas More - scattered, overwhelmed
  { id: 'ma-7', saintId: 'st-thomas-more', emotion: 'scattered', actionText: 'Set a 15-minute timer. Work on one task with your phone in another room. When the timer rings, take 1 minute to close your eyes and breathe before deciding your next move.', estimatedMinutes: 15 },
  { id: 'ma-8', saintId: 'st-thomas-more', emotion: 'overwhelmed', actionText: 'Write a brief note of encouragement to a colleague who seems stressed. Thomas More lifted others even facing execution. A small kindness breaks the spell of self-focus.', estimatedMinutes: 10 },

  // St. Padre Pio - anxious, overwhelmed
  { id: 'ma-9', saintId: 'st-padre-pio', emotion: 'anxious', actionText: 'Write down your three biggest worries right now. For each one, write: "I cannot control this. I release it." Then physically tear up the paper. Let go of what you cannot hold.', estimatedMinutes: 10 },
  { id: 'ma-10', saintId: 'st-padre-pio', emotion: 'overwhelmed', actionText: 'Choose one task you\'ve been avoiding. Set a timer for just 5 minutes and start. Padre Pio said "Pray, hope, don\'t worry." Sometimes beginning is the prayer.', estimatedMinutes: 5 },

  // St. Josemaria - scattered, frustrated
  { id: 'ma-11', saintId: 'st-josemaria', emotion: 'scattered', actionText: 'Choose your most boring task today. Before starting, silently dedicate it to someone specific you love. Do the task with full attention as if it were a gift to them.', estimatedMinutes: 10 },
  { id: 'ma-12', saintId: 'st-josemaria', emotion: 'frustrated', actionText: 'The next time frustration rises, pause and find one thing to be genuinely grateful for in this exact moment. Not in general\u{2014}right now, in this situation. Name it aloud.', estimatedMinutes: 5 },

  // St. Monica - impatient, anxious
  { id: 'ma-13', saintId: 'st-monica', emotion: 'impatient', actionText: 'Think of one situation where you\'re waiting for change in someone else. Write them a text of pure encouragement\u{2014}no advice, no hints. Just genuine love. Then let go of the timeline.', estimatedMinutes: 10 },
  { id: 'ma-14', saintId: 'st-monica', emotion: 'anxious', actionText: 'Set a "worry window": allow yourself 5 minutes to fully worry about everything. Then close the window. Monica waited 17 years. You can set worry aside for the rest of today.', estimatedMinutes: 5 },

  // St. Philip Neri - frustrated, overwhelmed
  { id: 'ma-15', saintId: 'st-philip-neri', emotion: 'frustrated', actionText: 'Find something absurd or funny in your current frustration. Text a friend about it. Philip Neri said "A joyful heart is more easily made perfect." Let laughter crack the tension.', estimatedMinutes: 5 },
  { id: 'ma-16', saintId: 'st-philip-neri', emotion: 'overwhelmed', actionText: 'Take a 10-minute walk outside. Notice 3 beautiful things you pass\u{2014}a tree, a child laughing, light on a building. Philip Neri found God in Rome\'s streets. You can too.', estimatedMinutes: 10 },

  // St. Teresa of Avila - anxious, scattered
  { id: 'ma-17', saintId: 'st-teresa-avila', emotion: 'anxious', actionText: 'Find a quiet spot. Close your eyes for 3 minutes and imagine a peaceful room inside your heart. Teresa called this the "Interior Castle." Visit it when anxiety knocks.', estimatedMinutes: 5 },
  { id: 'ma-18', saintId: 'st-teresa-avila', emotion: 'scattered', actionText: 'Before your next task, spend 60 seconds in complete stillness. No phone, no planning\u{2014}just presence. Teresa taught that "God is also among the pots and pans." Be fully where you are.', estimatedMinutes: 5 },

  // St. Maximilian Kolbe - overwhelmed, peaceful
  { id: 'ma-19', saintId: 'st-maximilian-kolbe', emotion: 'overwhelmed', actionText: 'Ask yourself: "What is one small thing I can do right now for someone else?" Then do it. Kolbe found freedom in the worst prison on earth by choosing love. Choose one act of love today.', estimatedMinutes: 10 },
  { id: 'ma-20', saintId: 'st-maximilian-kolbe', emotion: 'peaceful', actionText: 'You\'re in a good place\u{2014}extend it. Write a note of gratitude to someone who helped you recently. Let your peace flow outward. Kolbe\'s peace in Auschwitz calmed an entire cell block.', estimatedMinutes: 10 },

  // St. Gianna Molla - overwhelmed, scattered
  { id: 'ma-21', saintId: 'st-gianna-molla', emotion: 'overwhelmed', actionText: 'Identify the one relationship that matters most today. Give that person 15 minutes of completely undivided attention\u{2014}no phone, no multitasking. Gianna showed that presence beats productivity.', estimatedMinutes: 15 },
  { id: 'ma-22', saintId: 'st-gianna-molla', emotion: 'scattered', actionText: 'Before switching tasks, take 3 deep breaths and ask: "What matters most right now?" Gianna balanced medicine and motherhood by being fully present in each role. Choose one role right now.', estimatedMinutes: 5 },

  // St. Ignatius - scattered, impatient
  { id: 'ma-23', saintId: 'st-ignatius', emotion: 'scattered', actionText: 'Try the Ignatian Examen: spend 5 minutes reviewing your morning. What moment gave you energy (consolation)? What drained you (desolation)? This afternoon, move toward consolation.', estimatedMinutes: 5 },
  { id: 'ma-24', saintId: 'st-ignatius', emotion: 'impatient', actionText: 'Before making your next decision today, pause for 30 seconds. Ask: "Am I rushing from anxiety or moving from clarity?" Ignatius taught that good spirits bring peace, not pressure. Choose peace.', estimatedMinutes: 5 },
];

export function getMicroActionsForEmotion(saintId: string, emotion: Emotion): MicroAction[] {
  return MICRO_ACTIONS.filter((ma) => ma.saintId === saintId && ma.emotion === emotion);
}

export function getSaintsForEmotion(emotion: Emotion): Saint[] {
  return SAINTS.filter((s) => s.emotions.includes(emotion));
}
