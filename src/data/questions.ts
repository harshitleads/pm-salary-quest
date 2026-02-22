export interface Question {
  id: number;
  category: string;
  salaryTier: string;
  salaryRange: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  multipleCorrect: boolean;
  hint: string;
  explanation: string;
}

export const questions: Question[] = [
  // Junior PM
  {
      "id": 1,
      "category": "Product Sense",
      "salaryTier": "Junior",
      "salaryRange": "$130K-$170K",
      "question": "Your food delivery app has high order volume but low repeat usage. What would you investigate first?",
      "options": [
        "Run a promotion to incentivize repeat orders",
        "Analyze delivery time, food quality, and app experience metrics",
        "Add more restaurant options to increase selection",
        "Lower delivery fees to be more competitive"
      ],
      "correctAnswers": [1],
      "multipleCorrect": false,
      "hint": "Framework: Diagnose before prescribing. What data tells you WHY users don't return?",
      "explanation": "Option B is correct. Before implementing solutions (A, C, D), understand the root cause. Are users unhappy with delivery times? Food quality? App bugs? The hint emphasizes diagnosis - analyze retention cohorts, NPS scores, and quality metrics first. Options A, C, D are solutions that might not address the actual problem."
    },
    {
      "id": 2,
      "category": "Product Design",
      "salaryTier": "Junior",
      "salaryRange": "$130K-$170K",
      "question": "Design a feature for a note-taking app to help students during exam season.",
      "options": [
        "Add AI to automatically generate study summaries from notes",
        "Create a spaced repetition quiz feature based on notes",
        "Add collaborative study rooms for group studying",
        "All of the above - students need multiple study tools"
      ],
      "correctAnswers": [1],
      "multipleCorrect": false,
      "hint": "Framework: Jobs-to-be-Done. What's the core job students are hiring this app for during exams?",
      "explanation": "Option B is correct. During exams, students primarily need to RETAIN information, which spaced repetition addresses directly. Option A is helpful but passive. Option C changes the core use case. Option D spreads focus thin. The hint guides you to the core job: active recall and retention, which B solves best. Ship one feature that solves the main problem well, not many features that solve it poorly."
    },
    {
      "id": 3,
      "category": "Metrics",
      "salaryTier": "Junior",
      "salaryRange": "$130K-$170K",
      "question": "Your social media app's DAU increased 20% but engagement time per user decreased 15%. What does this suggest?",
      "options": [
        "The product is improving - more users is always good",
        "Growth is coming from less engaged user segments",
        "The algorithm is broken and needs fixing",
        "Users are becoming more efficient at finding content"
      ],
      "correctAnswers": [1, 3],
      "multipleCorrect": true,
      "hint": "Framework: Segment your users. Not all growth is equal. Quality vs. quantity matters.",
      "explanation": "Options B and D are both valid interpretations. B suggests new users aren't as engaged (lower intent, different use case, top-of-funnel acquisition). D suggests existing users are finding what they need faster (could indicate good UX improvements). A is wrong - vanity metric thinking. C jumps to a solution without proper diagnosis. The hint emphasizes segmentation: analyze new vs. existing user behavior separately to understand the true story behind the metrics."
    },
    {
      "id": 4,
      "category": "Behavioral",
      "salaryTier": "Junior",
      "salaryRange": "$130K-$170K",
      "question": "You're launching a feature in 2 weeks, but engineering just discovered a critical bug that needs 3 weeks to fix properly. What do you do?",
      "options": [
        "Push engineering to work overtime to meet the deadline",
        "Launch with the bug and fix it post-launch",
        "Delay the launch and communicate the timeline change to stakeholders",
        "Reduce feature scope to ship something on time"
      ],
      "correctAnswers": [2, 3],
      "multipleCorrect": true,
      "hint": "Framework: Risk assessment. What's worse - shipping broken or delaying? Consider user trust.",
      "explanation": "Options C and D are both acceptable depending on context. C (delay) prioritizes quality and user trust - critical bugs often cause more damage than delays. D (reduce scope) maintains timeline while ensuring quality of what ships. A is unsustainable and demotivates the team. B risks user trust and creates technical debt. The hint emphasizes weighing: short-term deadline pressure vs. long-term user trust and product quality. Both C and D handle this tradeoff responsibly."
    },
    {
      "id": 5,
      "category": "Product Sense",
      "salaryTier": "Junior",
      "salaryRange": "$130K-$170K",
      "question": "Users complain that your e-commerce checkout flow is too long. How would you prioritize which steps to optimize first?",
      "options": [
        "Remove all optional fields to speed up checkout",
        "Analyze drop-off rates at each step to find the biggest bottleneck",
        "A/B test removing each step one by one",
        "Ask users in a survey which steps they find annoying"
      ],
      "correctAnswers": [1],
      "multipleCorrect": false,
      "hint": "Framework: Data-driven prioritization. Where do most users drop off? Start there.",
      "explanation": "Option B is correct. Use funnel analytics to identify where the highest drop-off occurs - that's your highest-impact optimization opportunity. Option A risks removing fields you actually need (address, payment info). Option C is expensive and slow - test after you know where the problem is. Option D relies on stated preferences (often unreliable) rather than revealed behavior. The hint guides you: prioritize based on where users are actually abandoning, not where they say they're annoyed."
    },
{
  "id": 6,
  "category": "Product Design",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "A meditation app wants to increase daily usage. What feature would you prioritize?",
  "options": [
    "Add social features to let users meditate with friends",
    "Daily streaks and reminders to build habit formation",
    "More meditation content (longer sessions, new voices)",
    "Gamification with points and badges for completing sessions"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Behavioral psychology. What creates habits? Make the desired action easier and more frequent.",
  "explanation": "Option B is correct. Meditation is a habit-building product - success = daily usage. Streaks and reminders leverage behavioral psychology (commitment device + triggers). Option A changes core value prop (meditation is solo). Option C doesn't drive frequency. Option D risks making meditation feel like a game vs. genuine practice. The hint points to Hooked Model: trigger (reminder) + action + variable reward (streak continues)."
},
{
  "id": 7,
  "category": "Metrics",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your B2B SaaS product has 60% monthly active users but only 20% weekly active users. What does this indicate?",
  "options": [
    "Users don't find the product valuable",
    "The product solves an infrequent use case",
    "Your onboarding is broken",
    "You need to add more features to drive engagement"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: MAU/WAU ratio tells you usage frequency. High MAU, low WAU = infrequent but valuable use case.",
  "explanation": "Option B is correct. 60% MAU is strong (people return monthly), but 20% WAU suggests the product serves a monthly/periodic need, not a daily workflow tool. Examples: expense reporting, monthly invoicing. Option A is wrong - 60% MAU shows value. Option C would hurt MAU too. Option D assumes frequency is always better - not true for all products. The hint guides you: MAU/WAU ratio reveals natural usage cadence, not product quality."
},
{
  "id": 8,
  "category": "Product Sense",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Netflix notices users browse for 15 minutes before starting a show. How would you improve this?",
  "options": [
    "Reduce the content library to make choosing easier",
    "Create a 'Play Something' feature that picks content for users",
    "Improve the recommendation algorithm to surface better content",
    "Add more filters and sorting options for browsing"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Paradox of choice. Too many options creates decision paralysis. Reduce cognitive load.",
  "explanation": "Options B and C are both valid. B addresses choice paralysis directly - when overwhelmed, just start something (Netflix actually built this). C improves recommendation quality so users trust suggestions faster. Option A is extreme and hurts Netflix's core value (selection). Option D adds MORE complexity. The hint references the Paradox of Choice: more options → harder decisions → inaction. Both B and C reduce decision burden."
},
{
  "id": 9,
  "category": "Behavioral",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your designer strongly disagrees with your product direction. How do you handle this?",
  "options": [
    "Assert your authority as PM - you make the final decision",
    "Schedule time to understand their concerns and the reasoning behind them",
    "Escalate to your manager to mediate the disagreement",
    "Run an A/B test to let data decide"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Disagree and commit requires first understanding the disagreement. Listen before deciding.",
  "explanation": "Option B is correct. Strong disagreement often signals important perspective you're missing. Schedule 1:1 time to deeply understand their concerns - they may see UX implications or user needs you don't. Option A damages collaboration. Option C escalates too early. Option D assumes everything is testable (some things aren't). The hint points to: you can't 'disagree and commit' until you actually understand what you're disagreeing about. Listen first, then decide."
},
{
  "id": 10,
  "category": "Product Design",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Design a feature to help Airbnb hosts respond to guest inquiries faster.",
  "options": [
    "AI-generated response suggestions based on inquiry type",
    "Push notifications for every new inquiry",
    "Quick reply templates hosts can customize",
    "All of the above would help hosts respond faster"
  ],
  "correctAnswers": [0, 2],
  "multipleCorrect": true,
  "hint": "Framework: Reduce friction in the response workflow. Make it easier to send quality responses quickly.",
  "explanation": "Options A and C are both valid. A (AI suggestions) reduces cognitive load - hosts can edit vs. write from scratch. C (templates) helps hosts standardize common responses. Option B (notifications) improves awareness but not response speed. Option D is wrong because B doesn't help speed, just awareness. The hint emphasizes reducing friction: both A and C make the actual act of responding faster and easier."
},
{
  "id": 11,
  "category": "Metrics",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your subscription app has 5% monthly churn. Is this good or bad?",
  "options": [
    "Bad - industry standard is 2% monthly churn",
    "Good - keeping 95% of users monthly is strong",
    "Cannot determine without more context about the product and market",
    "Bad - any churn is unacceptable for a subscription product"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Context matters. Consumer vs. B2B? Annual vs. monthly contracts? Benchmarks vary.",
  "explanation": "Option C is correct. 5% monthly churn context-dependent: for consumer monthly subscriptions, it's reasonable; for enterprise annual contracts, it's terrible; for freemium products, it might be high or low depending on acquisition cost. Options A, B, D make universal claims without context. The hint guides you to ask: What type of product? What's the contract length? What's LTV relative to CAC? What's the competitive benchmark? You cannot assess churn without these answers."
},
{
  "id": 12,
  "category": "Product Sense",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Spotify wants to help users discover new music. What metric would you track to measure success?",
  "options": [
    "Number of new artists listened to per month",
    "Percentage of listening time from newly discovered music",
    "Number of playlist adds from Discover Weekly",
    "Overall listening hours (users who discover more, listen more)"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: North Star metric. What behavior indicates successful discovery that drives retention?",
  "explanation": "Option B is correct. Percentage of listening time from discoveries indicates users are actually enjoying new music enough to listen repeatedly - not just clicking once. Option A can be gamed (listen 30 sec to 100 artists). Option C measures engagement with one feature, not overall discovery success. Option D confuses correlation with causation. The hint points to: a good North Star metric directly measures the value delivered (enjoying new music) not just activity (clicking)."
},
{
  "id": 13,
  "category": "Behavioral",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Engineering says a feature will take 6 weeks. You need it in 4. What do you do?",
  "options": [
    "Push back on engineering to find a faster solution",
    "Ask what scope could be cut to hit 4 weeks with core value",
    "Accept the 6 weeks and adjust the roadmap",
    "Escalate to leadership to add more engineering resources"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Negotiate on scope, not timeline. Fixed time, variable scope OR fixed scope, variable time.",
  "explanation": "Options B and C are both professional approaches. B explores scope reduction to maintain timeline while delivering core value (MVP thinking). C respects engineering estimate and adjusts plans accordingly (pragmatic). Option A damages trust without understanding why it's 6 weeks. Option D is expensive and often doesn't speed things up (Brooks' Law). The hint guides you: you can control scope OR timeline, rarely both. Pick which constraint matters more."
},
{
  "id": 14,
  "category": "Product Design",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Design a dark mode feature for a reading app. What should you prioritize?",
  "options": [
    "Perfect color accuracy across all UI elements",
    "OLED-optimized pure black for battery savings",
    "Readability and reduced eye strain for long reading sessions",
    "Matching the aesthetic of competitor reading apps"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Start with user's job-to-be-done. Why do users want dark mode for reading?",
  "explanation": "Option C is correct. Dark mode for a reading app is primarily about eye comfort during extended use, especially in low light. This is the core job-to-be-done. Option A is nice-to-have but not primary. Option B prioritizes battery over reading experience (wrong trade-off). Option D is copycat thinking. The hint guides you back to user needs: they're reading for hours, often at night - optimize for comfort first, aesthetics second."
},
{
  "id": 15,
  "category": "Metrics",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your marketplace connects freelancers and clients. Which metric best indicates marketplace health?",
  "options": [
    "Total number of freelancers on the platform",
    "Gross Merchandise Value (GMV) transacted",
    "Percentage of searches that result in a hire",
    "Repeat booking rate for both freelancers and clients"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Two-sided marketplace health = both sides get value and come back. Retention > vanity metrics.",
  "explanation": "Option D is correct. Repeat booking rate shows both sides find value and return - the ultimate marketplace health indicator. Option A is a vanity metric (inactive freelancers don't help). Option B measures volume but not retention or profitability. Option C measures conversion but not if matches are good quality. The hint emphasizes: marketplaces live or die on retention - if both sides come back, you're building a sustainable business."
},
{
  "id": 16,
  "category": "Product Sense",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Google Maps notices users frequently switch to satellite view in certain areas. What could this indicate?",
  "options": [
    "Users prefer satellite view visually",
    "Map data quality is poor in those areas, users switch to verify",
    "Those areas have interesting visual landmarks users want to see",
    "Random user behavior with no pattern"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: User behavior signals unmet needs. What problem is satellite view solving that map view isn't?",
  "explanation": "Options B and C are both valid interpretations. B suggests map data quality issues - users don't trust the map so they verify with satellite imagery. C suggests visual landmarks or terrain users want to see (beaches, mountains, architecture). Both are real user needs. Option A is too generic. Option D ignores data patterns. The hint guides you: users switch views for a reason - they're compensating for something missing or seeking something specific."
},
{
  "id": 17,
  "category": "Behavioral",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "You made a product decision that turned out to be wrong. User metrics dropped 10%. What's your next step?",
  "options": [
    "Immediately roll back the change and move on",
    "Wait to see if metrics recover as users adapt",
    "Roll back, analyze what went wrong, and share learnings with team",
    "Try to fix it with another feature update rather than rolling back"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Fail fast, learn faster. Acknowledge mistakes quickly and extract maximum learning value.",
  "explanation": "Option C is correct. Roll back to stop the bleeding (user impact), then invest time understanding why it failed and documenting learnings to prevent repeat mistakes. Option A stops the damage but misses learning opportunity. Option B risks further decline. Option D compounds the error. The hint emphasizes: mistakes are inevitable in product, but the value comes from learning. Rolling back without analysis wastes a learning opportunity."
},
{
  "id": 18,
  "category": "Product Design",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Design an onboarding flow for a project management tool targeting small teams (5-10 people).",
  "options": [
    "Comprehensive tutorial covering all features (15 minutes)",
    "Quick setup with 3 core actions: create project, invite team, add first task",
    "Interactive demo project that shows all capabilities",
    "Skip onboarding - let users explore on their own"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Time-to-value. Get users to their first success moment as quickly as possible.",
  "explanation": "Option B is correct. Small teams want to start working immediately - get them to first value (organized project) in under 5 minutes. Option A creates friction before value. Option C is better than A but still delays actual work. Option D assumes users will figure it out (many won't). The hint points to: onboarding should minimize time between signup and first 'aha moment' - for PM tools, that's seeing their work organized."
},
{
  "id": 19,
  "category": "Metrics",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your free trial conversion rate is 15%. How do you interpret this?",
  "options": [
    "Excellent - industry average is 2-5%",
    "Good - but focus on activation within trial period",
    "Cannot assess without knowing trial length and product type",
    "Poor - you're losing 85% of trial users"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Benchmarks need context. 15% for 7-day trial vs. 30-day trial are very different.",
  "explanation": "Option C is correct. 15% conversion depends on: trial length (7 days vs. 30 days), product type (B2B SaaS vs. consumer), price point, onboarding quality, and competitive landscape. Without context, you can't assess if 15% is good. Options A and D make blanket statements. Option B assumes it's good without validation. The hint guides you: always ask for context before judging metrics. What's the trial mechanics? What's being converted to?"
},
{
  "id": 20,
  "category": "Product Sense",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Instagram wants to increase time spent in the app. Which metric would you monitor to ensure you're not harming long-term health?",
  "options": [
    "Daily active users (DAU)",
    "User reported well-being scores or app satisfaction",
    "Revenue per user",
    "Number of posts created (not just viewed)"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Engagement vs. addiction. Time spent is good only if users feel good about it.",
  "explanation": "Options B and D are correct. B (well-being scores) directly measures if increased time makes users feel worse (doomscrolling, FOMO). D (creation) indicates active vs. passive consumption - creators are healthier users. Option A can go up while health declines. Option C measures business success, not user health. The hint emphasizes: optimizing for time spent risks creating addictive but harmful patterns. Balance quantitative metrics (time) with qualitative health indicators."
},
{
  "id": 21,
  "category": "Behavioral",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Two stakeholders want completely opposite features. How do you make a decision?",
  "options": [
    "Choose the stakeholder with more seniority",
    "Build both features to keep everyone happy",
    "Bring it back to user data and company goals to make objective decision",
    "Compromise by building a middle-ground solution"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Let data and strategy decide, not politics or consensus-seeking.",
  "explanation": "Option C is correct. Escalate to user data (which solves a real problem?) and company goals (which aligns with strategy?). This depoliticizes the decision. Option A is politics-driven. Option B dilutes focus and doubles work. Option D often results in a solution that serves neither need well. The hint guides you: good product decisions come from evidence and strategy, not stakeholder management. Use data as the tiebreaker."
},
{
  "id": 22,
  "category": "Product Design",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Design a feature to reduce cart abandonment in an e-commerce app.",
  "options": [
    "Email reminders about abandoned carts",
    "One-click checkout with saved payment info",
    "Exit-intent popups with discount codes",
    "Show trust signals (security badges, reviews) prominently at checkout"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Reduce friction AND anxiety. Make checkout fast and feel safe.",
  "explanation": "Options B and D are both valid. B (one-click) reduces friction - fewer steps to complete purchase. D (trust signals) reduces anxiety - addresses 'is this site safe?' concern at the highest-risk moment. Option A is retargeting, not abandonment reduction. Option C can work but is more aggressive (may annoy users). The hint guides you: cart abandonment has two causes - too much friction OR too much anxiety. Address both."
},
{
  "id": 23,
  "category": "Metrics",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your new feature has 40% adoption but 10% of those users abandon it after first use. What do you investigate?",
  "options": [
    "Why 60% haven't tried it yet (adoption problem)",
    "Why 10% abandon after first use (retention problem)",
    "Both adoption and retention equally",
    "Overall active users - if it's going up, everything is fine"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Fix retention before driving adoption. Broken experiences don't benefit from more traffic.",
  "explanation": "Option B is correct. 40% adoption is actually strong for a new feature, but 10% abandonment after first use suggests a broken experience. If you drive more adoption without fixing retention, you're just exposing more users to a poor experience. Option A is premature optimization. Option C spreads focus. Option D ignores leading indicators. The hint points to: fix the product experience (retention) before optimizing the funnel (adoption). Make it work, then make people find it."
},
{
  "id": 24,
  "category": "Product Sense",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "LinkedIn sees professionals switching jobs more frequently. How should this change product strategy?",
  "options": [
    "Focus on job search features - make LinkedIn the primary job board",
    "Build features that help people maintain professional relationships across job changes",
    "Monetize career transitions with premium job seeker tools",
    "Partner with recruiters to place people in new roles faster"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Build around the lasting behavior, not the temporary transaction. Network > job search.",
  "explanation": "Option B is correct. Frequent job changes make professional network even MORE valuable (you need it across multiple companies). LinkedIn's moat is the network, not job search (Indeed, Glassdoor do that). Lean into network durability. Options A, C, D focus on the transaction (job search) not the lasting behavior (maintaining professional connections). The hint guides you: optimize for what persists across user's entire career, not just one moment in it."
},
{
  "id": 25,
  "category": "Behavioral",
  "salaryTier": "Junior",
  "salaryRange": "$130K-$170K",
  "question": "Your CEO wants to add a feature that users have explicitly said they don't want. What do you do?",
  "options": [
    "Build it anyway - CEO knows the business better",
    "Push back with user data and recommend alternatives",
    "Build a minimal version to test the CEO's hypothesis quickly",
    "Escalate to other executives for support"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Disagree and commit, but first make sure disagreement is heard with evidence.",
  "explanation": "Options B and C are both professional approaches. B (push back with data) gives CEO information to reconsider - maybe they have context you don't, maybe you have user data they don't. Discuss with evidence. C (quick test) validates the hypothesis cheaply if CEO still wants to proceed. Option A abandons PM judgment. Option D is politics. The hint points to: you can ultimately commit to CEO's decision, but your job is to surface risks and alternatives first. Present evidence, then execute the decision."
},
{
  "id": 26,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Notion's growth is slowing in the US but accelerating in Asia. How would you approach international expansion strategy?",
  "options": [
    "Focus all resources on Asia where growth is strongest",
    "Investigate why US growth is slowing before expanding internationally",
    "Build localized features for Asian markets while maintaining US product",
    "Create separate product teams for each geography"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Don't chase new markets to escape problems in existing ones. Understand both signals.",
  "explanation": "Options B and C are both valid. B (investigate US) is critical - is US saturated, or is the product failing? Don't expand to escape problems you don't understand. C (localize for Asia) capitalizes on growth momentum while maintaining US market. Option A abandons largest market prematurely. Option D is expensive and creates fragmentation. The hint warns: international expansion should come from strength, not as an escape from domestic challenges."
},
{
  "id": 27,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Design a collaboration feature for Figma that helps remote design teams work more effectively.",
  "options": [
    "Real-time video call integrated into the canvas",
    "Async commenting with threaded discussions on design elements",
    "Cursor-chat so designers can communicate while designing",
    "All of the above - teams need multiple ways to collaborate"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Async-first for remote teams. Synchronous tools force timezone alignment.",
  "explanation": "Option B is correct. Remote teams span timezones - async commenting lets teams collaborate without synchronous overlap. Option A (video) is already available elsewhere (Zoom) and forces real-time. Option C is clever but noisy. Option D adds complexity without clarity of use case. The hint guides you: remote ≠ real-time. Best remote collaboration is async-first, letting people work across timezones effectively. Figma's strength is visual artifact persistence, build on that."
},
{
  "id": 28,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your B2B SaaS product has 90% logo retention but only 60% revenue retention. What does this tell you?",
  "options": [
    "Customers are happy - 90% stay with you",
    "Customers are downgrading or reducing seats",
    "You have a pricing problem - price is too high",
    "Your sales team is over-selling to new customers"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Logo retention ≠ revenue retention. Users staying but paying less signals value mismatch.",
  "explanation": "Options B and D are both plausible. B (downgrades) explains the gap - customers stay but reduce spend (fewer seats, lower tier). D (over-selling) means customers buy too much initially, then right-size. Both indicate value-to-price misalignment. Option A misses the revenue problem. Option C assumes price is too high universally (might be wrong tier/packaging). The hint emphasizes: companies keep the product but reduce spend - that's a retention signal, not a pricing signal."
},
{
  "id": 29,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your team is moving too slow. Competitors are shipping features faster. How do you address this?",
  "options": [
    "Cut scope and focus on smaller, shippable increments",
    "Add more engineers to the team",
    "Investigate why velocity is low - tech debt, unclear requirements, or scope creep?",
    "Set aggressive deadlines to force faster shipping"
  ],
  "correctAnswers": [0, 2],
  "multipleCorrect": true,
  "hint": "Framework: Diagnose root cause. Speed problems come from scope, process, or tech debt.",
  "explanation": "Options A and C are both valid. C (diagnose) identifies the actual bottleneck - is it unclear specs slowing eng down? Tech debt? Scope inflation? A (cut scope) is often the fastest fix - ship smaller but ship more often. Option B (add people) often slows teams further (Brooks' Law). Option D creates pressure without addressing root cause. The hint guides you: slow teams rarely speed up from pressure - they speed up from removing blockers (scope, process, debt)."
},
{
  "id": 30,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Uber Eats is expanding into grocery delivery. What's the biggest product challenge to solve first?",
  "options": [
    "Real-time inventory accuracy (groceries sell out quickly)",
    "Substitution logic when items are out of stock",
    "Cold chain logistics for perishables",
    "Expanding merchant partnerships to include grocery stores"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: What's unique about groceries vs. restaurant delivery? Think user expectation gaps.",
  "explanation": "Option B is correct. Grocery delivery's unique challenge: users order 20 items, 3 are out of stock - do you cancel the whole order? Substitute automatically? Ask the user mid-shop? This doesn't exist in restaurant delivery. Options A, C, D are operational challenges but don't fundamentally change product experience. The hint guides you: groceries require handling incomplete orders gracefully - that's a product design problem, not just operations."
},
{
  "id": 31,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Design a feature to help Duolingo users who've lapsed for 30+ days come back.",
  "options": [
    "Email campaign highlighting how much progress they've lost",
    "Make first lesson back easier to reduce re-entry friction",
    "Show them how much their friends have progressed while they were gone",
    "Offer a limited-time streak freeze to pick up where they left off"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Lapsed users need motivation AND low friction. Make returning easy and rewarding.",
  "explanation": "Option B is correct. After 30 days, skill atrophy is real - jumping back at previous difficulty creates failure and re-lapse. Make the first lesson easier to rebuild confidence and habit. Option A creates guilt (demotivating). Option C creates social pressure (can backfire). Option D is nice but doesn't address re-entry friction. The hint guides you: returning is hard psychologically and practically - reduce both barriers. Make success easy at first."
},
{
  "id": 32,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your product has 1M DAU but your CEO wants 10M DAU within a year. How do you approach this goal?",
  "options": [
    "Immediately start growth experiments and marketing campaigns",
    "Question if 10M is realistic and propose alternative growth targets",
    "Work backward from 10M to identify required growth rate and validate feasibility",
    "Focus on product improvements first - growth will follow"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Ambitious goals need math. 10x in 12 months = 21% monthly growth. Is that feasible?",
  "explanation": "Option C is correct. 1M to 10M in 12 months requires ~21% compounding monthly growth - extremely aggressive. Work backward to understand: what channels drive that growth? What's required activation rate? What's market size? Is this realistic? Then discuss with CEO. Option B sounds like pushback without analysis. Option A acts without strategy. Option D ignores the goal. The hint emphasizes: use math to validate ambition, then build strategy from that reality."
},
{
  "id": 33,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Engineering wants to spend 2 months on infrastructure work with no visible user-facing improvements. How do you respond?",
  "options": [
    "Push back - all work must deliver user value",
    "Understand the technical debt and its impact on future velocity",
    "Negotiate for 1 month instead of 2",
    "Agree but require weekly updates on progress"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Tech debt is real debt. Understand the interest rate before deciding to pay it down.",
  "explanation": "Option B is correct. Ask engineering: what breaks if we don't do this? What slows down if we keep deferring? What's the velocity impact? Sometimes infrastructure work is critical for long-term velocity - PMs who always say no create unsustainable technical debt. Options A, C, D don't seek understanding first. The hint guides you: technical debt compounds like financial debt - sometimes paying it down is the highest ROI investment. Understand the tradeoff before deciding."
},
{
  "id": 34,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Slack notices enterprise customers use public channels significantly less than SMBs. Why might this be, and what would you do?",
  "options": [
    "Enterprise teams don't collaborate as much - this is normal",
    "Security concerns make enterprises prefer private channels for sensitive discussions",
    "Enterprise org structure is more siloed - public channels don't map to how they work",
    "Both security and org structure issues - build enterprise-specific features"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Enterprise vs. SMB have different collaboration patterns and security requirements.",
  "explanation": "Option D is correct. Both B (security) and C (org structure) are valid enterprise concerns - they want cross-team visibility but also compliance and hierarchy. This suggests enterprise needs features like: public channels with security controls, org-wide channels that respect department boundaries, better admin controls. Option A is defeatist. B or C alone miss part of the picture. The hint guides you: enterprise isn't just 'bigger SMB' - different needs require different product strategy."
},
{
  "id": 35,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Zoom wants to reduce meeting fatigue. What feature would you prioritize?",
  "options": [
    "AI meeting summaries so people can skip meetings and read notes",
    "Enforce mandatory breaks between back-to-back meetings",
    "'Walking meeting' mode with audio-only and blur/avatar option",
    "Meeting analytics showing each user their weekly meeting hours"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Meeting fatigue has two causes - too many meetings AND too intense/exhausting.",
  "explanation": "Options B and D are both valid. B (enforced breaks) addresses intensity - back-to-back video calls are exhausting, breaks help. D (analytics) addresses quantity - show people the data, let them opt out of low-value meetings. Option A might reduce meetings but doesn't address fatigue. Option C is clever but niche. The hint guides you: tackle both dimensions - make meetings less exhausting AND help people have fewer meetings."
},
{
  "id": 36,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Which metric best predicts whether a SaaS free trial user will convert to paid?",
  "options": [
    "Number of days they log in during trial",
    "Whether they complete onboarding tasks",
    "Whether they achieve a key outcome (e.g., sent first email campaign)",
    "Number of features they explore"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Activation = achieving core value. Outcomes predict retention better than activity.",
  "explanation": "Option C is correct. Users who achieve their goal (sent campaign, closed deal, shipped project) see value and convert. Options A, B, D measure activity, not value. Someone can log in daily, complete onboarding, explore features but never get value - they won't convert. The hint points to: optimize for outcomes (value received) not outputs (features used). Activation is about value realized, not buttons clicked."
},
{
  "id": 37,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Apple is adding AI features to iOS. What's the biggest product risk to manage?",
  "options": [
    "Privacy concerns - users don't want their data used for AI",
    "AI hallucinations damaging Apple's reputation for quality",
    "Complexity - AI features might confuse non-technical users",
    "Battery life impact from on-device AI processing"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Apple's brand = privacy + quality. Which AI risk threatens core brand promise most?",
  "explanation": "Option B is correct. Apple's brand is built on 'it just works' - AI hallucinations (Siri giving wrong directions, Photos misidentifying people) directly undermine this. Privacy (A) is important but Apple's done on-device processing. Complexity (C) is real but manageable. Battery (D) is solvable with hardware. The hint guides you to: the highest risk is the one that damages core brand promise - for Apple, that's reliability and quality, not privacy (they solved that) or simplicity (they're experts)."
},
{
  "id": 38,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your product is plateauing. Leadership wants a big bet to reignite growth. How do you respond?",
  "options": [
    "Propose a bold new product direction to show leadership",
    "First analyze why growth plateaued - is it market saturation or product issues?",
    "Run experiments with existing product to find growth levers before big bets",
    "Benchmark competitors to see what features drove their growth"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Diagnose before prescribing. Plateaus have different causes requiring different solutions.",
  "explanation": "Options B and C are both correct. B (diagnose) identifies if plateau is from: market saturation, competitive pressure, product-market fit drift, or execution issues. C (experiment first) tests if growth can be reignited with existing product before big bets. Option A jumps to solution. Option D is copycat thinking. The hint guides you: plateaus signal something changed - understand what before committing to strategy. Big bets without diagnosis often miss the actual problem."
},
{
  "id": 39,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Stripe wants to help startups integrate payments faster. What would you build?",
  "options": [
    "No-code payment form builder for non-technical founders",
    "AI-powered code generation that writes integration code for developers",
    "Pre-built integrations with popular platforms (Shopify, Webflow, etc.)",
    "Comprehensive documentation and tutorials"
  ],
  "correctAnswers": [0, 2],
  "multipleCorrect": true,
  "hint": "Framework: Different user segments need different solutions. Technical vs. non-technical founders.",
  "explanation": "Options A and C are both valid. A (no-code) serves non-technical founders who can't code integrations. C (pre-built integrations) serves both segments - technical founders use platform APIs, non-technical use platform UI. Option B is interesting but narrow (only helps developers). Option D improves existing flow but doesn't fundamentally speed up integration. The hint guides you: 'startups' includes technical and non-technical founders - serve both segments with different solutions."
},
{
  "id": 40,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your product has high NPS (Net Promoter Score of 60) but low growth. What does this indicate?",
  "options": [
    "Measurement error - high NPS should drive growth",
    "Great product-market fit in a small or slow-growing market",
    "Users love it but don't tell others about it (low virality)",
    "NPS is a vanity metric - focus on revenue instead"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: NPS measures satisfaction, not market opportunity or virality. Great product ≠ big market.",
  "explanation": "Options B and C are both plausible. B (small market) - users love it but total addressable market is limited. C (low virality) - satisfied users don't naturally share/refer, product isn't viral. Both explain high satisfaction without growth. Option A assumes NPS always drives growth (false). Option D dismisses valuable signal. The hint guides you: satisfaction is necessary but insufficient for growth - you also need market size OR virality OR sales motion. High NPS just means you're delighting current users."
},
{
  "id": 41,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Peloton sees usage drop 60% after 6 months. How would you address this retention problem?",
  "options": [
    "Lower the subscription price to reduce churn",
    "Add more content variety (yoga, strength training, meditation)",
    "Build social features - let users work out with friends",
    "Create personalized workout programs that adapt to user progress"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Fitness retention = progress. Users quit when they stop seeing results or plateau.",
  "explanation": "Option D is correct. Fitness products lose users when workout becomes stale or progress plateaus - personalized programs that adapt keep users seeing results and feeling challenged. Option A addresses price sensitivity, not engagement. Option B is content variety but not personalization. Option C (social) helps some users but isn't the core retention driver for fitness. The hint guides you: people stick with fitness when they see progress - build systems that ensure continued progress through personalization."
},
{
  "id": 42,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "You need to cut 30% of your roadmap to hit a critical deadline. How do you decide what to cut?",
  "options": [
    "Cut the features engineering flagged as most complex",
    "Cut features that serve the smallest user segments",
    "Re-evaluate all features against current company goals and user needs",
    "Let engineering decide - they know what's technically easiest to defer"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Prioritization under constraint reveals what really matters. Use strategy, not convenience.",
  "explanation": "Option C is correct. Return to first principles: what drives the most impact toward company goals? What serves the most critical user needs? Cut from the bottom of that prioritized list. Option A optimizes for engineering convenience. Option B might cut high-value features serving small but important segments. Option D abdicates PM responsibility. The hint guides you: constraints force clarity - use them to validate that your roadmap actually reflects priorities. Cut the lowest-impact work, not the hardest work."
},
{
  "id": 43,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "GitHub wants to help developers discover high-quality open source projects. How would you approach this?",
  "options": [
    "Surface projects based purely on stars and forks (social proof)",
    "Build an algorithmic feed based on developer's interests and past contributions",
    "Curate featured projects manually by language/category",
    "Let developers subscribe to specific maintainers they trust"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Discovery at scale needs algorithms + curation. One alone won't work.",
  "explanation": "Options B and D are both valuable. B (algorithmic) scales personalization - show JavaScript devs relevant JS projects. D (follow maintainers) leverages human curation - 'this maintainer makes good stuff, show me more from them.' Option A (stars/forks) is gameable and doesn't scale. Option C (manual curation) doesn't scale to millions of projects. The hint guides you: both algorithmic (scale) and social (trust) signals are needed for good discovery. Use both."
},
{
  "id": 44,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your freemium product has 10M free users and 100K paid users (1% conversion). What should you optimize first?",
  "options": [
    "Grow free users to 20M to double paid user base",
    "Improve conversion rate from 1% to 2%",
    "Increase revenue per paid user through upsells",
    "Depends on CAC, LTV, and growth stage of the company"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Growth vs. monetization vs. retention - optimal lever depends on unit economics.",
  "explanation": "Option D is correct. If CAC is low and LTV is high, grow users. If LTV is low, focus on revenue expansion (C). If conversion rate is below benchmark, optimize that (B). Without unit economics, you can't prioritize. Options A, B, C might each be correct in different contexts. The hint guides you: optimization priorities depend on where the biggest economic leverage is - know your CAC, LTV, payback period before deciding which metric to move."
},
{
  "id": 45,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "DoorDash wants to expand from food delivery into other categories. Which would you test first?",
  "options": [
    "Grocery delivery (complements food, similar operations)",
    "Alcohol delivery (high margin, regulatory complexity)",
    "Retail delivery (large market, different operations)",
    "Prescription delivery (essential need, requires different licensing)"
  ],
  "correctAnswers": [0],
  "multipleCorrect": false,
  "hint": "Framework: Adjacent expansion. Leverage existing capabilities before building entirely new ones.",
  "explanation": "Option A is correct. Grocery delivery leverages: existing restaurant partnerships (many do groceries), delivery infrastructure, user base that already orders food. Operations are similar. Options B, C, D require new: regulations (B, D), fulfillment models (C, D), merchant relationships (B, C, D). The hint guides you: expand into adjacencies that leverage existing strengths and require minimal new capabilities. Test grocery before building entirely new businesses like alcohol or prescription."
},
{
  "id": 46,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "A major customer threatens to churn unless you build a specific feature. What do you do?",
  "options": [
    "Build it - losing a major customer is too risky",
    "Negotiate - can they wait for it on the roadmap?",
    "Understand if this is one customer's unique need or broadly needed",
    "Let them churn - don't let one customer dictate product strategy"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Balance customer retention with product integrity. Investigate before deciding.",
  "explanation": "Options B and C are both correct. B (negotiate) explores if timeline is flexible - maybe it's already on roadmap. C (investigate) determines if this signals broader market need or one customer's edge case. Both gather information before committing. Option A creates technical debt from one-off features. Option D is cavalier about customer retention. The hint guides you: one customer's ultimatum might reveal an important market signal OR an edge case - investigate before deciding, don't react immediately either way."
},
{
  "id": 47,
  "category": "Product Design",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Spotify wants to help artists make more money. What feature would you prioritize?",
  "options": [
    "Let fans tip artists directly during song playback",
    "Merchandise store integration within artist profiles",
    "Concert discovery and ticket purchasing",
    "Higher royalty rates per stream"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: What scales? What's in Spotify's control? Streaming royalties aren't.",
  "explanation": "Option C is correct. Spotify can build concert discovery + take affiliate fees on ticket sales - this creates sustainable revenue for artists AND Spotify. Option A (tips) is nice but doesn't scale (most users won't tip). Option B (merch) is valuable but competitive (Shopify, Bandcamp do this). Option D (higher royalties) requires negotiating with labels, mostly out of Spotify's control. The hint guides you: build features you control that create scalable value for artists. Concerts are high-margin, high-value for artists, and Spotify can facilitate discovery."
},
{
  "id": 48,
  "category": "Metrics",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "How would you measure the success of a new collaboration feature in a design tool?",
  "options": [
    "Adoption rate - what % of teams use it",
    "Active collaboration sessions per week",
    "Impact on overall product retention",
    "All of the above - you need multiple metrics"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Feature success = adoption + engagement + business impact. All three matter.",
  "explanation": "Option D is correct. You need all three: (A) Adoption shows teams find it discoverable and try it. (B) Engagement shows they use it repeatedly - it's valuable. (C) Retention shows it improves core product value. One metric alone is incomplete - high adoption without engagement means it's tried once and abandoned. High engagement without retention impact means it's used but not critical. The hint guides you: comprehensive feature evaluation needs adoption (top of funnel) + engagement (usage) + business impact (outcomes)."
},
{
  "id": 49,
  "category": "Product Sense",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Coinbase sees crypto prices crash 70%. How should product strategy change in a bear market?",
  "options": [
    "Focus on cost-cutting to survive the downturn",
    "Build features for long-term holders (staking, earn products)",
    "Expand into adjacent products less dependent on trading volume",
    "Double down on trading features for remaining active traders"
  ],
  "correctAnswers": [1, 2],
  "multipleCorrect": true,
  "hint": "Framework: Bear markets change user behavior. Optimize for new behavior, not old.",
  "explanation": "Options B and C are both smart. B (staking/earn) serves remaining users who aren't trading but are holding - create value from assets sitting idle. C (adjacent products) reduces dependence on trading volume (wallets, NFTs, Layer 2). Option A is necessary but not product strategy. Option D optimizes for shrinking user base. The hint guides you: bear markets drive behavior change - fewer speculators, more long-term holders. Build for the behavior that persists in downturns."
},
{
  "id": 50,
  "category": "Behavioral",
  "salaryTier": "Mid",
  "salaryRange": "$170K-$220K",
  "question": "Your team shipped a bug that cost a major customer $50K. How do you handle it?",
  "options": [
    "Immediately refund the customer and apologize",
    "Investigate root cause and fix the bug before addressing customer",
    "Acknowledge the issue, fix immediately, analyze root cause, compensate customer, share learnings",
    "Escalate to leadership - this is too big for PM to handle alone"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Incident response = acknowledge + fix + compensate + prevent. Do all four.",
  "explanation": "Option C is correct. Full incident response includes: (1) Acknowledge to customer immediately, (2) Fix the bug so it doesn't affect others, (3) Post-mortem to understand how it happened, (4) Compensate customer appropriately, (5) Share learnings to prevent recurrence. Option A stops at compensation. Option B fixes but ignores customer. Option D escalates without action. The hint guides you: incidents require immediate tactical response (acknowledge + fix) AND strategic response (analyze + prevent). Do both."
},
{
  "id": 51,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Meta is considering building a decentralized social network. What are the key product risks?",
  "options": [
    "Moderation becomes impossible without central control",
    "Users don't care about decentralization - it doesn't solve a user problem",
    "Network effects are harder to build in decentralized systems",
    "All of the above are significant risks"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Decentralization trades central control for user autonomy. What are the second-order effects?",
  "explanation": "Option D is correct - all three risks are real. A: Decentralized moderation is unsolved (who removes illegal content?). B: Most users value features/experience over architecture. C: Decentralized networks fragment - harder to achieve critical mass. The hint guides you to think systemically: decentralization isn't just technical architecture, it fundamentally changes product economics (network effects), safety (moderation), and value prop (why would users care?). All three must be solved."
},
{
  "id": 52,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're building AI code generation for developers. How do you handle the trust calibration problem?",
  "options": [
    "Show confidence scores on generated code",
    "Require human review for all generated code",
    "Run automated tests before presenting code to user",
    "Both automated validation (C) and confidence signals (A)"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Trust calibration needs both deterministic validation and probabilistic signals.",
  "explanation": "Option D is correct. Automated testing (C) provides deterministic validation - does the code run? Are there syntax errors? This catches obvious failures. Confidence scores (A) help users calibrate trust for subtle issues tests can't catch. Option B (human review) is too slow for iterative development. The hint guides you: combine deterministic checks (tests, linters) with probabilistic signals (confidence) to help users make appropriate trust decisions."
},
{
  "id": 53,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Your platform has 1000 B2B customers but 80% of revenue comes from 50 enterprise customers. What does this tell you about product strategy?",
  "options": [
    "Focus entirely on enterprise - that's where the money is",
    "The product has failed to monetize SMB effectively",
    "SMB is a lead generation funnel for enterprise - keep both",
    "You have two distinct products with different needs - consider splitting"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Revenue concentration tells you where value is captured, not necessarily where to focus.",
  "explanation": "Options C and D are both valid strategies. C: SMB provides volume, user feedback, and pipeline for enterprise expansion - many companies start SMB and grow into enterprise. D: If needs are truly divergent, splitting into two products with focused strategies might be better than one compromised product. Option A abandons the broader market. Option B assumes failure without investigating if it's by design. The hint guides you: don't just chase revenue - understand if SMB serves strategic purposes beyond revenue."
},
{
  "id": 54,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're leading a 0-1 product with no proven playbook. How do you set goals and measure success?",
  "options": [
    "Set aggressive growth targets to force innovation",
    "Focus on learning metrics - experiments run, hypotheses tested",
    "Traditional product metrics (DAU, retention) still apply",
    "Combine learning velocity with early product-market fit signals"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: 0-1 requires both learning (are we finding PMF?) and signals (are we making progress?).",
  "explanation": "Option D is correct. Early-stage products need dual metrics: (1) Learning velocity - are we testing hypotheses and gaining insights quickly? (2) Early PMF signals - retention cohorts, user feedback, willingness to pay. Option A creates pressure without framework. Option B ignores business outcomes. Option C applies scale-stage metrics too early. The hint guides you: 0-1 is about discovering what to build - measure both speed of learning AND early signals that you're heading toward product-market fit."
},
{
  "id": 55,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "OpenAI is deciding whether to build consumer products or focus on API/platform. What framework would you use?",
  "options": [
    "Revenue potential - which generates more money?",
    "Strategic moats - which is more defensible long-term?",
    "Mission alignment - which accelerates AGI development?",
    "All three factors must be weighted together"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Strategic decisions require multi-dimensional analysis. Revenue, moats, and mission all matter.",
  "explanation": "Option D is correct. This isn't a single-axis decision: Revenue (consumer can scale faster, API has enterprise margins). Moats (API creates integration lock-in, consumer creates brand/distribution). Mission (API enables ecosystem innovation, consumer demonstrates capabilities). All three must inform strategy. Options A, B, C optimize single dimension. The hint guides you: strategic product decisions are multi-objective optimization - revenue, defensibility, and strategic goals must all be considered."
},
{
  "id": 56,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Design an evaluation framework for an AI chat product. What matters most?",
  "options": [
    "Model accuracy metrics (BLEU score, perplexity)",
    "User satisfaction scores and task completion rates",
    "Both technical performance and user outcomes",
    "Business metrics - engagement, retention, monetization"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: AI evals need both model quality (can it perform?) and user value (does it help?).",
  "explanation": "Option C is correct. AI product evals require dual measurement: (1) Model performance - accuracy, latency, consistency. (2) User outcomes - did users accomplish their goal? Were they satisfied? Option A only measures model. Option B only measures experience. Option D only measures business. The hint guides you: model quality is necessary but insufficient - a highly accurate model that confuses users or solves the wrong problem fails. Measure both technical performance and user value delivery."
},
{
  "id": 57,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're launching in a new market. Competitors have 10M users, you have 0. What's your go-to-market metric strategy?",
  "options": [
    "Track DAU growth - catch up to competitors",
    "Ignore absolute numbers, focus on retention and engagement quality",
    "Identify a niche segment where you can win, measure dominance there",
    "Focus on rate of growth, not absolute size"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Can't out-scale incumbents initially. Win through focus (segment dominance) or velocity.",
  "explanation": "Options C and D are both valid. C: Find a segment (power users, specific use case, geography) where you can be #1 - measure market share in that niche. D: 20% monthly growth from 1000 users is more impressive than 2% growth from 1M users - measure velocity. Options A and B either chase vanity metrics or ignore growth entirely. The hint guides you: beating large incumbents requires strategic focus OR execution velocity, measure those, not absolute user counts."
},
{
  "id": 58,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Your product strategy conflicts with your VP's vision. How do you navigate this?",
  "options": [
    "Build evidence for your strategy and present it clearly",
    "Align with VP's vision - they have broader context",
    "Escalate to CEO to mediate the disagreement",
    "Run a small experiment to test your hypothesis before full commitment"
  ],
  "correctAnswers": [0, 3],
  "multipleCorrect": true,
  "hint": "Framework: Disagree with data and experiments, not opinions. Make the disagreement testable.",
  "explanation": "Options A and D are both professional approaches. A: Build compelling case with user data, market analysis, competitive landscape - argue with evidence. D: Propose low-cost experiment to test the hypothesis - let data decide. Both approaches depoliticize the disagreement. Option B abandons your judgment without discussion. Option C escalates without attempting resolution. The hint guides you: strategic disagreements should be resolved with evidence and experiments, not hierarchy or politics."
},
{
  "id": 59,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Anthropic is deciding how to monetize Claude. What are the key strategic tradeoffs?",
  "options": [
    "Free tier for adoption vs. paid-only for revenue",
    "API pricing vs. consumer subscription",
    "Model access vs. application layer",
    "All pricing decisions involve multiple strategic tradeoffs"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Monetization strategy determines market position, competition, and long-term business model.",
  "explanation": "Option D is correct. Every monetization choice has strategic implications: Free tier (distribution vs. revenue). API vs. consumer (developer platform vs. direct value capture). Model vs. apps (horizontal platform vs. vertical solutions). Each creates different moats, revenue models, and competitive dynamics. The hint guides you: monetization isn't just pricing - it's strategic positioning. Free tier + API = OpenAI model. Consumer subscription = Perplexity model. Enterprise + API = Anthropic current model. Each has different strategic tradeoffs."
},
{
  "id": 60,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're building an AI agent that takes actions on behalf of users. How do you design the autonomy vs. control tradeoff?",
  "options": [
    "Full autonomy - let AI act without confirmation (highest productivity)",
    "Confirmations for all actions (safest but friction-heavy)",
    "Risk-based: auto-act on low-risk, confirm high-risk actions",
    "Let users configure their own risk tolerance"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Autonomy scales with trust and stakes. High-stakes actions require confirmation.",
  "explanation": "Option C is correct. Risk-based autonomy balances productivity and safety: auto-schedule meetings (low risk), confirm before booking flights (high cost), require approval before sending external emails (reputational risk). Option A is dangerous. Option B adds unnecessary friction. Option D puts cognitive burden on users. The hint guides you: autonomy isn't binary - it's a spectrum based on reversibility and impact. Design systems that act autonomously when safe, involve humans when stakes are high."
},
{
  "id": 61,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "How do you measure whether an AI feature is actually helping users vs. just being used?",
  "options": [
    "Usage metrics - adoption and frequency",
    "User surveys asking 'did this help you?'",
    "Task completion rate and time-to-completion improvement",
    "Retention - users who use AI feature stay longer"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: AI value = outcomes achieved, not outputs generated. Measure task success, not usage.",
  "explanation": "Option C is correct. Measure whether AI actually improved the outcome: Did users complete their task? Faster? Better? Usage (A) can be high while value is low. Surveys (B) measure perception, not reality. Retention (D) is lagging and confounded. The hint guides you: AI features can be used frequently but deliver little value (users try repeatedly because it keeps failing). Measure outcomes (did the code work? was the email sent? did they find the answer?) not just usage."
},
{
  "id": 62,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You have 3 equally important strategic initiatives but only resources for 1.5. How do you decide?",
  "options": [
    "Spread resources thin across all 3 to make some progress",
    "Fully fund 1, half-fund another, pause the third",
    "Sequence them - fund one fully, then move to next when complete",
    "Renegotiate resources or timelines with leadership"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Partial resourcing often means zero impact. Concentrate resources for real outcomes.",
  "explanation": "Options B and D are both valid. B: Fully fund one to completion, half-fund another (maybe MVP scope), pause third - ensures at least one succeeds. D: Challenge the constraint - can we get more resources? Can we extend timelines? Sometimes constraints can be negotiated. Option A guarantees mediocrity across all three. Option C ignores that all are important. The hint guides you: spreading resources thin often means nothing ships well. Concentrate resources where they'll have impact."
},
{
  "id": 63,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Tesla is launching Full Self-Driving. What's the biggest product risk beyond technical capability?",
  "options": [
    "Regulatory approval in different markets",
    "User trust calibration - knowing when to take over",
    "Liability when accidents happen",
    "All of these are critical non-technical risks"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Autonomous systems face technical, regulatory, liability, and UX challenges simultaneously.",
  "explanation": "Option D is correct - all are critical. Regulation: Different countries have different approval processes. Trust calibration: Users must understand system limits (when it fails). Liability: Who's responsible for accidents - user or Tesla? All three must be solved for product to succeed. The hint guides you: truly transformative products (autonomous vehicles, AI agents, medical AI) face challenges across multiple domains - technical feasibility is just one dimension. Product success requires solving regulatory, legal, and trust challenges too."
},
{
  "id": 64,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Design a content moderation system for a platform with 100M DAU. What's your approach?",
  "options": [
    "AI-first moderation with human review for edge cases",
    "Human moderators with AI assistance",
    "Community-driven moderation (voting, reporting)",
    "Layered approach combining AI, humans, and community"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Scale requires automation, accuracy requires humans, engagement requires community.",
  "explanation": "Option D is correct. At 100M DAU scale, you need: (1) AI for speed (handles obvious violations immediately). (2) Human reviewers for nuance (cultural context, edge cases). (3) Community tools (reporting, voting) for distributed enforcement and user empowerment. Options A, B, C alone can't handle scale + accuracy + community trust. The hint guides you: content moderation at scale is a systems problem - no single approach works. Layer defenses: automated filters, human judgment, and community governance."
},
{
  "id": 65,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Your AI product has 95% accuracy in testing but users report it feels unreliable. What do you investigate?",
  "options": [
    "Test set quality - is it representative of real usage?",
    "Error distribution - are the 5% failures highly visible or high-impact?",
    "User expectations - do users expect 100% accuracy?",
    "All three factors likely contribute to the perception gap"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Perceived reliability ≠ measured accuracy. Distribution of errors and expectations matter.",
  "explanation": "Option D is correct. 95% average accuracy can feel unreliable if: (A) Test set doesn't match production (accuracy is actually lower). (B) The 5% errors occur on high-visibility tasks (users remember failures more than successes). (C) Users expect perfection (95% feels broken if expectation is 100%). All three must be investigated. The hint guides you: aggregate accuracy metrics hide important details about error distribution, use-case coverage, and user psychology. Perceived reliability is a function of actual performance AND user expectations AND error salience."
},
{
  "id": 66,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You need to deliver bad news to a major customer - a promised feature is being cut. How do you handle it?",
  "options": [
    "Deliver news directly with clear reasoning and alternatives",
    "Have your VP or exec deliver the news instead",
    "Delay telling them until you have a replacement solution",
    "Explain the decision and invite them to influence future roadmap"
  ],
  "correctAnswers": [0, 3],
  "multipleCorrect": true,
  "hint": "Framework: Bad news delivered well maintains trust. Delay or deflection destroys it.",
  "explanation": "Options A and D are both appropriate. A: Be direct, explain why (strategic pivot, resource constraints), show you've considered their needs. D: Turn it into partnership - we're cutting X, what would be most valuable instead? Both maintain trust through transparency. Option B abdicates responsibility. Option C delays inevitable and erodes trust. The hint guides you: customers respect honesty and transparency, even when news is bad. Hiding or delaying bad news damages relationships more than the news itself."
},
{
  "id": 67,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Microsoft is integrating AI into Office. Should they charge separately for AI features or bundle them?",
  "options": [
    "Bundle - increases Office value prop and prevents AI-first competitors",
    "Separate SKU - captures willingness-to-pay from AI power users",
    "Hybrid - basic AI bundled, advanced features as add-on",
    "Depends on competitive dynamics and customer segment economics"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Pricing strategy depends on competition, customer WTP, and strategic positioning.",
  "explanation": "Option D is correct. The answer depends on: Is Google Workspace bundling AI (competitive pressure)? Do enterprise customers have budget for AI tools (WTP)? Is Microsoft defending Office or building new AI business (strategy)? Options A, B, C might each be right depending on these factors. The hint guides you: pricing and bundling decisions are strategic, not absolute - they depend on market dynamics, competitive moves, and your strategic goals (defend vs. expand vs. premium tier)."
},
{
  "id": 68,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're building a collaborative AI agent that multiple team members can delegate tasks to. How do you handle conflicting instructions?",
  "options": [
    "First instruction wins (FIFO)",
    "Last instruction wins (most recent)",
    "Manager/admin instructions override others",
    "Agent asks for clarification when instructions conflict"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Autonomous agents should escalate ambiguity, not make arbitrary choices.",
  "explanation": "Option D is correct. When team members give conflicting instructions ('schedule meeting Monday' vs. 'cancel all Monday meetings'), the agent should surface the conflict to relevant stakeholders, not make arbitrary decisions. Options A, B, C create implicit hierarchy that may be wrong for context. The hint guides you: agents operating on behalf of teams must recognize when autonomy is inappropriate - conflicting goals indicate human decision needed. Design for graceful escalation, not blind rule-following."
},
{
  "id": 69,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "How would you measure if your AI product is creating over-reliance vs. appropriate reliance?",
  "options": [
    "Survey users about their trust levels",
    "Measure how often users verify AI outputs vs. accept blindly",
    "Track error rates when AI is wrong vs. user override rates",
    "Compare task outcomes when AI is used vs. not used"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Appropriate reliance = users catch errors but don't over-verify. Measure both dimensions.",
  "explanation": "Option C is correct. Appropriate reliance means: when AI is wrong, users catch it (error detection rate) AND when AI is right, users don't waste time verifying (efficient trust). Over-reliance: low error detection. Under-reliance: excessive verification of correct outputs. This requires measuring both error rates and override behavior. Options A, B, D measure single dimensions. The hint guides you: trust calibration is bidirectional - measure both false acceptances (over-trust) and false rejections (under-trust)."
},
{
  "id": 70,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Your most experienced engineer disagrees with a product decision you're highly confident in. What's your approach?",
  "options": [
    "Gather more data to validate your decision",
    "Schedule 1:1 to deeply understand their technical concerns",
    "Move forward with your decision - you're the PM",
    "Propose running a small technical spike to test their concern"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Senior engineers see technical constraints PMs often miss. Investigate before deciding.",
  "explanation": "Options B and D are both appropriate. B: Understand their technical perspective - what implementation challenges do they see? What tradeoffs are you missing? D: Technical spike validates concerns cheaply before full commitment. Both show respect for expertise while maintaining PM responsibility. Option A delays without learning. Option C ignores valuable input. The hint guides you: the most experienced engineers often spot problems PMs can't see - investigate their concerns deeply before dismissing them."
},
{
  "id": 71,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Amazon is considering using AI to write product descriptions. What's the biggest product risk?",
  "options": [
    "AI-generated descriptions will be generic and hurt conversion",
    "Sellers will lose trust if Amazon auto-generates their listings",
    "Hallucinations could create false claims and legal liability",
    "All of these risks must be managed simultaneously"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI in marketplaces affects sellers, buyers, and platform - all stakeholders matter.",
  "explanation": "Option D is correct. Each risk is real: (A) Generic descriptions reduce differentiation and conversion. (B) Sellers want control over how their products are presented. (C) False claims (AI hallucinates specs) create legal exposure and buyer distrust. All three must be addressed. The hint guides you: marketplace products must balance multiple stakeholders - optimize for sellers AND buyers AND platform. AI features that help one stakeholder while harming others create ecosystem problems."
},
{
  "id": 72,
  "category": "Product Design",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Design an AI feature for Google Docs that helps with writing. What's your product philosophy?",
  "options": [
    "AI should write for users (autocomplete, generation)",
    "AI should edit what users write (suggestions, improvements)",
    "AI should augment creativity, not replace it",
    "All three modes serve different use cases"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Tools should amplify human capability, not replace human agency.",
  "explanation": "Option C is correct as product philosophy. Writing is creative expression - AI should help users write better (suggestions, research, outlines) not write FOR them (generating full paragraphs removes authorship). Option D is tactically true but misses the strategic philosophy. Options A, B are features, not philosophy. The hint guides you: product philosophy should clarify what role AI plays - Google Docs is about empowering writers, so AI should augment, not automate authorship. This guides every feature decision."
},
{
  "id": 73,
  "category": "Metrics",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Your team built 10 features this quarter. Only 2 drove measurable impact. What do you conclude?",
  "options": [
    "The team is shipping low-quality features",
    "Your measurement framework is broken or incomplete",
    "This is normal - most features don't move metrics significantly",
    "Both measurement issues and prioritization issues likely exist"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Low hit rate indicates either bad bets OR bad measurement. Investigate both.",
  "explanation": "Option D is correct. 20% hit rate could mean: (A) Poor prioritization - shipping features without validated impact hypothesis. (B) Poor measurement - good features without proper instrumentation or attribution. (C) Normal outcomes - some bets don't pan out. Most likely: combination of prioritization and measurement issues. Options A, B, C explain single causes. The hint guides you: before concluding 'we ship bad features,' investigate whether you're measuring correctly. Then fix both prioritization AND instrumentation."
},
{
  "id": 74,
  "category": "Behavioral",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "You're managing a PM who's struggling. They miss deadlines and communication is unclear. What's your approach?",
  "options": [
    "Give direct feedback about performance issues immediately",
    "Set clear expectations and concrete improvement plan with milestones",
    "Move them to a different project better suited to their skills",
    "Both A and B - clear feedback plus structured improvement plan"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Performance management requires clarity (feedback) and structure (improvement plan).",
  "explanation": "Option D is correct. Effective performance management combines: (1) Direct, specific feedback about what's not working. (2) Clear improvement plan with measurable milestones and timeline. Both are necessary - feedback without plan is demotivating, plan without feedback creates confusion. Option A alone feels punitive. Option B alone lacks clarity on what's wrong. Option C avoids the problem. The hint guides you: help people improve by being clear about gaps AND structured about how to close them."
},
{
  "id": 75,
  "category": "Product Sense",
  "salaryTier": "Senior",
  "salaryRange": "$220K-$280K",
  "question": "Shopify sees merchants requesting AI-powered inventory prediction. Should they build it?",
  "options": [
    "Yes - it's high-value for merchants",
    "No - inventory management is outside Shopify's core platform",
    "Partner with existing inventory management tools instead",
    "Depends on whether it's defensible vs. point solutions"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Platform vs. feature decisions depend on defensibility and strategic moat.",
  "explanation": "Option D is correct. Build if: (1) Shopify's data moat (transaction history) creates better predictions than standalone tools. (2) It keeps merchants on platform vs. going elsewhere. Don't build if: specialized inventory tools will always be better, or it distracts from core platform. Option A ignores strategic tradeoffs. Option B is dogmatic. Option C might be right but needs same strategic analysis. The hint guides you: 'should we build X?' requires asking: does our unique position create advantage? Does it strengthen our moat? High merchant value alone isn't sufficient."
},
{
  "id": 76,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Anthropic is designing Constitutional AI. Users complain that harmlessness makes Claude refuse helpful requests. What's the core product tension you're navigating?",
  "options": [
    "Safety vs. capability - making AI harmless reduces its usefulness for edge cases",
    "Universal values vs. user autonomy - whose definition of 'harmful' should the AI follow?",
    "Transparency vs. simplicity - explaining Constitutional AI's reasoning adds friction to every response",
    "Short-term satisfaction vs. long-term trust - users want immediate help, society needs reliable AI"
  ],
  "correctAnswers": [0],
  "multipleCorrect": false,
  "hint": "Framework: Constitutional AI creates fundamental capability-safety tradeoff. Which matters most for product adoption?",
  "explanation": "Option A is correct. Here's why each tension differs:

A) 'Safety vs. capability' - CORRECT. This is the core Constitutional AI product challenge: harmlessness training makes models refuse edge cases that might be legitimate (creative writing with violence, security research, medical edge cases). Every safety filter creates false positives. Product must balance: (1) Harm prevention (refuse truly dangerous requests), (2) Usefulness (allow legitimate edge cases). This directly affects user retention - overly cautious AI drives users to less safe competitors. The hint guides you: capability-safety is the operational tradeoff you manage daily through eval tuning, not philosophical debate.

B) 'Universal values vs. user autonomy' - Wrong because: while this is philosophically interesting, it's not the day-to-day product tension. Constitutional AI already made this choice (Anthropic defines values, users can't customize core safety). The product challenge isn't 'whose values' but 'how strict.' This is research paper territory, not product management.

C) 'Transparency vs. simplicity' - Wrong because: Constitutional AI's reasoning is mostly invisible to users. Claude doesn't explain 'I refused this because of Constitutional principle 3.' Users just see refusal. Transparency would actually help product (users understand why), but isn't current implementation. This conflates research approach with user experience.

D) 'Short-term satisfaction vs. long-term trust' - Wrong because: this frames users as short-sighted and society as long-term, but users also want trustworthy AI. Also, 'long-term trust' is vague - trust from whom? Regulators? Users? This is marketing language, not operational product tradeoff. The real tension is immediate (this specific refusal) vs. systematic (overall safety posture)."
},
{
  "id": 77,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "You're designing eval framework for Cursor/Copilot coding agent. Engineers propose measuring: test pass rate, code review approval rate, or time-to-completion. Which is your North Star metric?",
  "options": [
    "Test pass rate - code must be functionally correct above all else",
    "Code review approval rate - human developers are the ultimate judges of quality",
    "Time-to-completion - developers use agents to move faster, measure what they care about",
    "Developer retention of generated code - how often do they keep vs. rewrite it"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: North Star metrics measure actual user value, not intermediate quality signals. What indicates adoption?",
  "explanation": "Option D is correct. Here's why each metric works or doesn't:

A) 'Test pass rate' - Wrong because: this is necessary but not sufficient. Agent could generate code that passes tests but is unmaintainable, insecure, or doesn't match developer intent. Also, test coverage varies wildly - 100% pass rate on sparse tests means little. This measures correctness floor, not user value. Shows inexperience with real-world code quality.

B) 'Code review approval rate' - Wrong because: code review is noisy signal - approvals depend on reviewer strictness, team culture, time pressure. Also, this requires human-in-loop for every eval (doesn't scale). Developers might approve code they plan to rewrite later (approval ≠ quality). Confuses process metric with outcome.

C) 'Time-to-completion' - Wrong because: agent might complete tasks fast by generating poor code. Time saved that creates future tech debt is negative value. Also, 'completion' is ambiguous - when agent says done? When tests pass? When code ships? This optimizes speed without quality constraint, leading to problematic agent behavior.

D) 'Developer retention of generated code' - CORRECT. This reveals true value: (1) Developer keeps code → agent saved them time with acceptable quality. (2) Developer rewrites → agent wasted their time. (3) Retention % indicates: quality (code worth keeping), alignment (matched intent), efficiency (saved real work). Captures both speed AND quality in one metric that reflects developer behavior, not agent claims. The hint guides you: retention is revealed preference - developers vote with their actions (keep vs. delete) not surveys. This is your adoption signal."
},
{
  "id": 78,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "How do you measure if your AI model is getting better at calibration (knowing when it doesn't know)?",
  "options": [
    "Track model confidence scores over time",
    "Measure calibration curve - predicted probability vs. actual accuracy",
    "User surveys asking if model seems well-calibrated",
    "Expected calibration error (ECE) as primary metric"
  ],
  "correctAnswers": [1, 3],
  "multipleCorrect": true,
  "hint": "Framework: Calibration = alignment between confidence and correctness. Measure mathematically.",
  "explanation": "Options B and D are both correct. B (calibration curve): Plot predicted confidence vs. actual correctness - well-calibrated model's 80% confidence predictions should be 80% accurate. D (ECE): Quantifies calibration gap across all confidence levels. Both are rigorous measurements. Option A tracks confidence but not accuracy. Option C is subjective. The hint guides you: calibration is a measurable property - use statistical metrics (ECE, Brier score) not just confidence levels. A model can be confidently wrong; calibration measures confidence-accuracy alignment."
},
{
  "id": 79,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your research team wants to publish capabilities that could be misused. How do you balance openness vs. safety?",
  "options": [
    "Publish everything - openness accelerates safety research",
    "Don't publish anything - safety first always",
    "Staged release - publish with safeguards, monitor for misuse",
    "Depends on capability risk level and defensive measures available"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Responsible disclosure requires risk assessment and mitigation strategy.",
  "explanation": "Option D is correct. Publication decisions require: (1) Risk assessment - how dangerous is the capability? What's the misuse potential? (2) Defensive posture - do mitigations exist? Can we deploy safeguards first? (3) Benefit analysis - does publication accelerate safety research? Some capabilities should be published (safety techniques, alignment methods), others require staged release (powerful model capabilities), some should stay private (exploit techniques). Options A, B are dogmatic. Option C is one approach but not universal. The hint guides you: responsible disclosure isn't binary - it's risk-proportionate and context-dependent."
},
{
  "id": 80,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "OpenAI is designing tool use for ChatGPT. Should tools be auto-selected by the model or user-controlled?",
  "options": [
    "Auto-select - users want outcomes, not to manage tools",
    "User-controlled - users should know what tools AI uses",
    "Hybrid - auto-select with user override and transparency",
    "Depends on tool risk profile and user sophistication"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Autonomy vs. transparency tradeoff. High-stakes tools need user awareness.",
  "explanation": "Options C and D are both valid. C (hybrid): Auto-select for convenience but show what tools are being used and allow override - balances UX and control. D recognizes different tools have different risk profiles: web search (safe to auto-use), code execution (requires permission), email sending (requires explicit consent). The hint guides you: tool use autonomy should scale with risk - transparent auto-selection for low-risk tools, explicit approval for high-stakes actions. Design graduated autonomy based on reversibility and impact."
},
{
  "id": 81,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Design a feedback mechanism for users to correct AI agent behavior. What's most important?",
  "options": [
    "Thumbs up/down on every action",
    "Detailed feedback forms explaining what went wrong",
    "Ability to edit/correct the agent's output directly",
    "Multi-level feedback: quick reactions + detailed correction when needed"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Feedback mechanisms must balance signal quality with user friction.",
  "explanation": "Option D is correct. Effective agent feedback needs: (1) Low-friction signals (thumbs up/down) for volume. (2) Detailed correction for important failures (what should it have done?). (3) Implicit feedback from user edits (rejection signal). Different situations need different feedback depths - binary ratings for quick iterations, detailed explanations for safety-critical failures, edit patterns for learning preferences. Options A, B, C each capture one dimension but miss the spectrum. The hint guides you: one feedback mechanism can't optimize for both signal quality and volume - design layered feedback for different contexts."
},
{
  "id": 82,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your AI agent has 90% task success rate but users report it 'feels unreliable.' You dig into the data and find successful tasks take 2-30 seconds (high variance). What's the actual problem?",
  "options": [
    "Latency variance - users can't predict how long tasks will take, destroying mental model of reliability",
    "Hidden partial failures - tasks 'succeed' but output quality is inconsistent, requiring user cleanup",
    "Success definition mismatch - your metric says success, but users have different quality bar",
    "User expectations - 90% isn't good enough for tasks they consider 'should always work'"
  ],
  "correctAnswers": [0],
  "multipleCorrect": false,
  "hint": "Framework: Reliability perception comes from predictability, not just success rate. Variance kills trust.",
  "explanation": "Option A is correct. Here's why each explains the perception gap:

A) 'Latency variance' - CORRECT given the data point (2-30 seconds). When users can't predict performance, they can't trust the system: (1) Same task takes 3 seconds sometimes, 25 seconds others - users don't know if it's working or hung. (2) Unpredictability feels like unreliability even with 90% success. (3) Users abandon tasks before completion because they don't know if agent is stuck. High variance latency is worse than consistent slower performance - predictability enables trust. The hint guides you: reliability isn't just success rate, it's predictable success. 5 seconds ±1s feels reliable, 15 seconds ±15s feels broken even if both succeed 90%.

B) 'Hidden partial failures' - Wrong because: the question specifically gives you latency variance data as the clue. While partial failures are a real issue (task succeeds but output needs editing), that's not what the data reveals. This assumes facts not in evidence - we know about latency, not output quality. Answer what you're asked.

C) 'Success definition mismatch' - Wrong because: again, latency variance is the smoking gun provided. Definitional mismatch is plausible general explanation but ignores the specific data point. You're given the answer (high variance latency) and asked to explain it - don't invent alternative explanations.

D) 'User expectations' - Wrong because: 90% is actually very good for many agent tasks. Research, analysis, draft generation don't require 99% success rates. Also, this doesn't explain why it 'feels unreliable' - if tasks succeeded 90% of the time predictably, users would calibrate. The 'feels unreliable' comes from unpredictability (variance), not absolute success rate."
},
{
  "id": 83,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your AI safety team wants to delay product launch for additional testing. Product team says market window is closing. How do you decide?",
  "options": [
    "Launch - you can fix issues post-release",
    "Delay - safety cannot be compromised",
    "Define launch criteria with safety team, then decide objectively",
    "Staged rollout - launch to small group while continuing safety testing"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Safety vs. speed requires pre-defined launch criteria, not reactive decisions.",
  "explanation": "Options C and D are both responsible approaches. C: Define objective safety criteria upfront ('what would make this safe enough to launch?') - removes subjective debate. D: Staged rollout lets you launch while maintaining safety posture - 1% of users, monitor closely, expand gradually. Both balance market pressure and safety rigor. Options A, B are dogmatic. The hint guides you: safety-speed tradeoffs should be governed by pre-agreed criteria and measured rollout, not reactive 'ship or don't ship' debates. Define thresholds early, measure against them, use staged deployment to manage risk."
},
{
  "id": 84,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Scale AI's data labeling quality is dropping as they scale to 100K labelers. The CEO asks: should we invest in better tooling, more expert labelers, or stricter quality validation? Budget for one.",
  "options": [
    "Better tooling - reduce labeler errors through improved UI, auto-checks, and guided workflows",
    "Expert labelers - pay 3x more for domain experts who make fewer mistakes",
    "Stricter validation - add more review layers, consensus requirements, and spot checks",
    "Better task definitions - most errors come from ambiguous instructions, not labeler skill"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Quality problems as you scale usually come from task ambiguity, not labeler capability. Fix the root.",
  "explanation": "Option D is correct. Here's why each investment works or doesn't:

A) 'Better tooling' - Wrong because: while tooling helps, 100K labelers facing ambiguous tasks will make inconsistent choices even with great UI. Tooling can catch obvious errors (missing labels) but can't resolve judgment calls ('is this image professional quality?'). If task definition is ambiguous, labelers interpret differently - no UI prevents this. Tooling is force multiplier on clear tasks, not solution for ambiguous ones.

B) 'Expert labelers' - Wrong because: at 100K scale, you can't hire only experts - they don't exist in sufficient numbers. Also, experts are 3x cost but maybe 1.3x quality (diminishing returns on expertise for many labeling tasks). If task definitions are ambiguous, even experts disagree. This is expensive and doesn't scale. Shows lack of data labeling operational experience.

C) 'Stricter validation' - Wrong because: adding review layers increases cost and latency without fixing root cause. If task definition is 'label professional quality images' without defining 'professional quality,' reviewers will disagree with labelers, and senior reviewers will disagree with reviewers. Consensus on ambiguous tasks just means 'three people made same interpretation' not 'correct answer.' Validation catches errors in well-defined tasks, not definitional ambiguity.

D) 'Better task definitions' - CORRECT. Most labeling errors at scale come from: (1) Ambiguous instructions ('professional quality' means different things to different labelers). (2) Missing edge case guidance (what if image is cropped?). (3) Inconsistent examples (positive examples don't match negative examples). Fix by: detailed rubrics, edge case playbooks, calibration sets, regular labeler training on new definitions. The hint guides you: when quality drops at scale, first check if labelers even know what 'correct' means. Task clarity scales better than expert hiring or validation overhead."
},

{
  "id": 85,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "You're building prompt engineering interface for enterprise users who want to customize AI behavior. Power users want full control, but most users don't understand prompting. What's your UX strategy?",
  "options": [
    "Structured forms that generate prompts - users fill in fields, system creates optimized prompt behind the scenes",
    "Template library with customization - provide proven prompts users can tweak without starting from scratch",
    "AI-assisted prompt writing - users write natural language, AI suggests improvements and optimizations",
    "Progressive disclosure - simple mode for most users, advanced mode unlocks prompt editing for power users"
  ],
  "correctAnswers": [0],
  "multipleCorrect": false,
  "hint": "Framework: Don't expose complexity users don't need. Abstract prompting into structured inputs that compile to prompts.",
  "explanation": "Option A is correct. Here's why each approach works or doesn't:

A) 'Structured forms generate prompts' - CORRECT. This is how successful enterprise AI products work (Jasper, Copy.ai): (1) Users select: tone (professional/casual), length (short/long), audience (executives/engineers), constraints (must include X, avoid Y). (2) System compiles this into optimized prompt users never see. (3) Users get control without complexity - they understand 'tone' even if they don't understand prompt engineering. This scales because you can improve prompt generation without user retraining. The hint guides you: prompting is implementation detail - expose business-level controls (tone, length, style) not technical controls (temperature, system prompts).

B) 'Template library' - Wrong because: templates teach prompting through examples, but most users won't understand how to adapt them. Changing 'write formal email' template to 'write casual email' requires understanding which parts to modify. Also creates template explosion (need template for every use case). This is better than blank slate but still requires prompt literacy.

C) 'AI-assisted prompt writing' - Wrong because: this assumes users want to write prompts at all. Most don't - they want outcomes, not to learn meta-skill. Also, 'AI helping you prompt AI' is recursive complexity. Users must still understand prompting basics to evaluate AI suggestions. This is clever technical solution to wrong problem.

D) 'Progressive disclosure' - Wrong because: this maintains two UX surfaces (simple and advanced) that diverge over time. Simple mode users who need advanced feature must learn entirely new interface. Power users avoid simple mode even when it would work. Creates maintenance burden (two experiences to design/test/support) and confused users (am I ready for advanced mode?). Progressive disclosure works when advanced features extend simple ones naturally - doesn't apply when simple mode hides fundamental mechanism (prompts)."
},
{
  "id": 86,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "How do you measure whether your AI product is helping users learn vs. creating dependency?",
  "options": [
    "Track if users become more proficient over time (need AI less)",
    "Track if users expand what they attempt (confidence to try new things)",
    "Track satisfaction scores - happy users are learning",
    "Both A and B - learning shows both reduced dependence and expanded capability"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Learning = growing independence + expanding capability. Measure both dimensions.",
  "explanation": "Option D is correct. Healthy AI learning relationship shows: (1) Reduced dependence - users need AI scaffolding less over time for tasks they've done before. (2) Expanded capability - users attempt more complex tasks they couldn't before (AI enables growth). Both signals matter. Option A alone might mean users are abandoning the product. Option B alone might mean dependency. Option C doesn't measure learning. The hint guides you: AI should be a teacher, not a crutch - measure if users are growing in both independence and capability over time."
},
{
  "id": 87,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your model is exhibiting bias in edge cases. Fixing it might reduce overall accuracy. What's your framework?",
  "options": [
    "Prioritize accuracy - that's what users care about",
    "Prioritize fairness - bias is unacceptable",
    "Depends on use case - medical AI vs. entertainment AI have different stakes",
    "Quantify the tradeoff, then make stakeholder-informed decision"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Accuracy-fairness tradeoffs are context-dependent and require explicit decision-making.",
  "explanation": "Options C and D are both correct. C: Use case matters - bias in loan approvals is unacceptable even with accuracy loss, bias in movie recommendations matters less. D: Make tradeoffs explicit (1% accuracy drop to eliminate demographic disparity?) and involve stakeholders. Options A, B are dogmatic - both accuracy and fairness matter, but weight depends on context. The hint guides you: bias-accuracy tradeoffs are inevitable in some cases - your job is to make the tradeoff explicit, quantified, and context-appropriate, not pretend it doesn't exist or always choose one over the other."
},
{
  "id": 88,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Perplexity is competing with Google Search. What's their sustainable competitive advantage?",
  "options": [
    "Better AI models than Google",
    "Faster, more direct answers (skip the links)",
    "Privacy-focused (no tracking)",
    "None - Google can copy any feature and win with distribution"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Sustainable moats come from business model differences, not feature advantages.",
  "explanation": "Option B is correct, but the real moat is the business model: Perplexity can give direct answers because it doesn't need clicks for ad revenue. Google's business model (ads) requires users to click through to websites. This creates product constraint Google can't easily escape without cannibalizing revenue. Options A, C are defensible but copiable. Option D is too pessimistic. The hint guides you: sustainable competition against incumbents requires business model differentiation - Perplexity's advantage isn't better AI, it's freedom from ads enabling better UX that Google structurally can't match."
},
{
  "id": 89,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Design an agent that can take multi-step actions (research → analyze → create presentation). How do you handle failure mid-workflow?",
  "options": [
    "Restart entire workflow from beginning",
    "Pause at failure point, ask user for guidance, resume",
    "Auto-retry with different approach, escalate only if repeated failures",
    "Combine auto-retry with user checkpoints at critical steps"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Long-running agents need graceful failure modes - auto-recovery where possible, human-in-loop for critical failures.",
  "explanation": "Option D is correct. Multi-step workflows need: (1) Auto-retry for recoverable failures (API timeout → retry, web page down → try alternate source). (2) User checkpoints for critical decisions (before expensive actions, before irreversible steps). (3) Graceful degradation (if research fails, summarize partial results). Option A wastes completed work. Option B over-burdens user. Option C might loop on impossible tasks. The hint guides you: agent reliability requires layered failure handling - automatic recovery for simple failures, human judgment for complex ones, checkpoints to prevent cascading errors."
},
{
  "id": 90,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your LLM-powered product has high variance in latency (200ms to 10s). How do you set performance SLAs?",
  "options": [
    "Average latency - simple and understandable",
    "P50 latency - median user experience",
    "P95 or P99 latency - worst-case user experience",
    "Multiple metrics - P50 for typical, P99 for worst-case, plus timeout strategy"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: High-variance systems need percentile metrics, not averages. Users remember bad experiences.",
  "explanation": "Option D is correct. LLM latency is highly variable (input length, complexity, model load) so you need: (1) P50 for typical experience (what most users see). (2) P99 for worst-case (what causes complaints). (3) Timeout strategy (when do you stop generation and show partial results?). Average latency hides variance - 5s average could be 1s for most, 30s for some. Option A, B miss tail latency. Option C only measures worst-case. The hint guides you: variable latency systems require percentile-based SLAs and explicit timeout policies - averages don't capture user experience."
},
{
  "id": 91,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your AI product caused a PR crisis (wrong output went viral on social media). How do you respond in first 24 hours?",
  "options": [
    "Fix the bug immediately and announce the fix",
    "Acknowledge the issue publicly, explain what happened, commit to fix",
    "Stay quiet until you fully understand root cause",
    "Acknowledge + immediate mitigation + investigation + transparency about findings"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Crisis response requires speed (acknowledge), action (mitigate), and transparency (explain).",
  "explanation": "Option D is correct. First 24 hours require: (1) Acknowledge immediately (shows awareness and responsibility). (2) Mitigate (disable feature if needed, prevent further harm). (3) Investigate root cause (don't guess, understand what failed). (4) Commit to transparency (share findings when investigation complete). Option A fixes without acknowledging. Option B acknowledges without acting. Option C creates information vacuum. The hint guides you: AI crisis management requires parallel work streams - immediate public acknowledgment, tactical mitigation, thorough investigation, and commitment to public transparency about findings."
},
{
  "id": 92,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Character.AI lets users create AI personas. What's the biggest moderation challenge?",
  "options": [
    "Users creating offensive or harmful characters",
    "Characters generating inappropriate content in conversations",
    "Both creation and conversation require moderation",
    "User expectation management - characters should stay in character"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: User-generated content creates dual moderation challenges - creation and ongoing behavior.",
  "explanation": "Option C is correct. Character.AI faces two moderation surfaces: (1) Character creation - users might create offensive personas, historical figures with problematic views, characters designed to bypass safety. (2) Character behavior - even well-intentioned characters might generate harmful content in conversations. Both require different moderation strategies: review at creation time + runtime safety filters. Options A, B address single surface. Option D is UX problem not safety. The hint guides you: platforms with user-generated AI face compound moderation - both the prompt/persona AND the generated outputs need safeguards."
},
{
  "id": 93,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "You're designing version control for AI-generated content (like ChatGPT conversation branches or Midjourney variations). Traditional git-style versioning doesn't fit. What's the core UX innovation needed?",
  "options": [
    "Tree visualization - show conversation branches visually like a mind map, not linear history",
    "Semantic versioning - label versions by meaning ('optimistic tone' vs 'formal tone') not just timestamps",
    "Automatic branching - every AI regeneration creates new branch, preserving all alternatives automatically",
    "Merge affordances - let users combine parts from different AI generations into final output"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: AI content is non-deterministic and parallel by nature. Version control must embrace exploration, not linear editing.",
  "explanation": "Option C is correct. Here's why each innovation works or doesn't:

A) 'Tree visualization' - Wrong because: visualization is presentation layer, not core UX innovation. You can visualize versions as tree, timeline, or cards - but if you don't capture them properly, visualization of nothing doesn't help. Also, tree viz gets overwhelming fast (10+ branches is unreadable). This is UI polish on top of real solution, not the solution itself.

B) 'Semantic versioning' - Wrong because: who labels versions? If user must label ('optimistic tone'), that's friction on every regeneration. If AI auto-labels, labels are often wrong (AI guesses intention). Semantic labels help discovery later but don't solve core problem: how do you capture and navigate explorations? This is metadata, not mechanism.

C) 'Automatic branching' - CORRECT. This is the core innovation: (1) Every 'regenerate' creates branch automatically, no user action needed. (2) Preserves all alternatives - user can explore 5 different AI approaches without losing any. (3) Removes 'commit' concept - every output is auto-saved as branch. (4) Users navigate branches to compare, not replay prompts. Example: ChatGPT regenerates 4 times → 4 branches exist → user picks best or combines. This matches AI workflow (generate many, pick best) vs. code workflow (edit one, save versions). The hint guides you: AI content generation is inherently exploratory - version control must capture all explorations automatically, not require users to 'save' each one.

D) 'Merge affordances' - Wrong because: merging AI generations is useful feature but not the foundational UX innovation. You can't merge before you've captured versions properly. Also, merging AI content is hard (how do you merge two different essays? combine two images?). This is advanced feature after basic versioning works, not the core solution."
},
{
  "id": 94,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "How do you measure AI model 'capability' independent of specific benchmarks?",
  "options": [
    "Aggregate performance across diverse benchmark suite",
    "Zero-shot learning on novel tasks",
    "User task completion rates in production",
    "You can't - capability is always task-specific"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: General capability is emergent from specific task performance. Measure breadth + depth.",
  "explanation": "Option D is philosophically correct but practically limiting. In practice, option A is best approximation: broad benchmark coverage (reasoning, knowledge, coding, math, language tasks) approximates general capability. But 'capability' is always contextual - GPT-4 might have high general capability but still fail at specific narrow tasks. The hint guides you: we measure capability through broad task coverage, recognizing that 'general intelligence' is an abstraction - what matters is: can it solve the diverse tasks users actually need?"
},
{
  "id": 95,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your AI research team wants to productize a capability you believe is premature. How do you navigate this?",
  "options": [
    "Block it - product judgment overrides research enthusiasm",
    "Ship it as beta/experimental to gather real-world data",
    "Define launch criteria: what evidence would make this ready?",
    "Let research team lead - they understand the technology better"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Resolve capability-readiness disagreements with evidence, not hierarchy.",
  "explanation": "Option C is correct. Instead of arguing 'ready' vs. 'not ready,' define objective criteria: accuracy threshold, safety eval pass rate, user study results, edge case coverage. Then measure. This converts subjective debate into measurable validation. Option A uses hierarchy. Option B ships without criteria. Option D abdicates product judgment. The hint guides you: research-product disagreements on readiness should be resolved with pre-agreed success criteria and measurement - let data decide, not opinions or org charts."
},
{
  "id": 96,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Midjourney has no content moderation UI - banned content just doesn't generate. Is this the right product choice?",
  "options": [
    "Yes - users don't need to see why something was blocked",
    "No - transparency requires showing users what rules they violated",
    "Depends on violation severity - explain bans, hide prompt modifications",
    "Depends on user sophistication - artists need transparency, casual users don't"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Transparency vs. simplicity tradeoff. High-stakes moderation needs explanation.",
  "explanation": "Option C is correct. Moderation transparency should scale with severity: (1) Minor prompt modifications (removing violence keywords): silent filtering is fine. (2) Rejected generations (violates policy): show reason (ToS violation, specific category). (3) Account suspension: full explanation required. Silent moderation works for minor cases, high-stakes actions need transparency for trust and appeal. Options A, B are universal claims. Option D segments wrong dimension. The hint guides you: moderation UX should communicate enough for users to understand and adjust behavior, without creating friction on minor corrections - transparency scales with consequence."
},
{
  "id": 97,
  "category": "Product Design",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Design a multi-agent system where agents collaborate on complex tasks. What's the hardest coordination problem?",
  "options": [
    "Task decomposition - breaking complex goals into agent-sized subtasks",
    "Agent communication - how agents share context and results",
    "Failure handling - when one agent fails, how do others adapt?",
    "All three, plus: avoiding infinite loops and resource exhaustion"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Multi-agent systems face decomposition, coordination, failure, and runaway risks.",
  "explanation": "Option D is correct. Multi-agent orchestration challenges: (1) Decomposition - how to break 'write business plan' into discrete agent tasks? (2) Communication - agents need shared context without overwhelming each other. (3) Failure propagation - one agent failing shouldn't cascade. (4) Runaway - agents might loop indefinitely or consume unbounded resources. All require explicit design. The hint guides you: multi-agent systems aren't just 'multiple AIs' - they need orchestration layer for task decomposition, message passing, failure isolation, and resource controls. This is systems engineering, not just LLM prompting."
},
{
  "id": 98,
  "category": "Metrics",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your AI agent has 70% task success rate. Your competitor has 90%. Should you launch?",
  "options": [
    "No - 90% is the market standard now",
    "Yes - 70% might be good enough for early adopters",
    "Depends on task criticality - 70% for research is fine, for transactions is not",
    "Depends on failure UX - graceful failures with good error messages vs. silent failures"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Success rate without context is meaningless. Stakes and failure handling matter more.",
  "explanation": "Options C and D are both correct. C: Task stakes matter - 70% for 'find related papers' is acceptable, 70% for 'process payroll' is not. D: Failure UX matters - if agent clearly communicates failures and provides fallback, 70% might be acceptable; silent failures are catastrophic at any rate below 95%. The hint guides you: raw success rates don't determine launch readiness - you must consider: what's the consequence of failure? How does the product handle failures? What's the user's alternative? 70% might beat manual work even if it doesn't beat competitors."
},
{
  "id": 99,
  "category": "Behavioral",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "Your safety team wants to add so many guardrails that the product becomes unusable. How do you resolve this?",
  "options": [
    "Overrule safety team - usability matters",
    "Accept all guardrails - safety is non-negotiable",
    "Quantify the usability-safety tradeoff and optimize together",
    "Ship with all guardrails, collect user feedback, then iterate"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Safety vs. usability is optimization problem, not binary choice. Measure both.",
  "explanation": "Option C is correct. Treat this as multi-objective optimization: (1) Measure safety risk (what's probability and severity of each failure mode?). (2) Measure usability impact (what % of legitimate requests are blocked?). (3) Find Pareto frontier - which guardrails provide maximum safety for minimal usability cost? Some guardrails are high value/low friction (win-win), some are low value/high friction (remove), some are tough tradeoffs (discuss). Options A, B are dogmatic. Option D delays the tradeoff. The hint guides you: safety-usability tradeoffs should be data-driven optimization, not politics - measure both dimensions and find the efficient frontier."
},
{
  "id": 100,
  "category": "Product Sense",
  "salaryTier": "AI Frontier",
  "salaryRange": "$280K-$350K",
  "question": "DeepMind's AlphaFold solved protein folding. What's the product challenge in translating research breakthrough to medical impact?",
  "options": [
    "Predictions need to be validated experimentally before clinical use",
    "Biologists don't trust black-box models without interpretability",
    "Speed - predictions are fast but drug development takes years",
    "All three, plus: regulatory approval requires explainable AI"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Research breakthroughs face validation, trust, timeline, and regulatory barriers before real-world impact.",
  "explanation": "Option D is correct. AlphaFold's path to clinical impact faces: (A) Validation - computational predictions must be verified in lab. (B) Trust - biologists need to understand why predictions are correct. (C) Timeline - even perfect predictions don't speed up clinical trials. (D) Regulation - FDA requires explainable models for medical decisions. Research breakthrough is necessary but insufficient - product work is building validation pipelines, interpretability tools, and regulatory-compliant workflows. The hint guides you: frontier AI research breakthroughs face a 'last mile problem' - real-world deployment requires validation, trust-building, and regulatory navigation beyond technical capability."
},
{
 "id": 101,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your $50B company is building AI strategy. Engineering wants to build foundation models for control. Finance wants APIs for speed. Which do you prioritize?",
  "options": [
    "Build foundation models - creates long-term competitive moat and strategic independence",
    "Use APIs initially, build selectively only where you have unique data advantage",
    "Open source fine-tuning - balance control and cost without building from scratch",
    "Run parallel experiments for 6 months, then commit based on what works"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: Strategic decisions require commitment, not endless experimentation. Choose based on moat, not optionality.",
  "explanation": "Option B is correct for most companies. Here's why each approach works or doesn't:

A) 'Build foundation models' - Wrong for most companies because: building foundation models requires $50M-$500M investment, 50-200 person teams, and 12-24 month timelines. Unless AI is your core product (like OpenAI), this diverts resources from actual competitive advantages. You're competing with OpenAI/Anthropic/Google who have multi-billion dollar head starts. Shows poor capital allocation.

B) 'Use APIs initially, build selectively' - CORRECT. This is how most successful AI companies operate (Stripe, Notion, Intercom). Use APIs for commodity capabilities, build/fine-tune only where: (1) You have proprietary data competitors can't access, (2) The capability is core to your competitive moat, (3) API costs become prohibitive at scale. This maximizes speed while preserving capital for strategic investments. The hint guides you: Staff+ PMs make decisive resource allocation - APIs let you move fast on 80% of use cases, reserve build capacity for strategic 20%.

C) 'Open source fine-tuning' - Wrong because: fine-tuning still requires significant ML infrastructure, doesn't give you foundation model control, and leaves you dependent on OSS roadmaps. Worse economics than APIs (engineering cost) without strategic control of building. Falls between two stools.

D) 'Parallel experiments' - Wrong because: this is analysis paralysis disguised as rigor. Six months of parallel experiments wastes capital and splits team focus. Staff+ PMs make strategic bets based on incomplete information, not run science experiments. You're not discovering new physics - you're choosing between known tradeoffs. Decisiveness matters more than perfect information."
},
{
  "id": 102,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design a platform strategy for AI infrastructure serving 100+ internal product teams. What's the key architectural decision?",
  "options": [
    "Centralized platform - all teams use same models and infrastructure",
    "Federated - each team chooses their own AI stack",
    "Hybrid - common platform for commodity AI, flexibility for differentiated use cases",
    "Build vs. buy - partner with cloud providers vs. build in-house"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Platform architecture must balance standardization (efficiency) with flexibility (innovation).",
  "explanation": "Option C is correct. Optimal platform strategy: (1) Standardize commodity capabilities (basic text generation, embeddings, classification) for efficiency and cost. (2) Enable flexibility for differentiated use cases (product teams building competitive moats need custom approaches). (3) Provide both managed services AND infrastructure for custom models. Option A stifles innovation. Option B creates chaos and cost. Option D is implementation detail, not architecture philosophy. The hint guides you: platform strategy for AI faces classic centralization-decentralization tradeoff - solve with hybrid approach that standardizes common needs while enabling innovation at edges."
},
{
  "id": 103,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're building evaluation framework for 20 AI products across the company. Teams want autonomy to define their own metrics. How do you balance standardization vs. flexibility?",
  "options": [
    "Mandate universal metrics (latency, cost, accuracy) - comparability matters more than context",
    "Let each team define their own metrics - they understand their products best",
    "Define success outcomes (business impact), let teams choose technical metrics to measure them",
    "Create metric marketplace - teams share metrics, others adopt what works"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Align on outcomes, not metrics. Different products need different measurements to reach same goals.",
  "explanation": "Option C is correct. Here's why each approach works or doesn't:

A) 'Mandate universal metrics' - Wrong because: latency matters for real-time chat, not for batch document analysis. Accuracy means different things for medical AI vs. recommendation engines. Universal metrics create false comparability and misaligned incentives - teams game metrics rather than deliver value. Shows lack of product thinking sophistication.

B) 'Let teams define own metrics' - Wrong because: complete autonomy prevents any cross-product learning, resource allocation, or strategic oversight. You can't answer 'which AI products are working?' or 'where should we invest more?' without some standardization. This is abdication, not empowerment.

C) 'Define success outcomes, flexible metrics' - CORRECT. This balances autonomy and alignment: (1) Universal outcomes: user value (NPS, task completion), business impact (revenue, retention), efficiency (cost per task). (2) Team-defined metrics: how they measure technical performance varies by use case. Example: Chat AI measures latency, Document AI measures accuracy, Recommendation AI measures click-through. All contribute to retention (universal outcome). The hint guides you: Staff+ thinking aligns on what matters (business outcomes) while empowering teams on how to measure technical performance. Don't confuse measurement standardization with outcome alignment.

D) 'Metric marketplace' - Wrong because: creates coordination overhead without solving core tension. Teams won't adopt others' metrics if they don't fit their use case. This is process theater that delays decisions. Sounds collaborative but is actually passive - no one owns standardization or makes hard calls."
},
{
  "id": 104,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're advising the CEO on AI strategy. She asks: should we build an AI lab or partner with research institutions?",
  "options": [
    "Build - research talent is competitive advantage",
    "Partner - focus resources on product, not research",
    "Depends on company's strategic positioning and talent market",
    "Hybrid - small internal lab for applied research, partnerships for fundamental research"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Research strategy depends on competitive positioning, talent availability, and capital efficiency.",
  "explanation": "Option D is correct for most companies, but C acknowledges context matters. Hybrid approach: (1) Internal lab focuses on applied research (product-adjacent, proprietary advantage). (2) Academic partnerships for fundamental research (cost-effective, access to cutting-edge). (3) Commercial partnerships for capabilities outside core competency. But optimal answer depends on: company stage, capital availability, talent market, competitive dynamics. The hint guides you: research org design is strategic decision that depends on positioning - are you competing on AI research itself (build big lab) or applying AI to domain expertise (lean lab + partnerships)?"
},
{
  "id": 105,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Microsoft invested $13B in OpenAI. Now OpenAI is building products that compete with Office. What's Microsoft's best strategic response?",
  "options": [
    "Compete aggressively - build better AI features in Office/Azure than OpenAI can",
    "Deepen integration - make Azure + Office the best platform for OpenAI models, increasing switching costs",
    "Hedge with alternatives - invest in Anthropic, develop internal models, reduce OpenAI dependency",
    "Acquire OpenAI fully - eliminate competition by owning them outright"
  ],
  "correctAnswers": [1],
  "multipleCorrect": false,
  "hint": "Framework: When partners become competitors, your moat determines strategy. Distribution beats technology.",
  "explanation": "Option B is correct. Here's why each strategy works or doesn't:

A) 'Compete aggressively' - Wrong because: Microsoft can't out-research OpenAI in foundation models - that's not their core competency. Even if they build comparable models, OpenAI has brand and direct user relationships. This plays to OpenAI's strength (AI research) away from Microsoft's strength (distribution). Burning capital on unfavorable competition.

B) 'Deepen integration' - CORRECT. Microsoft's moat is distribution (Windows, Office, Azure, GitHub), not AI research. Strategy: (1) Make Azure the best place to run OpenAI models (performance, pricing, tooling) - even if OpenAI builds products, they need Microsoft cloud. (2) Integrate OpenAI into Office so deeply that competing products require ripping out infrastructure. (3) Use OpenAI success to sell more Azure (win even when they succeed). The hint guides you: Microsoft's advantage is making OpenAI's success dependent on Microsoft's platform - distribution moats beat technology moats in enterprise. Make them need you more than you need them.

C) 'Hedge with alternatives' - Wrong because: this signals distrust and weakens the partnership without reducing competitive threat. Anthropic investment is too small to matter strategically, internal models are 2-3 years behind. Hedging makes sense AFTER deepening integration, not instead of it. Shows defensive thinking.

D) 'Acquire fully' - Wrong because: (1) OpenAI's governance structure prevents full acquisition (non-profit parent board), (2) Key talent would leave (they want research freedom), (3) Regulators would block (~$100B acquisition of leading AI company). Shows lack of M&A sophistication and governance understanding."
},
{
  "id": 106,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design organizational structure for AI product development. Should AI be centralized team or embedded in product teams?",
  "options": [
    "Centralized - center of excellence provides AI capabilities to all products",
    "Embedded - each product team has AI engineers",
    "Hybrid - platform team for infrastructure, embedded for product AI",
    "Depends on organizational maturity and AI's strategic role"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Org structure follows strategy. AI as platform vs. AI as differentiator require different structures.",
  "explanation": "Option D is most accurate, but C describes best practice for most companies. Optimal structure: (1) Central platform team: models, infrastructure, evals, tools (horizontal capabilities). (2) Embedded product AI: teams integrate AI into products, build product-specific models. (3) Applied research: translates research into product. But structure depends on: company size, AI maturity, whether AI is core business or feature. The hint guides you: organizational structure for AI depends on strategic role - commodity capability (centralize), competitive differentiator (embed + platform), core business (matrix with strong research arm)."
},
{
  "id": 107,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your company spends $50M/year on AI infrastructure. How do you measure ROI to justify continued investment?",
  "options": [
    "Revenue attributed to AI-powered features",
    "Cost savings from AI automation",
    "Strategic value - capabilities that will matter in 3-5 years",
    "Portfolio approach - measurable ROI for some projects, strategic bets for others"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI ROI has near-term (measurable) and long-term (strategic) components. Measure both.",
  "explanation": "Option D is correct. $50M AI budget should have: (1) 60-70% with measurable ROI (revenue lift, cost savings, efficiency gains) - short-term payback. (2) 20-30% strategic investments (new capabilities, platform, research) - long-term positioning. (3) 10% experimental (high-risk, high-reward exploratory). Blended portfolio justifies overall spend while ensuring some projects deliver immediate returns. Options A, B, C are each parts of the portfolio. The hint guides you: large-scale AI investment requires portfolio management - some projects must deliver measurable near-term ROI to fund strategic long-term bets. Balance both to justify continued investment."
},
{
  "id": 108,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your board asks you to brief them on AI strategy in 15 minutes. The board includes: a tech CEO, a policy expert, a finance exec, and a retail operator. What framework do you lead with?",
  "options": [
    "Competitive positioning - show where we stand vs. competitors on AI capabilities and products",
    "Business case - ROI model showing AI investment payback and revenue impact",
    "Strategic choices - where we'll compete with AI, how we'll win, what we need to succeed",
    "Risk assessment - what could go wrong with AI and how we're mitigating"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Diverse boards need strategy (choices + tradeoffs), not tactics. Lead with what matters to all members.",
  "explanation": "Option C is correct. Here's why each framework works or doesn't:

A) 'Competitive positioning' - Wrong because: half your board (policy expert, retail operator) won't have reference frame for AI competitive dynamics. Tech CEO cares, but finance exec wants to know 'should we invest more/less?' and policy expert wants to know 'what are we exposed to?' Competitive analysis is important but not the organizing framework. Too narrow.

B) 'Business case' - Wrong because: finance exec loves this, but retail operator doesn't care about payback periods, policy expert cares about regulatory risk, tech CEO wants strategic vision. Leading with ROI reduces AI to cost-benefit calculation - misses strategic positioning. Shows PM-level thinking, not Staff+ strategic framing.

C) 'Strategic choices' - CORRECT. This framework speaks to everyone: (1) Where we play - which AI capabilities matter for our business (tech CEO + retail operator care). (2) How we win - build/buy/partner, competitive moat (tech CEO + finance exec care). (3) What we need - capital, talent, partnerships (finance exec cares). (4) What we're betting - portfolio from proven to exploratory (everyone cares). (5) Risks we're managing (policy expert cares). The hint guides you: diverse boards need strategic framing that translates across expertise - choices, tradeoffs, and resource allocation speak universally. Answers 'what are we doing and why?' for every member.

D) 'Risk assessment' - Wrong because: policy expert loves this, everyone else wants to know the opportunity side first. Leading with risk frames AI defensively ('we need to protect ourselves') vs. strategically ('we can win with this'). Risk is section 3-4 of the brief, not the opening frame."
},
{
  "id": 109,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Amazon is deciding whether to build custom AI chips (like Google TPUs) vs. buying from Nvidia. What's the strategic framework?",
  "options": [
    "Cost - custom chips are cheaper at scale",
    "Performance - custom chips optimize for specific workloads",
    "Strategic control - reduce vendor dependence",
    "All three, plus: time to market and opportunity cost"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Build vs. buy for infrastructure requires analyzing cost, performance, strategic control, and opportunity cost.",
  "explanation": "Option D is correct. Custom chip decision requires: (1) Economics - does volume justify NRE costs? What's payback period? (2) Performance - do workloads benefit from custom architecture? (3) Strategic - does chip design create competitive moat? (4) Opportunity cost - could that capital/talent be better deployed elsewhere? (5) Time - how long until custom chips deliver value? Amazon built Graviton and Inferentia because they had: massive scale (economics), specific workloads (performance), cloud business (strategic control). The hint guides you: infrastructure build-vs-buy requires multi-year, multi-hundred-million dollar analysis across economics, strategy, and opportunity cost - not just 'custom is better.'"
},
{
  "id": 110,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design governance framework for AI products across 50+ teams. What's the key challenge?",
  "options": [
    "Standardizing safety and ethics across diverse use cases",
    "Balancing innovation velocity with risk management",
    "Ensuring consistency without creating bureaucracy",
    "All three - governance must manage risk without killing innovation"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI governance frameworks must be risk-proportionate and enable innovation, not block it.",
  "explanation": "Option D is correct. Effective AI governance requires: (1) Risk-based approach - high-risk AI (medical, financial) gets heavy review, low-risk (recommendations) gets light touch. (2) Self-serve compliance - tools and templates that make governance easy, not bureaucratic. (3) Center of excellence - available for consultation but doesn't gate every decision. (4) Clear escalation paths - teams know when to involve governance. The hint guides you: bad governance kills innovation with bureaucracy, good governance enables safe innovation through risk-proportionate frameworks and self-serve tooling."
},
{
  "id": 111,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "How do you measure whether your organization is building AI capability vs. just using AI tools?",
  "options": [
    "Number of AI engineers hired",
    "Number of AI models deployed in production",
    "Ability to solve novel problems that couldn't be solved before",
    "Portfolio of capabilities - talent, infrastructure, deployed models, and business impact"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI capability is multi-dimensional - talent, infrastructure, deployment velocity, and business outcomes.",
  "explanation": "Option D is correct. AI organizational capability requires measuring: (1) Talent depth - can you attract/retain AI researchers and engineers? (2) Infrastructure - can you train and deploy models efficiently? (3) Velocity - time from idea to production. (4) Impact - are AI products moving business metrics? (5) Novel capabilities - are you solving previously impossible problems? Single metrics (A, B) miss systemic capability. Option C is outcome but not input. The hint guides you: organizational AI capability is portfolio of inputs (talent, infrastructure), processes (velocity), and outputs (impact, novel solutions). Measure across all dimensions."
},
{
  "id": 112,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're hiring a Head of AI Safety. CEO asks: is this necessary or compliance theater? How do you justify the role?",
  "options": [
    "Regulatory compliance - we need someone to manage AI regulations",
    "Risk mitigation - AI failures could cause major incidents",
    "Competitive advantage - safety is quality, quality drives adoption",
    "All three - safety is compliance, risk management, AND product quality"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI safety is simultaneously compliance, risk management, and product excellence. Frame holistically.",
  "explanation": "Option D is correct. AI Safety leader drives: (1) Compliance - EU AI Act, regulations emerging globally. (2) Risk mitigation - prevents catastrophic failures (bias, hallucinations, security). (3) Product quality - reliable, trustworthy AI drives adoption and retention. (4) Competitive moat - safety-first companies win enterprise customers. This isn't siloed 'compliance' role - it's strategic function that enables scaling AI products responsibly. The hint guides you: safety skeptics see it as cost center - reframe as strategic enabler across compliance, risk, and product quality. Show how safety drives business outcomes."
},
{
  "id": 113,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're advising a Fortune 500 CEO on AI transformation. She's considering: (A) creating central AI team to build products for business units, (B) distributing AI engineers into each BU, or (C) hiring consultants to guide transformation. What's your recommendation?",
  "options": [
    "Central AI team - concentrates expertise, prevents duplicate work, establishes standards",
    "Distributed engineers - embeds AI where business problems are, ensures product-market fit",
    "Consultant-led - brings external best practices, avoids organizational politics",
    "Hybrid platform team + embedded engineers - platform builds shared capabilities, BUs build product AI"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Transformation structure follows ownership. Who owns AI success - central team or business units?",
  "explanation": "Option D is correct. Here's why each approach works or doesn't:

A) 'Central AI team builds products' - Wrong because: this is the most common AI transformation failure mode. Central team becomes ivory tower building AI solutions without deep business context. Business units don't adopt products they didn't ask for ('not invented here'). Central team optimizes for technical elegance, not business impact. Creates organizational tension where BUs see AI team as cost center imposing solutions. Shows lack of organizational design experience.

B) 'Distributed engineers only' - Wrong because: every business unit reinvents infrastructure, data pipelines, evaluation frameworks, security practices. Massive duplication of effort. No sharing of learnings across BUs. Can't attract top AI talent (they want to work with other AI experts, not be solo engineer in marketing department). Economics are terrible - 10 siloed AI engineers are less effective than 3 on shared platform + 7 embedded. 

C) 'Consultant-led' - Wrong because: consultants don't build organizational capability, they create dependency. They leave after engagement with PowerPoints, no sustained AI capability. Often recommend their preferred tech stack regardless of fit. Can't attract/retain AI talent (they want to build products, not follow consultant playbooks). Shows abdication of transformation ownership.

D) 'Hybrid platform + embedded' - CORRECT. This is how successful AI transformations work (Uber, Netflix, Meta): (1) Platform team (15-30% of AI headcount): builds shared infrastructure (training pipelines, model deployment, evals), sets standards, enables self-service. (2) Embedded product AI engineers (70-85%): sit in business units, build product-specific models, own outcomes. This prevents duplication while ensuring business relevance. The hint guides you: transformation ownership must be clear - platform team enables, business units own outcomes. Hybrid structure forces shared accountability."
},
{
  "id": 114,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design a strategy for transitioning users from deterministic software to AI-powered experiences. What's the key UX principle?",
  "options": [
    "Gradual introduction - start with AI suggestions, move to autonomous actions",
    "Clear value proposition - users must understand why AI is better",
    "Preserving user agency - users should always be able to revert to manual control",
    "All three - staged rollout with clear value and preserved agency"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI adoption requires building trust through gradual capability, clear value, and preserved control.",
  "explanation": "Option D is correct. Successful AI transition strategy: (1) Staged rollout - suggestions → assisted actions → autonomous actions. Build trust progressively. (2) Clear value - users need to see AI improving outcomes, not just being different. (3) Preserved agency - manual fallback for when users don't trust AI or have edge cases. (4) Transparent failures - when AI fails, explain why. This builds trust and adoption. The hint guides you: moving users from deterministic to AI systems requires managing trust, demonstrating value, and preserving control - all three simultaneously."
},
{
  "id": 115,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your AI organization has 200 people and $100M budget. What's your executive dashboard - top 5 metrics?",
  "options": [
    "Headcount, budget burn, models in production, incidents, user satisfaction",
    "Engineering velocity, model performance, business impact, safety incidents, talent retention",
    "Revenue from AI products, cost per inference, user adoption, competitive position, innovation pipeline",
    "Depends on company stage and AI strategic role"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Executive metrics should balance inputs (resources), processes (execution), outputs (impact), and future (pipeline).",
  "explanation": "Option D is most accurate, but general principles: Track across: (1) Resource efficiency (cost, headcount productivity). (2) Execution velocity (deployment speed, incident response). (3) Business impact (revenue, adoption, satisfaction). (4) Future capability (innovation pipeline, talent). (5) Risk (safety incidents, compliance). Exact metrics depend on: startup (growth) vs. enterprise (efficiency), AI as product (revenue) vs. AI as capability (cost savings). The hint guides you: executive dashboards require balanced scorecard across resources, execution, impact, and future - avoid single-dimension optimization."
},
{
  "id": 116,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your top AI researcher wants to publish work that could help competitors. How do you balance openness vs. competitive advantage?",
  "options": [
    "Block publication - IP protection matters more",
    "Allow publication - talent retention requires research freedom",
    "Staged release - publish foundational work, protect product applications",
    "Negotiate - understand what researcher needs for career vs. what company needs protected"
  ],
  "correctAnswers": [2, 3],
  "multipleCorrect": true,
  "hint": "Framework: Research publication tradeoffs require balancing talent retention, competitive advantage, and safety.",
  "explanation": "Options C and D are both valid. C (staged release): Publish fundamental research (builds reputation, advances field) while protecting product-specific applications and optimizations. D (negotiate): What does researcher need to publish for career growth vs. what gives competitors immediate advantage? Find middle ground. Option A risks talent loss. Option B ignores competitive dynamics. The hint guides you: research publication isn't binary - you can publish foundational work while protecting competitive moats, and negotiation can find mutual value. Best researchers want publication freedom - provide it while protecting critical IP."
},
{
  "id": 117,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Prominent AI researchers say current progress will plateau and AGI is 20+ years away. Your company has invested $200M in AI product bets. What do you advise leadership?",
  "options": [
    "Continue current investment - can't afford to be wrong about AGI timeline",
    "Reduce AI investment by 50% - hedge against plateau by reallocating to proven technologies",
    "Shift portfolio toward near-term ROI projects - prove value now, maintain optionality for AGI",
    "Ignore predictions entirely - focus on building defensible competitive advantages regardless of AGI timeline"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AGI timeline uncertainty requires strategy that wins in multiple futures. What's defensible either way?",
  "explanation": "Option D is correct. Here's why each strategy works or doesn't:

A) 'Continue investment - can't afford to be wrong' - Wrong because: this is FOMO-driven strategy, not strategic thinking. 'Can't afford to be wrong' is not investment thesis. If AGI plateaus, you've spent $200M building on shaky foundation. If it succeeds, fast-followers can catch up. This is betting on timing, not building moats. Shows fear-based decision making.

B) 'Reduce 50%' - Wrong because: if you believed AGI was 20+ years away, you'd reduce 80-90%, not 50%. If you're uncertain, 50% reduction is arbitrary. This is worst of both worlds - not enough conviction to reallocate fully, not enough commitment to win in AI. Shows indecisiveness masquerading as prudence.

C) 'Shift toward near-term ROI' - Wrong because: this assumes you haven't already done this. If your $200M portfolio doesn't have near-term ROI projects, you have execution problem not strategy problem. Also, 'near-term ROI' and 'optionality for AGI' often conflict - proving value now means production systems, technical debt, customer commitments that constrain future pivots. Shows confused capital allocation.

D) 'Focus on defensible advantages regardless of timeline' - CORRECT. Strategy should be: (1) Proprietary data moats - whether AGI arrives or not, unique datasets create advantage. (2) AI-native product experiences - if AI progress continues, you're positioned; if it plateaus, you've still rebuilt products for current capabilities. (3) Talent density - AI experts create value in plateau scenario (optimizing current models) AND breakthrough scenario (riding next wave). (4) Distribution - AI products that reach customers win regardless of backend sophistication. The hint guides you: AGI uncertainty requires strategy that wins in multiple futures - build moats that are defensible whether AGI arrives in 2030 or 2050. Don't bet on timeline, bet on competitive structure."
},
{
  "id": 118,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design pricing strategy for AI products where costs are variable and unpredictable. How do you handle this?",
  "options": [
    "Usage-based pricing - pass through costs to customers",
    "Subscription pricing - predict costs and build in buffer",
    "Hybrid - subscription for predictable usage, overage for spikes",
    "Depends on customer segment and competitive dynamics"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI pricing must balance cost volatility, customer preference, competitive positioning, and margin protection.",
  "explanation": "Option D is correct, but common patterns: (1) Enterprise: Committed spend with overages (predictability for them, volume for you). (2) SMB: Subscription tiers with usage limits (simplicity). (3) Developers: Pay-per-use (aligns with their economics). (4) High-value: Flat fee regardless of usage (simplifies buying). Choice depends on: customer willingness to manage usage, competitive pricing, your cost structure. The hint guides you: AI variable costs create pricing complexity - solve through customer segmentation and tailored pricing strategies, not one-size-fits-all. Match pricing to customer preference and margin requirements."
},
{
  "id": 119,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "How do you measure whether your AI investments are creating sustainable competitive advantage vs. just keeping pace?",
  "options": [
    "Market share gains in AI-powered products",
    "Win rate against competitors in deals where AI is evaluated",
    "Unique capabilities competitors can't replicate",
    "All three - advantage requires market success, competitive wins, and unique capabilities"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Competitive advantage requires measurable market outcomes from differentiated capabilities.",
  "explanation": "Option D is correct. Sustainable AI advantage shows in: (1) Market outcomes - are AI products gaining share? (2) Competitive positioning - do you win when customers evaluate AI capabilities? (3) Unique capabilities - do you have proprietary data, models, or workflows competitors can't replicate? (4) Margin expansion - does AI create pricing power? All four together indicate advantage; any one alone might be temporary. The hint guides you: competitive advantage requires both differentiated capabilities AND market validation that those capabilities create value customers will pay for."
},
{
  "id": 120,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your AI product caused a major incident - wrong medical advice went viral on social media. In the post-mortem, engineering says it was a data issue, product says it was missing safety guardrail, design says it was unclear UX. What's your opening statement?",
  "options": [
    "This is a blameless post-mortem - we focus on systems, not individuals",
    "We need to understand who made which decisions that led to this",
    "Our goal is to document what happened for regulatory compliance",
    "We're here to understand why our systems allowed this and how we prevent it"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Post-mortems need psychological safety AND accountability. Frame around system improvements, not blame OR tolerance.",
  "explanation": "Option D is correct. Here's why each framing works or doesn't:

A) 'Blameless post-mortem' - Wrong for this context because: 'blameless' has become tech mantra but can enable poor accountability. This was medical advice that went viral - stakes are high enough that understanding decision-making matters. 'Blameless' sometimes means 'no one owns outcomes.' For high-stakes failures, you need psychological safety (people share information) AND accountability (people own decisions). Framing as 'blameless' can signal 'no consequences for bad judgment' which is wrong message. Shows cargo-culting SRE practices without context.

B) 'Understand who made decisions' - Wrong because: this frames post-mortem as fault-finding, not learning. Even if specific people made poor calls, system allowed those calls to ship. Focusing on 'who' makes people defensive and hides information. However, this is better than A for high-stakes incidents - accountability matters, just frame it around decisions not blame.

C) 'Document for compliance' - Wrong because: this is CYA thinking, not learning culture. Yes, you need documentation, but leading with compliance turns post-mortem into legal exercise. People will lawyer their statements instead of sharing truth. Also insults the seriousness - this isn't box-checking, it's fixing broken systems.

D) 'Understand why systems allowed this' - CORRECT. This frames around: (1) System failures (why did data issue reach production? why was safety guardrail missing? why did UX not prevent misuse?). (2) Prevention focus (how do we change systems to catch this class of failures?). (3) Ownership (people own systems, so accountability is built in without blame). (4) Learning (extract maximum value from painful incident). The hint guides you: high-stakes post-mortems need balance - psychological safety to share truth AND accountability for system improvements. 'Blameless' can mean 'toothless' - focus on system accountability instead."
},
{
  "id": 121,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're designing multi-year AI roadmap. What's the key strategic question?",
  "options": [
    "Which technologies will matter in 3-5 years?",
    "What capabilities do we need to build vs. buy vs. partner?",
    "How do we balance near-term wins with long-term bets?",
    "What future do we want to create vs. react to?"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Strategic roadmaps require balancing prediction, position-taking, and portfolio management.",
  "explanation": "Option D is most strategic. Multi-year roadmap requires: (1) Vision - what future state are we creating? What role do we play? (2) Bets - where do we take positions before consensus? (3) Portfolio - near-term value funds long-term capability. (4) Flexibility - how do we stay adaptive? Options A, B, C are tactical questions within strategic frame. The hint guides you: strategic roadmaps aren't just predictions (reactive) but position-taking (proactive) - decide what future you're building toward, then work backward to capabilities needed. Best strategies create the future, not just predict it."
},
{
  "id": 122,
  "category": "Product Design",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Design ethical framework for AI product decisions. What's the foundational principle?",
  "options": [
    "Maximize benefit, minimize harm (utilitarian)",
    "Respect user autonomy and informed consent (deontological)",
    "Distribute AI benefits and risks equitably (justice-based)",
    "All three principles in tension - ethics requires balancing"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: AI ethics isn't single principle - requires balancing benefit, autonomy, and equity.",
  "explanation": "Option D is correct. AI ethical frameworks must balance: (1) Beneficence - maximize good outcomes, minimize harm. (2) Autonomy - preserve user agency and informed consent. (3) Justice - ensure fair distribution of benefits and risks across populations. (4) Explicability - make AI decisions understandable. These often conflict - maximizing benefit might reduce autonomy, equity might reduce efficiency. Ethical AI requires explicitly navigating these tradeoffs. The hint guides you: AI ethics isn't following single rule - it's balancing multiple values that often conflict. Design ethical frameworks that make tradeoffs explicit and context-appropriate."
},
{
  "id": 123,
  "category": "Metrics",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "Your board wants to understand AI readiness vs. competitors. What framework do you present?",
  "options": [
    "Technology comparison - our models vs. their models",
    "Talent benchmark - our AI team vs. their AI team",
    "Capability matrix - map AI capabilities across company vs. competitors across business value dimensions",
    "Market outcomes - our AI product performance vs. theirs"
  ],
  "correctAnswers": [2],
  "multipleCorrect": false,
  "hint": "Framework: Competitive assessment requires mapping capabilities to business value, not just tech comparison.",
  "explanation": "Option C is correct. AI readiness assessment should map: (Vertical axis) AI capabilities - data, models, infrastructure, talent. (Horizontal axis) Business domains - product, operations, customer service, etc. This creates matrix showing: where you lead, where you lag, where gaps are highest-value. Options A, B, D measure single dimensions. The hint guides you: competitive AI readiness isn't about who has better models - it's about mapping AI capabilities across all business functions and comparing strategic positioning. Show board where you're ahead, where you're behind, and which gaps matter most for competitive outcomes."
},
{
  "id": 124,
  "category": "Behavioral",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're negotiating with OpenAI/Anthropic for enterprise partnership. What's your leverage?",
  "options": [
    "Scale - large contract value",
    "Data - proprietary training data they want",
    "Distribution - access to your user base",
    "Strategic optionality - credible threat to build alternative or switch providers"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Negotiation leverage comes from alternatives and unique value you provide.",
  "explanation": "Option D is correct. Enterprise AI partnerships require leverage from: (1) Scale (contract value), (2) Data (unique training data), (3) Distribution (customer access), (4) Competition (credible alternatives). But real leverage comes from credible alternatives - can you build, switch providers, or go open source? Without alternatives, you're price-taker regardless of scale. With alternatives, you negotiate as peers. Options A, B, C are value you provide but don't create leverage without option D. The hint guides you: negotiation leverage requires credible alternatives - develop in-house capability or multi-vendor strategy to negotiate from strength, not dependence."
},
{
  "id": 125,
  "category": "Product Sense",
  "salaryTier": "Staff+",
  "salaryRange": "$350K+",
  "question": "You're advising a Series A startup with great domain expertise in legal tech. They're deciding: build AI-first case research product or add AI to their existing contract management tool. Which creates more value?",
  "options": [
    "AI-first case research - greenfield lets you design optimal AI experience without legacy constraints",
    "Add AI to existing product - faster time to market, existing customers will adopt, lower risk",
    "Depends on competitive dynamics - if incumbents are adding AI to existing products, go AI-first to differentiate",
    "Depends on existing product's strategic value - if contract tool is defensible moat, double down; if not, go AI-first"
  ],
  "correctAnswers": [3],
  "multipleCorrect": false,
  "hint": "Framework: Strategic decisions depend on your moat, not AI architecture. Protect what's defensible, reinvent what's not.",
  "explanation": "Option D is correct. Here's why each approach works or doesn't:

A) 'AI-first case research - no legacy constraints' - Wrong because: 'no legacy constraints' is engineer thinking, not strategic thinking. Constraints don't determine value - competitive position does. AI-first might let you build cooler product, but if you're abandoning defensible contract management position to chase competitive case research market, you're trading moat for novelty. Also assumes customers care about 'AI-first' architecture - they care about outcomes. Shows tech-first thinking.

B) 'Add AI to existing - faster, safer' - Wrong because: assumes existing product is worth doubling down on. What if contract management is commoditizing? What if AI makes your current product obsolete? 'Faster and lower risk' is not strategy - it's optimization of potentially wrong direction. Also, if existing product is strong moat, this might be RIGHT answer, but you can't know without assessing strategic position first.

C) 'Depends on competitive dynamics' - Wrong framing because: competitive dynamics matter but this puts competition first, your moat second. If your contract tool is deeply entrenched with customers and switching costs, you defend it even if incumbents are going AI-first elsewhere. If your product is weak, you might need AI-first even if competition is weak. The question is your defensibility, not their actions. Shows reactive not proactive strategy.

D) 'Depends on existing product's strategic value' - CORRECT. The decision tree: (1) Is contract management tool defensible? (proprietary data, network effects, high switching costs, market leadership). If YES → double down with AI, expand moat. If NO → go AI-first in case research, build new moat. (2) Strategic value determined by: customer retention, pricing power, competitive position, data moats. Not by revenue or growth alone. Example: If your contract tool has proprietary clause library and 80% retention, add AI to it. If you're #4 player with 40% churn, build AI-first case research and leapfrog. The hint guides you: protect defensible positions, reinvent weak positions. AI architecture follows from strategic assessment, not vice versa."
}
];

export const salaryTiers = [
  { key: "Junior", label: "JUNIOR PM", salary: "$130K - $170K", companies: "AI Startups, Series A/B", gradient: "gradient-tier-junior", emoji: "🎯" },
  { key: "Mid", label: "MID-LEVEL PM", salary: "$170K - $220K", companies: "Scale AI, Notion, Figma", gradient: "gradient-tier-mid", emoji: "🎯" },
  { key: "Senior", label: "SENIOR PM", salary: "$220K - $280K", companies: "Meta, Google", gradient: "gradient-tier-senior", emoji: "🎯" },
  { key: "AI Frontier", label: "AI PM (FRONTIER)", salary: "$280K - $350K", companies: "OpenAI, Anthropic, DeepMind", gradient: "gradient-tier-ai", emoji: "🎯" },
  { key: "Staff+", label: "STAFF+ PM", salary: "$350K+", companies: "Top Companies, IC Leadership", gradient: "gradient-tier-staff", emoji: "🎯" },
];
