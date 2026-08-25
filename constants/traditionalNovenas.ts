import { Novena } from '../types';

/**
 * Traditional novenas are published prayers shipped verbatim so they work
 * offline and never go through the AI generation path. Most pray the same
 * prayer each of the nine days; some publish a different text per day.
 *
 * Published text must not be edited (including its punctuation). Only the
 * placeholder below is swapped for the user's intention at render time.
 */

export const TRADITIONAL_ST_JUDE_ID = 'traditional-st-jude';
export const ST_JUDE_SAINT_ID = 'st-jude';
export const ST_JUDE_CATALOG_SLUG = 'st-jude-novena';

export const REQUEST_PLACEHOLDER = '(make your request here)';

export interface NovenaCalendar {
  startMonth: number;       // 1 to 12
  startDay: number;
  lastPrayerMonth: number;  // may differ from startMonth (windows can cross a month boundary)
  lastPrayerDay: number;
  feastMonth: number;       // may differ from startMonth
  feastDay: number;
}

export interface LabeledPrayer {
  label: string;
  text: string;
}

export interface TraditionalNovena extends Novena {
  source: 'traditional';
  /**
   * The published novena prayer, prayed the same each day. Contains the
   * request placeholder when the source has one. Empty when the novena
   * publishes a different text per day (see publishedDailyPrayers).
   */
  novenaPrayer: string;
  /** Nine published day texts, when the source gives a different text each day. */
  publishedDailyPrayers?: string[];
  /**
   * The exact placeholder the source uses for the user's request, or null
   * when the published text has none. Falls back to REQUEST_PLACEHOLDER.
   */
  requestPlaceholder?: string | null;
  /** The published block that follows the novena prayer, verbatim. */
  prayerBlock: string;
  /** Standard prayers said after the published text, in order. */
  commons: LabeledPrayer[];
  calendar: NovenaCalendar;
  sourceName: string;
  sourceUrl: string;
  /** Catalog slugs that should resolve to this traditional novena. */
  catalogSlugs: string[];
}

const OUR_FATHER: LabeledPrayer = {
  label: 'Our Father',
  text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
};

const HAIL_MARY: LabeledPrayer = {
  label: 'Hail Mary',
  text: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
};

const ST_JUDE_NOVENA_PRAYER =
  'Most holy Apostle, St. Jude, faithful servant and friend of Jesus, the Church honors and invokes you universally, as the patron of difficult cases, of things almost despaired of, Pray for me, I am so helpless and alone. Intercede with God for me that He bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need that I may receive the consolation and help of heaven in all my necessities, tribulations, and sufferings, particularly - (make your request here) - and that I may praise God with you and all the saints forever. I promise, O Blessed St. Jude, to be ever mindful of this great favor granted me by God and to always honor you as my special and powerful patron, and to gratefully encourage devotion to you. Amen';

const ST_JUDE_PRAYER_BLOCK = [
  'May the Most Sacred Heart of Jesus be adored, and loved in all the tabernacles until the end of time. Amen.',
  'May the most Sacred Heart of Jesus be praised and glorified now and forever. Amen',
  'St. Jude pray for us and hear our prayers. Amen.',
  'Blessed be the Sacred Heart of Jesus',
  'Blessed be the Immaculate Heart of Mary',
  'Blessed be St. Jude Thaddeus, in all the world and for all Eternity.',
].join('\n');

export const TRADITIONAL_ST_JUDE: TraditionalNovena = {
  id: TRADITIONAL_ST_JUDE_ID,
  saintId: ST_JUDE_SAINT_ID,
  source: 'traditional',
  title: 'St. Jude Novena',
  description: 'The published novena to St. Jude, patron of difficult cases and things almost despaired of. Nine days of the same published prayer.',
  novenaPrayer: ST_JUDE_NOVENA_PRAYER,
  prayerBlock: ST_JUDE_PRAYER_BLOCK,
  commons: [OUR_FATHER, HAIL_MARY],
  calendar: { startMonth: 10, startDay: 19, lastPrayerMonth: 10, lastPrayerDay: 27, feastMonth: 10, feastDay: 28 },
  sourceName: 'EWTN',
  sourceUrl: 'https://www.ewtn.com/catholicism/devotions/novena-to-st-jude--desperate-situations-and-hopeless-cases-305',
  catalogSlugs: [ST_JUDE_CATALOG_SLUG],
  intentionSuggestions: [
    'A situation that feels hopeless',
    'Healing for someone I love',
    'Help with a difficult case',
    'Strength when I feel alone',
  ],
  // Generic Novena fields, kept so the type stays compatible with existing
  // callers. The prayer screen uses novenaPrayer / prayerBlock / commons.
  openingPrayer: '',
  dailyPrayers: Array(9).fill(ST_JUDE_NOVENA_PRAYER),
  closingPrayer: ST_JUDE_PRAYER_BLOCK,
};

export const TRADITIONAL_HOLY_CROSS: TraditionalNovena = {
  id: "traditional-holy-cross",
  saintId: "holy-cross",
  source: 'traditional',
  title: "Holy Cross Novena",
  description: "The published Holy Cross novena from EWTN, prayed September 5 through September 13 before the feast of the Exaltation of the Holy Cross on September 14.",
  novenaPrayer: "Jesus, Who because of Your burning love for us willed to be crucified and to shed Your Most Precious Blood for the redemption and salvation of our souls, look down upon us and grant the petition we ask for... (mention here)\n\nWe trust completely in Your Mercy.\nCleanse us from sin by Your Grace,\nsanctify our work,\ngive us and all those who are dear to us our daily bread, lighten the burden of our sufferings,\nbless our families,\nand grant to the nations, so sorely afflicted,\nYour Peace, which is the only true peace, so that by obeying Your Commandments we may come at last to the glory of Heaven.",
  prayerBlock: "",
  commons: [],
  requestPlaceholder: "(mention here)",
  calendar: { startMonth: 9, startDay: 5, lastPrayerMonth: 9, lastPrayerDay: 13, feastMonth: 9, feastDay: 14 },
  sourceName: "EWTN",
  sourceUrl: "https://www.ewtn.com/catholicism/devotions/holy-cross-novena-279",
  catalogSlugs: [],
  intentionSuggestions: [
    "A cross I am carrying right now",
    "Strength for someone who is suffering",
    "Trust in God through a hard season",
    "A family member who has drifted from faith",
  ],
  openingPrayer: '',
  dailyPrayers: Array(9).fill("Jesus, Who because of Your burning love for us willed to be crucified and to shed Your Most Precious Blood for the redemption and salvation of our souls, look down upon us and grant the petition we ask for... (mention here)\n\nWe trust completely in Your Mercy.\nCleanse us from sin by Your Grace,\nsanctify our work,\ngive us and all those who are dear to us our daily bread, lighten the burden of our sufferings,\nbless our families,\nand grant to the nations, so sorely afflicted,\nYour Peace, which is the only true peace, so that by obeying Your Commandments we may come at last to the glory of Heaven."),
  closingPrayer: "",
};

const TRADITIONAL_OUR_LADY_OF_SORROWS_DAILY_PRAYERS: string[] = [
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father,\nand to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nLuke 7:11-15\n11 Soon afterward he went to a city called Na'in, and his disciples and a great crowd went with him.\n12 As he drew near to the gate of the city, behold, a man who had died was being carried out, the only son of his mother, and she was a widow; and a large crowd from the city was with her.\n13 And when the Lord saw her, he had compassion on her and said to her, 'Do not weep.'\n14 And he came and touched the bier, and the bearers stood still. And he said, 'Young man, I say to you, arise.'\n15 And the dead man sat up, and began to speak. And he gave him to his mother.\n\nPray for the Suffering Women of the World\nLabor day usually brings to mind images of factory workers, farmers or heavy equipment operators. Yet we also use labor to describe the first work which brought each one of us to birth: those first hours of maternal sacrifice which brought us into the world. It's too easy to forget that and all the other sacrifices which the vocation of motherhood entails. Pray for the mothers in labor today. Those who give birth. Those who work two jobs to support a child. Those who go without so their child's needs are met. Those whose patient endurance is a sign of God's love upon the cross.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nMatthew 1:18-23\n18 Now the birth of Jesus Christ took place in this way. When his mother Mary had been betrothed to Joseph, before they came together she was found to be with child of the Holy Spirit;\n19 and her husband Joseph, being a just man and unwilling to put her to shame, resolved to divorce her quietly.\n20 But as he considered this, behold, an angel of the Lord appeared to him in a dream, saying, 'Joseph, son of David, do not fear to take Mary your wife, for that which is conceived in her is of the Holy Spirit;\n21 she will bear a son, and you shall call his name Jesus, for he will save his people from their sins.'\n22 All this took place to fulfil what the Lord had spoken by the prophet:\n23 'Behold, a virgin shall conceive and bear a son, and his name shall be called Emmanuel' (which means, God with us).\n\nPray for Mothers who will Give Birth Today\n'At first I was scared,' Sarah told me. 'I was scared, excited and filled with the most incredible expectation. It was like those words we hear at Mass: we wait in joyful hope. I thought of all those women who feel the first kick, the stirrings of life deep within them. I prayed for them, that they would love their child, cherish their little baby and know that in being a mother they are involved in something so much bigger than themselves. They have been chosen by God to be custodians of the mystery of life. At first I was scared, and then I just cried... with joy.'",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nJohn 19: 25-27\n25 So the soldiers did this. But standing by the cross of Jesus were his mother, and his mother's sister, Mary the wife of Clopas, and Mary Mag'dalene.\n26 When Jesus saw his mother, and the disciple whom he loved standing near, he said to his mother, 'Woman, behold, your son!'\n27 Then he said to the disciple, 'Behold, your mother!' And from that hour the disciple took her to his own home.\n\nPray for Fathers at the Birth of their Child\n'At first I was petrified', Jon told me. 'Petrified that I would faint or get in the way or not know what to do to help Sarah. But then I prayed to Mary. I know, praying to Mary is something you'd think a mother would be doing. But somehow, I think Mary understood Saint Joseph more than anyone else. She probably saw the fear in his eyes and sensed the restlessness of his heart. She probably spent a lot of time praying for him as well. And when I prayed to Mary for my child about to be born, I knew she understood and heard me and prayed for me to her son. At first I was petrified, and then I put everything into God's hands.'",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nLuke 2:33-35\n33 And his father and his mother marveled at what was said about him;\n34 and Simeon blessed them and said to Mary his mother, 'Behold, this child is set for the fall and rising of many in Israel, and for a sign that is spoken against\n35 (and a sword will pierce through your own soul also), that thoughts out of many hearts may be revealed.'\n\nPray for all Children\nThe eyes of a child are an infinite well of life, hope and goodness. If you doubt the value of life, look into the eyes of a child. If you are worn by life's worries, look into the eyes of a child. If you want to see tomorrow, look into the eyes of a child. And what you will see is the divine spark which brought beauty out of chaos, the infinite beauty, which is the presence of the Creator in his creation.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nHebrews 5:7-9\n7 In the days of his flesh, Jesus offered up prayers and supplications, with loud cries and tears, to him who was able to save him from death, and he was heard for his godly fear.\n8 Although he was a Son, he learned obedience through what he suffered;\n9 and being made perfect he became the source of eternal salvation to all who obey him,\n\nPray for Families\nI know of a family which prays each night. Since the kids were little they are gathered from their games and their grumbling to the couch in the living room. There they pray for those whom they love and those they have a hard time loving. They pray for the unborn and for little babies. They pray for the sick and the dying. They pray for the Church and for their priest. Many a night it was the knowledge of those prayers that gave me hope and peace and a good night's sleep.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nColossians 3: 12 - 17\n12 Put on then, as God's chosen ones, holy and beloved, compassion, kindness, lowliness, meekness, and patience,\n13 forbearing one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.\n14 And above all these put on love, which binds everything together in perfect harmony.\n15 And let the peace of Christ rule in your hearts, to which indeed you were called in the one body. And be thankful.\n16 Let the word of Christ dwell in you richly, teach and admonish one another in all wisdom, and sing psalms and hymns and spiritual songs with thankfulness in your hearts to God.\n17 And whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.\n\nPray for Life Begins in the Home\nI know of another family which used to pray for unborn children every Friday night. They chose Friday because that's when Christ, innocent and without sin, was sent to the cross. There's no prayer more powerful than that said over little folded hands asking God to take care of all the babies who you've made.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nPsalms 31:2 - 6\n2 Incline thy ear to me, rescue me speedily! Be thou a rock of refuge for me, a strong fortress to save me!\n3 Yea, thou art my rock and my fortress; for thy name's sake lead me and guide me,\n4 take me out of the net which is hidden for me, for thou art my refuge.\n5 Into thy hand I commit my spirit; thou hast redeemed me, O LORD, faithful God.\n6 Thou hatest those who pay regard to vain idols; but I trust in the LORD.\n\nSecret Suffering\nWe look all around us at Church and see them: all the people whose kids never seem to scream and who look like they haven't a problem in the world! But what if we really knew them? We would see the 'secret sufferings' that mirror our own. Mass is the gathering of those who have looked at the their own brokenness through the lens of the cross, and live! Today is the perfect day to pray for all God's broken children and especially those who are tempted to break the lives of others.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven, that the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nPhilippians 2: 6 - 11\n6 who, though he was in the form of God, did not count equality with God a thing to be grasped,\n7 but emptied himself, taking the form of a servant, being born in the likeness of men.\n8 And being found in human form he humbled himself and became obedient unto death, even death on a cross.\n9 Therefore God has highly exalted him and bestowed on him the name which is above every name,\n10 that at the name of Jesus every knee should bow, in heaven and on earth and under the earth,\n11 and every tongue confess that Jesus Christ is Lord, to the glory of God the Father.\n\nThe Holy Cross\nEach time I pray, I am called to join my prayer with Christ's perfect prayer upon the cross. It is easy from the vantage of the cross to see the world clearly. To see how easy it is to join the suffering of the innocent to the suffering of him who is without sin. We should work for an end to all the forms of violence which threaten life. That is a wonderful good. But it is even more important to stand with the Virgin Mother and to beg her son to come to our aid.",
    "A Novena for Life\n\nGod, come to my assistance.\nLord, make haste to help me.\nGlory to the Father, and to the Son, and to the Holy Spirit.\n\nAs it was in the beginning, is now, and will be for ever. Amen.\n\nHoly Mother of God, hear the prayers of the Church for all mothers, especially those wearied by life and overcome by the suffering they bear for their children.\n\nHail Mary...\n\nO Mother of the Word Incarnate, intercede for them from your place in heaven,\nthat the mercy of your divine Son might lighten their burden and give them strength.\n\nHail Mary...\n\nGlory to the Father....\n\nPsalms 31: 15-16, 20\n15 My times are in thy hand; deliver me from the hand of my enemies and persecutors!\n16 Let thy face shine on thy servant; save me in thy steadfast love!\n20 In the covert of thy presence thou hidest them from the plots of men; thou holdest them safe under thy shelter from the strife of tongues.\n\nOur Lady of Sorrows\nWe end as we began nine days ago: with Mary, weeping silently beside the cross. Weeping for the innocent child so violently taken. Weeping for the nation which has let him die. Weeping for her child and for our, we place them both in her arms.",
];

export const TRADITIONAL_OUR_LADY_OF_SORROWS: TraditionalNovena = {
  id: "traditional-our-lady-of-sorrows",
  saintId: "our-lady-of-sorrows",
  source: 'traditional',
  title: "Nine Day Prayer for Life: Novena to Our Lady of Sorrows",
  description: "The published Nine Day Prayer for Life to Our Lady of Sorrows from EWTN, prayed September 7 through the feast of Our Lady of Sorrows on September 15.",
  novenaPrayer: "",
  publishedDailyPrayers: TRADITIONAL_OUR_LADY_OF_SORROWS_DAILY_PRAYERS,
  prayerBlock: "",
  commons: [{ label: "Glory Be", text: "Glory to the Father, and to the Son, and to the Holy Spirit.\nAs it was in the beginning, is now, and will be for ever. Amen." }, { label: "Hail Mary", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." }],
  requestPlaceholder: null,
  calendar: { startMonth: 9, startDay: 7, lastPrayerMonth: 9, lastPrayerDay: 15, feastMonth: 9, feastDay: 15 },
  sourceName: "EWTN",
  sourceUrl: "https://www.ewtn.com/catholicism/devotions/nine-day-prayer-for-life-novena-to-our-lady-of-sorrows-283",
  catalogSlugs: [],
  intentionSuggestions: [
    "A mother expecting a child",
    "Comfort for a grieving parent",
    "Protection of every unborn life",
    "Someone facing a hard pregnancy",
  ],
  openingPrayer: '',
  dailyPrayers: TRADITIONAL_OUR_LADY_OF_SORROWS_DAILY_PRAYERS,
  closingPrayer: "",
};

export const TRADITIONAL_HOLY_ROSARY: TraditionalNovena = {
  id: "traditional-holy-rosary",
  saintId: "our-lady-of-the-rosary",
  source: 'traditional',
  title: "Our Lady of the Holy Rosary Novena Prayer",
  description: "The published Our Lady of the Holy Rosary novena prayer from EWTN, prayed September 28 through October 6 before the feast of Our Lady of the Rosary on October 7.",
  novenaPrayer: "My dearest Mother Mary, behold me, your child, in prayer at your feet. Accept this Holy Rosary, which I offer you in accordance with your requests at Fatima, as a proof of my tender love for you, for the intentions of the Sacred Heart of Jesus, in atonement for the offenses committed against your Immaculate Heart, and for this special favor which I earnestly request in my Rosary Novena: (Mention your request).\n\nI beg you to present my petition to your Divine Son. If you will pray for me, I cannot be refused. I know, dearest Mother, that you want me to seek God's holy Will concerning my request. If what I ask for should not be granted, pray that I may receive that which will be of greater benefit to my soul.\n\nI offer you this spiritual Bouquet of Roses because I love you. I put all my confidence in you, since your prayers before God are most powerful. For the greater glory of God and for the sake of Jesus, your loving Son, hear and grant my prayer. Sweet Heart of Mary, be my salvation.",
  prayerBlock: "",
  commons: [],
  requestPlaceholder: "(Mention your request).",
  calendar: { startMonth: 9, startDay: 28, lastPrayerMonth: 10, lastPrayerDay: 6, feastMonth: 10, feastDay: 7 },
  sourceName: "EWTN",
  sourceUrl: "https://www.ewtn.com/catholicism/devotions/our-lady-of-the-holy-rosary-novena-prayer-315",
  catalogSlugs: [],
  intentionSuggestions: [
    "Peace in my home",
    "A deeper prayer life",
    "Conversion of someone I love",
    "Protection for my family",
  ],
  openingPrayer: '',
  dailyPrayers: Array(9).fill("My dearest Mother Mary, behold me, your child, in prayer at your feet. Accept this Holy Rosary, which I offer you in accordance with your requests at Fatima, as a proof of my tender love for you, for the intentions of the Sacred Heart of Jesus, in atonement for the offenses committed against your Immaculate Heart, and for this special favor which I earnestly request in my Rosary Novena: (Mention your request).\n\nI beg you to present my petition to your Divine Son. If you will pray for me, I cannot be refused. I know, dearest Mother, that you want me to seek God's holy Will concerning my request. If what I ask for should not be granted, pray that I may receive that which will be of greater benefit to my soul.\n\nI offer you this spiritual Bouquet of Roses because I love you. I put all my confidence in you, since your prayers before God are most powerful. For the greater glory of God and for the sake of Jesus, your loving Son, hear and grant my prayer. Sweet Heart of Mary, be my salvation."),
  closingPrayer: "",
};

export const TRADITIONAL_OUR_LADY_OF_GOOD_REMEDY: TraditionalNovena = {
  id: "traditional-our-lady-of-good-remedy",
  saintId: "our-lady-of-good-remedy",
  source: 'traditional',
  title: "Our Lady of Good Remedy Novena",
  description: "The published Our Lady of Good Remedy novena from EWTN, prayed September 29 through October 7 before the feast on October 8.",
  novenaPrayer: "O QUEEN OF HEAVEN AND EARTH, Most Holy Virgin, we venerate thee. Thou art the beloved Daughter of the Most High God, the chosen Mother of the Incarnate Word, the Immaculate Spouse of the Holy Spirit, the Sacred Vessel of the Most Holy Trinity.\nO Mother of the Divine Redeemer, who under the title of Our Lady of Good Remedy comes to the aid of all who call upon thee, extend thy maternal protection to us. We depend on thee, Dear Mother, as helpless and needy children depend on a tender and caring mother.\n\nHail, Mary... .\n\nO LADY OF GOOD REMEDY, source of unfailing help, grant that we may draw from thy treasury of graces in our time of need.\nTouch the hearts of sinners, that they may seek reconciliation and forgiveness. Bring comfort to the afflicted and the lonely; help the poor and the hopeless; aid the sick and the suffering. May they be healed in body and strengthened in spirit to endure their sufferings with patient resignation and Christian fortitude.\n\nHail, Mary... .\n\nDEAR LADY OF GOOD REMEDY, source of unfailing help, thy compassionate heart knows a remedy for every affliction and misery we encounter in life. Help me with thy prayers and intercession to find a remedy for my problems and needs, especially for...\n(Indicate your special intentions here).\nOn my part, O loving Mother, I pledge myself to a more intensely Christian lifestyle, to a more careful observance of the laws of God, to be more conscientious in fulfilling the obligations of my state in life, and to strive to be a source of healing in this broken world of ours.\nDear Lady of Good Remedy, be ever present to me, and through thy intercession, may I enjoy health of body and peace of mind, and grow stronger in the faith and in the love of thy Son, Jesus.\n\nHail, Mary... . .",
  prayerBlock: "V. Pray for us, O Holy Mother of Good Remedy,\nR. That we may deepen our dedication to thy Son, and make the world alive with His Spirit.",
  commons: [{ label: "Hail Mary", text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen." }],
  requestPlaceholder: "(Indicate your special intentions here).",
  calendar: { startMonth: 9, startDay: 29, lastPrayerMonth: 10, lastPrayerDay: 7, feastMonth: 10, feastDay: 8 },
  sourceName: "EWTN",
  sourceUrl: "https://www.ewtn.com/catholicism/devotions/our-lady-of-good-remedy-novena-313",
  catalogSlugs: [],
  intentionSuggestions: [
    "Help with money troubles",
    "Healing for a sick relative",
    "A way out of a stuck situation",
    "Freedom from a bad habit",
  ],
  openingPrayer: '',
  dailyPrayers: Array(9).fill("O QUEEN OF HEAVEN AND EARTH, Most Holy Virgin, we venerate thee. Thou art the beloved Daughter of the Most High God, the chosen Mother of the Incarnate Word, the Immaculate Spouse of the Holy Spirit, the Sacred Vessel of the Most Holy Trinity.\nO Mother of the Divine Redeemer, who under the title of Our Lady of Good Remedy comes to the aid of all who call upon thee, extend thy maternal protection to us. We depend on thee, Dear Mother, as helpless and needy children depend on a tender and caring mother.\n\nHail, Mary... .\n\nO LADY OF GOOD REMEDY, source of unfailing help, grant that we may draw from thy treasury of graces in our time of need.\nTouch the hearts of sinners, that they may seek reconciliation and forgiveness. Bring comfort to the afflicted and the lonely; help the poor and the hopeless; aid the sick and the suffering. May they be healed in body and strengthened in spirit to endure their sufferings with patient resignation and Christian fortitude.\n\nHail, Mary... .\n\nDEAR LADY OF GOOD REMEDY, source of unfailing help, thy compassionate heart knows a remedy for every affliction and misery we encounter in life. Help me with thy prayers and intercession to find a remedy for my problems and needs, especially for...\n(Indicate your special intentions here).\nOn my part, O loving Mother, I pledge myself to a more intensely Christian lifestyle, to a more careful observance of the laws of God, to be more conscientious in fulfilling the obligations of my state in life, and to strive to be a source of healing in this broken world of ours.\nDear Lady of Good Remedy, be ever present to me, and through thy intercession, may I enjoy health of body and peace of mind, and grow stronger in the faith and in the love of thy Son, Jesus.\n\nHail, Mary... . ."),
  closingPrayer: "V. Pray for us, O Holy Mother of Good Remedy,\nR. That we may deepen our dedication to thy Son, and make the world alive with His Spirit.",
};

export const TRADITIONAL_ST_GERARD: TraditionalNovena = {
  id: "traditional-st-gerard",
  saintId: "st-gerard",
  source: 'traditional',
  title: "Novena to Saint Gerard",
  description: "The published novena to Saint Gerard from EWTN, prayed October 7 through October 15 before his feast on October 16.",
  novenaPrayer: "Most Blessed Trinity, I, Your child, thank You for all the gifts and privileges which You granted to St. Gerard, especially for those virtues with which You adorned him on earth and the glory which You now impart to him in heaven. Accomplish Your work, Oh Lord, so that Your kingdom may come about on earth. Through his merits, in union with those of Jesus and Mary, grant me the grace for which I ask.... (Mention your request)\n\nAnd you, my powerful intercessor, St. Gerard, always so ready to help those who have recourse to you, pray for me. Come before the throne of Divine Mercy and do not leave without being heard. To you I confide this important and urgent affair.... Graciously take my cause in hand and do not let me end this novena without having experienced in some way the effects of your intercession. Amen.",
  prayerBlock: "",
  commons: [],
  requestPlaceholder: "(Mention your request)",
  calendar: { startMonth: 10, startDay: 7, lastPrayerMonth: 10, lastPrayerDay: 15, feastMonth: 10, feastDay: 16 },
  sourceName: "EWTN",
  sourceUrl: "https://www.ewtn.com/catholicism/devotions/novena-to-saint-gerard-300",
  catalogSlugs: [],
  intentionSuggestions: [
    "A safe pregnancy and delivery",
    "A couple hoping for a child",
    "A sick child in the family",
    "Patience with my own children",
  ],
  openingPrayer: '',
  dailyPrayers: Array(9).fill("Most Blessed Trinity, I, Your child, thank You for all the gifts and privileges which You granted to St. Gerard, especially for those virtues with which You adorned him on earth and the glory which You now impart to him in heaven. Accomplish Your work, Oh Lord, so that Your kingdom may come about on earth. Through his merits, in union with those of Jesus and Mary, grant me the grace for which I ask.... (Mention your request)\n\nAnd you, my powerful intercessor, St. Gerard, always so ready to help those who have recourse to you, pray for me. Come before the throne of Divine Mercy and do not leave without being heard. To you I confide this important and urgent affair.... Graciously take my cause in hand and do not let me end this novena without having experienced in some way the effects of your intercession. Amen."),
  closingPrayer: "",
};

const TRADITIONAL_MENTAL_HEALTH_DAILY_PRAYERS: string[] = [
    "Good St. Dymphna, great wonder worker in every affliction of mind and body, we humbly implore your powerful intercession with Jesus through Mary, for the health of the sick.\n\nSt. Dymphna, patroness of persons with mental health conditions, always look out for those men and women, for their healing and recovery, and for an end to stigma and indifference in society.\n\nAmen.\n\nSt. Dymphna, pray for us.",
    "Lord Jesus, may our families draw ever closer to you and to one another.\n\nWe lift up all families, particularly those with members facing mental health challenges.\n\nMay family members help remove the stigma surrounding mental health challenges, both within their families and in their communities.\n\nComfort, hold, lead to safety, and heal families affected by every form of trauma, mental health challenge, and mental illness.\n\nYou know every family’s specific situation, wounds and needs, and you can restore and make all things new.\n\nLord, pour your grace into their hearts, minds, souls, and bodies, filling them with light and peace amid their suffering.\n\nHelp all families, unite their suffering to your Passion and Death, mindful of the resurrection to new life to come.\n\nAmen.\n\nHoly Family, pray for us.",
    "Lord, we pray that our brothers and sisters who suffer from mental illness and mental health challenges, and those who support them, are never alone or discriminated against, but instead are welcomed and supported in the Church.\n\nWe pray that mental health ministry becomes an integral ministry in the Church, and that every Catholic parish and community might have access to mental health ministries.\n\nWe pray that mental health ministries will help build communities of warmth and affection where those who face mental health challenges will, in the words of Pope Francis, “find support and a light that opens them up to life.”\n\nSt. John of God, pray for us.",
    "Jesus, you chose to enter this world as a child, and as an adult, you said \"[l]et the children come to me\" (Mt 19:14).\n\nYour infinite beauty is so clear in the face of every child.\n\nYet we do not always know how to love and care for children the way they deserve.\nTeach us to love children more deeply and to respect their journey of growth, always modeling Christ’s peace to them.\n\nWe pray particularly for children coping with mental illness and mental health challenges, and we resolve to work ever harder for systems that support children and help them thrive.\n\nAmen.\n\nSt. Thérèse of Lisieux, pray for us.",
    "Jesus,\n\nWe pray that, through your holy presence and through us, you might give youth and young adults peace and hope today, as they may face isolation, pressure, loneliness, and marginalization, all of which can affect their mental health and wellness.\n\nHelp us, we pray, to encounter and accompany the young people in our lives.\n\nGive us the courage to advocate for their well-being and respond with pastoral urgency to their needs and concerns.\n\nWe make this prayer in the name of Jesus Christ, our Lord and Savior, “himself eternally young [who] wants to give us hearts that are ever young” (Christus Vivit, no. 13).\n\nAmen.\n\nSt. Kateri Tekakwitha, pray for us.",
    "Most gracious and loving God, help me to understand better the sin of racial injustice.\n\nHelp me to examine my own biases and prejudices first.\n\nI pray for humility and generosity of spirit to recognize that we are all wonderfully made; the differences in skin color, language, and traditions are the artistry of your love.\n\nI pray to live as St. Martin de Porres – he challenges me to rise above my ego, and to live the two main principles of your commandments: love of God and love of neighbor.\n\nIn Jesus’ name, I profess the inherent dignity of every person.\n\nSt. Martin de Porres, pray for us.",
    "Embracing Father,\n\nYou grace each of us with equal measure in your love. Let us learn to love our neighbors more deeply, so that we can create peaceful and just communities.\n\nInspire us to use our creative energies to build the structures we need to overcome the obstacles of intolerance and indifference.\n\nMay Jesus provide us the example needed and send the Spirit to warm our hearts for the journey.\n\nAmen.\n\n(Prayer for Community)\n\nSt. Teresa of Calcutta, pray for us.",
    "Ever loving God, we commend to your mercy all who are contemplating suicide this day. Bring someone or something to intervene.\n\nWe pray for our community leaders and officials to come to an understanding of the need for laws, policies, and funding for effective mental health care and suicide prevention programs.\n\nWe pray for all who have died by suicide.\n\nMay Mother Mary carry them into the loving arms of her son Jesus, asking him to grant them complete joy, without the pain of heart and mind that led to suicide.\n\nServant of God Dorothy Day, pray for us.",
    "Jesus, grief is part of the human experience. Even you wept at the death of Lazarus, your friend.\n\nYet, even in the darkest moments, you taught us that our grief will become joy when your victory comes to fulfillment in us.\n\nHelp us, we pray, not to lose hope in you when we grieve, but to continue to live the Kingdom of heaven by our love and service to each other.\n\nWe make this prayer in your name, O Lord.\n\nAmen.\n\nSt. Jane Frances de Chantal, pray for us.",
];

export const TRADITIONAL_MENTAL_HEALTH: TraditionalNovena = {
  id: "traditional-mental-health",
  saintId: "mental-health",
  source: 'traditional',
  title: "Novena for Mental Health",
  description: "The published USCCB Novena for Mental Health, prayed October 10, World Mental Health Day, through the feast of St. Luke on October 18.",
  novenaPrayer: "",
  publishedDailyPrayers: TRADITIONAL_MENTAL_HEALTH_DAILY_PRAYERS,
  prayerBlock: "",
  commons: [],
  requestPlaceholder: null,
  calendar: { startMonth: 10, startDay: 10, lastPrayerMonth: 10, lastPrayerDay: 18, feastMonth: 10, feastDay: 18 },
  sourceName: "USCCB",
  sourceUrl: "https://www.usccb.org/mental-health-novena",
  catalogSlugs: [],
  intentionSuggestions: [
    "Someone struggling with anxiety or depression",
    "Peace of mind for myself",
    "A friend in recovery",
    "Families caring for a loved one",
  ],
  openingPrayer: '',
  dailyPrayers: TRADITIONAL_MENTAL_HEALTH_DAILY_PRAYERS,
  closingPrayer: "",
};

export const TRADITIONAL_NOVENAS: TraditionalNovena[] = [
  TRADITIONAL_ST_JUDE,
  TRADITIONAL_HOLY_CROSS,
  TRADITIONAL_OUR_LADY_OF_SORROWS,
  TRADITIONAL_HOLY_ROSARY,
  TRADITIONAL_OUR_LADY_OF_GOOD_REMEDY,
  TRADITIONAL_ST_GERARD,
  TRADITIONAL_MENTAL_HEALTH,
];

export function listTraditionalNovenas(): TraditionalNovena[] {
  return TRADITIONAL_NOVENAS;
}

export function getTraditionalNovenaById(id: string): TraditionalNovena | undefined {
  return TRADITIONAL_NOVENAS.find((n) => n.id === id);
}

export function getTraditionalNovenaBySaintId(saintId: string): TraditionalNovena | undefined {
  return TRADITIONAL_NOVENAS.find((n) => n.saintId === saintId || n.catalogSlugs.includes(saintId));
}

export function isTraditionalNovenaId(id: string | undefined | null): boolean {
  return !!id && TRADITIONAL_NOVENAS.some((n) => n.id === id);
}

/** Splits the published prayer around the request placeholder, keeping the published punctuation. */
export function splitAtRequestPlaceholder(
  prayer: string,
  placeholder: string | null | undefined = REQUEST_PLACEHOLDER
): { before: string; after: string } | null {
  if (!placeholder) return null;
  const index = prayer.indexOf(placeholder);
  if (index === -1) return null;
  return {
    before: prayer.slice(0, index),
    after: prayer.slice(index + placeholder.length),
  };
}

/** True when the novena publishes a distinct text for each of the nine days. */
export function hasPublishedDailyPrayers(novena: TraditionalNovena): boolean {
  return novena.publishedDailyPrayers?.length === 9;
}

function localMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * The novena window whose start falls in `year`, at local midnight. If the
 * last prayer day or feast day falls in an earlier month than the start
 * (e.g. a late-December start), they roll into the following year.
 */
export function calendarWindow(
  calendar: NovenaCalendar,
  year: number
): { start: Date; lastPrayer: Date; feast: Date } {
  const start = new Date(year, calendar.startMonth - 1, calendar.startDay);
  const lastPrayerYear = calendar.lastPrayerMonth < calendar.startMonth ? year + 1 : year;
  const lastPrayer = new Date(lastPrayerYear, calendar.lastPrayerMonth - 1, calendar.lastPrayerDay);
  const feastYear = calendar.feastMonth < calendar.startMonth ? year + 1 : year;
  const feast = new Date(feastYear, calendar.feastMonth - 1, calendar.feastDay);
  return { start, lastPrayer, feast };
}

/** True if today falls between start and last prayer day inclusive. */
export function isOnNow(calendar: NovenaCalendar, now: Date = new Date()): boolean {
  const today = localMidnight(now);
  // Check the current year's window and the previous year's (which may
  // still be running if the window crossed a year boundary).
  for (const year of [today.getFullYear(), today.getFullYear() - 1]) {
    const { start, lastPrayer } = calendarWindow(calendar, year);
    if (today >= start && today <= lastPrayer) return true;
  }
  return false;
}

/** Year of the next start date (today counts as still upcoming). */
export function nextStartYear(calendar: NovenaCalendar, now: Date = new Date()): number {
  const year = now.getFullYear();
  const { start } = calendarWindow(calendar, year);
  const today = localMidnight(now);
  return today <= start ? year : year + 1;
}

export function nextStartDate(calendar: NovenaCalendar, now: Date = new Date()): Date {
  return calendarWindow(calendar, nextStartYear(calendar, now)).start;
}

/** Whole days until the next start. 0 if the novena is on now or starts today. */
export function daysUntilStart(calendar: NovenaCalendar, now: Date = new Date()): number {
  if (isOnNow(calendar, now)) return 0;
  const today = localMidnight(now);
  const start = nextStartDate(calendar, now);
  return Math.max(0, Math.round((start.getTime() - today.getTime()) / MS_PER_DAY));
}

export function listTraditionalNovenasOnNow(now: Date = new Date()): TraditionalNovena[] {
  return TRADITIONAL_NOVENAS.filter((n) => isOnNow(n.calendar, now));
}

/** Novenas not currently on, sorted by soonest next start. */
export function listTraditionalNovenasUpcoming(now: Date = new Date()): TraditionalNovena[] {
  return TRADITIONAL_NOVENAS
    .filter((n) => !isOnNow(n.calendar, now))
    .sort((a, b) => nextStartDate(a.calendar, now).getTime() - nextStartDate(b.calendar, now).getTime());
}

export function nextJudeStartYear(now: Date = new Date()): number {
  return nextStartYear(TRADITIONAL_ST_JUDE.calendar, now);
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatCalendarDay(month: number, day: number): string {
  return `${MONTH_NAMES[month - 1]} ${day}`;
}

/** Short window copy for cards, e.g. "Starts Oct 19. Last prayer day Oct 27. Feast day Oct 28." */
export function describeCalendar(calendar: NovenaCalendar): string {
  return `Starts ${formatCalendarDay(calendar.startMonth, calendar.startDay)}. Last prayer day ${formatCalendarDay(calendar.lastPrayerMonth, calendar.lastPrayerDay)}. Feast day ${formatCalendarDay(calendar.feastMonth, calendar.feastDay)}.`;
}
