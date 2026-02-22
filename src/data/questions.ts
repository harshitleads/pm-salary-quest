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
    id: 1, category: "Product Sense", salaryTier: "Junior", salaryRange: "$130K-$170K",
    question: "You're a PM at a food delivery app. Orders have dropped 15% in suburban areas. What's your first step?",
    options: [
      "Immediately launch a discount campaign for suburban users",
      "Analyze data to understand which segments and timeframes saw the biggest drop",
      "Add more restaurants to suburban areas",
      "Redesign the app's homepage"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Think about the problem-solving framework: Define → Analyze → Hypothesize → Test.",
    explanation: "Before jumping to solutions, a PM should first understand the problem deeply by analyzing data. This helps identify root causes (e.g., delivery times, restaurant selection, pricing) before investing in potentially wrong solutions."
  },
  {
    id: 2, category: "Metrics", salaryTier: "Junior", salaryRange: "$130K-$170K",
    question: "Which metric would you choose as the North Star for a new note-taking app targeting college students?",
    options: [
      "Daily Active Users (DAU)",
      "Number of notes created per week per active user",
      "App Store rating",
      "Total registered users"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "A North Star metric should capture the core value users get from the product.",
    explanation: "Notes created per week per active user best captures engagement and value delivery. DAU doesn't measure depth, ratings are lagging indicators, and total users includes churned users."
  },
  {
    id: 3, category: "Product Sense", salaryTier: "Junior", salaryRange: "$130K-$170K",
    question: "You're launching an MVP for a habit-tracking app. Which features should you include? (Select all that apply)",
    options: [
      "Simple habit creation with daily check-off",
      "Social feed to share habits with friends",
      "Push notification reminders",
      "AI-powered habit suggestions based on user behavior"
    ],
    correctAnswers: [0, 2], multipleCorrect: true,
    hint: "MVP = minimum feature set that delivers core value and validates the key hypothesis.",
    explanation: "An MVP should include the core loop (create + track habits) and retention mechanics (reminders). Social features and AI are nice-to-haves that add complexity without validating the core value proposition."
  },
  {
    id: 4, category: "Behavioral", salaryTier: "Junior", salaryRange: "$130K-$170K",
    question: "An engineer disagrees with your feature prioritization. They think the technical debt should be addressed first. What do you do?",
    options: [
      "Override them — you're the PM and business priorities come first",
      "Listen to their reasoning, share your framework, and find a compromise that addresses both",
      "Defer entirely to engineering's judgment on all technical matters",
      "Escalate to your manager immediately"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Great PMs influence without authority and seek collaborative solutions.",
    explanation: "The best approach combines empathy with structured decision-making. Understanding the engineer's concerns about tech debt while sharing business context helps build trust and often leads to better solutions (e.g., allocating sprint capacity to both)."
  },
  {
    id: 5, category: "Design", salaryTier: "Junior", salaryRange: "$130K-$170K",
    question: "A user study shows 60% of users abandon your onboarding flow at step 3 of 5. What's the most likely cause to investigate first?",
    options: [
      "The app's color scheme is unappealing",
      "Step 3 asks for too much information or has unclear value proposition",
      "Users don't like the app's name",
      "The loading speed is too slow"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "When there's a specific drop-off point, focus on what's unique about that step.",
    explanation: "A sharp drop at a specific step suggests something about that step is problematic — likely asking for too much info (friction) or not communicating why it matters (unclear value). This is more actionable than broad issues like colors or branding."
  },

  // Mid-Level PM
  {
    id: 6, category: "Product Sense", salaryTier: "Mid-Level", salaryRange: "$170K-$220K",
    question: "You're PM at Notion. Usage data shows teams create many pages but rarely revisit them after 2 weeks. What product strategy would you pursue?",
    options: [
      "Add more templates to make page creation easier",
      "Build intelligent resurfacing features (search improvements, related pages, smart suggestions)",
      "Limit the number of pages teams can create",
      "Add gamification to reward users for revisiting old pages"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "The core problem is content discovery, not content creation.",
    explanation: "The data suggests a discovery/retrieval problem, not a creation problem. Smart resurfacing (better search, 'related pages,' AI-powered suggestions) addresses the root cause. Limiting pages hurts power users, and gamification treats symptoms."
  },
  {
    id: 7, category: "Metrics", salaryTier: "Mid-Level", salaryRange: "$170K-$220K",
    question: "You're evaluating a new feature at Figma that lets designers auto-generate responsive layouts. Which metrics should you track? (Select all that apply)",
    options: [
      "Feature adoption rate within first 30 days",
      "Time saved per design task compared to manual approach",
      "Number of Figma crashes per session",
      "Net Promoter Score change among users who tried the feature"
    ],
    correctAnswers: [0, 1, 3], multipleCorrect: true,
    hint: "Think about adoption, value delivery, and user satisfaction as separate measurement dimensions.",
    explanation: "You need to measure adoption (are people using it?), efficiency (does it save time?), and satisfaction (do they like it?). Crash rate is a platform metric, not specific to this feature evaluation."
  },
  {
    id: 8, category: "Behavioral", salaryTier: "Mid-Level", salaryRange: "$170K-$220K",
    question: "Your CEO wants to copy a competitor's feature that launched last week. As PM, how do you respond?",
    options: [
      "Immediately start building it — the CEO knows the market best",
      "Refuse outright — copying competitors is never a good strategy",
      "Acknowledge the input, then present data on whether this aligns with your users' needs and product strategy",
      "Suggest building it but making it slightly different to avoid looking like a copy"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "A PM's job is to represent the user and strategy, even when pushback is needed.",
    explanation: "Great PMs manage up by acknowledging leadership input while grounding decisions in user data and strategy. Blindly following or refusing both fail. The right approach: validate the hypothesis with your own user research."
  },
  {
    id: 9, category: "Design", salaryTier: "Mid-Level", salaryRange: "$170K-$220K",
    question: "You're redesigning Scale AI's data labeling tool. Labelers report fatigue after 2 hours. What design change has the highest impact?",
    options: [
      "Change the background color to reduce eye strain",
      "Add progress bars and micro-breaks with smart task batching",
      "Make the interface more colorful and fun",
      "Increase font size across the board"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Think about the psychology of sustained attention and motivation loops.",
    explanation: "Progress visibility and structured breaks combat cognitive fatigue most effectively. Progress bars create motivation loops, and smart batching (varying task difficulty) prevents monotony. Surface-level visual changes don't address the cognitive root cause."
  },
  {
    id: 10, category: "Product Sense", salaryTier: "Mid-Level", salaryRange: "$170K-$220K",
    question: "You're PM at a B2B SaaS tool. Free trial conversion is 8% (industry avg is 15%). What's your highest-leverage investigation?",
    options: [
      "Extend the free trial from 14 to 30 days",
      "Map the user journey to find where trial users drop off and identify the 'aha moment'",
      "Add more features to the free tier",
      "Increase marketing spend to get more trial signups"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Low conversion usually means users aren't reaching the value moment fast enough.",
    explanation: "Before changing trial parameters, understand why users aren't converting. Mapping the journey reveals whether users reach the 'aha moment' — the point where they experience core value. Often the fix is faster onboarding to value, not more time or features."
  },

  // Senior PM
  {
    id: 11, category: "Product Sense", salaryTier: "Senior", salaryRange: "$220K-$280K",
    question: "You're a Senior PM at Google Maps. Self-driving car data shows your maps have 3% error rate in suburban road classifications. How do you approach this?",
    options: [
      "Hire more map editors to manually fix errors",
      "Build a prioritization framework based on error impact (safety risk × traffic volume) and deploy targeted ML model retraining",
      "Wait for users to report errors through the app",
      "Lower the classification accuracy threshold to reduce false errors"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Senior PMs build scalable systems, not one-off fixes. Think about impact prioritization.",
    explanation: "A Senior PM thinks systematically: not all errors are equal. A misclassified highway is more dangerous than a misclassified residential street. Building a prioritization framework (risk × volume) and automating fixes through ML is the scalable, high-impact approach."
  },
  {
    id: 12, category: "Metrics", salaryTier: "Senior", salaryRange: "$220K-$280K",
    question: "You lead the Meta Marketplace team. Transaction volume is up 20% but buyer satisfaction scores dropped. What metrics framework do you deploy? (Select all that apply)",
    options: [
      "Cohort analysis comparing new vs. returning buyers' satisfaction",
      "Fraud rate and dispute resolution time tracking",
      "Total number of listings on the platform",
      "Seller response time and quality score correlation with buyer satisfaction"
    ],
    correctAnswers: [0, 1, 3], multipleCorrect: true,
    hint: "When volume and satisfaction diverge, the answer often lies in quality segmentation.",
    explanation: "Growing volume with declining satisfaction suggests quality problems scaling with growth. You need to understand: which buyer segments are unhappy (cohort analysis), whether fraud is increasing with volume (trust metrics), and whether seller quality is declining (response/quality correlation)."
  },
  {
    id: 13, category: "Behavioral", salaryTier: "Senior", salaryRange: "$220K-$280K",
    question: "Two of your feature teams have conflicting roadmap priorities that could delay a major launch. As Senior PM, how do you resolve this?",
    options: [
      "Let each team pursue their own priorities independently",
      "Escalate to VP immediately to make the decision",
      "Facilitate a joint session with shared OKRs, align on company-level impact, and propose a sequencing plan",
      "Cancel one team's project to reduce conflict"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Senior PMs are force multipliers who align teams around shared outcomes.",
    explanation: "Senior PMs own cross-team alignment. The right approach: bring teams together, map both projects to company OKRs, quantify impact, and create a sequencing plan that maximizes total value. Escalation should be a last resort, not a first move."
  },
  {
    id: 14, category: "Design", salaryTier: "Senior", salaryRange: "$220K-$280K",
    question: "Google is launching a new privacy dashboard. Users need to manage data across 15+ Google products. How do you design the information architecture?",
    options: [
      "One long scrollable page with all settings",
      "Tabbed interface organized by product (Gmail, Maps, YouTube, etc.)",
      "Progressive disclosure: start with privacy score overview, drill into categories (Location, Search, Activity), then specific products",
      "A simple on/off toggle for all privacy settings"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Complex information needs layered revelation — don't overwhelm users upfront.",
    explanation: "Progressive disclosure is the gold standard for complex settings. A privacy 'score' provides instant understanding, categories group related concerns, and product-level controls offer granularity. This balances simplicity for casual users with power for privacy-conscious users."
  },
  {
    id: 15, category: "Product Sense", salaryTier: "Senior", salaryRange: "$220K-$280K",
    question: "You're Senior PM at Meta. Instagram Reels engagement is cannibalizing Feed engagement. How do you think about this strategically?",
    options: [
      "Cap Reels recommendations to protect Feed engagement",
      "Analyze whether total time spent and user satisfaction are increasing despite the shift, and optimize for overall platform health",
      "Merge Reels and Feed into a single experience",
      "Kill Reels and focus on Feed improvements"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Cannibalization isn't always bad — what matters is whether total value is increasing.",
    explanation: "Platform-level thinking: if Reels is growing total engagement and satisfaction even while shifting time from Feed, that's healthy product evolution. The key metrics are total time spent, daily sessions, and user satisfaction — not individual surface metrics in isolation."
  },

  // AI PM (Frontier)
  {
    id: 16, category: "Product Sense", salaryTier: "AI PM", salaryRange: "$280K-$350K",
    question: "You're PM at Anthropic. Claude's response quality degrades on multi-step reasoning tasks beyond 5 steps. How do you approach this?",
    options: [
      "Simply increase the model's context window",
      "Design a chain-of-thought product feature that breaks complex tasks into verified sub-steps with user checkpoints",
      "Tell users to ask simpler questions",
      "Add a disclaimer about accuracy on complex tasks"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "The best AI product solutions combine model capabilities with smart UX design.",
    explanation: "This is a product-model co-design problem. Breaking complex reasoning into verified sub-steps leverages the model's strength (good at individual steps) while mitigating weakness (compounding errors). User checkpoints add human verification where AI confidence is lowest."
  },
  {
    id: 17, category: "Metrics", salaryTier: "AI PM", salaryRange: "$280K-$350K",
    question: "You're evaluating whether to launch a new AI feature that generates meeting summaries. What metrics should gate the launch? (Select all that apply)",
    options: [
      "Summary accuracy rate (human-evaluated against ground truth)",
      "Number of API calls to the AI model",
      "User correction rate (how often users edit generated summaries)",
      "Task completion rate (do users share/act on summaries vs. ignore them)"
    ],
    correctAnswers: [0, 2, 3], multipleCorrect: true,
    hint: "AI launch gates should measure quality, user trust, and downstream utility.",
    explanation: "Launch gates for AI features need three lenses: accuracy (is the output correct?), trust (do users need to fix it?), and utility (does it drive real behavior change?). API call volume is an infrastructure metric, not a quality gate."
  },
  {
    id: 18, category: "Design", salaryTier: "AI PM", salaryRange: "$280K-$350K",
    question: "You're designing the UX for an AI coding assistant at OpenAI. The model sometimes generates incorrect code. How do you build appropriate trust?",
    options: [
      "Hide confidence scores to avoid confusing users",
      "Show confidence indicators, provide inline explanations, and make it easy to diff AI suggestions against original code",
      "Only show AI suggestions when the model is 99%+ confident",
      "Add a blanket 'AI may make mistakes' warning at the top"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Trust in AI is built through transparency, not hiding limitations.",
    explanation: "Calibrated trust requires transparency: confidence indicators help users allocate attention, inline explanations support understanding, and diff views enable verification. Hiding confidence or showing blanket warnings both miscalibrate user trust."
  },
  {
    id: 19, category: "Behavioral", salaryTier: "AI PM", salaryRange: "$280K-$350K",
    question: "Your AI research team wants to publish a paper about a capability that could raise safety concerns. As PM, how do you navigate this?",
    options: [
      "Block publication entirely — safety first",
      "Let the research team publish freely — it's their domain",
      "Convene a cross-functional review (safety, policy, research, product) to assess risks and develop a responsible disclosure plan",
      "Publish but downplay the concerning capabilities"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "AI PM decisions at frontier companies require balancing innovation, safety, and transparency.",
    explanation: "Frontier AI PMs must balance multiple stakeholders. A cross-functional review ensures: safety team assesses risks, policy team evaluates regulatory implications, research team maintains scientific integrity, and product team considers user impact. This produces a nuanced, responsible decision."
  },
  {
    id: 20, category: "Product Sense", salaryTier: "AI PM", salaryRange: "$280K-$350K",
    question: "DeepMind wants to launch an AI tutoring product. Initial tests show the AI is better than average tutors but worse than the best human tutors. Should you launch?",
    options: [
      "No — only launch when AI exceeds the best human tutors",
      "Yes, but position it as a supplement to human tutoring, not a replacement, and target underserved markets with limited tutor access",
      "Yes, launch everywhere and replace all human tutors",
      "No — pivot to building tools for human tutors instead"
    ],
    correctAnswers: [1], multipleCorrect: false,
    hint: "Think about access, positioning, and the total addressable market for education.",
    explanation: "The biggest opportunity in AI tutoring isn't replacing the best tutors — it's providing quality education where good tutors don't exist. Positioning as a supplement maintains trust, and targeting underserved markets maximizes social impact while building the product iteratively."
  },

  // Staff+ PM
  {
    id: 21, category: "Product Sense", salaryTier: "Staff+", salaryRange: "$350K+",
    question: "As Staff PM, you discover that your company's three main product lines are converging on similar features, creating internal competition. What's your strategic move?",
    options: [
      "Let them compete — internal competition drives innovation",
      "Kill two of the three products and consolidate",
      "Design a platform strategy with shared infrastructure and differentiated user-facing experiences, then present to exec team",
      "Merge all three into one product immediately"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Staff+ PMs think in platforms and ecosystems, not individual products.",
    explanation: "Platform thinking: shared infrastructure reduces redundancy and enables faster iteration, while differentiated experiences serve distinct user needs. This maximizes organizational leverage — engineering builds once, product teams customize for their segments."
  },
  {
    id: 22, category: "Metrics", salaryTier: "Staff+", salaryRange: "$350K+",
    question: "You're defining the company-wide product health metrics framework. Which approach do you take? (Select all that apply)",
    options: [
      "Mandate a single North Star metric for all product lines",
      "Create a layered framework: company-level (revenue, MAU), product-level (engagement, retention), feature-level (adoption, satisfaction)",
      "Let each PM define their own metrics independently",
      "Establish input/output metric relationships to show how feature work drives business outcomes"
    ],
    correctAnswers: [1, 3], multipleCorrect: true,
    hint: "Great metrics frameworks show causal relationships across organizational levels.",
    explanation: "Staff+ PMs build systems, not dashboards. A layered framework ensures alignment (everyone maps to company goals), while input/output relationships show causality (this feature improvement → this engagement change → this revenue impact). Single metrics oversimplify; independent metrics fragment."
  },
  {
    id: 23, category: "Behavioral", salaryTier: "Staff+", salaryRange: "$350K+",
    question: "The VP of Engineering proposes a 6-month platform rewrite that would freeze all feature development. How do you approach this?",
    options: [
      "Agree immediately — engineering knows best about technical needs",
      "Refuse — 6 months without features is unacceptable",
      "Propose an incremental migration approach: identify highest-impact modules, migrate in phases, maintain feature velocity at ~70% during transition",
      "Counter-propose a 3-month rewrite with the same scope"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Staff+ PMs find creative solutions that balance technical health with business continuity.",
    explanation: "The false dichotomy is 'rewrite everything' vs. 'rewrite nothing.' Staff+ thinking finds the middle path: incremental migration prioritizes the most painful technical debt, maintains business momentum, and reduces risk of a big-bang rewrite failure."
  },
  {
    id: 24, category: "Design", salaryTier: "Staff+", salaryRange: "$350K+",
    question: "You're establishing design principles for a multi-product company. What's the right level of design consistency?",
    options: [
      "100% consistency — every product should look identical",
      "Zero consistency — each product team should have full creative freedom",
      "Shared design system with core patterns (navigation, typography, color) but product-specific customization for unique workflows",
      "Outsource design consistency to an external agency"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Design systems should enable, not constrain. Think about what should be shared vs. unique.",
    explanation: "Effective design systems balance coherence with flexibility. Shared patterns reduce cognitive load for users across products and accelerate development. Product-specific customization acknowledges that different products serve different needs and workflows."
  },
  {
    id: 25, category: "Product Sense", salaryTier: "Staff+", salaryRange: "$350K+",
    question: "Your company is considering entering a market where a dominant player has 80% share. As Staff+ PM, what's your framework for the go/no-go decision?",
    options: [
      "Don't enter — the incumbent is too strong",
      "Enter and compete directly on features, trying to build everything they have",
      "Analyze disruption vectors: underserved segments, technology shifts, business model innovation, and distribution advantages unique to your company",
      "Enter with a loss-leader pricing strategy to undercut the incumbent"
    ],
    correctAnswers: [2], multipleCorrect: false,
    hint: "Think about Clayton Christensen's disruption theory and where incumbents are vulnerable.",
    explanation: "Staff+ PMs use strategic frameworks. Disruption analysis reveals: are there underserved segments the incumbent ignores? Is there a technology shift (AI, mobile) that changes the game? Can you innovate on the business model? Do you have unique distribution? Competing head-on against an 80% incumbent rarely wins."
  },
];

export const salaryTiers = [
  { key: "Junior", label: "JUNIOR PM", salary: "$130K - $170K", companies: "AI Startups, Series A/B", gradient: "gradient-tier-junior", emoji: "🎯" },
  { key: "Mid-Level", label: "MID-LEVEL PM", salary: "$170K - $220K", companies: "Scale AI, Notion, Figma", gradient: "gradient-tier-mid", emoji: "🎯" },
  { key: "Senior", label: "SENIOR PM", salary: "$220K - $280K", companies: "Meta, Google", gradient: "gradient-tier-senior", emoji: "🎯" },
  { key: "AI PM", label: "AI PM (FRONTIER)", salary: "$280K - $350K", companies: "OpenAI, Anthropic, DeepMind", gradient: "gradient-tier-ai", emoji: "🎯" },
  { key: "Staff+", label: "STAFF+ PM", salary: "$350K+", companies: "Top Companies, IC Leadership", gradient: "gradient-tier-staff", emoji: "🎯" },
];
