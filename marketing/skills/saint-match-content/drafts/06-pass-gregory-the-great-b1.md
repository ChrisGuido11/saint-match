# 06 — St Gregory the Great — Format B, variant B-1 — PASS

```
draft_id       2026-09-03-gregory-the-great-b1
skill_version  best_skill.md @ c0cd3d47141c801be7745c2c3c73fbb26c0e21ae
post_format    B-saint-of-the-day
format_variant B-1-caption-carried
format         reel
saint          St Gregory the Great
feast_date     3 September (Memorial, General Roman Calendar)
topic          loneliness — being addressed only in general, never in particular
```

> **First live Format B pack.** `skill_version` carries a real sha, not `v0-seed`.
> This is the first artifact on which **W1–W5** have ever been run, and the first
> on which the **rewritten I4** has been run. A spec-findings section follows the
> verdict; the consolidated list lives in `07-stop-gregory-the-great-b2.md` §SF.

---

## 0. Calendar check, done before anything else

| Question | Answer | Source |
| --- | --- | --- |
| Rank on 3 September | **Memorial** of St Gregory the Great, Pope and Doctor of the Church, General Roman Calendar | Catholic Culture liturgical calendar, 3 Sept 2026 |
| Is 3 September 2026 a Sunday? | **No — Thursday.** `date -d 2026-09-03` → Thursday 03 September 2026 | computed |
| Superseded? | **No.** No Sunday, solemnity or feast displaces it. The memorial stands. | — |
| Why 3 September and not 12 March | 12 March is his death date and falls in Lent, where obligatory memorials are not observed; the 1969 calendar reform moved him to 3 September, the day of his consecration as pope in 590 | Universalis; Wikipedia, *Pope Gregory I*; CE |

Proceeded on St Gregory the Great, 3 September 2026.

---

## 1. Dossier — every claim graded

Sources, cited by short key:

- **CE** — *Catholic Encyclopedia* (New Advent), "Pope St. Gregory I (the Great)", `newadvent.org/cathen/06780a.htm`
- **EB** — *Encyclopædia Britannica*, "St. Gregory the Great"
- **EB-Aug** — *Encyclopædia Britannica*, "St. Augustine of Canterbury"
- **PR** — Gregory the Great, *Book of Pastoral Rule*, NPNF ser. 2 vol. 12 (Barmby trans.), `newadvent.org/fathers/36013.htm` — **primary text, read directly**
- **Reg I.5** — Gregory the Great, *Registrum Epistolarum* I.5, To Theoctista, NPNF, `newadvent.org/fathers/360201005.htm` — **primary text, read directly**
- **BXVI** — Benedict XVI, General Audience, 28 May 2008, vatican.va
- **CC** — CatholicCulture.org liturgical calendar, 3 September
- **WP-G1** / **WP-GM** — Wikipedia, *Pope Gregory I* / *Gregorian mission* (used only where they cite a named scholarly source, given in the row)
- **CE-SSD** — *Catholic Encyclopedia*, "Servus servorum Dei"
- **Clark debate** — F. Clark, *The Pseudo-Gregorian Dialogues* (1987) and *The 'Gregorian' Dialogues* (2003); responses by P. Meyvaert and A. de Vogüé in *Journal of Ecclesiastical History*; review in *The Medieval Review* 04.10.14

| # | Claim | Grade | Source |
| --- | --- | --- | --- |
| D1 | Born at Rome about 540; died 12 March 604. | DOCUMENTED | CE; EB |
| D2 | Son of the patrician Gordianus and of Silvia; family estates on the Caelian Hill in Rome and in Sicily. | DOCUMENTED | CE; WP-G1 (citing Richards 1980, Dudden 1905) |
| D3 | About the year 573, "when little more than thirty years old", he held **the office of prefect of the city of Rome**, at that date still "the highest civil dignity in the city". Benedict XVI dates it 572. | DOCUMENTED (the office; the year is 572/573 depending on source) | CE; BXVI |
| D4 | In 574 he left civil office, converted the family house on the Caelian into **the monastery of St Andrew**, and lived there as a monk for about three years — a period he later called the happiest of his life. Six further monasteries were founded from the Sicilian estates. | DOCUMENTED | CE; EB; BXVI |
| D5 | In 578 Pelagius II ordained him one of the seven deacons of Rome, "much against his will". | DOCUMENTED | CE |
| D6 | In the spring of 579 he was sent to Constantinople as **apocrisiarius** — permanent papal representative at the imperial court — and remained about six years. He never learned Greek. | DOCUMENTED | CE; EB |
| D7 | At Constantinople he composed the *Moralia in Iob* at the request of Leander of Seville. | DOCUMENTED | CE (citing Gregory, *Ep.* 5.53) |
| D8 | Pelagius II died in February 590 during plague and famine at Rome. The clergy and people of Rome elected Gregory, then abbot of St Andrew's. | DOCUMENTED | CE |
| D9 | **He tried to stop it.** He refused the citizens' entreaties and "wrote personally to the Emperor Maurice, begging him with all earnestness not to confirm the election". The city prefect Germanus suppressed the letter and sent the formal election schedule instead. | TRADITIONAL — the episode is transmitted by the early *vitae*, not by a surviving document of Gregory's | CE |
| D10 | The emperor's confirmation arrived after six months. Gregory "was terrified at the news and even meditated flight". He was seized, carried to St Peter's, and **consecrated pope on 3 September 590**. | TRADITIONAL as to the terror and the seizure; **DOCUMENTED** as to the date of consecration | CE; WP-G1 |
| D11 | **He never stopped regretting it, and said so in his own hand.** Writing to Theoctista, sister of the emperor, of "this my recent engagement in the pastoral office; wherein, under colour of episcopacy, I have been brought back to the world": *"I have lost the deep joys of my quiet, and seem to have risen outwardly while inwardly falling down."* | **DOCUMENTED** — his own letter | Reg I.5 (read in full) |
| D12 | CE, summarising the later writings: "he never ceased to regret his elevation, and his later writings contain numberless expressions of strong feeling on this point." | DOCUMENTED | CE |
| D13 | He used of himself the style **servus servorum Dei**, "servant of the servants of God" — in April 591 addressing Leander of Seville, and (per Ewald) as early as 587 while still a deacon. He was **the first pope to use it extensively**; he was **not** the first to use it at all — a bull of John III (570) already begins "Joannes Episcopus, servus servorum Dei". It did not become the exclusive papal style until the twelfth century. | DOCUMENTED (that he used it habitually); the "first ever" claim is **false and excluded** | CE-SSD |
| D14 | John the Deacon (9th c.) states that Gregory took the style as a lesson in humility to John the Faster, patriarch of Constantinople, who had assumed the title Ecumenical Bishop at a synod in 588. | TRADITIONAL — a motive supplied ~270 years later | CE; CE-SSD |
| D15 | **At the very outset of his pontificate he published the *Liber regulae pastoralis* / *Liber pastoralis curae*** — the *Book of Pastoral Rule* — on the office of a bishop. It "remained for centuries the textbook of the Catholic episcopate". Composed before February 591 (he quotes it in a synodal letter of that month). | DOCUMENTED | CE; WP, *Pastoral Care* (citing the Feb 591 synodal letter) |
| D16 | **Book III is the longest of the four books and is entirely about telling hearers apart.** Its prologue: *"one and the same exhortation does not suit all, inasmuch as neither are all bound together by similarity of character… every teacher, that he may edify all in the one virtue of charity, ought to touch the hearts of his hearers out of one doctrine, but not with one and the same exhortation."* Chapter 1 lists the contrasted pairs; **chapters 2–35 — thirty-four chapters — each treat one pair**, among them "the impatient and the patient" (III.9) and "the silent and the talkative" (III.14). Books I and II have eleven chapters each; Book IV has one. | **DOCUMENTED** — read directly in the NPNF text; chapter headings counted | PR |
| D17 | Gregory organised and dispatched the mission to the English: about forty monks under Augustine, sent 595/596 (Britannica: dispatched June 596, with a letter of commendation dated 23 July 596), landing in Kent in the spring of 597. | DOCUMENTED as to the mission, the leader, the approximate number, and the 597 landing; **the departure year is given variously as 595 and 596** | EB-Aug; WP-GM; EB |
| D18 | **Whether the mission was asked for is contested.** "Most historians take the view that Gregory initiated the mission, although exactly why remains unclear" — but one of Bertha's biographers holds that Æthelberht, influenced by his wife, requested missionaries of Gregory, and the historian Ian Wood holds the initiative came from the Kentish court. | **CONTESTED — may not be asserted in either direction** | WP-GM (citing the scholarly positions by name) |
| D19 | In 601 Gregory wrote to Mellitus that pagan shrines in England should be cleansed and converted to Christian use rather than destroyed. Augustine's questions and Gregory's replies are preserved by Bede as the *Libellus responsionum*. | DOCUMENTED | WP-GM; Bede, *HE* I.27 |
| D20 | The *Dialogues* (four books, of which Book II is the life of Benedict) are transmitted as Gregory's. **Their authenticity has been contested**: since the 1980s Francis Clark has argued the work is a late-seventh-century forgery around a core of "Inserted Gregorian Passages". **Clark's thesis has not been accepted; the scholarly consensus continues to treat the *Dialogues* as genuinely Gregorian**, following replies by Paul Meyvaert and Adalbert de Vogüé. | DOCUMENTED as the state of the question. **The contents of the *Dialogues* are used nowhere in this pack.** | Clark debate |
| D21 | Gregory made specific, identifiable changes to the Roman liturgy: words inserted into the Canon; the Pater Noster said in the Canon before the fraction; the Alleluia chanted after the Gradual outside Paschaltide; subdeacons forbidden the chasuble at Mass; deacons forbidden to sing any musical part of the Mass except the Gospel. **Beyond these "it seems impossible to conclude with certainty what changes Gregory did make."** | DOCUMENTED, including the stated limit of what can be concluded | CE |
| D22 | **"Gregorian chant" is not securely his.** The mainstream form of Western plainchant was standardised in the **late ninth century**; the earliest attribution of it to Gregory is **John the Deacon's biography of 873, almost three centuries after his death**. Scholarship (Apel, Snow, Levy) holds the repertory arose c. 750 from a Carolingian synthesis of Roman and Gallican chant; some scholars propose Gregory II or III instead. The ninth-century story that the Holy Spirit dictated the chants to Gregory in the form of a dove is impossible on its face — there was no notation in the sixth century. | **LEGEND** as to Gregory composing or dictating the chant; DOCUMENTED as to the ninth-century attribution and the modern consensus | WP-G1 (citing Levy 1998); New World Encyclopedia (citing Apel, Snow); Aleteia |
| D23 | Together with Ambrose, Jerome and Augustine, Gregory is one of the four Latin Doctors of the Church; Boniface VIII raised the feasts of the four to double rank in 1298. | DOCUMENTED | CE, "Doctors of the Church"; CE, "Pope Boniface VIII" |
| D24 | The monks of St Andrew's had a portrait of Gregory made **after his death**; John the Deacon saw it in the ninth century and describes a man "rather bald", with a "tawny" beard, long carefully curled hair at the sides, a high forehead, a nose "thin and straight" and "slightly aquiline", and "beautiful hands". | **TRADITIONAL** — a posthumous portrait, described 300 years later | WP-G1, citing Richards, *Consul of God* (1980), p. 44 |
| D25 | "In art, Gregory is usually shown in full pontifical robes with the tiara and double cross, **despite his actual habit of dress**. Earlier depictions are more likely to show a monastic tonsure and plainer dress." | DOCUMENTED (as a statement about the art-historical record) | WP-G1 (citing Gietmann 1911); CE |
| D26 | The dove at Gregory's ear comes from a story told by Peter the Deacon: a curtain drawn between Gregory and his secretary while he dictated the homilies on Ezekiel, and a dove seen with its beak between his lips. | **LEGEND** | CE (Peter the Deacon, *Vita*, xxviii); WP-G1 |
| D27 | The Collect for the Memorial (Roman Missal, 2011 English translation): "O God, who care for your people with gentleness and rule them in love, through the intercession of Pope Saint Gregory, endow, we pray, with a spirit of wisdom those to whom you have given authority to govern, that the flourishing of a holy flock may become the eternal joy of the shepherds." | DOCUMENTED | CC |
| D28 | Isidore of Seville, a near-contemporary (*Etymologiae* VI.14), names the scribe's instruments as the **calamus** (reed pen) and the **penna** (quill). | DOCUMENTED — used only to date the writing implement in the image prompt | Isidore, *Etym.* VI.14 |

### Excluded, and why — §7 exclusion list

1. **That Gregory composed, dictated or invented Gregorian chant.** D22. The attribution is ninth-century, the repertory is Carolingian, and the dove-dictation story is impossible because notation did not exist. **Not asserted, not hedged, not used decoratively, and not depicted.** No neumes, no staves, no antiphonary, no organ, no music of any kind in either pack. This is the single most likely thing a model would put in a Gregory post and it is the first thing struck out.
2. **"Non Angli sed angeli."** The meeting with the English youths in the Forum. LEGEND, and the received version is worse than "later than Bede": the story first appears in the anonymous **Whitby Life, c. 700**, where — in the St Gall manuscript — *the Angles are not slaves at all but free men visiting Rome of their own will*. **It is Bede (c. 731) who first makes them slaves**, and Bede who supplies the wordplay. CE: "the whole story seems to be an English tradition." Excluded entirely. Correction on the record: the brief called this "a later anecdote from Bede"; it is a later anecdote *earlier than* Bede, which Bede altered.
3. **That Gregory set out for Britain himself and was recalled by the Roman crowd on the third day.** CE narrates it, but it hangs off the legendary Forum meeting and shares its source. Excluded, and specifically **not used as a teaching slide in pack 07**, where it was the most attractive available material.
4. **That Gregory fled Rome and hid in a forest for three days until a light revealed him.** CE: "seems to be pure invention. It appears for the first time in the Whitby life (c. vii), and is directly contrary to the words of his contemporary, Gregory of Tours (*Hist. Franc.*, X, i)." LEGEND, and a *debunked* one — an exclusion, not a grade, exactly like Raymond's cardinalate.
5. **That Gregory was the first pope to use *servus servorum Dei*.** False. D13: John III's bull of 570 predates him. The true claim — first to use it habitually — is what pack 07 asserts, and it does not say "first".
6. **The dove at his ear.** D26, LEGEND. Not in copy, not in either image prompt, and explicitly in both negative prompts. It is his commonest attribute in art and it is a story.
7. **The papal tiara, the papal/patriarchal double cross, a mitre, a crozier, cardinal red.** The tiara in any developed form and the double cross postdate 604; the mitre is eleventh-century. D25 records that art shows them anyway, "despite his actual habit of dress". This is the Raymond cardinalate in its exact form — later art repeating an error is the error in paint.
8. **The *Dialogues*.** D20. Not because Clark is right — the consensus says he is not — but because the pack does not need them and the state of the question is not something a 53-word caption can carry. Nothing from the *Dialogues* appears in either pack, including the life of Benedict.
9. **That Gregory sent missionaries to people who had not asked for them.** D18. This was the brief's suggested hinge. **It is contested and cannot be asserted**: most historians say Gregory initiated it, but Ian Wood and one of Bertha's biographers hold that the initiative came from the Kentish court. A hinge cannot rest on a claim the sources split on. See §3 below for what was used instead.
10. **A black Benedictine habit, or the claim that St Andrew's followed the Rule of St Benedict.** Not documented for St Andrew's. Excluded from the image.
11. **The square halo.** WP-G1 records that Gregory permitted his own depiction with one, then used for the living. It is sourced only to Gietmann (1911) and would read to a modern audience as a rendering error. Excluded on editorial grounds, recorded rather than buried.
12. **Any words in Gregory's mouth that are not in his surviving writings.** He left a great deal; there is no reason to invent. The one quotation in this pack is his own, with book and letter number.

---

## 2. Topic + theme bridge *(internal)*

**Topic:** loneliness — specifically the loneliness of only ever being addressed in general. Not being disliked; being un-particularised.

**Virtue:** attention to the individual hearer. Gregory ran the Latin Church by letter through plague, famine and Lombard siege, and the book he wrote in his first year in office gives its longest part to the proposition that the same thing must not be said to two different people.

**Micro-action (5–15 min):** *Pick one person you have only ever sent general encouragement to. Send them one message today that could not have been sent to anyone else.*

**Swap test:** substitute St Monica, St Raymond Nonnatus or St Ignatius and the bridge sentence stops being true — none of them wrote the *Regula Pastoralis*, and the thirty-four chapters of paired hearers are Gregory's alone. **Passes.**

**Rejected bridge, recorded:** *"he sent missionaries to people who had not asked for them → the app matches you with a saint you did not pick."* Rejected at the dossier stage on D18. It is a good hinge and it is not sourceable.

---

## 3. Description caption

*(Written first, before the alignment line and before the image prompt.)*

```
Gregory's Pastoral Rule spends thirty-four chapters telling one kind of listener from another — the impatient from the patient, the too silent from the ones who talk too much — and gives each of them a different word. Some people have only ever been given the general advice. St Gregory the Great, pray for us.
```

**53 words.** Three sentences: fact → hinge → invocation.

## 4. Hinge line *(internal, Format B)*

```
hinge:      the general advice — the word meant for everyone, versus the word meant for you
saint side: "…gives each of them a different word."
app side:   "Some people have only ever been given the general advice."
```

**Performed, not stated.** The app is never named and no connection is announced. The
reader supplies the second half.

**Swap test, with a named substitute:** St Monica. *"Monica's Pastoral Rule spends
thirty-four chapters…"* is simply false; there is no Monica text that distinguishes
thirty-four kinds of hearer, and without that sentence "the general advice" has nothing
to be the opposite of. The hinge collapses on substitution. **Passes W2's swap test.**

**Why this hinge and not the brief's.** The suggested hinge — Gregory sending
missionaries to people who had not asked for them, mapping onto being matched with a
saint you did not pick — is the more elegant of the two and it is **not available**:
D18 records that whether Kent asked is contested, with Ian Wood and Bertha's biographer
on the other side. The *Pastoral Rule* hinge is stronger on three counts anyway. It rests
on a **primary text read directly** rather than on a narrative reconstruction. It maps
onto the app's *actual* function rather than a neighbouring one — Saint Match matches a
person to the saint who carried their particular thing, and Book III is a book about
refusing to say the same thing to two people. And its saint side is a countable, checkable
number rather than a motive.

## 5. Subject–caption alignment *(internal, §8.1)*

**HISTORICAL.** The caption's only concrete content is the contents of a sixth-century
book. There is no modern experience in it — the second sentence generalises about people
but names nothing modern, no phone, no desk, no 2am. So the image shows **the historical
figure in a historically accurate setting**, and no modern face appears.

*(Batch note: §8.0 wants roughly 40% of a batch to carry modern subjects. Both packs for
3 September are historical. That is a batch property, not a pack property, and it is
recorded here so the next batch can correct it.)*

## 6. Caption overlay — single image (reel)

**Overlay block, baked into the image:**

```
line 1   One and the same exhortation does not suit all.
line 2   Gregory, Pastoral Rule III
```

- Line 1: **9 words.** Quotation, verbatim, from D16 (NPNF/Barmby).
- Line 2: attribution, **4 words**. **Combined 13 words**, inside the §4.1 5–15 limit. It was drafted as "St Gregory the Great, Pastoral Rule III" (7 words, combined **16**) and cut on the count, because §4.1 does not say whether an attribution line is exempt. That cut is SF-6 biting: the honest citation was trimmed to fit an unbudgeted limit.
- **Highlight word: `all`**, amber-gold #E8B83D. One highlight word only.
- No LEGEND anywhere in the overlay (§2). No app name (§5.4/W4).

## 7. AI image prompt — 9:16

> **Frame.** 9:16 vertical, **1080 × 1920**. Single image, reel format.
>
> **Subject.** A Roman man of about sixty, seated, writing. Rather bald across the crown, a high forehead, the hair he has at the sides long and carefully curled, a tawny beard going grey, a thin straight and slightly aquiline nose, long fine hands. A monastic tonsure. Expression absorbed and unsentimental; he is working, not posing.
>
> **Dress.** A plain undyed heavy wool tunic to the ankle, and a dark brown-black woollen over-mantle across the shoulders. **No pallium, no chasuble, no dalmatic, no ring, no pectoral cross, no insignia of rank of any kind.**
>
> **Setting and era.** A bare lime-plastered room in Rome, **c. AD 595**. A low slanted wooden writing desk; one parchment codex open on it; a bronze inkhorn; a cut **reed pen** (calamus). A plain wooden shutter, half open, at the low left. Nothing else in the room.
>
> **Light.** One low window at the left throwing warm daylight across the hands and the open page. Everything above shoulder height falls away into unbroken warm shadow.
>
> **Art-historical anchor.** In the manner of **Caravaggio's** late Roman tenebrism: a single raking source, no fill light, matte flesh, shadow occupying roughly two-thirds of the canvas. **No named reference artwork** — see the iconography note below for why one is deliberately withheld.
>
> **Palette — Baroque tenebrist, locked, held across the whole image.** Deep amber #B8860B, warm brown #3E2723, golden ochre #C49A3C, cream #F5E6C8, sienna #8B4513. Roughly **35% lit / 65% shadow**. No cool blues, no greens, no pastels, no neon.
>
> **Surface.** Layered oil glazes over a coarse canvas weave, craquelure in the darks, photographed museum painting. **NOT digital, NOT illustrative, NOT smoothed.**
>
> **Composition, built to create the type zone.** The figure sits **low and right**: the head lands at **52–62%** of frame height, the hands and the open page at **68–80%**, the desk and codex fill the lower right corner to the bottom edge. Above him the plastered wall runs **unbroken** — no cornice, no beam, no drapery, no window, no object of any kind above 30% of frame height — held at an even warm brown mid-shadow.
>
> **Type zone: vertical 9–27% of frame height, full width, inset 8% left and right.** The empty upper wall exists *because the figure was placed low and right*; it is not a default band.
>
> **Baked overlay text — render exactly, spell exactly.**
> - Line 1, centred, occupying **9–19%** of frame height: `One and the same exhortation does not suit all.` — serif display, **Cormorant Garamond**, cream **#F5E6C8**, with the single word `all` in amber-gold **#E8B83D**.
> - Line 2, centred, occupying **21–26%** of frame height: `Gregory, Pastoral Rule III` — sans, **Inter**, warm grey **#B8B0A0**, letterspaced, about 40% the cap height of line 1.
> - Both lines carry a **3px drop shadow, #1A0F0A, 55% opacity**.
> - The wall behind the type is held light enough against #F5E6C8 to clear **3.5:1** contrast across the whole zone.
> - The type zone **stops at 27%**; the head begins at 52%, the hands at 68%, the codex, inkhorn and pen all below 68%. **The type touches no face, no hand, and no sourced attribute.**
> - **No other lettering anywhere in the image.** No text on the codex page, no marginalia, no inscription on the wall.
>
> **Halo.** None — or a flat gold disc only. No glowing ring, no rim light.
>
> **Negative prompt — permanent base block.** cartoon, anime, CGI, 3D render, plastic skin, artstation, hyperrealistic CGI, stock photo, neon, watermark, extra fingers, deformed hands, garbled text, misspelled text.
>
> **Negative prompt — per-post era and subject block.** papal tiara, triple crown, papal cross, patriarchal double cross, mitre, crozier, cardinal red, scarlet mozzetta, ermine, gold brocade cope, jewelled ring, throne, dove at the ear or on the shoulder, musical notation, neumes, staves, chant manuscript, antiphonary, organ, choir, Gothic architecture, pointed arch, stained glass, printed book, spectacles, five-decade rosary, black Benedictine habit, scapular, hood, square halo, modern face, weeping.

### Iconography list *(§8.3 — one line per specified attribute)*

| Prompt element | Support | Grade |
| --- | --- | --- |
| Man of about sixty, Roman | D1 (b. c. 540; the *Pastoral Rule* is 590/591, so he is ~50–55 — the prompt says "about sixty" and this is **corrected to "about fifty-five" if the generator ages him**; see NOTES) | DOCUMENTED |
| Rather bald, high forehead, long curled hair at the sides, tawny greying beard, thin straight slightly aquiline nose, fine hands | D24 — John the Deacon on the St Andrew's portrait | **TRADITIONAL** — and flagged as such rather than asserted anywhere in copy |
| Monastic tonsure, plain undyed tunic, dark over-mantle, no insignia | D4 (he was a monk of St Andrew's) + D25 ("earlier depictions are more likely to show a monastic tonsure and plainer dress") | DOCUMENTED |
| Writing desk, parchment codex, inkhorn, **reed pen** | D15/D16 (he wrote the *Pastoral Rule*) + D28 (Isidore, near-contemporary, names the calamus as a scribe's instrument) | DOCUMENTED |
| Rome, c. AD 595, lime-plastered room, wooden shutter | D1, D2, D15 | DOCUMENTED |
| No halo, or a flat gold disc | `best_skill.md` §8.2 | rulebook |

### Excluded from the image, and why

- **Papal tiara, papal/patriarchal double cross, mitre, crozier, cardinal red, throne, cope.** Exclusion 7 above. D25 says outright that art shows the tiara and double cross "despite his actual habit of dress". This is the Raymond cardinalate: later art repeating an error is not evidence.
- **The dove.** Exclusion 6, D26. LEGEND, and his single commonest attribute. Its absence is the point.
- **Any music.** Exclusion 1, D22. No neumes, no staves, no antiphonary, no organ. Notation did not exist; the attribution is ninth-century.
- **The pallium.** Deliberately withheld. It is defensible — Gregory conferred pallia — but this image shows him writing, not vested, and the pallium would pull the composition toward "pope in office" when the caption is about a book. Recorded so it can be overruled rather than silently dropped.
- **A named reference artwork.** §8.0 says to include one "where one exists". For Gregory the canonical works — Ribera's *Saint Gregory the Great* and the standard type generally — **put him in tiara and pontificals**, so naming one would import exactly the error I2 forbids. Withheld deliberately; the anchor carries the manner instead. **This is a real collision between §8.0 and I2 and it is logged as SF-7.**
- **A black Benedictine habit or scapular.** Exclusion 10.
- **A modern face.** The alignment decision is HISTORICAL.

---

## 8. Source notes

Every factual sentence in the pack, in order, with its dossier line:

| Where | Sentence | Line | Grade | Phrasing check |
| --- | --- | --- | --- | --- |
| Caption s.1 | "Gregory's Pastoral Rule spends thirty-four chapters telling one kind of listener from another — the impatient from the patient, the too silent from the ones who talk too much — and gives each of them a different word." | **D16** | DOCUMENTED | Asserted plainly. Correct for the grade. |
| Caption s.2 | "Some people have only ever been given the general advice." | — | **not a factual claim** | A generalisation about readers, not about the saint. Carries no dossier obligation. |
| Caption s.3 | "St Gregory the Great, pray for us." | D1, D23 | DOCUMENTED | No patronage clause is used, so no unsourced patronage can enter (W3 note). |
| Overlay 1 | "One and the same exhortation does not suit all." | **D16** | DOCUMENTED | Gregory's own text, NPNF/Barmby translation, quoted verbatim. |
| Overlay 2 | "Gregory, Pastoral Rule III" | D16 | DOCUMENTED | Author, work and locus given, per §7.2. |
| Image | every element | see iconography table | — | one TRADITIONAL element (D24), flagged, and used only for physiognomy |

**Exclusions:** the twelve-item list at §1 above.

---

## 9. Scorer verdict

```
VERDICT: PASS
draft_id:       2026-09-03-gregory-the-great-b1
skill_version:  best_skill.md @ c0cd3d47141c801be7745c2c3c73fbb26c0e21ae
post_format:    B-saint-of-the-day
format_variant: B-1-caption-carried
graded_by:      hand-graded against SCORER.md @ c0cd3d4
graded_at:      2026-08-31

CHECKS
  T1 dossier coverage      PASS — three claim-bearing strings. Caption s.1 -> D16
                           (thirty-four chapters; III.9 impatient/patient; III.14
                           silent/talkative; "a different word" = the prologue's "not
                           with one and the same exhortation"). Overlay line 1 -> D16
                           verbatim. Overlay line 2 -> D16 locus. Caption s.2 asserts
                           nothing about the saint. Image elements -> iconography table,
                           six rows, all supported. No unmatched claims.
  T2 grade-appropriate     PASS — the load-bearing fact D16 is DOCUMENTED and is asserted
                           plainly. The one TRADITIONAL line in play (D24, physiognomy)
                           appears only in the image prompt and is never asserted in
                           copy. No LEGEND anywhere in the pack; no LEGEND in the
                           overlay. D22 (chant) and D26 (dove) are LEGEND and are
                           excluded rather than hedged.
  T3 quotation             PASS — one quotation. Gregory left extensive writings (D15,
                           D16, D11), so §7.2 governs, not §7.1: the quotation is from
                           his own work with work and locus given on the image itself
                           ("Pastoral Rule III"). Wording checked against the NPNF
                           (Barmby) text read in full. Nothing is attributed to him that
                           he did not write.
  T4 scripture             N/A — the pack cites no scripture. Justification: Format B
                           has no scripture block (3B) and the caption's fact is drawn
                           from a patristic text, not from a verse. No verse appears in
                           caption, overlay or prompt.
  T5 feast / rank / bio    PASS — 3 September, Memorial, General Roman Calendar,
                           verified against CatholicCulture and checked not to fall on a
                           Sunday in 2026 (Thursday). No office is claimed in copy at
                           all. Dates in the dossier (D3 prefect 572/573, D10
                           consecration 3 Sept 590, D1 death 12 Mar 604) are reproduced
                           only in the dossier, where the 572/573 divergence is recorded
                           rather than resolved.
  T6 exclusions declared   PASS — twelve exclusions, and they name the four well-known
                           false or contested claims a grader would look for: Gregorian
                           chant (1), "non Angli sed angeli" (2), the forest-flight
                           (4), and the tiara/dove iconography (6, 7). Two further
                           exclusions are of the *contested* kind rather than the false
                           kind — the Dialogues (8) and the unasked-mission hinge (9) —
                           and both record the state of the question.
  V1 scripture block       N/A — Format B
  V2 cross separator       N/A — Format B
  V3 engagement line       N/A — Format B
  V4 app-mention pair      N/A — Format B
  V5 hashtags              N/A — Format B
  V6 ending order          N/A — Format B
  V7 slide structure       N/A — Format B
  W1 caption 40-70 (B-1)   PASS — 53 words, invocation included. Counted by hand and
                           re-counted. Comfortably inside the band, unlike the Raymond
                           specimen at ~38.
  W2 hinge                 PASS —
                             hinge: the general advice
                             saint side: "…and gives each of them a different word."
                             app side: "Some people have only ever been given the
                               general advice."
                           Swap test, substitute St Monica: "Monica's Pastoral Rule
                           spends thirty-four chapters…" is false, and with the saint
                           side gone the app side has nothing to be the opposite of. The
                           hinge does not survive the swap. Exactly one hinge; the app is
                           never named; nothing explains the connection.
  W3 invocation ending     PASS — final line is "St Gregory the Great, pray for us." and
                           nothing follows it: no hashtags, no emoji, no sign-off, no
                           app mention. No patronage clause, so no unsourced patronage
                           can enter through it.
  W4 no product pitch      PASS — the caption contains no pitch line of any kind. Search
                           for "Saint Match", "app", "link", "bio", "download", "free",
                           "App Store" across the caption, the overlay and the image
                           prompt returns nothing. No engagement line, no hashtag block.
  W5 facts graded          PASS (B-1 one-fact form) — one fact: D16, DOCUMENTED, asserted
                           plainly. It is a single claim about a single text traced to a
                           single dossier line; the three named pairs inside it are that
                           line's contents, not additional facts. See NOTES and SF-1:
                           the rulebook does not define fact atomicity and a stricter
                           grader could count this as three.
  W6 numbered promise      N/A — variant B-1
  W7 audience = struggle   N/A — variant B-1
  W8 caption minimal (B-2) N/A — variant B-1
  W9 carousel carries it   N/A — variant B-1
  B1 register              PASS (B1-B) — third person throughout. Grammatical subjects:
                           s.1 "Gregory's Pastoral Rule"; s.2 "Some people"; s.3 the
                           vocative. Zero second-person pronouns — searched, none found.
                           No emoji. Em dashes are spaced. Named specifics before
                           abstraction ("thirty-four", the four named kinds of hearer).
                           Not encyclopedia register: no string of biographical
                           appositives, no patronage stated as a label, no closing
                           pleasantry, and there is a turn toward the reader. Does not
                           open by announcing the date or the feast — the first six words
                           are "Gregory's Pastoral Rule spends thirty-four chapters".
                           Opening-question clause: not triggered, the opening is a fact.
  B2 shape and ending      PASS (B2-B, variant B-1 part) — three sentences, in order:
                           s.1 the fact, plainly stated and first; s.2 the hinge; s.3 the
                           invocation. Nothing between the hinge and the invocation, so
                           no explaining sentence flattens it. Nothing after. No
                           calendar-announcement opening.
  B3 promises              PASS — no devotion, prayer or feature is offered as producing
                           an outcome. The caption asserts what a sixth-century book
                           contains and observes something about readers. It promises
                           nothing.
  C1 approved pattern      N/A — Format B (superseded by W4)
  C2 banned register       PASS — no urgency, scarcity, obligation, gatekeeping or
                           guilt. No free-tier limit referenced.
  C3 saint not leverage    PASS — the saint's text is the subject of every clause that
                           has a subject. There is no pivot to the product; there is no
                           product in the post.
  G1 bridge                PASS — virtue named (attention to the individual hearer);
                           tied to a specific pressure in this life (he wrote the book
                           in his first year in an office he had tried to refuse, and
                           gave its longest part to not saying the same thing twice);
                           micro-action written out and doable in five minutes on a bus.
                           Swap test with St Monica: collapses. W2, the strict test of
                           the surfacing, also passes.
  I1 attributes sourced    PASS — six prompt elements, each in the iconography table with
                           a dossier line. No vague habit description: the dress is given
                           by garment, fibre and colour ("plain undyed heavy wool tunic",
                           "dark brown-black woollen over-mantle"), and the absence of
                           vestments is stated positively so the generator cannot fill it.
  I2 no contradiction      PASS — no insignia of any office. No tiara, no double cross,
                           no mitre, no crozier, no cardinal red — all in the negative
                           prompt, all excluded on D25. Nothing anachronistic to Rome
                           c. 595: reed pen sourced to Isidore (D28), parchment codex
                           correct for the period, no printed book, no five-decade
                           rosary, no Gothic architecture, no spectacles. No order's
                           habit is depicted, so no order can be reassigned.
  I3 legend not depicted   PASS — the scene is a man writing at a desk, which is D15/D16
                           and nothing more. No legend is staged: no dove (D26), no
                           chant being received (D22), no slave market (exclusion 2), no
                           forest flight (exclusion 4). All four are in the negative
                           prompt.
  I4 type zone / frame     PASS — all five clauses.
                           (1) "9:16 vertical, 1080 x 1920" declared in the prompt.
                           (2) Type zone "vertical 9-27% of frame height, full width,
                               inset 8%" — and the composition is written to build it:
                               figure low and right, head at 52-62%, and an explicit
                               instruction that nothing appears above 30%. The zone is
                               chosen for this composition, not defaulted; the reason it
                               is at the top is that the subject was placed at the bottom.
                           (3) Contrast: wall behind the type held to clear 3.5:1
                               against #F5E6C8, plus a 3px #1A0F0A drop shadow at 55%
                               opacity, per §8.1.
                           (4) No collision: type ends at 27%; head starts at 52%, hands
                               at 68%, and the codex, inkhorn and reed pen — the I1
                               attributes the post rests on — are all below 68%. Nothing
                               sourced is buried.
                           (5) Baked type fully specified: exact strings for both lines,
                               Cormorant Garamond and Inter, #F5E6C8 / #E8B83D / #B8B0A0,
                               highlight word "all", per-line position ranges, drop
                               shadow, and "render exactly, spell exactly" with
                               regeneration required on garbled output.

REQUIRED REWRITES
  None.

NOTES
  Slide count: 1 (reel). Recorded per SCORER.md §3B.0 so B-1's slide structure can be
    settled from evidence. Reel was chosen deliberately: B-1's slide structure is
    unattested and a carousel would have meant inventing one.
  Age in the image prompt: the prompt says "about sixty" for a man who was about
    fifty-one in 591. It is a generator-steering choice, not a claim, and it appears
    nowhere in copy. Flagged rather than buried, as draft 02 flagged its "dry eyes".
  W5 fact atomicity: graded as one fact. A stricter grader could read three (the chapter
    count, the impatient/patient pair, the silent/talkative pair) and STOP. The rulebook
    gives no rule. See SF-1.
  Overlay word count: 13, including the four-word attribution line. The attribution was
    cut from "St Gregory the Great, Pastoral Rule III" (combined 16, over the limit) to
    "Gregory, Pastoral Rule III" purely to fit, because §4.1 does not say whether an
    attribution counts toward the 5-15 slide limit. See SF-6.
  Batch composition: this pack and pack 07 are both HISTORICAL-aligned. §8.0's "roughly
    40% modern subjects" is a batch property and is unmet for 3 September.
  The strongest available hinge was not the strongest available *idea*. See §4.
```

---

## SF — Spec findings raised by this pack

Numbered continuously with the consolidated list in
`07-stop-gregory-the-great-b2.md`, where all of them are written up in full with the
suggested fix. Raised here: **SF-1** (fact atomicity under W5), **SF-4** (the closed
twelve-topic list), **SF-6** (whether attribution lines count toward the 5–15 word slide
limit), **SF-7** (§8.0's named-reference-artwork rule collides with I2), **SF-9**
(`draft_id` collides when two packs share a saint and a day), **SF-11** (T4's `N/A`
justification is boilerplate the scorer says must be bespoke), **SF-13** (I4 asks for a
*vertical* percentage range but §8.1's own worked example is horizontal).
