# Saint Match — Landing Page & Legal Pages Specification

Create a marketing landing page and three legal compliance pages for **Saint Match** as a React web application.

---

## App Details

- **App Name:** Saint Match
- **Tagline:** Daily wisdom from the saints for your modern life
- **Description:** Saint Match helps Catholics practice daily virtue through personalized challenges inspired by Catholic saints — "Duolingo for becoming a better person." Each day, share how you're feeling, get matched with a saint who walked a similar path, and receive a simple micro-challenge you can complete in minutes. Start guided 9-day novenas with AI-personalized prayers for any saint you discover. Currently free during beta with all features unlocked.
- **Killer Feature:** AI-powered saint matching — tell the app how you're feeling (or type it in your own words) and get matched with a saint whose life and virtues speak directly to your situation, along with a personalized micro-action inspired by their example. Plus guided novenas with AI-generated prayers tailored to your personal intention.
- **Target Users:** Catholics (and those curious about the faith) who want to grow in virtue through small daily practices, guided by the wisdom of the saints
- **Pricing Model:** Completely free during beta (all features unlocked, no limits). Future plans: Free tier (3 matches/week), Pro Monthly ($7.99/mo), Pro Annual ($79/yr) with unlimited matches, full Virtue Portfolio analytics, and streak protection.
- **Support Email:** support@saintmatch.app
- **Platform:** iOS & Android (React Native / Expo)
- **Third-Party Services:** Supabase (authentication, database, edge functions), Anthropic Claude API (AI saint matching & novena prayer generation), RevenueCat (in-app purchases — dormant during beta), Expo Notifications

**Domain-Specific Disclaimers:** Saint Match is a devotional tool and is not affiliated with, endorsed by, or a substitute for the Catholic Church, its sacraments, or pastoral guidance. AI-generated content (saint matches, novena prayers) is intended for personal reflection and should not be considered official Church teaching. Always consult your parish priest or spiritual director for matters of faith and morals.

---

## Color Palette

- **Primary Background:** #F5F1EA (warm cream)
- **Primary:** #7A8F70 (sage green)
- **Secondary:** #C96B55 (terracotta)
- **Text:** #2D2A26 (warm charcoal)
- **Muted:** #6B665E (charcoal muted)

## Typography

- **Headings:** Cormorant Garamond (elegant serif)
- **Body:** DM Sans (friendly modern sans-serif)

## Visual Style

Warm, contemplative, and inviting. Cream backgrounds with sage green and terracotta accents. Soft shadows, generous whitespace, rounded corners. The aesthetic evokes a peaceful chapel or a well-loved prayer journal — reverent but approachable, never sterile or corporate.

---

## Page 1: Landing Page (/)

### Hero Section

- **Headline:** Meet the Saint Who Gets You
- **Subheadline:** AI-powered saint matching, daily virtue challenges & guided novenas — completely free during beta
- **Description:** Share how you're feeling. Get matched with a saint who walked your path. Accept a micro-challenge to grow in virtue. Start a 9-day novena with AI-personalized prayers. All free, no limits.
- **Primary CTA:** Download Free — Join the Beta
- **Secondary CTA:** See How It Works
- **Hero Image:** A warm illustration of a phone screen showing the saint match interface, with soft sage and terracotta gradients radiating outward, surrounded by subtle cross and halo motifs

### Features Section

**Title:** Everything You Need to Grow in Virtue — Free During Beta

**Features:**

1. **AI Saint Matching:** Tell us how you're feeling — choose from six moods or type it in your own words — and our AI matches you with a saint whose life and virtues speak directly to your situation.
2. **Daily Micro-Challenges:** Receive a simple, practical action inspired by your matched saint — something meaningful you can complete in just 5–15 minutes.
3. **Guided Novenas with AI Prayers:** Start a 9-day prayer journey with any saint you discover. Our AI generates opening, daily, and closing prayers personalized to your intention, with daily progress tracking.
4. **Virtue Portfolio & Streaks:** Collect saints as you complete challenges. Track your streaks on a visual calendar, view journey stats, and export your portfolio as a beautiful PDF.

### How It Works Section

**Title:** Three Steps to Daily Virtue

**Steps:**

1. **Share Your Heart** — Select from six moods (Seeking Peace, Need Focus, Want to Grow, Feeling Grateful, Full of Joy, Ready to Serve) or describe how you're feeling in your own words.
2. **Meet Your Saint** — Our AI draws from the full calendar of Catholic saints to find one whose life and virtues match your moment. Learn their story, feast day, and why they're your guide today.
3. **Grow Every Day** — Accept a micro-challenge inspired by your saint, build your streak, and deepen the connection by starting a guided 9-day novena with AI-personalized prayers.

### Problem/Solution Section

**Title:** Faith Meets Your Real Life

**Problem → Solution pairs:**

- "I want to grow spiritually but don't know where to start" → Saint Match gives you one simple, concrete step each day — no overwhelm, just growth. And it's completely free during beta.
- "I feel disconnected from the saints — they seem distant and unreachable" → Meet saints who struggled with the exact same emotions you're feeling right now, and walk with them through a 9-day novena.
- "I can never keep up with long devotional programs" → Micro-challenges take just 5–15 minutes. Novenas break prayer into manageable daily moments. Build a streak at your own pace with built-in streak freezes.
- "Generic devotional apps don't speak to what I'm going through today" → AI-powered matching ensures every saint, challenge, and novena prayer is personally relevant to your current state of heart.

### Free Beta Section

**Title:** 100% Free During Beta — Every Feature Unlocked

**Content:** We're building Saint Match with our community. During the beta, every feature is completely free — no paywalls, no limits, no credit card required. Help us shape the future of daily virtue practice.

**Features list:**
- Unlimited AI saint matches
- Guided novenas with AI-personalized prayers
- Full Virtue Portfolio with PDF export
- Streak tracking with weekly freeze
- Custom mood input — describe how you feel in your own words
- Offline mode — works without internet
- Cross-device sync via email linking

**CTA:** Download Free — Join the Beta

### Final CTA Section

- **Headline:** Your Journey Starts with One Small Step
- **Subheadline:** Join Catholics growing in virtue — one saint, one challenge, one novena at a time. Free during beta.
- **CTA Button:** Download Saint Match Free

### Footer

- **Logo:** Saint Match cross-and-halo icon in sage green
- **Tagline:** Daily virtue challenges from the saints
- **Links:** Support | Terms | Privacy
- **Email:** support@saintmatch.app
- **Copyright:** © 2026 Saint Match. All rights reserved.

---

## Page 2: Support (/support)

### App Overview

Saint Match helps you grow in virtue through daily, personalized challenges inspired by Catholic saints. Each day, share how you're feeling, get matched with a saint, accept a micro-challenge, and build your streak. You can also start guided 9-day novenas with AI-personalized prayers for any saint you discover. The app is completely free during the beta period with all features unlocked.

### Getting Started

1. Download Saint Match from the App Store or Google Play — it's free during beta
2. Open the app and complete the brief onboarding (3 slides)
3. On the Home screen, select a mood that matches how you're feeling — or tap "What's on Your Heart?" to describe it in your own words
4. Review your saint match, read their story, and tap "Accept Challenge"
5. Complete the micro-challenge anytime during the day, then mark it done to build your streak
6. Optionally, tap "Start a Novena" on any saint match screen to begin a guided 9-day prayer journey

### Feature Explanations

- **Mood Selection:** Choose from six preset moods (Seeking Peace, Need Focus, Want to Grow, Feeling Grateful, Full of Joy, Ready to Serve) or write a custom description of how you're feeling (10–120 characters). The AI uses this to find the perfect saint match.
- **Saint Matching:** Our AI draws from the full calendar of Catholic saints to find one whose virtues and life experience speak to your current state. Each match includes the saint's biography, feast day, virtues, and a personalized explanation of why they were chosen for you.
- **Micro-Challenges:** Each saint match comes with a practical action you can complete in 5–15 minutes. These are inspired by the saint's example and designed to help you grow in a specific virtue.
- **Guided Novenas:** Start a 9-day prayer journey with any saint you discover. Enter a personal intention, and our AI generates an opening prayer, nine daily prayers, and a closing prayer — all personalized to your intention and the saint's charism. Track your daily progress and add a reflection when complete.
- **Streak Calendar:** Track your daily challenge completions on a visual month-by-month calendar. Build streaks to stay motivated, with one free streak freeze per week that activates automatically.
- **Virtue Portfolio:** Collect saints as you complete challenges. View journey stats (total challenges, current streak, longest streak, saints discovered), browse your weekly mini-calendar, and export your entire portfolio as a PDF.
- **Account Linking:** Your data starts as anonymous and is stored locally on your device. Link an email in Settings to enable cross-device sync via Supabase.

### Troubleshooting

1. **App won't load or shows a blank screen:** Force-close the app and reopen it. If the issue persists, check your internet connection — the app works offline but needs connectivity for the initial setup.
2. **Saint match is taking too long:** AI matching typically takes 3–5 seconds. If it takes longer, you may have a slow connection. The app will automatically fall back to local matching if the server is unreachable.
3. **My streak was lost:** If you miss a day, your streak resets automatically. You get one free streak freeze per week — it activates automatically if you miss a single day. Check the Streak Calendar to verify your completion history.
4. **I keep getting the same saints:** The app tracks your match history and sends it to the AI to ensure variety. Try using different moods or the custom "What's on Your Heart?" option for more diverse results.
5. **Novena prayers didn't generate:** AI prayer generation requires an internet connection. If you started a novena offline, prayers will use a default template. Reconnect to the internet and try again.
6. **I can't find my data after reinstalling:** If you didn't link an email before reinstalling, your local data may be lost. Link your email in Settings > Account > Link Account to enable cloud backup for future protection.

### FAQ

**Q: Is Saint Match really free?**
A: Yes! Saint Match is completely free during the beta period — every feature is fully unlocked with no limits. No credit card required. In the future, we may introduce a free tier (3 matches/week) and a Pro subscription for unlimited access.

**Q: Is Saint Match affiliated with the Catholic Church?**
A: No. Saint Match is an independent devotional tool. It is not affiliated with, endorsed by, or a substitute for the Catholic Church, its sacraments, or pastoral guidance. Always consult your parish priest or spiritual director for matters of faith and morals.

**Q: How does the AI saint matching work?**
A: When you select a mood or describe how you're feeling, we send your input to an AI model (Claude by Anthropic) that draws from its knowledge of Catholic saints to find one whose virtues and life experience speak to your situation. The AI also generates a personalized micro-challenge and explains why this saint was chosen for you.

**Q: How do guided novenas work?**
A: On any saint match screen, you can choose to start a 9-day novena with that saint. Enter a personal intention, and our AI generates personalized prayers — an opening prayer, nine unique daily prayers, and a closing prayer. You pray one day at a time, tracking your progress in the app. At the end, you can record a reflection on your experience.

**Q: Is my data private?**
A: Yes. Your data is stored locally on your device by default. If you link an email, your data syncs to our secure Supabase cloud database. We never sell your data or share it with third parties. See our Privacy Policy for full details.

**Q: Does the app work offline?**
A: Yes. Saint Match is designed offline-first. Your streaks, completions, novenas, and portfolio are stored locally and available without internet. AI-powered matching and prayer generation require connectivity, but the app falls back to local saint matching when offline.

**Q: What denominations is this app for?**
A: Saint Match is designed primarily for Catholics, as it draws from the Catholic calendar of saints. However, anyone interested in learning from the lives of the saints and growing in virtue is welcome to use the app.

**Q: How do I delete my account and data?**
A: Go to Settings > Your Data > Delete Account. This permanently deletes all your data from both your device and our servers. This action cannot be undone.

### Contact

For questions, feedback, or support, email us at support@saintmatch.app. We typically respond within 24–48 hours.

---

## Page 3: Terms of Service (/terms)

**Last Updated:** February 11, 2026

**1. Acceptance of Terms**
By downloading, installing, or using Saint Match ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App. We may update these Terms from time to time, and your continued use of the App after changes are posted constitutes acceptance of the updated Terms.

**2. Description of Service**
Saint Match is a mobile application that provides daily virtue-building challenges inspired by Catholic saints. The App uses artificial intelligence to match users with saints based on their emotional state, provides personalized micro-challenges, streak tracking, guided 9-day novenas with AI-generated prayers, and a virtue portfolio. The App is currently offered free during the beta period. The App is a devotional tool and is not affiliated with, endorsed by, or a substitute for the Catholic Church, its sacraments, or pastoral guidance.

**3. User Accounts**
The App creates an anonymous account on your behalf using Supabase Authentication when you first open the App. No personal information is required to start using the App. You may optionally link an email address to enable cross-device synchronization. You are responsible for maintaining the confidentiality of your account and any linked credentials.

**4. Acceptable Use**
You agree to use the App only for its intended purpose of personal spiritual growth and reflection. You may not: (a) reverse-engineer, decompile, or disassemble the App; (b) attempt to gain unauthorized access to our servers or databases; (c) use the App to transmit harmful, offensive, or illegal content; (d) use the App for any commercial purpose without our prior written consent; (e) interfere with or disrupt the App's functionality or servers.

**5. Payment Terms**
Saint Match is currently offered free of charge during the beta period with all features unlocked. Future pricing may include a free tier with limited features and paid Pro subscriptions (monthly at $7.99/mo and annual at $79/yr). In-app purchases, when available, will be processed through Apple App Store or Google Play Store and are subject to their respective terms. Subscription management, cancellations, and refunds are handled through RevenueCat and the respective app store. All prices are in USD unless otherwise stated.

**6. AI-Generated Content Disclaimer**
The App uses artificial intelligence (Anthropic Claude) to generate saint matches, match explanations, and novena prayers. This AI-generated content may contain inaccuracies regarding saints' lives, virtues, feast days, or Catholic teaching. All AI-generated content is intended for personal devotional reflection only and should not be considered official Catholic teaching, theological advice, or pastoral guidance. We do not guarantee the theological accuracy, completeness, or reliability of any AI-generated content. Always consult qualified religious authorities for matters of faith and morals.

**7. Limitation of Liability**
TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAINT MATCH AND ITS DEVELOPERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF STREAKS, OR SPIRITUAL HARM, ARISING FROM YOUR USE OF THE APP. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE APP IN THE 12 MONTHS PRECEDING THE CLAIM, OR $50, WHICHEVER IS GREATER.

**8. Intellectual Property**
The App, including its design, code, content, icons, and brand identity, is owned by Saint Match and protected by intellectual property laws. The names, images, and biographical information of Catholic saints are part of the public domain and the shared heritage of the Catholic Church. You are granted a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial purposes.

**9. User-Generated Content**
Content you create within the App, including custom mood descriptions, novena intentions, and reflections, remains your property. By using the App, you grant us a limited license to process this content through our AI systems solely for the purpose of providing the App's services (saint matching, novena prayer generation). We do not use your personal content for AI training purposes.

**10. Termination**
We may suspend or terminate your access to the App at any time, with or without cause, with or without notice. You may terminate your account at any time by using the Delete Account feature in Settings. Upon termination, your data will be permanently deleted from our servers in accordance with our Privacy Policy.

**11. Changes to Terms**
We reserve the right to modify these Terms at any time. Material changes will be communicated through the App or via email (if you have linked an email address). Your continued use of the App after changes are posted constitutes acceptance of the modified Terms.

**12. Governing Law**
These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts of California.

**13. Contact**
For questions about these Terms, contact us at support@saintmatch.app.

---

## Page 4: Privacy Policy (/privacy)

**Last Updated:** February 11, 2026

**1. Introduction**
Saint Match ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Saint Match mobile application ("the App"). By using the App, you consent to the practices described in this policy.

**2. Information We Collect**

*Automatically collected:*
- Anonymous user ID (generated by Supabase Auth)
- Device type and operating system
- App usage data (challenge completions, streak data, saint matches, novena progress)
- Crash reports and performance data

*Optionally provided:*
- Email address (only if you choose to link your account for cross-device sync)
- Custom mood descriptions (free-text input describing how you're feeling)
- Novena intentions and reflections

*We do NOT collect:*
- Real names, phone numbers, location data, contacts, photos, or any other personal information beyond what is listed above

**3. How We Use Your Information**
- To provide the App's core functionality (saint matching, streak tracking, challenge management, novena prayer generation)
- To process your mood input and novena intentions through our AI system (Anthropic Claude) for saint matching and prayer personalization
- To sync your data across devices (if you link an email)
- To enforce usage limits and manage subscription status
- To improve the App's performance and fix bugs
- We do NOT use your data for advertising, marketing to third parties, or AI model training

**4. Data Storage and Security**
- Local data is stored on your device using AsyncStorage (encrypted at rest by the operating system)
- Cloud data is stored in Supabase (PostgreSQL database hosted on AWS) with Row Level Security (RLS) ensuring users can only access their own data
- All data transmission uses HTTPS/TLS encryption
- Supabase Edge Functions process AI requests server-side — your API keys are never exposed to the client
- We implement industry-standard security practices but cannot guarantee absolute security

**5. Third-Party Services**
- **Supabase:** Authentication, database, and serverless functions. [Supabase Privacy Policy](https://supabase.com/privacy)
- **Anthropic (Claude API):** AI-powered saint matching and novena prayer generation. Your mood input, novena intentions, and saint data are sent to Anthropic's API for processing. [Anthropic Privacy Policy](https://www.anthropic.com/privacy)
- **RevenueCat:** In-app purchase management (dormant during beta). [RevenueCat Privacy Policy](https://www.revenuecat.com/privacy)
- **Expo / EAS:** App distribution and over-the-air updates. [Expo Privacy Policy](https://expo.dev/privacy)
- We do not share your personal data with any other third parties.

**6. Cookies and Tracking**
The App does not use cookies. We do not use any third-party analytics, advertising SDKs, or tracking pixels. Push notifications are handled locally via Expo Notifications with your explicit permission and can be disabled in your device settings.

**7. Your Privacy Rights**
You have the right to:
- **Access your data** — via Settings > Export My Data (exports all your data as JSON)
- **Delete your data** — via Settings > Delete Account (permanently removes all data from both your device and our servers)
- **Opt out of cloud sync** — by not linking an email; the App works fully offline
- **Withdraw consent for notifications** — via your device settings

For California residents (CCPA), EU residents (GDPR), and other jurisdictions with specific privacy laws, you may exercise additional rights by contacting us at support@saintmatch.app.

**8. Data Retention**
Your data is retained for as long as your account exists. If you delete your account, all data is permanently removed from our servers within 30 days. Cached AI responses in the match cache are automatically purged after 6 hours. Anonymous usage data may be retained in aggregate form for analytics.

**9. Children's Privacy**
Saint Match is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at support@saintmatch.app and we will promptly delete it.

**10. International Data Transfers**
Our servers are located in the United States. If you are accessing the App from outside the United States, your data may be transferred to, stored, and processed in the United States. By using the App, you consent to such transfers. We rely on Supabase's and Anthropic's data processing agreements and standard contractual clauses for international data transfers.

**11. Changes to This Policy**
We may update this Privacy Policy from time to time. Material changes will be communicated through the App or via email (if you have linked an email). The "Last Updated" date at the top reflects the most recent revision. Your continued use of the App after changes are posted constitutes acceptance.

**12. Contact**
For questions, concerns, or requests regarding your privacy, contact us at support@saintmatch.app.

---

## Design Requirements

- Responsive (mobile, tablet, desktop)
- Consistent header/navigation across all pages
- Footer on landing page links to all legal pages
- Legal pages link back to home
- Use specified color palette and typography (Cormorant Garamond for headings, DM Sans for body)
- 12px border radius
- Smooth scroll behavior
- Hover states on interactive elements
- Warm cream (#F5F1EA) backgrounds throughout
- Sage green (#7A8F70) for primary actions and accents
- Terracotta (#C96B55) for secondary accents and highlights
- Soft card shadows (rgba(45, 42, 38, 0.08))
- Generous whitespace following a 4px base spacing unit
