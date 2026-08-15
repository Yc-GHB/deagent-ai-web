/** 英文基准文案字典 */
export const en = {
  nav: {
    aria: {
      home: 'DeAgentAI home',
      primary: 'Primary navigation',
      toggle: 'Toggle navigation',
      logoAlt: 'DeAgentAI',
    },
    languageShort: 'EN',
    cta: 'Connect Wallet',
    wrongNetwork: 'Wrong network',
    getAiaModal: {
      title: 'GET $AIA',
      closeAria: 'Close',
      backAria: 'Back',
      cexTitle: 'Swap via CEX',
      cexDescription: 'Trade on a centralised exchange',
      pairLabel: 'AIA / USDT',
    },
    items: [
      { id: 'HOME', label: 'HOME', href: '/' },
      { id: 'PRODUCT', label: 'PRODUCT', href: '/#product' },
      { id: 'ECOSYSTEM', label: 'ECOSYSTEM', href: '/#ecosystem' },
      { id: '$AIA', label: '$AIA', href: '/#partners' },
      { id: 'LEARN', label: 'LEARN', href: '/#learn' },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: 'AGENTS',
            items: [
              { title: 'AI Agents', description: 'Deploy always-on agents', href: '/agents' },
              { title: 'CorrAI', description: 'Autonomous strategy agent', href: 'https://corr.ai/en', external: true },
              { title: 'AlphaX', description: 'Autonomous trading agent', href: '/alphax' },
            ],
          },
          {
            title: 'INFRASTRUCTURE',
            items: [
              { title: 'AI Token Hub', description: 'One API, all models', href: '/token-hub' },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: 'BUILD ON US',
            items: [
              { title: 'Solutions', description: 'Model capability as an API', href: '/solutions' },
              { title: 'Case Studies', description: 'AliceAI & partners', href: '/case-studies' },
            ],
          },
        ],
      },
      '$AIA': {
        columns: [
          {
            title: '$AIA',
            items: [
              { title: 'Get AIA', href: '#get-aia' },
              { title: 'Buyback Dashboard', href: '/buyback' },
              { title: 'Tokenomics', href: 'https://deagentai.gitbook.io/deagentai', external: true },
            ],
          },
        ],
      },
      LEARN: {
        columns: [
          {
            title: 'LEARN',
            items: [
              { title: 'Community', description: 'Events & meetups', href: '/community' },
              {
                title: 'Whitepaper',
                description: 'Read the paper',
                href: 'https://deagentai.gitbook.io/deagentai',
                external: true,
              },
              { title: 'MiCA Whitepaper', description: 'Compliance', href: 'https://deagent.ai/micar-whitepaper.pdf', external: true },
              { title: 'Resources', description: 'Docs & more', href: 'https://medium.com/@deagent.ai', external: true },
            ],
          },
        ],
      },
    },
  },

  footer: {
    logoAlt: 'DeAgentAI',
    tagline:
      'Trusted AI agent infrastructure for the on-chain world — identity, continuity, and consensus for autonomous intelligence.',
    products: {
      title: 'Products',
      links: [
        { label: 'AI Agents', badge: 'NEW', href: '/agents' },
        { label: 'AlphaX', href: '/alphax' },
        { label: 'AliceAI', href: '/case-studies' },
        { label: 'AI Token Hub', href: '/token-hub' },
      ],
    },
    community: {
      title: 'Community',
      social: [
        { label: 'Discord', href: 'https://discord.com/invite/officialdeagentai' },
        { label: 'Telegram', href: 'https://t.me/officialdeagentai' },
        { label: 'X', href: 'https://x.com/DeAgentAI' },
      ],
    },
    copyright: 'Copyright © 2026 DeAgentAI network. All right reserved.',
  },

  home: {
    hero: {
      titleLine1: 'Verifiable Intelligence',
      titleLine2: 'for Every Agent',
      ctaExplore: 'Explore Products',
      ctaLearn: 'Learn the Tech',
    },
    trust: {
      eyebrow: 'THE TRUST LAYER',
      title: 'The trusted foundation for agent collaboration',
      diagramAlt: 'DeAgentAI trust infrastructure diagram',
      orbitAria: 'Continuity, consensus, and identity',
      labels: {
        continuity: 'Continuity',
        consensus: 'Consensus',
        identity: 'Identity',
      },
      cards: [
        {
          title: 'De(cision)Agent',
          description: 'Identity, continuity, consensus — the foundation for trusted agents.',
        },
        {
          title: 'Self-developed model',
          description:
            'Feedback-trained proprietary models make agent judgments reproducible and calibratable.',
        },
        {
          title: 'A2A / MCP',
          description:
            'Compatible with industry standards for cross-framework collaboration and tool access.',
        },
        {
          title: 'MPC',
          description: 'MPC enables trustless execution, settling collaboration securely on-chain.',
        },
      ],
    },
    product: {
      eyebrow: 'PRODUCT',
      title: 'Intelligence that stays present',
      screenerAlt: 'On-chain asset screener',
      heading: 'Daily Market Screener Tailored to Your Criteria',
      capabilities: [
        {
          title: 'One-tap deploy',
          copy:
            'Select, configure, deploy. Hosting and persistence are handled by the protocol — you touch no infrastructure.',
        },
        {
          title: 'Invisible keys',
          copy:
            'Keys are injected by identity, hidden beneath the protocol, with per-account circuit breaking that never cascades.',
        },
        {
          title: 'Every inference metered',
          copy:
            'Every inference is logged per call, consumption wired straight to settlement. Transparent, auditable, never silent.',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'ECOSYSTEM & TECHNOLOGY',
      title: 'Turning judgment into settleable value',
      technologySteps: [
        {
          title: 'Self-Developed Model',
          lines: ['Feedback-driven training', 'Reliable judgment output'],
        },
        {
          title: 'Agent Packaging',
          lines: ['De(cision)Agent Framework', 'Autonomous decision-making'],
        },
        {
          title: 'Economic Settlement',
          lines: ['Value metered', 'Verifiable on-chain'],
        },
      ],
      scenarios: [
        {
          title: 'CorrAI — Autonomous Strategy Agent',
          copy:
            "CorrAI runs inside the De(cision)Agent framework under consensus, identity, and continuity. It calls DeAgentAI's proprietary models to generate strategy judgments, crystallized into an autonomous, continuously running strategy agent — giving on-chain judgment verifiable strategic continuity for the first time.",
        },
        {
          title: 'AliceAI — Match Prediction Agent',
          copy:
            "AliceAI's match prediction runs directly on DeAgentAI's proprietary models: the model outputs match judgment, which AliceAI crystallizes into an agent that decides autonomously and settles at the economic layer. It shares the same underlying stack as CorrAI — one intelligence, flowing into different scenarios.",
        },
      ],
      agentCards: {
        aria: 'DeAgentAI agent examples',
        items: [
          {
            chip: 'Strategy · Verified',
            name: 'CorrAI',
            role: 'Autonomous Strategy Agent',
            logoAlt: 'CorrAI',
          },
          {
            chip: 'Sports · Reuse',
            name: 'AliceAI',
            role: 'Match Prediction Agent',
            logoAlt: 'AliceAI',
          },
        ],
      },
      compounding: {
        title: 'Capability that compounds itself',
        copyBefore:
          'Identity, continuity, consensus, proprietary models, agent wrapping, economic settlement — no layer stands alone; each is reused and stacked on the last. ',
        copyStrong:
          'Every new layer re-expands what the whole stack can do; every reuse brings the next agent closer to zero cost.',
        copyAfter:
          " This isn't a wall — it's a self-compounding system. The longer it runs, the wider the gap.",
      },
    },
    voices: {
      eyebrow: 'IN THEIR WORDS',
      title: 'Voices from the team and ecosystem',
      gridAria: 'Testimonial placeholders',
    },
    partners: {
      eyebrow: 'PARTNERSHIP & FUNDING',
      title: 'Building with leading ecosystem partners',
    },
    launch: {
      title: 'Connect a wallet, deploy your first agent',
      copy: 'No keys to manage — just connect and start. Built on trusted intelligence infrastructure.',
      ctaLaunch: 'Connect Wallet',
      ctaWhitepaper: 'Read White Paper',
    },
  },

  agents: {
    hero: {
      beta: 'IN BETA · CONNECT WALLET TO START',
      title: 'AI Agents',
      description:
        'Deploy in one click - no API key of your own required. Every inference is settled through AI Token Hub, paid in $AIA or $USDT. First agent: Sentry, watching the entire Hyperliquid market 24/7.',
      kpis: [
        {
          label: 'MARKETS COVERED',
          value: 308,
          footnote: 'Crypto 198 · Tradfi 110',
        },
        {
          label: 'TIME TO DEPLOY',
          value: 60,
          unit: 's',
          footnote: 'Wallet only · no email · no credit card',
        },
        {
          value: 5,
          footnote: 'Hyperliquid dexes',
        },
        {
          value: 24,
          unitSuffix: '/7',
          footnote: 'Always running',
        },
        {
          valueLabel: '$AIA / $USDT',
          footnote: 'Settlement',
        },
      ],
    },
    sentry: {
      eyebrow: 'CORE CAPABILITY',
      title: 'Sentry scans. You decide.',
      intro:
        'You set the criteria; Sentry only executes and states facts. Below is live data from the Hyperliquid market - adjust any condition and matches recompute instantly.',
      filters: {
        title: 'Filters',
        live: 'Live',
        presetTitle: 'PRESET STRATEGIES',
        fineTuneTitle: 'FINE-TUNE THRESHOLDS',
        ranges: [
          {
            label: 'Min 24h volume',
            value: '$3M',
            aria: 'Minimum daily volume',
          },
          {
            label: 'Funding APR, absolute',
            value: '≥ 1.5%',
            aria: 'Funding annual rate',
          },
          {
            label: 'Min 24h move',
            value: '0%',
            aria: 'Minimum move',
          },
        ],
        outlierGuard: {
          title: 'Outlier guard',
          description: 'Skip extreme dislocations that may not settle cleanly.',
        },
      },
      strategies: [
        { title: 'Funding Arbitrage', description: 'Funding far from baseline, both ways', count: '47' },
        { title: 'Low Turnover', description: 'OI far above volume, low turnover', count: '52' },
        { title: 'Volume Surge', description: 'Volume and price expanding together', count: '8' },
        { title: 'Premium Dislocation', description: 'Mark price away from oracle', count: '78' },
      ],
      matches: {
        title: 'Matches today',
        tabs: ['All', 'Crypto', 'Tradfi'],
        summary: {
          count: '47',
          text: 'markets matched - Funding Arbitrage',
          outlierNoteBefore: 'Outlier guard removed ',
          outlierCount: '2',
          outlierNoteAfter: ' with extreme funding or thin liquidity',
        },
        columns: ['Market', 'Funding APR', '24h change', 'Volume', 'Open interest', 'Premium'],
        categoryLabels: {
          Crypto: 'Crypto',
          Tradfi: 'Tradfi',
        },
        status: {
          empty: 'No markets match the current filters',
          stale: 'Snapshot is more than 5 minutes old',
          partial: 'Partial snapshot',
          truncated: 'Showing top results',
          loading: 'Loading live markets…',
          unavailable: 'Market data is temporarily unavailable',
        },
      },
    },
    dailyPush: {
      badge: 'Coming soon',
      title: 'Daily push',
      copy:
        'Matches are delivered at a fixed time each day - no need to open the platform. When the market offers nothing, we still send: no manufactured signals, no silence.',
      features: [
        { title: 'Delivered on schedule', description: 'Push time is configurable' },
        { title: 'Sent even when empty', description: 'No silence days' },
        { title: 'Uses long-term memory', description: 'Ranked by your preferences' },
        { title: 'Ask follow-ups', description: 'Go deeper in any market' },
      ],
      channels: 'Telegram · In-app',
      bot: {
        name: 'Sentry BOT',
        time: 'Today 09:00',
        message: '47 markets matched your Funding Arbitrage criteria today. Top three by strength:',
        assets: [
          { symbol: 'XMR', category: 'Crypto', note: 'Longs collect', change: '+20.93%' },
          { symbol: 'CASHCAT', category: 'Crypto', note: 'Shorts collect', change: '+42.72%' },
          { symbol: 'KAITO', category: 'Crypto', note: 'Shorts collect', change: '-295.73%' },
        ],
        memory: {
          title: 'Long-term memory',
          copy: "You asked about XMR's funding structure last time - it is back on the list today.",
        },
      },
    },
    comparison: {
      eyebrow: 'KEY DIFFERENCE',
      title: 'No API key required',
      intro:
        'Open-source agent frameworks are capable, but each one asks you to register on a model platform, add a card, retrieve a key, then paste it into a config file. For wallet-native users, every step of that path is a drop-off point.',
      openSource: {
        title: 'Deploying an open-source agent yourself',
        steps: [
          'Register on a model platform, verify email',
          'Add a credit card, pass identity checks',
          'Create and copy an API key',
          'Find the config file, enter key and model name',
          'Provide a server, handle supervision and restarts',
          'Key-leak risk is entirely yours',
        ],
        footerBefore: 'Roughly ',
        footerStrong: '30-90 minutes',
        footerAfter: ', plus a working credit card',
      },
      deagentai: {
        title: 'Deploying on DeAgentAI',
        steps: [
          'Connect wallet, sign in',
          'Top up credits with $AIA or $USDT',
          'Pick an agent, set your criteria',
          'Click deploy, daily runs begin',
        ],
        footer: 'About 60 seconds. No email, no credit card.',
      },
    },
    credit: {
      eyebrow: 'CREDIT MECHANICS',
      title: 'Zero balance, still not silent',
      intro:
        'An always-on agent going quiet is the worst experience there is - users assume the product broke. Because screening is pure computation and consumes no tokens, the daily push still arrives at zero balance; it simply comes without the written explanation.',
      levels: [
        {
          status: 'NORMAL',
          copy: 'Default mode, full push and follow-ups. Screening runs as usual.',
        },
        {
          status: 'LOW',
          copy: 'Switches to a lower-cost model. Same content, plus a top-up prompt.',
        },
        {
          status: 'CRITICAL',
          copy: 'Push only. Follow-up chat off to stretch remaining credit.',
        },
        {
          status: 'EMPTY',
          copy: 'Explanations stop, raw data still ships - screening costs no tokens.',
        },
      ],
    },
    memory: {
      eyebrow: 'LONG-TERM MEMORY',
      title: 'Who you are, not what you hold',
      intro:
        'The agent uses memory to constrain its behavior, not to guess what you want to buy. Every amount and position is queried live and never read from memory - semantic recall is fuzzy matching, and in trading a single wrong digit is a real loss.',
      remembered: {
        title: 'Remembered',
        badge: 'PREFERENCES & JUDGMENT',
        copy: 'Subjective, fuzzy, time-spanning judgments - precisely what a model is good at carrying.',
        items: [
          { before: 'Crypto only, ', strong: 'skip equities', after: '' },
          { before: 'Prefers negative funding, ', strong: 'avoids high leverage', after: '' },
          { before: 'Get caught chasing a similar setup, ', strong: 'said to wait for a pullback', after: '' },
          { before: 'Explicitly excludes ', strong: 'markets listed under seven days', after: '' },
          { before: 'Reads the push during ', strong: 'Asian hours', after: '' },
        ],
      },
      neverStored: {
        title: 'Never stored',
        badge: 'AMOUNTS & POSITIONS',
        copy: 'Always queried live and re-fetched each time. No caching, no inference.',
        items: [
          'Position cost basis',
          'Current size and direction',
          'Wallet balance',
          'Unrealized PnL',
          'Historical fill prices',
        ],
      },
    },
    deploy: {
      eyebrow: 'HOW TO DEPLOY',
      title: 'Three steps, sixty seconds',
      steps: [
        {
          title: 'Connect your wallet',
          text:
            'Signing is logging in. No email, no password. Identity is carried by an internal UID, so multiple wallets can later share credits and memory.',
        },
        {
          title: 'Pick an agent and set criteria',
          text:
            'Four preset strategies work out of the box, with adjustable thresholds. Criteria are constraints: the agent can only work within the bounds you draw.',
        },
        {
          title: 'Click deploy',
          text:
            'The agent begins running on a daily schedule, with results pushed in-app or to Telegram. Usage and balance are auditable call by call in the console.',
        },
      ],
      codeSample: {
        commentRuntime:
          '# Agent runtime: Agno AgentOS, model routed via AI Token Hub (dim comment)',
        agentName: 'Hyperliquid Screener',
        instruction: 'You are a market screener, not an advisor.',
        commentScreening: '# Screening is pure computation, zero token cost (dim comment)',
      },
    },
    waitlist: {
      eyebrow: 'EARLY ACCESS',
      title: 'First to know',
      copy: 'Waitlist members get priority access and 1M starting token credits.',
      emailAria: 'Your email',
      emailPlaceholder: 'Your email',
      submit: 'Join the waitlist',
      submitting: 'Joining…',
      success: 'You are on the list',
      alreadyJoined: 'Already on the list',
      invalid: 'Please enter a valid email',
      rateLimited: 'Too many attempts. Please wait and try again.',
      unavailable: 'Waitlist is temporarily unavailable',
      error: 'Could not join right now. Please try again.',
    },
  },

  alphax: {
    hero: {
      title: 'AlphaX - ',
      titleAccent: 'Fully Autonomous Trading Agent',
      copyBefore:
        "AlphaX is the first proprietary AI model incubated through DeAgentAI's feedback-driven training, running inside the ",
      copyStrong1: 'De(cision)Agent framework',
      copyMid:
        ' under consensus, identity, and continuity. It generates prediction signals from proprietary models and acts as a ',
      copyStrong2: 'fully autonomous trading agent',
      copyAfter:
        ' — evolving from a decision-support tool into an independently running trading intelligence.',
      tagsAria: 'AlphaX product attributes',
      tags: [
        'Feedback training',
        'Autonomous',
        'De(cision)Agent framework',
        'On-chain auditable',
      ],
    },
    does: {
      title: 'What AlphaX does',
      intro: 'AlphaX combines proprietary model intelligence with autonomous execution and verifiable outcomes.',
      capabilities: [
        {
          title: 'Proprietary Model Signals',
          copy:
            'Generating predictive signals via a proprietary model based on feedback training, continuously calibrated through user feedback to maintain reliability and adaptability in dynamic markets.',
        },
        {
          title: 'Fully Autonomous Trading',
          copy:
            'Beyond decision support — AlphaX monitors markets, adjusts strategy live, and executes independently at the speed and precision crypto demands.',
        },
        {
          title: 'On-chain auditable track record',
          copy:
            'As an agent on the De(cision)Agent framework, its decisions follow identity and continuity principles, with results auditable and verifiable on-chain.',
        },
      ],
    },
    gallery: {
      title: 'Product Gallery',
      placeholder: 'Placeholder · TBD',
      items: [
        { screen: 'SCREEN 01', title: 'Signal Dashboard' },
        { screen: 'SCREEN 02', title: 'Autonomous Execution' },
        { screen: 'SCREEN 03', title: 'Record & Positions' },
        { screen: 'SCREEN 04', title: 'Feedback Training' },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: 'One API, every frontier model',
      copyBefore:
        'AI Token Hub unifies leading closed- and open-source models behind one OpenAI-compatible API. Every call is metered, priced, and settled per request, ',
      copyStrong: 'payable in $AIA or USDT.',
      copyAfter: ' Request bodies are never persisted, only token counts and latency are kept.',
      ctaEnter: 'Enter AI Token Hub',
      ctaIntegration: 'View Integration',
    },
    role: {
      eyebrow: 'IN THE DEAGENTAI STACK',
      title: 'Its role in the ecosystem',
      copyBefore:
        'AI Token Hub carries all AI calls and metering across the DeAgentAI ecosystem. Every unit of consumption is logged and settled per call. ',
      copyStrong: 'It is the metering base for real ecosystem usage.',
      copyAfter: ' The protocol revenue it generates is one source of $AIA buybacks.',
      flowAria: 'AI Token Hub revenue flow',
      flow: [
        { title: 'Real AI Usage', copy: 'Industry-wide calls metered per request' },
        { title: 'Protocol Revenue', copy: '$AIA / USDT settled per call' },
        { title: 'Buyback $AIA', copy: 'Protocol revenue a buyback source' },
      ],
    },
    capabilities: {
      title: 'Core Capabilities',
      items: [
        {
          title: 'One API, Many Models',
          copy:
            'Claude, GPT, Gemini, DeepSeek and more, unified under an OpenAI-compatible protocol. Switch models by changing one string.',
        },
        {
          title: 'Per-call Metering',
          copy:
            'Real-time metering, pricing, and settlement per call. Request bodies are never persisted, only token counts and latency, balancing auditability and privacy.',
        },
        {
          title: '$AIA Settlement',
          copy:
            'Settle in $AIA or USDT. Top up with $AIA for a discount, a native protocol-level settlement incentive.',
        },
      ],
    },
    cta: {
      eyebrow: 'GET STARTED',
      title: 'Integrate in 60 seconds',
      copy:
        'Connect a wallet, change one base_url, and call every frontier model. Free tier: 1M tokens per month.',
      button: 'Enter Product',
    },
  },

  solutions: {
    hero: {
      title: 'Verifiable judgment, called as an API',
      copyBefore:
        'DeAgentAI wraps its proprietary models beneath the De(cision)Agent framework and exposes them as a standard API: input context, get structured judgment with verifiable confidence and rationale. Judgment is ',
      copyStrong1: 'identity-bound',
      copySep1: ', ',
      copyStrong2: 'state-logged',
      copySep2: ', and ',
      copyStrong3: 'consensus-checked',
      copyAfter:
        ' inside the framework - you call not a raw inference, but a traceable, reproducible judgment unit.',
      ctaContact: 'Contact to Integrate',
      ctaLearn: 'Learn More',
    },
    how: {
      title: 'One call, three guarantees',
      intro:
        'The invocation pipeline is encapsulated into three layers: Model → Agent → Settlement. Each layer provides verifiable guarantees, compounding into a single trustworthy call—what you are integrating is not a bare model API, but a verifiable judgment unit.',
      guarantees: [
        {
          step: '01 · MODEL',
          title: 'Self-Developed Model',
          copy:
            'Proprietary models trained via feedback loops output structured judgment and confidence. Reproducible for identical input, not black-box probabilistic output.',
        },
        {
          step: '02 · AGENT',
          title: 'Framework Packaging',
          copy:
            'The De(cision)Agent framework binds identity, records state, and applies consensus checks, wrapping judgment into a stateful instance.',
        },
        {
          step: '03 · SETTLEMENT',
          title: 'Economic Settlement',
          copy:
            'Judgment output wires straight to economic-layer settlement, metered and verifiable on-chain. No gap between judgment and value.',
        },
      ],
    },
    capabilities: {
      title: 'API Capabilities',
      items: [
        {
          title: 'Structured Judgment',
          copy:
            'Output is structured judgment plus confidence plus rationale. Under consensus, continuously calibrated by feedback, reproducible for identical input, not random drift.',
        },
        {
          title: 'Stateful Agent Instance',
          copy:
            'Each call binds a unique identity and on-chain memory, giving judgment state and continuity. Autonomous within scope, fully traceable.',
        },
        {
          title: 'Economic Settlement API',
          copy:
            'Judgment connects directly to economic-layer settlement, yielding metered, verifiable on-chain results. No gap between judgment and value.',
        },
      ],
    },
    useCases: {
      title: 'Use Cases',
      intro: 'Any system needing verifiable judgment plus settleable on-chain results can reuse this API.',
      items: [
        {
          number: '01',
          title: 'Prediction & Signals',
          copy:
            'Match, market, and event prediction: get structured judgment in one call, decoupling judgment from product.',
        },
        {
          number: '02',
          title: 'Strategy & Execution Agent',
          copy:
            'Execute strategy autonomously from judgment, auditable on-chain and settleable at the economic layer.',
        },
        {
          number: '03',
          title: 'On-chain Governance',
          copy:
            'A neutral, traceable judgment source for DAOs and protocols, powering proposal analysis and automated execution.',
        },
        {
          number: '04',
          title: 'Vertical Decision Systems',
          copy:
            'Inject domain context, get settleable judgment output, and integrate quickly with existing systems.',
        },
      ],
    },
    integration: {
      title: 'Integration Spec',
      intro:
        'OpenAI-compatible calling, standard auth, integration in minutes. Protocol, auth, and settlement details ship with the docs.',
      points: [
        {
          strong: 'Standard API',
          text: ' - OpenAI-compatible; change one base_url to connect',
        },
        {
          strong: 'Composable',
          text: ' - call judgment / agent / settlement layers on demand, at your own granularity',
        },
        {
          strong: 'Dedicated support',
          text: ' - integration design and technical onboarding',
        },
      ],
      codeAria: 'API request example',
      codeFilename: 'example.request',
      codeComments: [
        '# Call DeAgentAI proprietary model capability',
        '# Get autonomous Agent judgment',
        '# Judgment connects directly to settlement',
      ],
    },
    credentials: {
      title: 'Get Access Credentials',
      copy: "Describe your system and use case; we'll provide the matching integration spec and support.",
      inputLabel: 'Your email or Telegram',
      inputPlaceholder: 'Your email / Telegram',
      submit: 'Contact Us',
    },
  },

  caseStudies: {
    hero: {
      title: 'Case Studies',
      intro:
        "DeAgentAI's capabilities serve more than itself - they empower ecosystem partners. Below is a real case: how a partner ran the full model-to-agent-to-settlement loop on DeAgentAI.",
      feature: {
        title: 'When a partner builds on DeAgentAI, both grow new capabilities',
        copy:
          "During the World Cup, AliceAI plugged into DeAgentAI's proprietary model judgment through a set of APIs and shipped a match-prediction agent. Zero model of its own, settled directly at the economic layer.",
        meta: [
          { label: 'PARTNER', value: 'AliceAI' },
          { label: 'DEPLOYMENT', value: 'World Cup match prediction' },
          { label: 'STACK', value: 'DeAgentAI proprietary model · De(cision)Agent' },
        ],
      },
    },
    problem: {
      title: 'Problem & Solution',
      constraints: {
        label: 'CONSTRAINTS',
        title: "AliceAI's constraints",
        items: [
          'Building a reliable prediction model: costly, slow',
          'Raw models give one-shot inference - no identity or state',
          "Judgment stops at display, can't reach settlement",
        ],
      },
      interface: {
        label: 'INTERFACE',
        title: "DeAgentAI's interface",
        items: [
          'Direct API to proprietary models for structured match judgment',
          'De(cision)Agent wraps it into an identity-bound, stateful agent',
          'Judgment wires to economic-layer settlement, verifiable on-chain',
        ],
      },
    },
    path: {
      title: 'Technical Path',
      intro: 'AliceAI calls not a raw model but a wrapped judge-decide-settle path.',
      steps: [
        { title: 'Proprietary Model', copy: 'DeAgentAI model outputs judgment' },
        { title: 'Agent Wrapping', copy: 'De(cision)Agent autonomous agent' },
        { title: 'Economic Settlement', copy: 'Value metered verifiable on-chain' },
      ],
      noteBefore:
        'The same path can be reused by any system needing verifiable judgment plus settleable results. ',
      noteStrong: 'AliceAI is its first external validation.',
    },
    results: {
      title: 'Results',
      intro:
        'Figures below subject to real logs - verify before publishing; leave unconfirmed items blank rather than estimate.',
      items: [
        { number: '2,000+', label: 'Match prediction signals', sublabel: 'During World Cup' },
        { number: 'XXk', label: 'Cumulative model calls', sublabel: 'To verify' },
        { number: '30k+', label: 'Daily community buzz', sublabel: 'Via AliceAI' },
      ],
    },
    product: {
      title: 'In Product',
      brandBadge: 'ALICEAI',
      screens: [
        { badge: 'SCREEN 01', title: 'Prediction list', subtitle: 'Placeholder · TBD' },
        { badge: 'SCREEN 02', title: 'Match detail', subtitle: 'Placeholder · TBD' },
        { badge: 'SCREEN 03', title: 'Judgment & settlement', subtitle: 'Placeholder · TBD' },
      ],
    },
    video: {
      title: 'Collaboration Video',
      playAria: 'Play collaboration video preview',
      heading: 'Collaboration Video · Placeholder',
      caption: 'DeAgentAI × AliceAI joint interview / case film (16:9)',
    },
  },

  community: {
    hero: {
      titleBefore: 'Join the DeAgentAI ',
      titleAccent: 'Community',
      copy:
        'A community of developers, users, and builders driving the adoption of decentralized AI agents - online and on the ground.',
      social: ['X', 'Discord', 'Telegram', 'RootData'],
    },
    traction: {
      title: 'Real community traction',
      disclaimer: 'Figures subject to real stats - verify before publishing.',
      stats: [
        {
          valueSuffix: 'k+',
          value: 30,
          title: 'Daily discussions',
          footnote: 'Online · via AliceAI',
        },
        {
          value: "Hong Kong · Shenzhen · Xi'an",
          title: 'Offline event cities',
          footnote: 'W3Labs × Jisit Future',
        },
        {
          value: 'Multiple',
          title: 'AI-themed offline events',
          footnote: 'Reaching developers & youth',
        },
      ],
    },
    snapshots: {
      title: 'Community Snapshots',
      filterAll: 'All years · All regions',
      sourcePhotosSuffix: ' source photos',
      yearAria: 'Snapshot year',
      cityAria: 'Snapshot city',
      years: ['2024', '2025', '2026'],
      cities: ['Shenzhen AI Meetup', 'Hong Kong', "Xi'an"],
      photoAltTemplate: '{city} DeAgentAI community event',
    },
    conversation: {
      title: 'Join the global conversation',
      copy:
        'The DeAgentAI community spans the globe. Talk with builders, developers, and users in real time.',
      channels: [
        { code: 'TG', title: 'Telegram', language: 'Community' },
        { code: 'chat', title: 'Discord', language: 'Developers' },
      ],
    },
    ambassador: {
      title: 'Ambassador Program',
      imageAlt: 'DeAgentAI ambassador visual',
      copy:
        'Become a catalyst for the DeAgentAI ecosystem. Join a community of advocates driving decentralized AI adoption - playing a key role in awareness, education, and outreach.',
      cta: 'Coming Soon',
    },
    blogs: {
      title: 'Latest from DeAgentAI',
      posts: [
        { date: 'JUL 2026', title: 'Article title placeholder · replace with real post' },
        { date: 'JUL 2026', title: 'Article title placeholder · replace with real post' },
        { date: 'JUN 2026', title: 'Article title placeholder · replace with real post' },
        { date: 'JUN 2026', title: 'Article title placeholder · replace with real post' },
      ],
    },
  },

  buyback: {
    hero: {
      title: 'AIA Buyback & Burn Tracker',
      copy: 'Transparent buybacks, verifiable burns, and sustainable token economics in real time.',
      metricsAria: 'Buyback summary',
      metrics: [
        { label: 'Total spent', value: '$5,000,127' },
        { label: 'Total AIA acquired', value: '47.62M' },
        { label: 'Avg. buyback price', value: '$0.1050' },
        { label: 'Supply removed', value: '4.76%', note: 'Of initial supply' },
        { label: 'Total burned', value: '11M', accent: true },
      ],
    },
    burnProgress: {
      title: 'Burn progress',
      live: 'Live',
      stats: [
        { label: 'of acquired AIA burned', value: '23.1%' },
        { label: 'AIA burned', value: '11M' },
        { label: 'AIA pending burn', value: '36.62M' },
      ],
      trackAria: '23.1 percent of acquired AIA burned',
      progressLabels: ['11M', '47.62M'],
      noteStrong: 'Buybacks are executed off-chain via centralized exchanges.',
      note:
        'A portion is burned every 3 months on-chain - see the Burn History below for transaction hashes, updated after each quarterly burn event.',
    },
    burnHistory: {
      title: 'Burn history',
      columns: ['Date', 'AIA burned', 'Status', 'Burn hash'],
      statusConfirmed: 'Confirmed',
      rows: [
        {
          date: 'Jul 22, 2026',
          amount: '10.00M',
          hashPreview: '8G2MPM3s...Z1Nycr',
        },
        {
          date: 'Apr 13, 2026',
          amount: '1.00M',
          hashPreview: 'HBmTxfJy...NPyFpf',
        },
      ],
    },
    mechanism: {
      title: 'How the buyback mechanism works',
      steps: [
        {
          title: 'Revenue collection',
          copy: 'Protocol fees, AI trading profits, and business revenue fund buybacks',
        },
        {
          title: 'Allocation to pool',
          copy: 'Majority of revenue flows to dedicated buyback fund automatically',
        },
        {
          title: 'Market acquisition',
          copy: 'Market acquisitions executed with full transparency and multi-sig security',
        },
        {
          title: 'Permanent burn',
          copy:
            'Repurchased AIA is held in disclosed custody and burned according to the published burn schedule',
        },
      ],
    },
    priceTrend: {
      title: 'AIA price trend',
      periodAria: 'Chart period',
      periods: ['7D', '30D', '90D', 'ALL'],
      yAxis: ['$0.0800', '$0.0600', '$0.0400', '$0.0200', '$0.0000'],
      xAxis: ['May 15', 'Jun 6', 'Jun 29', 'Jul 21', 'Aug 12'],
      legendPrice: 'AIA price',
      legendBurn: 'Burn event',
      currentPrice: '$0.0741',
    },
    value: {
      title: 'Why AIA matters',
      intro: 'Utility-driven demand meets deflationary supply mechanics.',
      cards: [
        {
          title: 'Revenue Pool',
          lineOne: 'funds from agents & enterprises',
          lineTwo: 'Payments in USDC, stablecoins, & fiat',
        },
        {
          title: 'Buyback Engine',
          lineOne: 'Programmatic market acquisitions',
          lineTwo: 'Correlated with agent network growth',
        },
        {
          title: 'Staking Layer',
          lineOne: 'Voluntary supply lock-up',
          lineTwo: 'Independent scarcity mechanism',
        },
        {
          title: 'Deflationary Design',
          lineOne: 'Scheduled burns permanently reduce supply',
          lineTwo: '',
        },
      ],
    },
    flywheel: {
      title: 'The deflationary flywheel',
      center: { token: 'AIA', label: 'Flywheel' },
      steps: [
        {
          number: '01',
          title: 'Agent Deployment',
          copy: 'More autonomous agents come online',
        },
        {
          number: '02',
          title: 'AIA Consumption',
          copy: 'Every agent needs AIA for operations',
        },
        {
          number: '03',
          title: 'Revenue → Burn',
          copy: 'Fees automatically fund buyback & burn',
        },
        {
          number: '04',
          title: 'Permanent Removal',
          copy: 'Tokens gone forever from supply',
        },
      ],
    },
    outcome: {
      eyebrow: 'The outcome',
      title: 'AIA holders benefit alongside autonomous agent proliferation.',
      copy:
        'As more agents deploy, protocol activity rises. Revenue funds programmatic buybacks, while scheduled burns permanently reduce available supply.',
      strong: 'Sustainable growth. Aligned value. Structural supply mechanics.',
    },
  },

  common: {
    brand: 'DeAgentAI',
    launchApp: 'Connect Wallet',
    comingSoon: 'Coming Soon',
    live: 'Live',
    languageShort: 'EN',
    readWhitePaper: 'Read White Paper',
    placeholderTbd: 'Placeholder · TBD',
  },
} as const
