import { Saint, MicroAction, Emotion, MoodOption, Mood, Milestone, MilestoneType } from '../types';

// ── Mood options (reframed for positivity: 3 support + 3 growth) ─────────────────
// Each mood maps to a legacy emotion for saint matching while providing uplifting language

export const MOODS: MoodOption[] = [
  // Support — reframed as growth opportunities
  { 
    id: 'seeking-peace', 
    label: 'Seeking Peace', 
    subtitle: 'Find calm within', 
    emoji: '', // Icons defined in components/icons
    color: '#8BA8A0',
    category: 'support',
    legacyEmotion: 'anxious'
  },
  { 
    id: 'need-focus', 
    label: 'Need Focus', 
    subtitle: 'Center your energy', 
    emoji: '',
    color: '#7B8FA3',
    category: 'support',
    legacyEmotion: 'scattered'
  },
  { 
    id: 'want-to-grow', 
    label: 'Want to Grow', 
    subtitle: 'Build inner strength', 
    emoji: '',
    color: '#9E8B83',
    category: 'support',
    legacyEmotion: 'overwhelmed'
  },
  // Growth — celebrate and amplify the good
  { 
    id: 'feeling-grateful', 
    label: 'Feeling Grateful', 
    subtitle: 'Share your gratitude', 
    emoji: '',
    color: '#C49A6C',
    category: 'growth',
    legacyEmotion: 'grateful'
  },
  { 
    id: 'full-of-joy', 
    label: 'Full of Joy', 
    subtitle: 'Spread the light', 
    emoji: '',
    color: '#D4A85E',
    category: 'growth',
    legacyEmotion: 'joyful'
  },
  { 
    id: 'ready-to-serve', 
    label: 'Ready to Serve', 
    subtitle: 'Give to others', 
    emoji: '',
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
  // ── Original 12 Saints ──────────────────────────────────────────────
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

  // ── Early Church & Apostolic Era (1st\u{2013}5th century) ───────────────────
  {
    id: 'st-joseph',
    name: 'St. Joseph',
    feastDay: 'March 19',
    bio: 'Foster father of Jesus and husband of Mary, a humble carpenter who said yes to God\'s extraordinary plan without a single recorded word in Scripture. His quiet faithfulness in uncertainty makes him the patron of a peaceful heart.',
    virtues: ['faithfulness', 'humility', 'trust'],
    emotions: ['peaceful', 'grateful'],
    initials: 'SJ',
  },
  {
    id: 'st-peter',
    name: 'St. Peter the Apostle',
    feastDay: 'June 29',
    bio: 'A fisherman who became the rock of the Church despite sinking in doubt and denying Christ three times. His story proves that anxiety and failure don\'t disqualify us\u{2014}God builds on broken foundations.',
    virtues: ['courage', 'repentance', 'leadership'],
    emotions: ['anxious', 'overwhelmed'],
    initials: 'SP',
  },
  {
    id: 'st-paul',
    name: 'St. Paul the Apostle',
    feastDay: 'June 29',
    bio: 'Once a violent persecutor of Christians, Paul\'s dramatic conversion on the road to Damascus redirected his fierce energy into building the early Church across the Mediterranean. He wrote half the New Testament while shipwrecked, imprisoned, and hunted.',
    virtues: ['zeal', 'perseverance', 'transformation'],
    emotions: ['scattered', 'joyful'],
    initials: 'PA',
  },
  {
    id: 'st-augustine',
    name: 'St. Augustine of Hippo',
    feastDay: 'August 28',
    bio: 'Brilliant North African theologian who spent years scattered between philosophies, relationships, and restless searching before his famous prayer: "Our hearts are restless until they rest in You." His Confessions remain the West\'s first great autobiography.',
    virtues: ['wisdom', 'conversion', 'honesty'],
    emotions: ['scattered', 'anxious'],
    initials: 'AH',
  },
  {
    id: 'st-ambrose',
    name: 'St. Ambrose of Milan',
    feastDay: 'December 7',
    bio: 'Roman governor who was acclaimed bishop by the crowd before he was even baptized. He navigated impossible political pressures with calm authority, once barring an emperor from church until he repented. Grace under pressure personified.',
    virtues: ['authority', 'wisdom', 'steadfastness'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'AM',
  },
  {
    id: 'st-john-chrysostom',
    name: 'St. John Chrysostom',
    feastDay: 'September 13',
    bio: 'Called "Golden Mouth" for his electrifying preaching, this Archbishop of Constantinople used words to comfort the suffering and challenge the powerful. Exiled twice for speaking truth, he never lost his joy or his voice.',
    virtues: ['eloquence', 'courage', 'joy'],
    emotions: ['overwhelmed', 'joyful'],
    initials: 'JC',
  },
  {
    id: 'st-perpetua',
    name: 'St. Perpetua',
    feastDay: 'March 7',
    bio: 'A young North African noblewoman and new mother who faced martyrdom in the arena at Carthage in 203 AD. Her prison diary reveals raw human fear transformed into supernatural peace\u{2014}one of the earliest Christian women\'s writings we possess.',
    virtues: ['courage', 'faith', 'serenity'],
    emotions: ['anxious', 'peaceful'],
    initials: 'PE',
  },
  {
    id: 'st-cecilia',
    name: 'St. Cecilia',
    feastDay: 'November 22',
    bio: 'Roman martyr and patron of musicians who sang to God in her heart even during her forced marriage and eventual martyrdom. Her story teaches that interior joy cannot be silenced by external circumstances\u{2014}the soul always has a song.',
    virtues: ['joy', 'purity', 'devotion'],
    emotions: ['joyful', 'peaceful'],
    initials: 'SC',
  },
  {
    id: 'st-agnes',
    name: 'St. Agnes of Rome',
    feastDay: 'January 21',
    bio: 'A thirteen-year-old Roman girl who chose martyrdom over compromise in 304 AD. Her extraordinary courage at such a young age demonstrates that peace comes not from the absence of danger but from clarity of purpose and trust in God.',
    virtues: ['purity', 'courage', 'peace'],
    emotions: ['anxious', 'peaceful'],
    initials: 'AG',
  },
  {
    id: 'st-athanasius',
    name: 'St. Athanasius',
    feastDay: 'May 2',
    bio: 'Bishop of Alexandria who was exiled five times for defending Christian orthodoxy against the Arian heresy. Known as "Athanasius contra mundum" (against the world), he proved that standing firm amid chaos is itself a form of clarity.',
    virtues: ['perseverance', 'clarity', 'conviction'],
    emotions: ['overwhelmed', 'scattered'],
    initials: 'AT',
  },

  // ── Medieval Era (6th\u{2013}15th century) ──────────────────────────────────
  {
    id: 'st-francis-assisi',
    name: 'St. Francis of Assisi',
    feastDay: 'October 4',
    bio: 'The wealthy merchant\'s son who stripped himself of everything to embrace Lady Poverty and found perfect joy. He preached to birds, befriended a wolf, and received the stigmata. His radical simplicity remains the antidote to modern excess.',
    virtues: ['simplicity', 'joy', 'compassion'],
    emotions: ['joyful', 'grateful', 'peaceful'],
    initials: 'FA',
  },
  {
    id: 'st-clare-assisi',
    name: 'St. Clare of Assisi',
    feastDay: 'August 11',
    bio: 'Inspired by Francis, Clare left her noble family to found the Poor Clares, embracing radical poverty and contemplative prayer. She once repelled invaders simply by holding up the Blessed Sacrament\u{2014}proving the power of stillness over force.',
    virtues: ['contemplation', 'poverty', 'strength'],
    emotions: ['peaceful', 'grateful'],
    initials: 'CA',
  },
  {
    id: 'st-dominic',
    name: 'St. Dominic',
    feastDay: 'August 8',
    bio: 'Spanish priest who founded the Order of Preachers (Dominicans) to combat heresy through education rather than force. He walked barefoot across Europe, debating with joy and charity, proving that truth is best served with warmth, not weapons.',
    virtues: ['truth', 'charity', 'preaching'],
    emotions: ['scattered', 'joyful'],
    initials: 'SD',
  },
  {
    id: 'st-thomas-aquinas',
    name: 'St. Thomas Aquinas',
    feastDay: 'January 28',
    bio: 'The "Angelic Doctor" who synthesized faith and reason in his monumental Summa Theologica. Nicknamed "the dumb ox" by classmates for his quiet demeanor, his methodical thinking brought order to the most complex theological questions of his age.',
    virtues: ['wisdom', 'order', 'humility'],
    emotions: ['scattered', 'overwhelmed'],
    initials: 'TQ',
  },
  {
    id: 'st-catherine-siena',
    name: 'St. Catherine of Siena',
    feastDay: 'April 29',
    bio: 'An illiterate dyer\'s daughter who became a Doctor of the Church and advisor to popes. She nursed plague victims, brokered peace between warring cities, and convinced the Pope to return to Rome\u{2014}all while battling her own spiritual darkness.',
    virtues: ['courage', 'mysticism', 'action'],
    emotions: ['anxious', 'overwhelmed'],
    initials: 'CS',
  },
  {
    id: 'st-hildegard',
    name: 'St. Hildegard of Bingen',
    feastDay: 'September 17',
    bio: 'A twelfth-century Benedictine abbess, composer, herbalist, theologian, and visionary\u{2014}one of history\'s great polymaths. She channeled her boundless creativity into music, medicine, and mysticism, showing that a scattered mind simply needs the right channels.',
    virtues: ['creativity', 'wisdom', 'vision'],
    emotions: ['scattered', 'joyful'],
    initials: 'HB',
  },
  {
    id: 'st-bernard-clairvaux',
    name: 'St. Bernard of Clairvaux',
    feastDay: 'August 20',
    bio: 'Cistercian monk and Doctor of the Church whose writings on divine love remain among Christianity\'s most tender. He taught that anxiety melts in the warmth of God\'s love, writing: "You wish to see; listen. Hearing is a step toward vision."',
    virtues: ['love', 'contemplation', 'eloquence'],
    emotions: ['anxious', 'peaceful'],
    initials: 'BC',
  },
  {
    id: 'st-anthony-padua',
    name: 'St. Anthony of Padua',
    feastDay: 'June 13',
    bio: 'Portuguese Franciscan friar and Doctor of the Church, famous for finding lost things\u{2014}but his real gift was finding lost people. His powerful preaching drew thousands back from confusion and despair to clarity and hope.',
    virtues: ['wisdom', 'compassion', 'clarity'],
    emotions: ['anxious', 'scattered'],
    initials: 'AP',
  },
  {
    id: 'st-scholastica',
    name: 'St. Scholastica',
    feastDay: 'February 10',
    bio: 'Twin sister of St. Benedict and founder of women\'s Benedictine monasticism. When her brother tried to leave their last conversation early, her prayer summoned a storm that kept him there. She knew that love is always worth more than schedules.',
    virtues: ['prayer', 'love', 'devotion'],
    emotions: ['peaceful', 'grateful'],
    initials: 'SS',
  },
  {
    id: 'st-bonaventure',
    name: 'St. Bonaventure',
    feastDay: 'July 15',
    bio: 'Franciscan theologian and "Seraphic Doctor" who mapped the soul\'s journey to God through creation, memory, and contemplation. He showed that intellectual work and mystical prayer are not opposites but companions on the path to truth.',
    virtues: ['contemplation', 'wisdom', 'simplicity'],
    emotions: ['scattered', 'peaceful'],
    initials: 'BO',
  },
  {
    id: 'st-brigid-ireland',
    name: 'St. Brigid of Ireland',
    feastDay: 'February 1',
    bio: 'Fifth-century Irish abbess who founded the great monastery of Kildare and became one of Ireland\'s patron saints. Known for extraordinary generosity\u{2014}legend says she once turned water into beer for a leper colony. Her joy was contagious and practical.',
    virtues: ['generosity', 'joy', 'hospitality'],
    emotions: ['joyful', 'peaceful'],
    initials: 'BI',
  },
  {
    id: 'st-patrick',
    name: 'St. Patrick',
    feastDay: 'March 17',
    bio: 'Kidnapped from Britain as a teen and enslaved in Ireland for six years, Patrick returned as a missionary bishop to the land of his captivity. He transformed his trauma into purpose, converting an entire nation through courage and forgiveness.',
    virtues: ['forgiveness', 'courage', 'mission'],
    emotions: ['anxious', 'joyful'],
    initials: 'PK',
  },

  // ── Counter-Reformation & Early Modern (16th\u{2013}18th century) ────────────
  {
    id: 'st-john-cross',
    name: 'St. John of the Cross',
    feastDay: 'December 14',
    bio: 'Carmelite mystic and poet who described the soul\'s passage through the "Dark Night" toward union with God. Imprisoned by his own religious order, he wrote some of history\'s most beautiful poetry in a tiny cell. Darkness became his teacher.',
    virtues: ['contemplation', 'endurance', 'faith'],
    emotions: ['anxious', 'peaceful'],
    initials: 'JX',
  },
  {
    id: 'st-rose-lima',
    name: 'St. Rose of Lima',
    feastDay: 'August 23',
    bio: 'First saint of the Americas, a Peruvian laywoman who lived extreme penance while caring for the sick and poor of Lima. She built a room in her family\'s home to nurse the destitute, showing that holiness blooms wherever you\'re planted.',
    virtues: ['charity', 'penance', 'compassion'],
    emotions: ['overwhelmed', 'grateful'],
    initials: 'RL',
  },
  {
    id: 'st-martin-de-porres',
    name: 'St. Martin de Porres',
    feastDay: 'November 3',
    bio: 'Mixed-race Dominican lay brother in colonial Peru who became the city\'s beloved healer, caring for the sick, feeding the poor, and even tending to stray animals. He turned the pain of racial discrimination into boundless, joyful compassion for all creatures.',
    virtues: ['charity', 'humility', 'healing'],
    emotions: ['joyful', 'peaceful', 'grateful'],
    initials: 'MP',
  },
  {
    id: 'st-francis-xavier',
    name: 'St. Francis Xavier',
    feastDay: 'December 3',
    bio: 'One of the original Jesuits who traveled from Europe to India, Southeast Asia, and Japan\u{2014}baptizing thousands and learning multiple languages. When the scale of the mission overwhelmed him, he simply started with the person in front of him.',
    virtues: ['zeal', 'adaptability', 'courage'],
    emotions: ['overwhelmed', 'joyful'],
    initials: 'FX',
  },
  {
    id: 'st-charles-borromeo',
    name: 'St. Charles Borromeo',
    feastDay: 'November 4',
    bio: 'Cardinal Archbishop of Milan who reformed his enormous diocese during the chaos of the Counter-Reformation and a devastating plague. He sold his family\'s wealth to feed the poor, proving that overwhelming responsibility is best met with systematic compassion.',
    virtues: ['reform', 'charity', 'organization'],
    emotions: ['overwhelmed', 'scattered'],
    initials: 'CB',
  },
  {
    id: 'st-robert-bellarmine',
    name: 'St. Robert Bellarmine',
    feastDay: 'September 17',
    bio: 'Jesuit cardinal and Doctor of the Church who was the Catholic Church\'s foremost intellectual during the Reformation debates. Despite intense controversy, he maintained clarity of thought and gentleness of manner, writing systematic theology with pastoral warmth.',
    virtues: ['clarity', 'gentleness', 'learning'],
    emotions: ['scattered', 'peaceful'],
    initials: 'RB',
  },
  {
    id: 'st-louise-de-marillac',
    name: 'St. Louise de Marillac',
    feastDay: 'March 15',
    bio: 'Co-founder of the Daughters of Charity with St. Vincent de Paul. After years of depression and spiritual crisis, she channeled her suffering into organizing care for the poorest of Paris\u{2014}proving that those who\'ve known darkness serve the suffering best.',
    virtues: ['service', 'resilience', 'organization'],
    emotions: ['overwhelmed', 'grateful'],
    initials: 'LM',
  },
  {
    id: 'st-vincent-de-paul',
    name: 'St. Vincent de Paul',
    feastDay: 'September 27',
    bio: 'Once a peasant boy who became the great organizer of charity in 17th-century France, founding the Vincentians and co-founding the Daughters of Charity. His genius was making compassion systematic\u{2014}not just feeling for the poor but building institutions to serve them.',
    virtues: ['charity', 'humility', 'practicality'],
    emotions: ['grateful', 'joyful'],
    initials: 'VP',
  },
  {
    id: 'st-jane-de-chantal',
    name: 'St. Jane Frances de Chantal',
    feastDay: 'August 12',
    bio: 'French noblewoman who endured her husband\'s death, crippling anxiety, and family opposition to found the Visitation Order with St. Francis de Sales. She taught that gentleness with our own anxious hearts is the beginning of all peace.',
    virtues: ['gentleness', 'courage', 'perseverance'],
    emotions: ['anxious', 'peaceful'],
    initials: 'JD',
  },
  {
    id: 'st-alphonsus-liguori',
    name: 'St. Alphonsus Liguori',
    feastDay: 'August 1',
    bio: 'Brilliant Neapolitan lawyer who left his practice after losing a case to become a priest, founding the Redemptorists. He struggled with severe scrupulosity (religious anxiety) his entire life, making him the most compassionate moral theologian in Church history.',
    virtues: ['compassion', 'perseverance', 'mercy'],
    emotions: ['anxious', 'grateful'],
    initials: 'AL',
  },

  // ── 18th\u{2013}19th Century ────────────────────────────────────────────────
  {
    id: 'st-elizabeth-seton',
    name: 'St. Elizabeth Ann Seton',
    feastDay: 'January 4',
    bio: 'First American-born saint\u{2014}a wealthy New York socialite who lost her husband, her fortune, and her social standing when she converted to Catholicism. She founded the first free Catholic school in America, turning personal devastation into national transformation.',
    virtues: ['resilience', 'education', 'faith'],
    emotions: ['overwhelmed', 'grateful'],
    initials: 'ES',
  },
  {
    id: 'st-john-bosco',
    name: 'St. John Bosco',
    feastDay: 'January 31',
    bio: 'Italian priest who rescued street children in industrial Turin through education, play, and unconditional love. He invented the "preventive system"\u{2014}winning hearts through kindness rather than punishment. His oratory was part school, part playground, part church.',
    virtues: ['joy', 'education', 'kindness'],
    emotions: ['joyful', 'scattered'],
    initials: 'JB',
  },
  {
    id: 'st-bernadette',
    name: 'St. Bernadette Soubirous',
    feastDay: 'April 16',
    bio: 'A sickly, impoverished French girl to whom Our Lady appeared at Lourdes eighteen times in 1858. Despite fame, scrutiny, and chronic illness, she remained disarmingly simple, saying: "My job is to be sick." Her peace was not the world\'s peace.',
    virtues: ['simplicity', 'obedience', 'humility'],
    emotions: ['anxious', 'peaceful'],
    initials: 'BS',
  },
  {
    id: 'st-john-vianney',
    name: 'St. John Vianney',
    feastDay: 'August 4',
    bio: 'The Cur\u{00E9} of Ars who nearly failed seminary due to poor academics but became France\'s greatest confessor. He spent 16 hours a day hearing confessions, transforming a tiny village into a pilgrimage destination through sheer holiness and availability.',
    virtues: ['perseverance', 'compassion', 'humility'],
    emotions: ['overwhelmed', 'anxious'],
    initials: 'JV',
  },
  {
    id: 'st-damien-molokai',
    name: 'St. Damien of Molokai',
    feastDay: 'May 10',
    bio: 'Belgian priest who volunteered to serve the leper colony on Molokai, Hawaii, eventually contracting and dying of the disease himself. He built homes, churches, and coffins with his own hands\u{2014}proving that presence is the ultimate medicine.',
    virtues: ['sacrifice', 'presence', 'courage'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'DM',
  },
  {
    id: 'st-katherine-drexel',
    name: 'St. Katherine Drexel',
    feastDay: 'March 3',
    bio: 'Heiress to a Philadelphia banking fortune who gave away $20 million to found schools for Native Americans and African Americans across the United States. When told to pray for the poor, the Pope replied: "Why don\'t YOU do something about it?"',
    virtues: ['generosity', 'justice', 'courage'],
    emotions: ['overwhelmed', 'joyful'],
    initials: 'KD',
  },
  {
    id: 'st-andre-bessette',
    name: 'St. Andr\u{00E9} Bessette',
    feastDay: 'January 6',
    bio: 'A tiny, sickly French-Canadian brother who served as doorkeeper at a Montreal college for forty years. Through quiet prayer to St. Joseph, thousands reported healings. He built St. Joseph\'s Oratory\u{2014}proof that small faithfulness produces enormous fruit.',
    virtues: ['humility', 'prayer', 'perseverance'],
    emotions: ['grateful', 'peaceful'],
    initials: 'AB',
  },
  {
    id: 'st-josephine-bakhita',
    name: 'St. Josephine Bakhita',
    feastDay: 'February 8',
    bio: 'Kidnapped from Sudan as a child and sold into slavery multiple times, Bakhita endured years of brutal treatment before finding freedom and faith in Italy. She became a Canossian sister, radiating a joy that stunned everyone who knew her history.',
    virtues: ['forgiveness', 'hope', 'joy'],
    emotions: ['anxious', 'grateful', 'joyful'],
    initials: 'JK',
  },
  {
    id: 'st-frances-cabrini',
    name: 'St. Frances Xavier Cabrini',
    feastDay: 'November 13',
    bio: 'First US citizen to be canonized\u{2014}an Italian nun who dreamed of China but was sent to New York instead. She founded 67 institutions across the Americas for immigrants and orphans, organizing with ferocious efficiency. Patron saint of getting things done.',
    virtues: ['determination', 'charity', 'adaptability'],
    emotions: ['overwhelmed', 'scattered'],
    initials: 'FC',
  },
  {
    id: 'st-isidore-farmer',
    name: 'St. Isidore the Farmer',
    feastDay: 'May 15',
    bio: 'A medieval Spanish farm laborer whose entire sanctity consisted of faithful daily work and prayer. Legend says angels plowed his fields while he prayed. Patron of farmers and ordinary workers, he proves that holiness lives in routine faithfulness.',
    virtues: ['faithfulness', 'simplicity', 'prayer'],
    emotions: ['peaceful', 'grateful'],
    initials: 'IF',
  },

  // ── 20th Century & Modern ───────────────────────────────────────────
  {
    id: 'st-edith-stein',
    name: 'St. Edith Stein',
    feastDay: 'August 9',
    bio: 'Brilliant Jewish-German philosopher who converted to Catholicism, became a Carmelite nun (Teresa Benedicta of the Cross), and was killed at Auschwitz. She wrote that true peace comes from letting go of our need to control the future.',
    virtues: ['wisdom', 'courage', 'faith'],
    emotions: ['anxious', 'peaceful'],
    initials: 'ET',
  },
  {
    id: 'st-faustina',
    name: 'St. Faustina Kowalska',
    feastDay: 'October 5',
    bio: 'Polish nun who received visions of Jesus and recorded them in her diary, spreading the message of Divine Mercy worldwide. She battled severe anxiety and self-doubt yet wrote: "Jesus, I trust in You"\u{2014}not because fear vanished but because trust was chosen.',
    virtues: ['mercy', 'trust', 'obedience'],
    emotions: ['anxious', 'grateful'],
    initials: 'FK',
  },
  {
    id: 'st-oscar-romero',
    name: 'St. Oscar Romero',
    feastDay: 'March 24',
    bio: 'Archbishop of San Salvador who began as a quiet, bookish priest but was transformed by witnessing his people\'s suffering into the voice of the voiceless. Assassinated while saying Mass in 1980, his courage grew from love, not fearlessness.',
    virtues: ['justice', 'courage', 'compassion'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'OR',
  },
  {
    id: 'st-pier-giorgio',
    name: 'Bl. Pier Giorgio Frassati',
    feastDay: 'July 4',
    bio: 'Wealthy Italian university student who secretly gave away everything to the poor while mountain climbing, skiing, and enjoying life with infectious enthusiasm. He died at 24 of polio caught from the sick he served. "To the heights!" was his motto.',
    virtues: ['generosity', 'joy', 'adventure'],
    emotions: ['joyful', 'grateful'],
    initials: 'PG',
  },
  {
    id: 'bl-carlo-acutis',
    name: 'Bl. Carlo Acutis',
    feastDay: 'October 12',
    bio: 'Italian teenager who used his programming skills to document Eucharistic miracles worldwide before dying of leukemia at 15 in 2006. He said "the Eucharist is my highway to heaven" and warned that "everyone is born an original but many die as photocopies."',
    virtues: ['creativity', 'faith', 'originality'],
    emotions: ['joyful', 'scattered'],
    initials: 'CC',
  },
  {
    id: 'st-teresa-calcutta',
    name: 'St. Teresa of Calcutta',
    feastDay: 'September 5',
    bio: 'Albanian nun who founded the Missionaries of Charity to serve the "poorest of the poor" in Kolkata. Her private letters revealed decades of spiritual darkness, yet she served with radiant love\u{2014}proving that faithfulness matters more than feelings.',
    virtues: ['charity', 'perseverance', 'humility'],
    emotions: ['overwhelmed', 'peaceful', 'grateful'],
    initials: 'TC',
  },
  {
    id: 'st-john-paul-ii',
    name: 'St. John Paul II',
    feastDay: 'October 22',
    bio: 'Polish pope who survived Nazi occupation, Communist oppression, and an assassination attempt to become one of history\'s most traveled world leaders. His message "Be not afraid!" wasn\'t denial of danger but a declaration of where ultimate safety lies.',
    virtues: ['courage', 'joy', 'forgiveness'],
    emotions: ['joyful', 'anxious'],
    initials: 'JP',
  },
  {
    id: 'bl-solanus-casey',
    name: 'Bl. Solanus Casey',
    feastDay: 'July 30',
    bio: 'American Capuchin friar from Wisconsin who was considered too simple for full priestly duties and assigned to be a doorkeeper. Thousands sought his counsel anyway. He played violin, loved baseball, and radiated a peace that transcended his humble station.',
    virtues: ['humility', 'patience', 'peace'],
    emotions: ['peaceful', 'grateful'],
    initials: 'SY',
  },
  {
    id: 'st-kateri',
    name: 'St. Kateri Tekakwitha',
    feastDay: 'July 14',
    bio: 'First Native American saint\u{2014}a Mohawk-Algonquin woman who converted to Christianity despite fierce opposition from her tribe. Scarred by smallpox and ostracized by her community, she found in prayer a peace that transcended all her suffering.',
    virtues: ['courage', 'prayer', 'perseverance'],
    emotions: ['anxious', 'peaceful'],
    initials: 'KT',
  },

  // ── Global Saints ───────────────────────────────────────────────────
  {
    id: 'st-juan-diego',
    name: 'St. Juan Diego',
    feastDay: 'December 9',
    bio: 'Indigenous Mexican peasant to whom Our Lady of Guadalupe appeared in 1531. When doubted by the bishop, he opened his tilma to reveal her miraculous image. His story reminds us that God chooses the humble to carry the most important messages.',
    virtues: ['humility', 'obedience', 'trust'],
    emotions: ['anxious', 'grateful'],
    initials: 'JG',
  },
  {
    id: 'st-lorenzo-ruiz',
    name: 'St. Lorenzo Ruiz',
    feastDay: 'September 28',
    bio: 'First Filipino saint\u{2014}a young father and calligrapher who fled false murder charges to Japan, where he was captured and martyred during persecution. When offered freedom if he renounced his faith, he replied: "I am a Christian, and I die for God."',
    virtues: ['faith', 'courage', 'integrity'],
    emotions: ['anxious', 'overwhelmed'],
    initials: 'LR',
  },
  {
    id: 'st-andrew-kim',
    name: 'St. Andrew Kim Taegon',
    feastDay: 'September 20',
    bio: 'First Korean priest, ordained secretly during brutal persecution. He smuggled missionaries into Korea and ministered to hidden Christians before his martyrdom at 25. His final letter urged: "Do not be afraid\u{2014}God is the master of all things."',
    virtues: ['courage', 'faith', 'sacrifice'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'AK',
  },
  {
    id: 'st-charles-lwanga',
    name: 'St. Charles Lwanga',
    feastDay: 'June 3',
    bio: 'Ugandan courtier who protected young pages from the king\'s abuse and led them to baptism. When condemned to be burned alive in 1886, he encouraged his companions with joyful faith. The youngest martyr was just 13 years old.',
    virtues: ['courage', 'protection', 'joy'],
    emotions: ['overwhelmed', 'joyful'],
    initials: 'CL',
  },
  {
    id: 'st-pedro-calungsod',
    name: 'St. Pedro Calungsod',
    feastDay: 'April 2',
    bio: 'Filipino teenage catechist who traveled to Guam to evangelize the Chamorro people in 1668. He was killed at 17 while shielding a missionary priest. His youthful courage and missionary joy make him a patron of Filipino youth worldwide.',
    virtues: ['courage', 'zeal', 'sacrifice'],
    emotions: ['joyful', 'overwhelmed'],
    initials: 'PC',
  },
  {
    id: 'bl-chiara-badano',
    name: 'Bl. Chiara Badano',
    feastDay: 'October 29',
    bio: 'Italian teenager who loved tennis and swimming until bone cancer struck at 17. She offered each treatment to God, saying "If you want it, Jesus, I want it too." She planned her own funeral as "a wedding feast" and died radiant with joy in 1990.',
    virtues: ['joy', 'surrender', 'faith'],
    emotions: ['joyful', 'peaceful'],
    initials: 'CB',
  },
  {
    id: 'st-dymphna',
    name: 'St. Dymphna',
    feastDay: 'May 15',
    bio: 'Seventh-century Irish princess who fled to Belgium to escape her mentally ill father, who eventually found and killed her. She became patron of those suffering from anxiety, depression, and mental illness\u{2014}a saint who truly understands emotional pain.',
    virtues: ['courage', 'purity', 'healing'],
    emotions: ['anxious', 'overwhelmed'],
    initials: 'DY',
  },
  {
    id: 'st-rita-cascia',
    name: 'St. Rita of Cascia',
    feastDay: 'May 22',
    bio: 'Patron of impossible causes who survived an abusive marriage, the murder of her husband, and the deaths of both sons before finally entering the convent she\'d always desired. A wound from a thorn of Christ\'s crown marked her forehead for fifteen years.',
    virtues: ['perseverance', 'forgiveness', 'hope'],
    emotions: ['anxious', 'overwhelmed'],
    initials: 'RC',
  },

  // ── Additional Saints for Coverage ──────────────────────────────────
  {
    id: 'st-elizabeth-hungary',
    name: 'St. Elizabeth of Hungary',
    feastDay: 'November 17',
    bio: 'A Hungarian princess who married at 14 and was widowed at 20, then gave away her entire inheritance to build hospitals for the poor. Legend says the bread she smuggled to the hungry miraculously turned to roses when her disapproving in-laws caught her.',
    virtues: ['generosity', 'compassion', 'joy'],
    emotions: ['grateful', 'joyful'],
    initials: 'EH',
  },
  {
    id: 'st-margaret-mary',
    name: 'St. Margaret Mary Alacoque',
    feastDay: 'October 16',
    bio: 'French Visitation nun who received visions of the Sacred Heart of Jesus and was disbelieved and humiliated by her own community for years. Her persistence in sharing the message of God\'s merciful love eventually transformed Catholic devotional life worldwide.',
    virtues: ['devotion', 'perseverance', 'love'],
    emotions: ['anxious', 'grateful'],
    initials: 'MM',
  },
  {
    id: 'st-columba',
    name: 'St. Columba',
    feastDay: 'June 9',
    bio: 'Irish monk who founded the famous monastery of Iona off the Scottish coast, creating one of medieval Europe\'s greatest centers of learning and art. He copied manuscripts by hand and organized monastic life with creative energy, channeling restlessness into purpose.',
    virtues: ['creativity', 'discipline', 'mission'],
    emotions: ['scattered', 'peaceful'],
    initials: 'CO',
  },
  {
    id: 'st-bede',
    name: 'St. Bede the Venerable',
    feastDay: 'May 25',
    bio: 'English monk who spent his entire life in one monastery yet became the father of English history. His meticulous scholarship, written by candlelight in Northumbria, illuminated an entire civilization. He proved that deep focus in one place can change the world.',
    virtues: ['scholarship', 'humility', 'perseverance'],
    emotions: ['scattered', 'peaceful'],
    initials: 'BV',
  },
  {
    id: 'st-gemma-galgani',
    name: 'St. Gemma Galgani',
    feastDay: 'April 11',
    bio: 'Italian mystic who experienced the stigmata, ecstasies, and intense spiritual suffering while living as an ordinary laywoman in Lucca. Orphaned and chronically ill, she found in prayer a direct conversation with God that transformed her anxiety into intimacy.',
    virtues: ['prayer', 'suffering', 'intimacy'],
    emotions: ['anxious', 'grateful'],
    initials: 'GG',
  },
  {
    id: 'st-therese-couderc',
    name: 'St. Th\u{00E9}r\u{00E8}se Couderc',
    feastDay: 'September 26',
    bio: 'French foundress of the Congregation of Our Lady of the Retreat who was stripped of her leadership role and spent decades in hidden, humble service. She found peace in obscurity, writing that "self-surrender is more than devotion\u{2014}it is more than anything."',
    virtues: ['surrender', 'humility', 'peace'],
    emotions: ['peaceful', 'grateful'],
    initials: 'TH',
  },
  {
    id: 'st-josaphat',
    name: 'St. Josaphat',
    feastDay: 'November 12',
    bio: 'Ukrainian archbishop who worked to unite Eastern and Western Christians in 17th-century Poland-Lithuania. Martyred by an angry mob, his dying words were a prayer for his killers. He shows that working for unity under impossible pressure can itself be a form of peace.',
    virtues: ['unity', 'courage', 'forgiveness'],
    emotions: ['overwhelmed', 'peaceful'],
    initials: 'JO',
  },
  {
    id: 'st-stanislaus-kostka',
    name: 'St. Stanislaus Kostka',
    feastDay: 'November 13',
    bio: 'Polish teenager who walked 450 miles from Vienna to Rome to join the Jesuits after his family refused permission. He died at 18, just ten months after entering the novitiate. His brief, joyful life proves that holiness has no minimum age requirement.',
    virtues: ['determination', 'joy', 'purity'],
    emotions: ['joyful', 'peaceful'],
    initials: 'SK',
  },
  {
    id: 'st-aloysius-gonzaga',
    name: 'St. Aloysius Gonzaga',
    feastDay: 'June 21',
    bio: 'Italian Jesuit who renounced his inheritance as a marquis to serve plague victims in Rome, dying at 23 from the disease he caught nursing the sick. His methodical approach to spiritual life brought order to his noble family\'s chaos.',
    virtues: ['purity', 'service', 'discipline'],
    emotions: ['scattered', 'peaceful'],
    initials: 'AG',
  },
];

// ── Micro-actions ─────────────────────────────────────────────────────

export const MICRO_ACTIONS: MicroAction[] = [
  // ── Original 12 Saints ──────────────────────────────────────────────

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

  // ── Early Church & Apostolic Era ────────────────────────────────────

  // St. Joseph — peaceful, grateful
  { id: 'ma-31', saintId: 'st-joseph', emotion: 'peaceful', actionText: 'Joseph worked in silence and trusted without explanation. Spend 10 minutes doing a manual task\u2014cleaning, organizing, cooking\u2014in complete silence, no music or podcasts. Let your hands pray through work.', estimatedMinutes: 10 },
  { id: 'ma-32', saintId: 'st-joseph', emotion: 'grateful', actionText: 'Joseph protected his family quietly, without recognition. Think of someone who serves you invisibly\u2014a janitor, a parent, a coworker. Write them a specific thank-you note today.', estimatedMinutes: 10 },

  // St. Peter — anxious, overwhelmed
  { id: 'ma-33', saintId: 'st-peter', emotion: 'anxious', actionText: 'Peter sank when he looked at the waves instead of Jesus. Write down one fear that\'s pulling you under right now. Then write below it: "Lord, save me." Fold it up and carry it as a reminder that sinking isn\'t the end.', estimatedMinutes: 5 },
  { id: 'ma-34', saintId: 'st-peter', emotion: 'overwhelmed', actionText: 'Peter denied Jesus three times but was given three chances to say "I love you." Think of a recent failure. Instead of replaying it, do three small acts of love today as your own restoration.', estimatedMinutes: 10 },

  // St. Paul — scattered, joyful
  { id: 'ma-35', saintId: 'st-paul', emotion: 'scattered', actionText: 'Paul said "one thing I do: forgetting what lies behind, I strain forward." Write down the ONE thing that matters most today. Post it where you can see it. When distractions come, point to it and refocus.', estimatedMinutes: 5 },
  { id: 'ma-36', saintId: 'st-paul', emotion: 'joyful', actionText: 'Paul sang hymns in prison. Take your current joy and write a short list of 5 things that are going right. Share it with someone who might need encouragement today. Let joy become a gift.', estimatedMinutes: 10 },

  // St. Augustine — scattered, anxious
  { id: 'ma-37', saintId: 'st-augustine', emotion: 'scattered', actionText: 'Augustine wandered for years before finding rest in God. Set a timer for 5 minutes and sit with this question: "What am I really searching for right now?" Write whatever comes. Naming the search is the first step home.', estimatedMinutes: 5 },
  { id: 'ma-38', saintId: 'st-augustine', emotion: 'anxious', actionText: '"Our hearts are restless until they rest in You." Place both hands flat on a table. Feel the solid surface. Take 10 slow breaths. Name three things that are certain and good right now. Rest in what is, not what might be.', estimatedMinutes: 5 },

  // St. Ambrose — overwhelmed, peaceful
  { id: 'ma-39', saintId: 'st-ambrose', emotion: 'overwhelmed', actionText: 'Ambrose didn\'t seek his role\u2014it found him, and he rose to it. Identify the most important demand on you right now. Give it 15 focused minutes. Sometimes stepping INTO responsibility is less exhausting than resisting it.', estimatedMinutes: 15 },
  { id: 'ma-40', saintId: 'st-ambrose', emotion: 'peaceful', actionText: 'Ambrose taught that silence is where God speaks loudest. Find 10 minutes of true quiet today\u2014no screens, no noise. Sit and notice what thoughts arise without engaging them. Let them float past like clouds.', estimatedMinutes: 10 },

  // St. John Chrysostom — overwhelmed, joyful
  { id: 'ma-41', saintId: 'st-john-chrysostom', emotion: 'overwhelmed', actionText: 'Chrysostom said "God does not need golden vessels but golden hearts." Drop one unnecessary commitment or expectation today. Say no to one thing so you can say a wholehearted yes to what matters.', estimatedMinutes: 5 },
  { id: 'ma-42', saintId: 'st-john-chrysostom', emotion: 'joyful', actionText: 'The "Golden Mouth" used words to uplift. Use your joy to encourage someone specific today\u2014a genuine, detailed compliment about their character, not just their appearance. Let your words be gold.', estimatedMinutes: 5 },

  // St. Perpetua — anxious, peaceful
  { id: 'ma-43', saintId: 'st-perpetua', emotion: 'anxious', actionText: 'Perpetua faced the arena and wrote: "I knew I would be victorious." Write down what you\'re most afraid of today. Below it write one reason you believe you will get through it. Carry that reason with you.', estimatedMinutes: 5 },
  { id: 'ma-44', saintId: 'st-perpetua', emotion: 'peaceful', actionText: 'Perpetua kept a diary even in prison. Spend 10 minutes writing about today\'s peace\u2014what it feels like, where it comes from. Capturing peace on paper makes it easier to return to when storms come.', estimatedMinutes: 10 },

  // St. Cecilia — joyful, peaceful
  { id: 'ma-45', saintId: 'st-cecilia', emotion: 'joyful', actionText: 'Cecilia "sang to God in her heart." Put on a piece of music that moves you and listen with your full attention for one song. Let it be prayer. Let joy have a soundtrack today.', estimatedMinutes: 5 },
  { id: 'ma-46', saintId: 'st-cecilia', emotion: 'peaceful', actionText: 'Cecilia found interior music even in suffering. Hum or sing softly to yourself for 2 minutes\u2014any tune. Notice how it shifts your breathing and your mood. Carry that inner melody through the rest of your day.', estimatedMinutes: 5 },

  // St. Agnes — anxious, peaceful
  { id: 'ma-47', saintId: 'st-agnes', emotion: 'anxious', actionText: 'At 13, Agnes faced death with clarity because she knew who she was. Write down one sentence that defines who you are at your core\u2014not your role, your identity. Read it aloud when anxiety whispers that you\'re not enough.', estimatedMinutes: 5 },
  { id: 'ma-48', saintId: 'st-agnes', emotion: 'peaceful', actionText: 'Agnes\'s peace came from an unshakable sense of purpose. Spend 5 minutes writing a "purpose statement" for just today\u2014not your life, just these 24 hours. What is the one thing that matters? Live from that center.', estimatedMinutes: 5 },

  // St. Athanasius — overwhelmed, scattered
  { id: 'ma-49', saintId: 'st-athanasius', emotion: 'overwhelmed', actionText: 'Athanasius was exiled five times but never abandoned his mission. Name the one principle you refuse to compromise on today. Write it down. When everything feels like too much, this is your anchor.', estimatedMinutes: 5 },
  { id: 'ma-50', saintId: 'st-athanasius', emotion: 'scattered', actionText: 'Athanasius stood "against the world" with singular focus. Close all your browser tabs and apps except one. Work on that one thing for 15 minutes. Clarity comes from subtraction, not addition.', estimatedMinutes: 15 },

  // ── Medieval Era ────────────────────────────────────────────────────

  // St. Francis of Assisi — joyful, grateful, peaceful
  { id: 'ma-51', saintId: 'st-francis-assisi', emotion: 'joyful', actionText: 'Francis called the sun his brother and the moon his sister. Step outside for 5 minutes and greet creation: notice the sky, a plant, an animal. Speak to it kindly, even silently. Let wonder magnify your joy.', estimatedMinutes: 5 },
  { id: 'ma-52', saintId: 'st-francis-assisi', emotion: 'grateful', actionText: 'Francis gave away everything and gained everything. Choose one possession you\'re grateful for. Hold it and thank God for it specifically. Then ask: "Is there someone who needs this more than I do?"', estimatedMinutes: 5 },
  { id: 'ma-53', saintId: 'st-francis-assisi', emotion: 'peaceful', actionText: '"Lord, make me an instrument of your peace." Choose one line of St. Francis\'s prayer and repeat it throughout the day. Let it become a rhythm beneath everything you do.', estimatedMinutes: 5 },

  // St. Clare of Assisi — peaceful, grateful
  { id: 'ma-54', saintId: 'st-clare-assisi', emotion: 'peaceful', actionText: 'Clare repelled an army with still, silent prayer. Find 10 minutes today to sit in total stillness. Don\'t pray for anything\u2014just be present. Let silence be your fortress.', estimatedMinutes: 10 },
  { id: 'ma-55', saintId: 'st-clare-assisi', emotion: 'grateful', actionText: 'Clare chose radical poverty and found radical freedom. List three things money cannot buy that you currently possess\u2014a friendship, a memory, a skill. Sit with gratitude for each one for two minutes.', estimatedMinutes: 5 },

  // St. Dominic — scattered, joyful
  { id: 'ma-56', saintId: 'st-dominic', emotion: 'scattered', actionText: 'Dominic organized his entire life around one mission: truth. Write down the single most important truth you need to remember today. Post it somewhere visible. Let one truth organize a scattered day.', estimatedMinutes: 5 },
  { id: 'ma-57', saintId: 'st-dominic', emotion: 'joyful', actionText: 'Dominic debated heretics with warmth and charity. Use your joyful energy to have one conversation today where you truly listen first, then respond with genuine curiosity. Let joy make you a better listener.', estimatedMinutes: 10 },

  // St. Thomas Aquinas — scattered, overwhelmed
  { id: 'ma-58', saintId: 'st-thomas-aquinas', emotion: 'scattered', actionText: 'Aquinas organized all of theology into a system. Spend 5 minutes organizing just one small area of your life\u2014your desk, your to-do list, your inbox. External order creates internal clarity.', estimatedMinutes: 5 },
  { id: 'ma-59', saintId: 'st-thomas-aquinas', emotion: 'overwhelmed', actionText: 'Aquinas said "all I have written seems like straw" compared to God\'s reality. When overwhelmed by expectations, ask: "Will this matter in a year?" Release what won\'t. Focus on what will.', estimatedMinutes: 5 },

  // St. Catherine of Siena — anxious, overwhelmed
  { id: 'ma-60', saintId: 'st-catherine-siena', emotion: 'anxious', actionText: 'Catherine said "Be who God meant you to be and you will set the world on fire." Write down one thing you know you\'re meant to do today\u2014not everything, just one thing. Let that be enough.', estimatedMinutes: 5 },
  { id: 'ma-61', saintId: 'st-catherine-siena', emotion: 'overwhelmed', actionText: 'Catherine nursed plague victims while advising popes. When overwhelmed, she returned to her "inner cell" of prayer. Close your eyes for 3 minutes and imagine an inner room where nothing can reach you. Visit it now.', estimatedMinutes: 5 },

  // St. Hildegard of Bingen — scattered, joyful
  { id: 'ma-62', saintId: 'st-hildegard', emotion: 'scattered', actionText: 'Hildegard channeled her enormous creativity through discipline. Pick one creative impulse you\'ve been ignoring and give it 15 focused minutes today\u2014write, draw, cook, play music. Channel scattered energy into creation.', estimatedMinutes: 15 },
  { id: 'ma-63', saintId: 'st-hildegard', emotion: 'joyful', actionText: 'Hildegard called the Holy Spirit "the greening power of God." Go outside and notice something growing\u2014a weed in a crack, a houseplant, a tree. Marvel at it for 2 minutes. Your joy is that same life force.', estimatedMinutes: 5 },

  // St. Bernard of Clairvaux — anxious, peaceful
  { id: 'ma-64', saintId: 'st-bernard-clairvaux', emotion: 'anxious', actionText: 'Bernard wrote: "You wish to see; listen. Hearing is a step toward vision." Instead of trying to see the future, listen to what this moment is telling you. Spend 5 minutes just listening\u2014to sounds, to your breath, to silence.', estimatedMinutes: 5 },
  { id: 'ma-65', saintId: 'st-bernard-clairvaux', emotion: 'peaceful', actionText: 'Bernard described God\'s love as "a living flame." Sit quietly for 5 minutes and imagine warmth spreading from your heart through your whole body. Let peace be physical, not just mental. Carry that warmth into your next conversation.', estimatedMinutes: 5 },

  // St. Anthony of Padua — anxious, scattered
  { id: 'ma-66', saintId: 'st-anthony-padua', emotion: 'anxious', actionText: 'Anthony is the patron of lost things. What have you "lost" that\'s causing anxiety\u2014confidence, direction, peace? Name it. Then say: "St. Anthony, help me find what I\'ve lost." Sometimes naming what\'s missing is finding it.', estimatedMinutes: 5 },
  { id: 'ma-67', saintId: 'st-anthony-padua', emotion: 'scattered', actionText: 'Anthony found lost people by preaching with crystal clarity. Take 5 minutes to explain your current priority to yourself in one sentence. If you can\'t say it simply, you haven\'t found it yet. Keep simplifying until you can.', estimatedMinutes: 5 },

  // St. Scholastica — peaceful, grateful
  { id: 'ma-68', saintId: 'st-scholastica', emotion: 'peaceful', actionText: 'Scholastica prayed for a storm so she could keep talking with her brother. Call or text someone you love and extend the conversation 5 minutes longer than usual. Let connection deepen your peace.', estimatedMinutes: 10 },
  { id: 'ma-69', saintId: 'st-scholastica', emotion: 'grateful', actionText: 'Scholastica knew her last conversation with Benedict would be her last. Think of one relationship you might be taking for granted. Send that person a message right now telling them what they mean to you.', estimatedMinutes: 5 },

  // St. Bonaventure — scattered, peaceful
  { id: 'ma-70', saintId: 'st-bonaventure', emotion: 'scattered', actionText: 'Bonaventure mapped the soul\'s journey through creation, memory, and contemplation. Look at one natural object near you for 2 minutes\u2014really look. What does it tell you? Let wonder replace distraction.', estimatedMinutes: 5 },
  { id: 'ma-71', saintId: 'st-bonaventure', emotion: 'peaceful', actionText: 'Bonaventure taught that all creation is a "footprint of God." Take a 10-minute walk and look for God\'s fingerprints in what you see. A ray of light, a kind gesture, a child\'s laugh. Let peace sharpen your vision.', estimatedMinutes: 10 },

  // St. Brigid of Ireland — joyful, peaceful
  { id: 'ma-72', saintId: 'st-brigid-ireland', emotion: 'joyful', actionText: 'Brigid was extravagantly generous\u2014legend says she turned water into beer! Channel your joy into an extravagant act of generosity today. Buy a stranger\'s coffee, leave an oversized tip, give something you love away.', estimatedMinutes: 5 },
  { id: 'ma-73', saintId: 'st-brigid-ireland', emotion: 'peaceful', actionText: 'Brigid kept a perpetual flame burning at Kildare for centuries. Light a candle and sit with it for 5 minutes. Watch the flame. Let it represent the steady, quiet peace at the center of your life.', estimatedMinutes: 5 },

  // St. Patrick — anxious, joyful
  { id: 'ma-74', saintId: 'st-patrick', emotion: 'anxious', actionText: 'Patrick returned to the land of his enslavement as a missionary. Think of one situation you\'re avoiding because it makes you anxious. Take one tiny step toward it today. Patrick proved that courage is walking toward fear, not away from it.', estimatedMinutes: 10 },
  { id: 'ma-75', saintId: 'st-patrick', emotion: 'joyful', actionText: 'Patrick used the shamrock to explain the Trinity\u2014making deep truth accessible. Share something meaningful you\'ve learned with someone today, but make it simple and joyful. The best teachers teach with delight.', estimatedMinutes: 5 },

  // ── Counter-Reformation & Early Modern ──────────────────────────────

  // St. John of the Cross — anxious, peaceful
  { id: 'ma-76', saintId: 'st-john-cross', emotion: 'anxious', actionText: 'John wrote his most beautiful poetry in a prison cell. Take whatever darkness you feel right now and write about it\u2014a sentence, a paragraph, even a poem. In the Dark Night, he found that naming the darkness is the first light.', estimatedMinutes: 10 },
  { id: 'ma-77', saintId: 'st-john-cross', emotion: 'peaceful', actionText: 'John described the summit of spiritual life as "nothing, nothing, nothing." Spend 10 minutes emptying: put down your phone, close your eyes, release each thought as it comes. On the mountain of peace, less is more.', estimatedMinutes: 10 },

  // St. Rose of Lima — overwhelmed, grateful
  { id: 'ma-78', saintId: 'st-rose-lima', emotion: 'overwhelmed', actionText: 'Rose built a small room in her garden where she could pray and serve the sick. Create one small sacred space today\u2014a corner of your desk, a spot in your room\u2014that is only for breathing and stillness. Go there when overwhelmed.', estimatedMinutes: 10 },
  { id: 'ma-79', saintId: 'st-rose-lima', emotion: 'grateful', actionText: 'Rose said "Without the Cross, we would never find the road to God." Think of one difficulty that ultimately led to growth. Write a sentence of thanks for that hard teacher. Gratitude redeems even suffering.', estimatedMinutes: 5 },

  // St. Martin de Porres — joyful, peaceful, grateful
  { id: 'ma-80', saintId: 'st-martin-de-porres', emotion: 'joyful', actionText: 'Martin cared for every creature\u2014humans, dogs, cats, even mice. Extend your joy to a living thing today: feed a bird, water a plant, pet a dog. Joy shared with creation multiplies.', estimatedMinutes: 5 },
  { id: 'ma-81', saintId: 'st-martin-de-porres', emotion: 'peaceful', actionText: 'Martin swept floors and healed the sick with equal peace. Do one humble task today with complete attention and dignity\u2014folding laundry, washing a dish, sweeping. Find peace in service no one will notice.', estimatedMinutes: 10 },
  { id: 'ma-82', saintId: 'st-martin-de-porres', emotion: 'grateful', actionText: 'Martin overcame racial discrimination through love, not bitterness. Think of someone who wronged you. Instead of resentment, find one good thing about them. Gratitude is choosing what to see. Choose to see light.', estimatedMinutes: 5 },

  // St. Francis Xavier — overwhelmed, joyful
  { id: 'ma-83', saintId: 'st-francis-xavier', emotion: 'overwhelmed', actionText: 'Xavier evangelized entire nations by starting with one person at a time. Ignore the mountain of tasks and choose just ONE person who needs your attention today. Give them your full presence for 10 minutes.', estimatedMinutes: 10 },
  { id: 'ma-84', saintId: 'st-francis-xavier', emotion: 'joyful', actionText: 'Xavier crossed oceans with infectious enthusiasm. Use your energy to reach out to someone you haven\'t talked to in a while\u2014a text, a call, a voice memo. Let joy bridge distances.', estimatedMinutes: 5 },

  // St. Charles Borromeo — overwhelmed, scattered
  { id: 'ma-85', saintId: 'st-charles-borromeo', emotion: 'overwhelmed', actionText: 'Borromeo reformed an entire diocese systematically. Take 10 minutes to write down everything overwhelming you, then sort into: (1) do today, (2) do this week, (3) delegate or drop. Systems tame chaos.', estimatedMinutes: 10 },
  { id: 'ma-86', saintId: 'st-charles-borromeo', emotion: 'scattered', actionText: 'Borromeo sold his family\'s tapestries to feed the poor\u2014he knew what mattered. List everything competing for your attention, then circle the ONE that aligns with your deepest values. Do that first. Let values be your filter.', estimatedMinutes: 5 },

  // St. Robert Bellarmine — scattered, peaceful
  { id: 'ma-87', saintId: 'st-robert-bellarmine', emotion: 'scattered', actionText: 'Bellarmine organized massive debates into clear, systematic arguments. Take one confusing situation in your life and write it out in three clear sentences: what happened, why it matters, what to do next. Clarity is power.', estimatedMinutes: 10 },
  { id: 'ma-88', saintId: 'st-robert-bellarmine', emotion: 'peaceful', actionText: 'Bellarmine maintained gentleness through fierce controversy. Think of a disagreement you\'re carrying. For 5 minutes, try to honestly see the other person\'s perspective. Peace doesn\'t require agreement\u2014just understanding.', estimatedMinutes: 5 },

  // St. Louise de Marillac — overwhelmed, grateful
  { id: 'ma-89', saintId: 'st-louise-de-marillac', emotion: 'overwhelmed', actionText: 'Louise transformed her own depression into organized compassion. Take 5 minutes to do one small, concrete act of care for someone\u2014prepare a meal, send an encouraging text, tidy a shared space. Action is the antidote to overwhelm.', estimatedMinutes: 5 },
  { id: 'ma-90', saintId: 'st-louise-de-marillac', emotion: 'grateful', actionText: 'Louise found purpose after years of spiritual darkness. Write down three ways your past struggles have made you more compassionate. Thank God for each one. The gifts that come from suffering are the most precious.', estimatedMinutes: 10 },

  // St. Vincent de Paul — grateful, joyful
  { id: 'ma-91', saintId: 'st-vincent-de-paul', emotion: 'grateful', actionText: 'Vincent saw Christ in the face of every poor person. The next person you see today\u2014stranger, colleague, family\u2014look at them with fresh eyes. What are you grateful for about their existence? Tell them one thing.', estimatedMinutes: 5 },
  { id: 'ma-92', saintId: 'st-vincent-de-paul', emotion: 'joyful', actionText: 'Vincent said "It is not enough to do good; it must be done well." Take a joyful energy and channel it into doing one task today with exceptional care and attention. Make it beautiful, not just done.', estimatedMinutes: 10 },

  // St. Jane de Chantal — anxious, peaceful
  { id: 'ma-93', saintId: 'st-jane-de-chantal', emotion: 'anxious', actionText: 'Jane was told by Francis de Sales to be gentle with herself. Speak to yourself the way you\'d speak to your best friend. For 5 minutes, replace every self-critical thought with: "Be gentle. You\'re doing your best."', estimatedMinutes: 5 },
  { id: 'ma-94', saintId: 'st-jane-de-chantal', emotion: 'peaceful', actionText: 'Jane founded the Visitation Order for women too sick or elderly for strict religious life. Your peace is a gift\u2014extend it to someone who is struggling. Send a message of simple comfort: "I\'m thinking of you."', estimatedMinutes: 5 },

  // St. Alphonsus Liguori — anxious, grateful
  { id: 'ma-95', saintId: 'st-alphonsus-liguori', emotion: 'anxious', actionText: 'Alphonsus battled lifelong scrupulosity (religious anxiety). His solution: "Who trusts in God shall never be confounded." Write one thing you trust about God or life and tape it where you\'ll see it all day.', estimatedMinutes: 5 },
  { id: 'ma-96', saintId: 'st-alphonsus-liguori', emotion: 'grateful', actionText: 'Alphonsus wrote hymns and theology despite blindness and bent spine. List three abilities you have right now that you normally take for granted\u2014your sight, your hands, your voice. Use one of them to serve someone today.', estimatedMinutes: 10 },

  // ── 18th\u{2013}19th Century ─────────────────────────────────────────────

  // St. Elizabeth Ann Seton — overwhelmed, grateful
  { id: 'ma-97', saintId: 'st-elizabeth-seton', emotion: 'overwhelmed', actionText: 'Elizabeth lost everything\u2014husband, wealth, social standing\u2014and built a new life from scratch. Name one thing you can start fresh today, even small: a routine, a conversation, a habit. Beginning again is holy.', estimatedMinutes: 5 },
  { id: 'ma-98', saintId: 'st-elizabeth-seton', emotion: 'grateful', actionText: 'Elizabeth said "The first end I propose in our daily work is to do the will of God." Think of one daily task and reframe it as a gift. Doing dishes? Grateful for food. Commuting? Grateful for purpose. Transform one task with gratitude.', estimatedMinutes: 5 },

  // St. John Bosco — joyful, scattered
  { id: 'ma-99', saintId: 'st-john-bosco', emotion: 'joyful', actionText: 'Don Bosco won street kids\' hearts through play. Take 10 minutes to play today\u2014toss a ball, do a puzzle, doodle, play a game. Bosco proved that play is not a waste of time; it\'s how hearts open.', estimatedMinutes: 10 },
  { id: 'ma-100', saintId: 'st-john-bosco', emotion: 'scattered', actionText: 'Bosco taught with kindness rather than punishment. When you catch yourself jumping between tasks, don\'t scold yourself. Instead, gently return to one task and say: "This one thing, with love." Kindness focuses better than discipline.', estimatedMinutes: 5 },

  // St. Bernadette — anxious, peaceful
  { id: 'ma-101', saintId: 'st-bernadette', emotion: 'anxious', actionText: 'Bernadette was asked hundreds of questions about her visions. Her answer was always simple: "I am not asked to make you believe. I am asked to tell you." Simplify your story: what is the one simple truth you need today?', estimatedMinutes: 5 },
  { id: 'ma-102', saintId: 'st-bernadette', emotion: 'peaceful', actionText: 'Bernadette said "My job is to be sick" with complete acceptance. What is your job right now\u2014not your career, your present task? Accept it fully for the next 10 minutes. Total acceptance is total peace.', estimatedMinutes: 10 },

  // St. John Vianney — overwhelmed, anxious
  { id: 'ma-103', saintId: 'st-john-vianney', emotion: 'overwhelmed', actionText: 'Vianney nearly failed seminary but became France\'s greatest confessor. You don\'t need to be the best\u2014just available. Choose one person today and give them your full, undivided presence. Availability trumps ability.', estimatedMinutes: 10 },
  { id: 'ma-104', saintId: 'st-john-vianney', emotion: 'anxious', actionText: 'Vianney heard confessions 16 hours a day and still battled self-doubt. He told parishioners: "God commands only what is possible." Write down your impossible worry. Then underneath write: "One step at a time."', estimatedMinutes: 5 },

  // St. Damien of Molokai — overwhelmed, peaceful
  { id: 'ma-105', saintId: 'st-damien-molokai', emotion: 'overwhelmed', actionText: 'Damien built houses and coffins with his own hands. When everything feels too much, do one physical task with your hands\u2014fix something, build something, clean something. Manual work grounds an overwhelmed mind.', estimatedMinutes: 10 },
  { id: 'ma-106', saintId: 'st-damien-molokai', emotion: 'peaceful', actionText: 'Damien chose to live among those the world abandoned. Your peace can be a ministry. Reach out to someone who might be feeling isolated today\u2014a text, a call. Let your peace be their shelter.', estimatedMinutes: 5 },

  // St. Katherine Drexel — overwhelmed, joyful
  { id: 'ma-107', saintId: 'st-katherine-drexel', emotion: 'overwhelmed', actionText: 'The Pope told Katherine: "Why don\'t YOU do something?" Instead of being overwhelmed by all the world\'s problems, pick ONE small, concrete action you can take today for justice or kindness. You do something.', estimatedMinutes: 10 },
  { id: 'ma-108', saintId: 'st-katherine-drexel', emotion: 'joyful', actionText: 'Katherine gave away a fortune with joy, not guilt. Share your abundance today\u2014time, money, attention, a skill. Give something away with delight, not duty. Joyful generosity transforms both giver and receiver.', estimatedMinutes: 10 },

  // St. Andr\u00e9 Bessette — grateful, peaceful
  { id: 'ma-109', saintId: 'st-andre-bessette', emotion: 'grateful', actionText: 'Andr\u00e9 was a simple doorkeeper for 40 years and changed thousands of lives. Think of your most "insignificant" daily task. Find three ways it serves others. Gratitude reveals the hidden grandeur of ordinary faithfulness.', estimatedMinutes: 5 },
  { id: 'ma-110', saintId: 'st-andre-bessette', emotion: 'peaceful', actionText: 'Andr\u00e9 prayed to St. Joseph with childlike simplicity. Spend 5 minutes talking to God as you would to a kind father\u2014no formulas, no theology, just honest words. Simplicity is the shortcut to peace.', estimatedMinutes: 5 },

  // St. Josephine Bakhita — anxious, grateful, joyful
  { id: 'ma-111', saintId: 'st-josephine-bakhita', emotion: 'anxious', actionText: 'Bakhita said "If I were to meet the slave-traders who kidnapped me, I would kneel and kiss their hands, because it led me to God." When anxiety about the past grips you, name one good thing that came from a painful experience. Let it loosen the grip.', estimatedMinutes: 5 },
  { id: 'ma-112', saintId: 'st-josephine-bakhita', emotion: 'grateful', actionText: 'Bakhita radiated joy despite unspeakable suffering. Name the three most foundational blessings in your life\u2014the ones so basic you forget them. Freedom. Safety. Love. Sit with gratitude for each one for a full minute.', estimatedMinutes: 5 },
  { id: 'ma-113', saintId: 'st-josephine-bakhita', emotion: 'joyful', actionText: 'Bakhita\'s joy stunned everyone who knew her history. Let your joy be especially generous today toward someone who is suffering. A smile, a word, an act of care. Joy from the broken is the most healing kind.', estimatedMinutes: 5 },

  // St. Frances Xavier Cabrini — overwhelmed, scattered
  { id: 'ma-114', saintId: 'st-frances-cabrini', emotion: 'overwhelmed', actionText: 'Cabrini founded 67 institutions. Her secret? She started each day with one priority. Write down tomorrow morning\'s single most important task tonight before bed. Wake up with direction, not dread.', estimatedMinutes: 5 },
  { id: 'ma-115', saintId: 'st-frances-cabrini', emotion: 'scattered', actionText: 'Cabrini wanted China but God sent her to New York. Sometimes the right focus isn\'t where we planned. Ask: "What unexpected need is right in front of me?" Do that one thing for 15 minutes.', estimatedMinutes: 15 },

  // St. Isidore the Farmer — peaceful, grateful
  { id: 'ma-116', saintId: 'st-isidore-farmer', emotion: 'peaceful', actionText: 'Isidore prayed while he plowed\u2014no separation between work and worship. During your next routine task, silently offer each motion as a prayer. Let ordinary labor become sacred rhythm.', estimatedMinutes: 10 },
  { id: 'ma-117', saintId: 'st-isidore-farmer', emotion: 'grateful', actionText: 'Isidore was grateful for the soil, the rain, the harvest. Before your next meal, pause for 30 seconds and trace the food back to its source\u2014the farmer, the earth, the rain. Let gratitude connect you to the whole chain of life.', estimatedMinutes: 5 },

  // ── 20th Century & Modern ───────────────────────────────────────────

  // St. Edith Stein — anxious, peaceful
  { id: 'ma-118', saintId: 'st-edith-stein', emotion: 'anxious', actionText: 'Edith wrote: "God leads every soul on a unique path." Your anxious thoughts about the future assume you know the path. Spend 5 minutes releasing your plan and trusting the one who sees the whole road.', estimatedMinutes: 5 },
  { id: 'ma-119', saintId: 'st-edith-stein', emotion: 'peaceful', actionText: 'Edith, a philosopher, found that thinking led to being, and being led to peace. Spend 10 minutes writing about what you believe most deeply\u2014not what you should believe, what you actually do. Let clarity deepen peace.', estimatedMinutes: 10 },

  // St. Faustina — anxious, grateful
  { id: 'ma-120', saintId: 'st-faustina', emotion: 'anxious', actionText: 'Faustina repeated "Jesus, I trust in You" thousands of times. Write those five words on a piece of paper and carry it today. Each time anxiety spikes, touch the paper and read the words. Trust is a practice, not a feeling.', estimatedMinutes: 5 },
  { id: 'ma-121', saintId: 'st-faustina', emotion: 'grateful', actionText: 'Faustina\'s diary records both agony and ecstasy with equal honesty. Spend 5 minutes writing about today\u2014the hard parts AND the gifts. Gratitude grows when we see the full picture, not just the highlight reel.', estimatedMinutes: 5 },

  // St. Oscar Romero — overwhelmed, peaceful
  { id: 'ma-122', saintId: 'st-oscar-romero', emotion: 'overwhelmed', actionText: 'Romero said "We cannot do everything, but it is liberating to know that." Release the burden of fixing everything. Choose one injustice you care about and take one concrete step today\u2014sign, donate, speak, serve.', estimatedMinutes: 10 },
  { id: 'ma-123', saintId: 'st-oscar-romero', emotion: 'peaceful', actionText: 'Romero found peace not in safety but in purpose. Reflect for 5 minutes: what cause or person would you serve even if it cost you something? Peace rooted in purpose is unshakable.', estimatedMinutes: 5 },

  // Bl. Pier Giorgio Frassati — joyful, grateful
  { id: 'ma-124', saintId: 'st-pier-giorgio', emotion: 'joyful', actionText: 'Pier Giorgio skied, climbed mountains, and served the poor with equal enthusiasm. Take your joyful energy outside today\u2014walk, run, climb stairs\u2014and let physical movement amplify your joy. "To the heights!"', estimatedMinutes: 10 },
  { id: 'ma-125', saintId: 'st-pier-giorgio', emotion: 'grateful', actionText: 'Pier Giorgio secretly gave his bus money to the poor and walked home. Sacrifice something small today as an act of gratitude\u2014skip a comfort, give away a treat. Gratitude that costs something means something.', estimatedMinutes: 5 },

  // Bl. Carlo Acutis — joyful, scattered
  { id: 'ma-126', saintId: 'bl-carlo-acutis', emotion: 'joyful', actionText: 'Carlo used technology to serve God, not escape life. Use your phone right now to send one message of genuine joy and encouragement to someone. Then put the phone down. Carlo warned against being "photocopies"\u2014be original in your joy.', estimatedMinutes: 5 },
  { id: 'ma-127', saintId: 'bl-carlo-acutis', emotion: 'scattered', actionText: 'Carlo built a website cataloging miracles\u2014one page at a time. When you feel scattered online, close every tab. Open one thing that matters. Do that one thing for 10 minutes. Digital focus is a modern spiritual discipline.', estimatedMinutes: 10 },

  // St. Teresa of Calcutta — overwhelmed, peaceful, grateful
  { id: 'ma-128', saintId: 'st-teresa-calcutta', emotion: 'overwhelmed', actionText: 'Mother Teresa said "If you can\'t feed a hundred people, then feed just one." Stop trying to solve everything. Find one person who needs something small today\u2014a meal, a smile, a listening ear\u2014and serve just them.', estimatedMinutes: 10 },
  { id: 'ma-129', saintId: 'st-teresa-calcutta', emotion: 'peaceful', actionText: 'Mother Teresa spent an hour in silent prayer before each day\'s work in the slums. Spend 10 minutes in silence before your next task. "In the silence of the heart, God speaks." Let silence be your preparation.', estimatedMinutes: 10 },
  { id: 'ma-130', saintId: 'st-teresa-calcutta', emotion: 'grateful', actionText: 'Mother Teresa saw Christ "in the distressing disguise of the poorest of the poor." Look at one person today\u2014a cashier, a janitor, a stranger\u2014and see their dignity. Thank God for them silently. Gratitude transforms how we see.', estimatedMinutes: 5 },

  // St. John Paul II — joyful, anxious
  { id: 'ma-131', saintId: 'st-john-paul-ii', emotion: 'joyful', actionText: '"Be not afraid!" John Paul said this 284 times as pope. Take your joy and share it fearlessly\u2014compliment a stranger, laugh out loud, express enthusiasm without irony. Let joy be bold, not polite.', estimatedMinutes: 5 },
  { id: 'ma-132', saintId: 'st-john-paul-ii', emotion: 'anxious', actionText: 'John Paul survived Nazis, Communists, and an assassin\'s bullet. He forgave his shooter in person. Write down your fear. Then write: "Be not afraid." Fear names the storm; faith names the pilot. Choose who to listen to.', estimatedMinutes: 5 },

  // Bl. Solanus Casey — peaceful, grateful
  { id: 'ma-133', saintId: 'bl-solanus-casey', emotion: 'peaceful', actionText: 'Solanus played violin and counseled thousands from a doorkeeper\'s post. Spend 10 minutes doing something simple you love\u2014reading, humming, watching clouds. Let peace come from being, not achieving.', estimatedMinutes: 10 },
  { id: 'ma-134', saintId: 'bl-solanus-casey', emotion: 'grateful', actionText: 'Solanus said "Thank God ahead of time." Choose one uncertain situation and thank God for it before the outcome. This isn\'t denial\u2014it\'s trust that transforms how you carry uncertainty.', estimatedMinutes: 5 },

  // St. Kateri Tekakwitha — anxious, peaceful
  { id: 'ma-135', saintId: 'st-kateri', emotion: 'anxious', actionText: 'Kateri was ostracized for her faith but found refuge in nature and prayer. Go outside for 5 minutes and place your hand on a tree, the ground, or a stone. Feel the earth\'s solidity. You are held by something larger than your anxiety.', estimatedMinutes: 5 },
  { id: 'ma-136', saintId: 'st-kateri', emotion: 'peaceful', actionText: 'Kateri carved crosses in the forest as markers of prayer. Find or create a small symbol of peace today\u2014a stone on your desk, a bookmark, a drawn symbol. Let it be a physical anchor for your interior peace.', estimatedMinutes: 5 },

  // ── Global Saints ───────────────────────────────────────────────────

  // St. Juan Diego — anxious, grateful
  { id: 'ma-137', saintId: 'st-juan-diego', emotion: 'anxious', actionText: 'Juan Diego doubted he was worthy to carry Our Lady\'s message. He went anyway. What message are you avoiding because you feel unworthy? Take one step toward delivering it today. Worthiness follows obedience.', estimatedMinutes: 5 },
  { id: 'ma-138', saintId: 'st-juan-diego', emotion: 'grateful', actionText: 'Juan Diego\'s tilma preserved a miracle for 500 years. Think of one ordinary thing you own that holds extraordinary meaning\u2014a photo, a gift, a letter. Hold it, remember the story, and give thanks for the love it represents.', estimatedMinutes: 5 },

  // St. Lorenzo Ruiz — anxious, overwhelmed
  { id: 'ma-139', saintId: 'st-lorenzo-ruiz', emotion: 'anxious', actionText: 'Lorenzo said "I am a Christian, and I die for God" when offered a way out. Write down one conviction you hold that no amount of pressure can change. When anxiety shakes everything else, this is your ground.', estimatedMinutes: 5 },
  { id: 'ma-140', saintId: 'st-lorenzo-ruiz', emotion: 'overwhelmed', actionText: 'Lorenzo faced an impossible situation with impossible courage. Sometimes there is no good option\u2014only a faithful one. Name the most faithful response to your current overwhelm, even if it\'s hard. Then take one step.', estimatedMinutes: 5 },

  // St. Andrew Kim Taegon — overwhelmed, peaceful
  { id: 'ma-141', saintId: 'st-andrew-kim', emotion: 'overwhelmed', actionText: 'Andrew Kim smuggled faith into Korea under threat of death. When overwhelmed, ask: "What is worth the cost?" Identify one thing that matters enough to fight for today, and let the rest fall away.', estimatedMinutes: 5 },
  { id: 'ma-142', saintId: 'st-andrew-kim', emotion: 'peaceful', actionText: 'Andrew\'s final letter said: "Do not be afraid\u2014God is the master of all things." Spend 5 minutes sitting with this truth. Write it on your hand if you need to. Let someone else be master today. Rest.', estimatedMinutes: 5 },

  // St. Charles Lwanga — overwhelmed, joyful
  { id: 'ma-143', saintId: 'st-charles-lwanga', emotion: 'overwhelmed', actionText: 'Charles Lwanga protected young people at the cost of his life. Who in your life needs protection or support right now? Send them a message of solidarity. When we serve others, our own overwhelm loses its grip.', estimatedMinutes: 5 },
  { id: 'ma-144', saintId: 'st-charles-lwanga', emotion: 'joyful', actionText: 'Charles encouraged his companions to face death with hymns and faith. Use your joy today to encourage someone facing a challenge\u2014a friend with a deadline, a coworker under pressure. Joyful presence is a superpower.', estimatedMinutes: 5 },

  // St. Pedro Calungsod — joyful, overwhelmed
  { id: 'ma-145', saintId: 'st-pedro-calungsod', emotion: 'joyful', actionText: 'Pedro crossed oceans as a teenager to share his faith. Channel your youthful joy into boldness today: start a conversation you\'ve been putting off, try something new, take a creative risk. Joy fuels courage.', estimatedMinutes: 10 },
  { id: 'ma-146', saintId: 'st-pedro-calungsod', emotion: 'overwhelmed', actionText: 'Pedro shielded a priest with his own body at age 17. Sometimes being overwhelmed means we\'re carrying something important. Name what you\'re carrying today. Then ask: "Who can I share this weight with?" Reach out.', estimatedMinutes: 5 },

  // Bl. Chiara Badano — joyful, peaceful
  { id: 'ma-147', saintId: 'bl-chiara-badano', emotion: 'joyful', actionText: 'Chiara planned her funeral as "a wedding feast." Take something ordinary on your schedule today and mentally reframe it as a celebration. Meetings become gatherings. Errands become adventures. Joy is a lens, not a circumstance.', estimatedMinutes: 5 },
  { id: 'ma-148', saintId: 'bl-chiara-badano', emotion: 'peaceful', actionText: 'Chiara said "If you want it, Jesus, I want it too." Spend 5 minutes practicing radical acceptance: whatever comes in the next hour, receive it as it is. Not approval of everything\u2014just release of resistance. Peace follows surrender.', estimatedMinutes: 5 },

  // St. Dymphna — anxious, overwhelmed
  { id: 'ma-149', saintId: 'st-dymphna', emotion: 'anxious', actionText: 'Dymphna is the patron saint of anxiety and mental illness. She understands. Spend 5 minutes acknowledging your anxiety without trying to fix it: "I feel anxious, and that\'s okay. This feeling will pass. I am not alone."', estimatedMinutes: 5 },
  { id: 'ma-150', saintId: 'st-dymphna', emotion: 'overwhelmed', actionText: 'Dymphna fled danger and built a new life helping the mentally ill. When overwhelmed, ask: "What can I actually control right now?" Write down just those things. Release everything else. Control is smaller than we think, and that\'s freeing.', estimatedMinutes: 5 },

  // St. Rita of Cascia — anxious, overwhelmed
  { id: 'ma-151', saintId: 'st-rita-cascia', emotion: 'anxious', actionText: 'Rita is the patron of impossible causes. Name your "impossible" situation. Then remind yourself: Rita waited decades for her impossible dream. Take one small step toward yours today. Impossibilities have a shelf life.', estimatedMinutes: 5 },
  { id: 'ma-152', saintId: 'st-rita-cascia', emotion: 'overwhelmed', actionText: 'Rita survived an abusive marriage through quiet, daily endurance. When overwhelmed, don\'t look at the mountain. Look at the next step. Just the next step. Rita\'s decades of faithfulness were lived one day at a time.', estimatedMinutes: 5 },

  // ── Additional Saints ───────────────────────────────────────────────

  // St. Elizabeth of Hungary — grateful, joyful
  { id: 'ma-153', saintId: 'st-elizabeth-hungary', emotion: 'grateful', actionText: 'Elizabeth smuggled bread to the poor and it turned to roses. Take something ordinary you have\u2014food, time, a smile\u2014and give it away today. Watch how gratitude turns ordinary gifts into roses for someone else.', estimatedMinutes: 5 },
  { id: 'ma-154', saintId: 'st-elizabeth-hungary', emotion: 'joyful', actionText: 'Elizabeth built hospitals with joy, not duty. Take your joyful energy and direct it toward someone in need today. The world has enough dutiful service\u2014what it needs is delighted generosity.', estimatedMinutes: 10 },

  // St. Margaret Mary Alacoque — anxious, grateful
  { id: 'ma-155', saintId: 'st-margaret-mary', emotion: 'anxious', actionText: 'Margaret Mary was disbelieved for years but held to her truth. What truth about yourself do you need to trust, even if others don\'t see it yet? Write it down. Confidence isn\'t the absence of doubt\u2014it\'s trusting anyway.', estimatedMinutes: 5 },
  { id: 'ma-156', saintId: 'st-margaret-mary', emotion: 'grateful', actionText: 'Margaret Mary\'s message was that God\'s heart is on fire with love for each person. Spend 5 minutes sitting with this: you are personally, individually, specifically loved. Let that truth sink from your head to your heart.', estimatedMinutes: 5 },

  // St. Columba — scattered, peaceful
  { id: 'ma-157', saintId: 'st-columba', emotion: 'scattered', actionText: 'Columba hand-copied manuscripts in a tiny island cell. Choose one task and give it the same devoted attention for 15 minutes. No multitasking, no checking messages. Monastic focus is available to anyone, anywhere.', estimatedMinutes: 15 },
  { id: 'ma-158', saintId: 'st-columba', emotion: 'peaceful', actionText: 'Columba built Iona into a beacon of civilization. Tend one small corner of your world with care today\u2014water a plant, organize a shelf, clean a surface. Peaceful people create peaceful spaces.', estimatedMinutes: 10 },

  // St. Bede — scattered, peaceful
  { id: 'ma-159', saintId: 'st-bede', emotion: 'scattered', actionText: 'Bede spent his entire life in one monastery and illuminated an age. Resist the urge to seek novelty today. Instead, go deeper into what\'s already in front of you. Depth, not breadth, produces mastery.', estimatedMinutes: 10 },
  { id: 'ma-160', saintId: 'st-bede', emotion: 'peaceful', actionText: 'Bede\'s last words were a translation of the Gospel of John. Spend 5 minutes reading a passage that has always meant something to you\u2014any book, any tradition. Let familiar words deepen rather than bore. Peace lives in depth.', estimatedMinutes: 5 },

  // St. Gemma Galgani — anxious, grateful
  { id: 'ma-161', saintId: 'st-gemma-galgani', emotion: 'anxious', actionText: 'Gemma turned her anxiety into intimate conversation with God. For 5 minutes, talk to God exactly as you would to your closest friend\u2014no religious language, just raw honesty about what\'s worrying you. He can handle it.', estimatedMinutes: 5 },
  { id: 'ma-162', saintId: 'st-gemma-galgani', emotion: 'grateful', actionText: 'Gemma was grateful even for her suffering, calling it "love\'s gift." Name one recent difficulty and find the hidden gift inside it\u2014strength you gained, empathy you developed, clarity you found. Thank God for the gift, not just the lesson.', estimatedMinutes: 5 },

  // St. Th\u00e9r\u00e8se Couderc — peaceful, grateful
  { id: 'ma-163', saintId: 'st-therese-couderc', emotion: 'peaceful', actionText: 'Th\u00e9r\u00e8se Couderc said self-surrender "is more than devotion\u2014it is more than anything." Practice total surrender for 5 minutes: release your schedule, your worries, your plans. Just exist. Peace is what remains when striving stops.', estimatedMinutes: 5 },
  { id: 'ma-164', saintId: 'st-therese-couderc', emotion: 'grateful', actionText: 'Th\u00e9r\u00e8se spent decades in obscurity after being removed from leadership. She found gratitude in hidden service. Do one act of service today that no one will notice or thank you for. Hidden gratitude is the purest kind.', estimatedMinutes: 10 },

  // St. Josaphat — overwhelmed, peaceful
  { id: 'ma-165', saintId: 'st-josaphat', emotion: 'overwhelmed', actionText: 'Josaphat worked for unity between Christians under impossible pressure. When relationships overwhelm you, focus on one bridge-building gesture today. Send one reconciling message. Unity is built one conversation at a time.', estimatedMinutes: 5 },
  { id: 'ma-166', saintId: 'st-josaphat', emotion: 'peaceful', actionText: 'Josaphat prayed for his killers as he died. Think of someone you disagree with. Spend 3 minutes genuinely wishing them well\u2014their health, their happiness, their peace. Wishing peace for others deepens your own.', estimatedMinutes: 5 },

  // St. Stanislaus Kostka — joyful, peaceful
  { id: 'ma-167', saintId: 'st-stanislaus-kostka', emotion: 'joyful', actionText: 'Stanislaus walked 450 miles for his vocation. Let your joy fuel one bold step today\u2014toward a goal, a dream, a conversation you\'ve been avoiding. Enthusiasm literally means "filled with God." Let God\'s energy move you.', estimatedMinutes: 10 },
  { id: 'ma-168', saintId: 'st-stanislaus-kostka', emotion: 'peaceful', actionText: 'Stanislaus died peacefully at 18 with his whole life ahead of him. Spend 5 minutes contemplating what you\'d want to be remembered for\u2014not your achievements, your character. Let that vision bring peace to today\'s choices.', estimatedMinutes: 5 },

  // St. Aloysius Gonzaga — scattered, peaceful
  { id: 'ma-169', saintId: 'st-aloysius-gonzaga', emotion: 'scattered', actionText: 'Aloysius renounced a noble title to focus on what mattered. What "title" or expectation can you renounce today\u2014perfectionism, people-pleasing, the need to impress? Name it and let it go. Freedom is focus.', estimatedMinutes: 5 },
  { id: 'ma-170', saintId: 'st-aloysius-gonzaga', emotion: 'peaceful', actionText: 'Aloysius served plague victims knowing it might kill him, and it did. He was at peace because he knew his purpose. Spend 5 minutes journaling: "I am at peace when I..." Complete the sentence. Let your answer guide today.', estimatedMinutes: 5 },
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
