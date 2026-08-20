/** 英文基准文案字典 */
export const en = {
  nav: {
    aria: {
      home: "DeAgentAI home",
      primary: "Primary navigation",
      toggle: "Toggle navigation",
      logoAlt: "DeAgentAI",
    },
    languageShort: "EN",
    cta: "Connect Wallet",
    wrongNetwork: "Wrong network",
    getAiaModal: {
      title: "GET $AIA",
      closeAria: "Close",
      backAria: "Back",
      cexTitle: "Swap via CEX",
      cexDescription: "Trade on a centralised exchange",
      pairLabel: "AIA / USDT",
    },
    items: [
      { id: "HOME", label: "HOME", href: "/" },
      { id: "PRODUCT", label: "PRODUCT", href: "/#product" },
      { id: "ECOSYSTEM", label: "ECOSYSTEM", href: "/#ecosystem" },
      { id: "$AIA", label: "$AIA", href: "/#partners" },
      { id: "LEARN", label: "LEARN", href: "/#learn" },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: "AGENTS",
            items: [
              {
                title: "AI Agents",
                description: "Deploy always-on agents",
                href: "/agents",
              },
              {
                title: "CorrAI",
                description: "Autonomous strategy agent",
                href: "https://corr.ai/en",
                external: true,
              },
              {
                title: "AlphaX",
                description: "Autonomous trading agent",
                href: "/alphax",
              },
            ],
          },
          {
            title: "INFRASTRUCTURE",
            items: [
              {
                title: "AI Token Hub",
                description: "One API, all models",
                href: "/token-hub",
              },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: "BUILD ON US",
            items: [
              {
                title: "Solutions",
                description: "Model capability as an API",
                href: "/solutions",
              },
              {
                title: "Integrations",
                description: "AliceAI & partners",
                href: "/integrations",
              },
            ],
          },
        ],
      },
      $AIA: {
        columns: [
          {
            title: "$AIA",
            items: [
              { title: "Get AIA", href: "#get-aia" },
              { title: "Buyback Dashboard", href: "/buyback" },
              {
                title: "Tokenomics",
                href: "https://deagentai.gitbook.io/deagentai",
                external: true,
              },
            ],
          },
        ],
      },
      LEARN: {
        columns: [
          {
            title: "LEARN",
            items: [
              {
                title: "Community",
                description: "Events & meetups",
                href: "/community",
              },
              {
                title: "Whitepaper",
                description: "Read the paper",
                href: "https://deagentai.gitbook.io/deagentai",
                external: true,
              },
              {
                title: "MiCA Whitepaper",
                description: "Compliance",
                href: "https://deagent.ai/micar-whitepaper.pdf",
                external: true,
              },
              {
                title: "Resources",
                description: "Docs & more",
                href: "https://medium.com/@deagent.ai",
                external: true,
              },
            ],
          },
        ],
      },
    },
  },

  footer: {
    logoAlt: "DeAgentAI",
    tagline:
      "Trusted AI agent infrastructure for the on-chain world — identity, continuity, and consensus for autonomous intelligence.",
    products: {
      title: "Products",
      links: [
        { label: "AI Agents", badge: "NEW", href: "/agents" },
        { label: "AlphaX", href: "/alphax" },
        { label: "CorrAI", href: "https://corr.ai/en" },
        { label: "AI Token Hub", href: "/token-hub" },
      ],
    },
    community: {
      title: "Community",
      social: [
        {
          label: "Discord",
          href: "https://discord.com/invite/officialdeagentai",
        },
        { label: "Telegram", href: "https://t.me/officialdeagentai" },
        { label: "X", href: "https://x.com/DeAgentAI" },
      ],
    },
    copyright: "Copyright © 2026 DeAgentAI network. All right reserved.",
  },

  home: {
    hero: {
      titleLine1: "Verifiable Intelligence",
      titleLine2: "for Every Agent",
      ctaExplore: "Explore Products",
      ctaLearn: "Learn the Tech",
    },
    trust: {
      eyebrow: "THE TRUST LAYER",
      title: "The trusted foundation for agent collaboration",
      diagramAlt: "DeAgentAI trust infrastructure diagram",
      orbitAria: "Continuity, consensus, and identity",
      labels: {
        continuity: "Continuity",
        consensus: "Consensus",
        identity: "Identity",
      },
      cards: [
        {
          title: "De(cision)Agent",
          description:
            "Identity, continuity, consensus — the foundation for trusted agents.",
        },
        {
          title: "Self-developed model",
          description:
            "Feedback-trained proprietary models make agent judgments reproducible and calibratable.",
        },
        {
          title: "A2A / MCP",
          description:
            "Compatible with industry standards for cross-framework collaboration and tool access.",
        },
        {
          title: "MPC",
          description:
            "MPC enables trustless execution, settling collaboration securely on-chain.",
        },
      ],
    },
    product: {
      eyebrow: "PRODUCT",
      title: "Intelligence that stays present",
      screenerAlt: "On-chain asset screener",
      heading: "Daily Market Screener Tailored to Your Criteria",
      capabilities: [
        {
          title: "One-tap deploy",
          copy: "Select, configure, deploy. Hosting and persistence are handled by the protocol — you touch no infrastructure.",
        },
        {
          title: "Invisible keys",
          copy: "Keys are injected by identity, hidden beneath the protocol, with per-account circuit breaking that never cascades.",
        },
        {
          title: "Every inference metered",
          copy: "Every inference is logged per call, consumption wired straight to settlement. Transparent, auditable, never silent.",
        },
      ],
    },
    ecosystem: {
      eyebrow: "ECOSYSTEM & TECHNOLOGY",
      title: "Turning judgment into settleable value",
      technologySteps: [
        {
          title: "Self-Developed Model",
          lines: ["Feedback-driven training", "Reliable judgment output"],
        },
        {
          title: "Agent Packaging",
          lines: ["De(cision)Agent Framework", "Autonomous decision-making"],
        },
        {
          title: "Economic Settlement",
          lines: ["Value metered", "Verifiable on-chain"],
        },
      ],
      scenarios: [
        {
          title: "CorrAI — Autonomous Strategy Agent",
          copy: "CorrAI runs inside the De(cision)Agent framework under consensus, identity, and continuity. It calls DeAgentAI's proprietary models to generate strategy judgments, crystallized into an autonomous, continuously running strategy agent — giving on-chain judgment verifiable strategic continuity for the first time.",
        },
        {
          title: "AliceAI — Match Prediction Agent",
          copy: "AliceAI's match prediction runs directly on DeAgentAI's proprietary models: the model outputs match judgment, which AliceAI crystallizes into an agent that decides autonomously and settles at the economic layer. It shares the same underlying stack as CorrAI — one intelligence, flowing into different scenarios.",
        },
      ],
      agentCards: {
        aria: "DeAgentAI agent examples",
        items: [
          {
            chip: "Strategy · Verified",
            name: "CorrAI",
            role: "Autonomous Strategy Agent",
            logoAlt: "CorrAI",
          },
          {
            chip: "Sports · Reuse",
            name: "AliceAI",
            role: "Match Prediction Agent",
            logoAlt: "AliceAI",
          },
        ],
      },
      compounding: {
        title: "Capability that compounds itself",
        copyBefore:
          "Identity, continuity, consensus, proprietary models, agent wrapping, economic settlement — no layer stands alone; each is reused and stacked on the last. ",
        copyStrong:
          "Every new layer re-expands what the whole stack can do; every reuse brings the next agent closer to zero cost.",
        copyAfter:
          " This isn't a wall — it's a self-compounding system. The longer it runs, the wider the gap.",
      },
    },
    voices: {
      eyebrow: "IN THEIR WORDS",
      title: "Voices from the team and ecosystem",
      gridAria: "Team and ecosystem videos",
    },
    partners: {
      eyebrow: "PARTNERSHIP & FUNDING",
      title: "Building with leading ecosystem partners",
    },
    launch: {
      title: "Connect a wallet, deploy your first agent",
      copy: "No keys to manage — just connect and start. Built on trusted intelligence infrastructure.",
      ctaLaunch: "Connect Wallet",
      ctaWhitepaper: "Read White Paper",
    },
  },

  agents: {
    hero: {
      beta: "IN BETA · CONNECT WALLET TO START",
      title: "AI Agents",
      description:
        "Deploy in one click - no API key of your own required. Every inference is settled through AI Token Hub, paid in $AIA or $USDT. First agent: Sentry, watching the entire Hyperliquid market 24/7.",
      kpis: [
        {
          label: "MARKETS COVERED",
          value: 308,
          footnote: "Crypto 198 · Tradfi 110",
        },
        {
          label: "TIME TO DEPLOY",
          value: 60,
          unit: "s",
          footnote: "Wallet only · no email · no credit card",
        },
        {
          value: 5,
          footnote: "Hyperliquid dexes",
        },
        {
          value: 24,
          unitSuffix: "/7",
          footnote: "Always running",
        },
        {
          valueLabel: "$AIA / $USDT",
          footnote: "Settlement",
        },
      ],
    },
    sentry: {
      eyebrow: "CORE CAPABILITY",
      title: "Sentry scans. You decide.",
      intro:
        "You set the criteria; Sentry only executes and states facts. Below is live data from the Hyperliquid market - adjust any condition and matches recompute instantly.",
      filters: {
        title: "Filters",
        live: "Live",
        presetTitle: "PRESET STRATEGIES",
        fineTuneTitle: "FINE-TUNE THRESHOLDS",
        ranges: [
          {
            label: "Min 24h volume",
            value: "$3M",
            aria: "Minimum daily volume",
          },
          {
            label: "Funding APR, absolute",
            value: "≥ 1.5%",
            aria: "Funding annual rate",
          },
          {
            label: "Min 24h move",
            value: "0%",
            aria: "Minimum move",
          },
        ],
        outlierGuard: {
          title: "Outlier guard",
          description: "Skip extreme dislocations that may not settle cleanly.",
        },
      },
      strategies: [
        {
          title: "Funding Arbitrage",
          description: "Funding far from baseline, both ways",
          count: "47",
        },
        {
          title: "Low Turnover",
          description: "OI far above volume, low turnover",
          count: "52",
        },
        {
          title: "Volume Surge",
          description: "Volume and price expanding together",
          count: "8",
        },
        {
          title: "Premium Dislocation",
          description: "Mark price away from oracle",
          count: "78",
        },
      ],
      matches: {
        title: "Matches today",
        tabs: ["All", "Crypto", "Tradfi"],
        summary: {
          count: "47",
          text: "markets matched - Funding Arbitrage",
          outlierNoteBefore: "Outlier guard removed ",
          outlierCount: "2",
          outlierNoteAfter: " with extreme funding or thin liquidity",
        },
        columns: [
          "Market",
          "Funding APR",
          "24h change",
          "Volume",
          "Open interest",
          "Premium",
        ],
        categoryLabels: {
          Crypto: "Crypto",
          Tradfi: "Tradfi",
        },
        status: {
          empty: "No markets match the current filters",
          stale: "Snapshot is more than 5 minutes old",
          partial: "Partial snapshot",
          truncated: "Showing top results",
          loading: "Loading live markets…",
          unavailable: "Market data is temporarily unavailable",
        },
      },
    },
    dailyPush: {
      badge: "Coming soon",
      title: "Daily push",
      copy: "Matches are delivered at a fixed time each day - no need to open the platform. When the market offers nothing, we still send: no manufactured signals, no silence.",
      features: [
        {
          title: "Delivered on schedule",
          description: "Push time is configurable",
        },
        { title: "Sent even when empty", description: "No silence days" },
        {
          title: "Uses long-term memory",
          description: "Ranked by your preferences",
        },
        { title: "Ask follow-ups", description: "Go deeper in any market" },
      ],
      channels: "Telegram · In-app",
      bot: {
        name: "Sentry BOT",
        time: "Today 09:00",
        message:
          "47 markets matched your Funding Arbitrage criteria today. Top three by strength:",
        assets: [
          {
            symbol: "XMR",
            category: "Crypto",
            note: "Longs collect",
            change: "+20.93%",
          },
          {
            symbol: "CASHCAT",
            category: "Crypto",
            note: "Shorts collect",
            change: "+42.72%",
          },
          {
            symbol: "KAITO",
            category: "Crypto",
            note: "Shorts collect",
            change: "-295.73%",
          },
        ],
        memory: {
          title: "Long-term memory",
          copy: "You asked about XMR's funding structure last time - it is back on the list today.",
        },
      },
    },
    comparison: {
      eyebrow: "KEY DIFFERENCE",
      title: "No API key required",
      intro:
        "Open-source agent frameworks are capable, but each one asks you to register on a model platform, add a card, retrieve a key, then paste it into a config file. For wallet-native users, every step of that path is a drop-off point.",
      openSource: {
        title: "Deploying an open-source agent yourself",
        steps: [
          "Register on a model platform, verify email",
          "Add a credit card, pass identity checks",
          "Create and copy an API key",
          "Find the config file, enter key and model name",
          "Provide a server, handle supervision and restarts",
          "Key-leak risk is entirely yours",
        ],
        footerBefore: "Roughly ",
        footerStrong: "30-90 minutes",
        footerAfter: ", plus a working credit card",
      },
      deagentai: {
        title: "Deploying on DeAgentAI",
        steps: [
          "Connect wallet, sign in",
          "Top up credits with $AIA or $USDT",
          "Pick an agent, set your criteria",
          "Click deploy, daily runs begin",
        ],
        footer: "About 60 seconds. No email, no credit card.",
      },
    },
    credit: {
      eyebrow: "CREDIT MECHANICS",
      title: "Zero balance, still not silent",
      intro:
        "An always-on agent going quiet is the worst experience there is - users assume the product broke. Because screening is pure computation and consumes no tokens, the daily push still arrives at zero balance; it simply comes without the written explanation.",
      levels: [
        {
          status: "NORMAL",
          copy: "Default mode, full push and follow-ups. Screening runs as usual.",
        },
        {
          status: "LOW",
          copy: "Switches to a lower-cost model. Same content, plus a top-up prompt.",
        },
        {
          status: "CRITICAL",
          copy: "Push only. Follow-up chat off to stretch remaining credit.",
        },
        {
          status: "EMPTY",
          copy: "Explanations stop, raw data still ships - screening costs no tokens.",
        },
      ],
    },
    memory: {
      eyebrow: "LONG-TERM MEMORY",
      title: "Who you are, not what you hold",
      intro:
        "The agent uses memory to constrain its behavior, not to guess what you want to buy. Every amount and position is queried live and never read from memory - semantic recall is fuzzy matching, and in trading a single wrong digit is a real loss.",
      remembered: {
        title: "Remembered",
        badge: "PREFERENCES & JUDGMENT",
        copy: "Subjective, fuzzy, time-spanning judgments - precisely what a model is good at carrying.",
        items: [
          { before: "Crypto only, ", strong: "skip equities", after: "" },
          {
            before: "Prefers negative funding, ",
            strong: "avoids high leverage",
            after: "",
          },
          {
            before: "Get caught chasing a similar setup, ",
            strong: "said to wait for a pullback",
            after: "",
          },
          {
            before: "Explicitly excludes ",
            strong: "markets listed under seven days",
            after: "",
          },
          {
            before: "Reads the push during ",
            strong: "Asian hours",
            after: "",
          },
        ],
      },
      neverStored: {
        title: "Never stored",
        badge: "AMOUNTS & POSITIONS",
        copy: "Always queried live and re-fetched each time. No caching, no inference.",
        items: [
          "Position cost basis",
          "Current size and direction",
          "Wallet balance",
          "Unrealized PnL",
          "Historical fill prices",
        ],
      },
    },
    deploy: {
      eyebrow: "HOW TO DEPLOY",
      title: "Three steps, sixty seconds",
      steps: [
        {
          title: "Connect your wallet",
          text: "Signing is logging in. No email, no password. Identity is carried by an internal UID, so multiple wallets can later share credits and memory.",
        },
        {
          title: "Pick an agent and set criteria",
          text: "Four preset strategies work out of the box, with adjustable thresholds. Criteria are constraints: the agent can only work within the bounds you draw.",
        },
        {
          title: "Click deploy",
          text: "The agent begins running on a daily schedule, with results pushed in-app or to Telegram. Usage and balance are auditable call by call in the console.",
        },
      ],
      codeSample: {
        filename: "agent.py",
        commentRuntime:
          "# Agent runtime: Agno AgentOS, model routed via AI Token Hub",
        agentName: "Hyperliquid Screener",
        instruction: "You are a market screener, not an advisor.",
        commentScreening:
          "# Screening is pure computation, zero token cost",
      },
    },
    waitlist: {
      eyebrow: "EARLY ACCESS",
      title: "First to know",
      copy: "Waitlist members get priority access and 1M starting token credits.",
      emailAria: "Your email",
      emailPlaceholder: "Your email",
      submit: "Join the waitlist",
      submitting: "Joining…",
      success: "You are on the list",
      alreadyJoined: "Already on the list",
      invalid: "Please enter a valid email",
      rateLimited: "Too many attempts. Please wait and try again.",
      unavailable: "Waitlist is temporarily unavailable",
      error: "Could not join right now. Please try again.",
    },
  },

  alphax: {
    hero: {
      title: "AlphaX - ",
      titleAccent: "Fully Autonomous Trading Agent",
      copyBefore:
        "AlphaX is the first proprietary AI model incubated through DeAgentAI's feedback-driven training, running inside the ",
      copyStrong1: "De(cision)Agent framework",
      copyMid:
        " under consensus, identity, and continuity. It generates prediction signals from proprietary models and acts as a ",
      copyStrong2: "fully autonomous trading agent",
      copyAfter:
        " — evolving from a decision-support tool into an independently running trading intelligence.",
      tagsAria: "AlphaX product attributes",
      tags: [
        "Feedback training",
        "Autonomous",
        "De(cision)Agent framework",
        "On-chain auditable",
      ],
    },
    does: {
      title: "What AlphaX does",
      intro:
        "AlphaX combines proprietary model intelligence with autonomous execution and verifiable outcomes.",
      capabilities: [
        {
          title: "Proprietary Model Signals",
          copy: "Generating predictive signals via a proprietary model based on feedback training, continuously calibrated through user feedback to maintain reliability and adaptability in dynamic markets.",
        },
        {
          title: "Fully Autonomous Trading",
          copy: "Beyond decision support — AlphaX monitors markets, adjusts strategy live, and executes independently at the speed and precision crypto demands.",
        },
        {
          title: "On-chain auditable track record",
          copy: "As an agent on the De(cision)Agent framework, its decisions follow identity and continuity principles, with results auditable and verifiable on-chain.",
        },
      ],
    },
    gallery: {
      title: "Product Gallery",
      placeholder: "Placeholder · TBD",
      items: [
        { screen: "SCREEN 01", title: "Signal Dashboard" },
        { screen: "SCREEN 02", title: "Autonomous Execution" },
        { screen: "SCREEN 03", title: "Record & Positions" },
        { screen: "SCREEN 04", title: "Feedback Training" },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: "AI TOKEN HUB",
      copyBefore: "One endpoint for every frontier model. Pay per token, settle in ",
      copyStrongAia: "$AIA",
      copyMiddle: " or ",
      copyStrongUsdt: "$USDT",
      copyAfter: ". Serving ",
      copyStrongClients: "8 enterprise clients",
      copyEnd: ", opening to individuals soon.",
      kpis: {
        totalRequests: {
          label: "TOTAL REQUESTS PROCESSED",
          value: "1,284,739,261",
          delta: "▲ 8.4%",
          deltaNote: "vs. last 24h",
        },
        tokensProcessed: {
          label: "TOKENS PROCESSED",
          value: "847.26",
          unit: "B",
          delta: "▲ 12.1%",
          deltaNote: "vs. last 24h",
        },
        mini: [
          { label: "MODELS ONLINE", value: "38" },
          { label: "ACTIVE API KEYS", value: "260+" },
          { label: "ENTERPRISE CLIENTS", value: "8" },
          { label: "30D UPTIME", value: "99.97%" },
        ],
      },
    },
    enterprise: {
      eyebrow: "Enterprise Track Record",
      title: "Enterprises first, individuals next.",
      copy: "Before opening to individuals, the gateway had already operated in enterprise production environments.",
      asideTitle: "Same gateway. Same SLA.",
      asideCopy:
        "Rate limits, failover and per-call metering all came from enterprise requirements. Individuals get the same thing - no downgraded tier.",
      facts: [
        { value: "8", label: "ENTERPRISE CLIENTS · LIVE" },
        { value: "99.97%", label: "30-DAY UPTIME", highlight: true },
      ],
    },
    usage: {
      eyebrow: "USAGE DATA",
      title: "Transparent usage, auditable per call.",
      copy: "Billed per token, usage aggregated hourly. Only token counts and latency are stored - never request or response content.",
      recentCalls: {
        title: "RECENT CALLS",
        updated: "UPDATED HOURLY",
        rows: [
          { time: "14:00", model: "claude-opus-5", tokens: "4,320 tok", latency: "842ms" },
          { time: "13:58", model: "gpt-5.2", tokens: "1,920 tok", latency: "312ms" },
          { time: "13:41", model: "gemini-3-pro", tokens: "7,110 tok", latency: "1,104ms" },
          { time: "13:22", model: "deepseek-v4", tokens: "2,640 tok", latency: "598ms" },
          { time: "13:09", model: "grok-4", tokens: "980 tok", latency: "176ms" },
          { time: "12:55", model: "qwen3-max", tokens: "5,760 tok", latency: "920ms" },
          { time: "12:31", model: "alphax-1", tokens: "3,120 tok", latency: "740ms" },
          { time: "12:14", model: "llama-4-405b", tokens: "6,480 tok", latency: "1,260ms" },
        ],
      },
      chart: {
        title: "TOKENS / HOUR · LAST 24H",
        peak: "PEAK 61.4M",
        axis: ["00:00", "08:00", "16:00", "NOW"],
      },
    },
    models: {
      eyebrow: "MODEL COVERAGE",
      title: "38 models behind a single API key.",
      copy: "Every major closed and open-weight model, wrapped in one OpenAI-compatible protocol. Switching models means changing a single string.",
      items: [
        { name: "Claude Opus 5", provider: "ANTHROPIC", price: "$15.00 / 1M out", volume: "34% OF HUB VOLUME", volumePercent: 85, logo: "A", logoColor: "#d97757" },
        { name: "GPT-5.2", provider: "OPENAI", price: "$12.00 / 1M out", volume: "26% OF HUB VOLUME", volumePercent: 65, logo: "O", logoColor: "#10a37f" },
        { name: "Gemini 3 Pro", provider: "GOOGLE", price: "$8.00 / 1M out", volume: "17% OF HUB VOLUME", volumePercent: 42, logo: "G", logoColor: "#4285f4" },
        { name: "DeepSeek V4", provider: "DEEPSEEK", price: "$1.10 / 1M out", volume: "12% OF HUB VOLUME", volumePercent: 30, logo: "D", logoColor: "#4d6bfe" },
        { name: "Grok 4", provider: "XAI", price: "$9.00 / 1M out", volume: "6% OF HUB VOLUME", volumePercent: 15, logo: "X", logoColor: "#ffffff", logoTextColor: "#1a1a1a" },
        { name: "Qwen 3 Max", provider: "ALIBABA", price: "$2.40 / 1M out", volume: "3% OF HUB VOLUME", volumePercent: 8, logo: "Q", logoColor: "#7c3aed" },
        { name: "Llama 4 405B", provider: "META · OSS", price: "$0.90 / 1M out", volume: "1.5% OF HUB VOLUME", volumePercent: 4, logo: "M", logoColor: "#0668e1" },
      ],
      more: {
        name: "+31 more models",
        provider: "MISTRAL · COHERE · KIMI · ...",
        price: "-",
        volume: "6.5% OF HUB VOLUME",
        volumePercent: 18,
        logo: "+",
        logoColor: "#6b6b73",
      },
    },
    integration: {
      eyebrow: "INTEGRATION",
      title: "Migrate in three lines of code.",
      codeFilename: "client.py",
      codeAria: "AI Token Hub integration sample",
      steps: [
        {
          title: "Connect wallet, mint a key",
          copy: "Mint a key by signing with your wallet; no email registration is required. Keys are bound to your address and can be rotated or revoked at any time.",
        },
        {
          title: "Point base_url to the hub",
          copy: "Fully compatible with the OpenAI SDK, requiring no changes to existing code. Supported in Python, TypeScript, Go, and cURL.",
        },
        {
          title: "Top up in $AIA or $USDT",
          copyBefore: "Top up with $AIA for a ",
          copyStrong: "15% discount",
          copyAfter: ". Balance and usage are visible in the console in real time, with spend alerts.",
        },
      ],
      codeLines: [
        { text: "# pip install openai", tone: "muted" },
        { text: "from openai import OpenAI", tone: "purple" },
        { text: "client = OpenAI(", tone: "yellow" },
        { text: '  base_url="https://hub.deagentai.io/v1",', tone: "cyan" },
        { text: '  api_key="dgt-••••••••••••••••",', tone: "cyan" },
        { text: ")", tone: "yellow" },
        { text: "resp = client.chat.completions.create(", tone: "yellow" },
        { text: '  model="claude-opus-5",', tone: "cyan" },
        { text: '  messages=[{"role": "user", "content": "gm"}],', tone: "cyan" },
        { text: ")", tone: "yellow" },
        { text: "# x-hub-tokens: 42  x-hub-cost: 0.0009 $AIA", tone: "muted" },
      ],
    },
    ecosystem: {
      eyebrow: "ECOSYSTEM ROLE",
      title: "Built for our own agents first.",
      copy: "AI Token Hub is not a new standalone product. It is the inference layer our own agents have run on from the start, opened to external developers after serving 840 million internal calls.",
      steps: [
        { number: "01", title: "Agents", copy: "Every inference from Sentry and every agent on the platform is routed through the Hub." },
        { number: "02", title: "Routing", copy: "Automatic routing and failover across 38 models, weighted by latency, cost, and availability." },
        { number: "03", title: "Metering", copy: "Metered per token. Request and response bodies are never persisted; only counts and latency are retained." },
        { number: "04", title: "Open Access", copy: "The same gateway and the same SLA, opened directly to third-party developers." },
      ],
      diagram: {
        callersLabel: "CALLERS",
        gatewayLabel: "UNIFIED GATEWAY",
        modelsLabel: "MODEL LAYER",
        hubTitle: "AI Token Hub",
        hubSubtitle: "OpenAI-compatible · direct, self-built",
        hubBullets: [
          "Unified auth and quota",
          "Routed by latency, cost, availability",
          "Metered per token, content never stored",
        ],
        hubStats: [
          { value: "38", label: "models online" },
          { value: "99.97%", label: "30-day uptime" },
        ],
        callers: [
          { title: "Enterprise clients", copy: "8 · live in production" },
          { title: "DeAgentAI agents", copy: "Sentry and every in-house agent" },
          { title: "Individual developers", copy: "Opening soon", badge: "NEW" },
        ],
        models: [
          "Claude Opus 5",
          "GPT-5.2",
          "Gemini 3 Pro",
          "DeepSeek V4",
          "Grok 4 · Qwen 3 Max",
          "+31 more models",
        ],
      },
    },
    waitlist: {
      title: "First to know",
      copy: "Waitlist members get priority access and 1M starting token credits.",
      emailAria: "Your email",
      emailPlaceholder: "Your email",
      submit: "Join the waitlist",
      submitting: "Joining…",
      success: "You are on the list",
      alreadyJoined: "Already on the list",
      invalid: "Please enter a valid email",
      rateLimited: "Too many attempts. Please wait and try again.",
      unavailable: "Waitlist is temporarily unavailable",
      error: "Could not join right now. Please try again.",
    },
  },

  solutions: {
    hero: {
      title: "Verifiable judgment, called as an API",
      copyBefore:
        "DeAgentAI wraps its proprietary models beneath the De(cision)Agent framework and exposes them as a standard API: input context, get structured judgment with verifiable confidence and rationale. Judgment is ",
      copyStrong1: "identity-bound",
      copySep1: ", ",
      copyStrong2: "state-logged",
      copySep2: ", and ",
      copyStrong3: "consensus-checked",
      copyAfter:
        " inside the framework - you call not a raw inference, but a traceable, reproducible judgment unit.",
      ctaContact: "Contact to Integrate",
      ctaLearn: "Learn More",
    },
    how: {
      title: "One call, three guarantees",
      intro:
        "The invocation pipeline is encapsulated into three layers: Model → Agent → Settlement. Each layer provides verifiable guarantees, compounding into a single trustworthy call—what you are integrating is not a bare model API, but a verifiable judgment unit.",
      guarantees: [
        {
          step: "01 · MODEL",
          title: "Self-Developed Model",
          copy: "Proprietary models trained via feedback loops output structured judgment and confidence. Reproducible for identical input, not black-box probabilistic output.",
        },
        {
          step: "02 · AGENT",
          title: "Framework Packaging",
          copy: "The De(cision)Agent framework binds identity, records state, and applies consensus checks, wrapping judgment into a stateful instance.",
        },
        {
          step: "03 · SETTLEMENT",
          title: "Economic Settlement",
          copy: "Judgment output wires straight to economic-layer settlement, metered and verifiable on-chain. No gap between judgment and value.",
        },
      ],
    },
    capabilities: {
      title: "API Capabilities",
      items: [
        {
          title: "Structured Judgment",
          copy: "Output is structured judgment plus confidence plus rationale. Under consensus, continuously calibrated by feedback, reproducible for identical input, not random drift.",
        },
        {
          title: "Stateful Agent Instance",
          copy: "Each call binds a unique identity and on-chain memory, giving judgment state and continuity. Autonomous within scope, fully traceable.",
        },
        {
          title: "Economic Settlement API",
          copy: "Judgment connects directly to economic-layer settlement, yielding metered, verifiable on-chain results. No gap between judgment and value.",
        },
      ],
    },
    useCases: {
      title: "Use Cases",
      intro:
        "Any system needing verifiable judgment plus settleable on-chain results can reuse this API.",
      items: [
        {
          number: "01",
          title: "Prediction & Signals",
          copy: "Match, market, and event prediction: get structured judgment in one call, decoupling judgment from product.",
        },
        {
          number: "02",
          title: "Strategy & Execution Agent",
          copy: "Execute strategy autonomously from judgment, auditable on-chain and settleable at the economic layer.",
        },
        {
          number: "03",
          title: "On-chain Governance",
          copy: "A neutral, traceable judgment source for DAOs and protocols, powering proposal analysis and automated execution.",
        },
        {
          number: "04",
          title: "Vertical Decision Systems",
          copy: "Inject domain context, get settleable judgment output, and integrate quickly with existing systems.",
        },
      ],
    },
    integration: {
      title: "Integration Spec",
      intro:
        "OpenAI-compatible calling, standard auth, integration in minutes. Protocol, auth, and settlement details ship with the docs.",
      points: [
        {
          strong: "Standard API",
          text: " - OpenAI-compatible; change one base_url to connect",
        },
        {
          strong: "Composable",
          text: " - call judgment / agent / settlement layers on demand, at your own granularity",
        },
        {
          strong: "Dedicated support",
          text: " - integration design and technical onboarding",
        },
      ],
      codeAria: "API request example",
      codeFilename: "example.request",
      codeComments: [
        "# Call DeAgentAI proprietary model capability",
        "# Get autonomous Agent judgment",
        "# Judgment connects directly to settlement",
      ],
    },
    credentials: {
      title: "Get Access Credentials",
      copy: "Describe your system and use case; we'll provide the matching integration spec and support.",
      inputLabel: "Your email or Telegram",
      inputPlaceholder: "Your email / Telegram",
      submit: "Contact Us",
    },
  },

  caseStudies: {
    hero: {
      title: "Integrations",
      intro: "Integrations",
      feature: {
        title: "When a partner builds on DeAgentAI, both grow new capabilities",
        copy: "During the World Cup, AliceAI plugged into DeAgentAI's proprietary model judgment through a set of APIs and shipped a match-prediction agent. Zero model of its own, settled directly at the economic layer.",
        meta: [
          { label: "PARTNER", value: "AliceAI" },
          { label: "DEPLOYMENT", value: "World Cup match prediction" },
          {
            label: "STACK",
            value: "DeAgentAI proprietary model · De(cision)Agent",
          },
        ],
      },
    },
    problem: {
      title: "Problem & Solution",
      constraints: {
        label: "CONSTRAINTS",
        title: "AliceAI's constraints",
        items: [
          "Building a reliable prediction model: costly, slow",
          "Raw models give one-shot inference - no identity or state",
          "Judgment stops at display, can't reach settlement",
        ],
      },
      interface: {
        label: "INTERFACE",
        title: "DeAgentAI's interface",
        items: [
          "Direct API to proprietary models for structured match judgment",
          "De(cision)Agent wraps it into an identity-bound, stateful agent",
          "Judgment wires to economic-layer settlement, verifiable on-chain",
        ],
      },
    },
    path: {
      title: "Technical Path",
      steps: [
        {
          title: "Proprietary Model",
          copy: "DeAgentAI model outputs judgment",
        },
        { title: "Agent Wrapping", copy: "De(cision)Agent autonomous agent" },
        {
          title: "Economic Settlement",
          copy: "Value metered verifiable on-chain",
        },
      ],
    },
    results: {
      title: "Results",
      intro:
        "Figures below subject to real logs - verify before publishing; leave unconfirmed items blank rather than estimate.",
      items: [
        {
          number: "2,000+",
          label: "Match prediction signals",
          sublabel: "During World Cup",
        },
        { number: "100K+", label: "Cumulative model calls", sublabel: "" },
        {
          number: "30k+",
          label: "Daily community buzz",
          sublabel: "Via AliceAI",
        },
      ],
    },
    product: {
      title: "In Product",
      brandBadge: "ALICEAI",
      screens: [
        {
          badge: "SCREEN 01",
          title: "Prediction list",
          subtitle: "Placeholder · TBD",
        },
        {
          badge: "SCREEN 02",
          title: "Match detail",
          subtitle: "Placeholder · TBD",
        },
        {
          badge: "SCREEN 03",
          title: "Judgment & settlement",
          subtitle: "Placeholder · TBD",
        },
      ],
    },
    video: {
      title: "Collaboration Video",
      playAria: "Play collaboration video",
      heading: "Collaboration Video",
      caption: "DeAgentAI × AliceAI joint interview / case film",
    },
  },

  community: {
    hero: {
      titleBefore: "Join the DeAgentAI ",
      titleAccent: "Community",
      copy: "A community of developers, users, and builders driving the adoption of decentralized AI agents - online and on the ground.",
      social: ["X", "Discord", "Telegram", "RootData"],
    },
    traction: {
      title: "Real community traction",
      stats: [
        {
          valueSuffix: "+",
          value: 10,
          title: "Countries",
          footnote: "",
        },
        {
          value: "W3Labs",
          title: "Offline community brand incubated by the DeAgentAI Ecosystem Fund",
          footnote: "",
        },
        {
          value: "Multiple",
          title: "AI-themed offline events",
          footnote: "Reaching developers & youth",
        },
      ],
    },
    snapshots: {
      title: "Community Snapshots",
      photoAlt: "DeAgentAI community event",
    },
    conversation: {
      title: "Join the global conversation",
      copy: "The DeAgentAI community spans the globe. Talk with builders, developers, and users in real time.",
      channels: [
        { code: "TG", title: "Telegram", language: "Community" },
        { code: "chat", title: "Discord", language: "Developers" },
      ],
    },
    ambassador: {
      title: "Ambassador Program",
      imageAlt: "DeAgentAI ambassador visual",
      copy: "Become a catalyst for the DeAgentAI ecosystem. Join a community of advocates driving decentralized AI adoption - playing a key role in awareness, education, and outreach.",
      cta: "Coming Soon",
    },
    blogs: {
      title: "Latest from DeAgentAI",
      posts: [
        {
          date: "APR 2026",
          title: "The model is powerful enough. What comes next?",
          href: "https://medium.com/@deagent.ai/the-model-is-powerful-enough-what-comes-next-f1e0909ae66d",
        },
        {
          date: "DEC 2025",
          title: "DeAgentAI ($AIA) Smart Contract Upgrade & Migration",
          href: "https://medium.com/@deagent.ai/deagentai-aia-smart-contract-upgrade-migration-7144055dbe26",
        },
        {
          date: "OCT 2025",
          title: "AI Oracles Are Broken. The Fix is Cryptographic, Not Reputational.",
          href: "https://medium.com/@deagent.ai/ai-oracles-are-broken-the-fix-is-cryptographic-not-reputational-e89c40db71b4",
        },
        {
          date: "SEP 2025",
          title: "$AIA Genesis Staking",
          href: "https://medium.com/@deagent.ai/aia-genesis-staking-81d03e1bf72d",
        },
      ],
    },
  },

  buyback: {
    hero: {
      title: "AIA Buyback & Burn Tracker",
      copy: "Transparent buybacks, verifiable burns, and sustainable token economics in real time.",
      metricsAria: "Buyback summary",
      metrics: [
        { label: "Total spent", value: "$5,000,127" },
        { label: "Total AIA acquired", value: "47.62M" },
        { label: "Avg. buyback price", value: "$0.1050" },
        { label: "Supply removed", value: "4.76%", note: "Of initial supply" },
        { label: "Total burned", value: "11M", accent: true },
      ],
    },
    burnProgress: {
      title: "Burn progress",
      live: "Live",
      stats: [
        { label: "of acquired AIA burned", value: "23.1%" },
        { label: "AIA burned", value: "11M" },
        { label: "AIA pending burn", value: "36.62M" },
      ],
      trackAria: "23.1 percent of acquired AIA burned",
      progressLabels: ["11M", "47.62M"],
      noteStrong: "Buybacks are executed off-chain via centralized exchanges.",
      note: "A portion is burned every 3 months on-chain - see the Burn History below for transaction hashes, updated after each quarterly burn event.",
    },
    burnHistory: {
      title: "Burn history",
      columns: ["Date", "AIA burned", "Status", "Burn hash"],
      statusConfirmed: "Confirmed",
      rows: [
        {
          date: "Jul 22, 2026",
          amount: "10.00M",
          hashPreview: "8G2MPM3s...Z1Nycr",
        },
        {
          date: "Apr 13, 2026",
          amount: "1.00M",
          hashPreview: "HBmTxfJy...NPyFpf",
        },
      ],
    },
    mechanism: {
      title: "How the buyback mechanism works",
      steps: [
        {
          title: "Revenue collection",
          copy: "Protocol fees, AI trading profits, and business revenue fund buybacks",
        },
        {
          title: "Allocation to pool",
          copy: "Majority of revenue flows to dedicated buyback fund automatically",
        },
        {
          title: "Market acquisition",
          copy: "Market acquisitions executed with full transparency and multi-sig security",
        },
        {
          title: "Permanent burn",
          copy: "Repurchased AIA is held in disclosed custody and burned according to the published burn schedule",
        },
      ],
    },
    priceTrend: {
      title: "AIA price trend",
      periodAria: "Chart period",
      periods: ["7D", "30D", "90D", "ALL"],
      yAxis: ["$0.0800", "$0.0600", "$0.0400", "$0.0200", "$0.0000"],
      xAxis: ["May 15", "Jun 6", "Jun 29", "Jul 21", "Aug 12"],
      legendPrice: "AIA price",
      legendBurn: "Burn event",
      currentPrice: "$0.0741",
    },
    value: {
      title: "Why AIA matters",
      intro: "Utility-driven demand meets deflationary supply mechanics.",
      cards: [
        {
          title: "Revenue Pool",
          lineOne: "funds from agents & enterprises",
          lineTwo: "Payments in USDC, stablecoins, & fiat",
        },
        {
          title: "Buyback Engine",
          lineOne: "Programmatic market acquisitions",
          lineTwo: "Correlated with agent network growth",
        },
        {
          title: "Staking Layer",
          lineOne: "Voluntary supply lock-up",
          lineTwo: "Independent scarcity mechanism",
        },
        {
          title: "Deflationary Design",
          lineOne: "Scheduled burns permanently reduce supply",
          lineTwo: "",
        },
      ],
    },
    flywheel: {
      title: "The deflationary flywheel",
      center: { token: "AIA", label: "Flywheel" },
      steps: [
        {
          number: "01",
          title: "Agent Deployment",
          copy: "More autonomous agents come online",
        },
        {
          number: "02",
          title: "AIA Consumption",
          copy: "Every agent needs AIA for operations",
        },
        {
          number: "03",
          title: "Revenue → Burn",
          copy: "Fees automatically fund buyback & burn",
        },
        {
          number: "04",
          title: "Permanent Removal",
          copy: "Tokens gone forever from supply",
        },
      ],
    },
    outcome: {
      eyebrow: "The outcome",
      title: "AIA holders benefit alongside autonomous agent proliferation.",
      copy: "As more agents deploy, protocol activity rises. Revenue funds programmatic buybacks, while scheduled burns permanently reduce available supply.",
      strong: "Sustainable growth. Aligned value. Structural supply mechanics.",
    },
  },

  common: {
    brand: "DeAgentAI",
    launchApp: "Connect Wallet",
    comingSoon: "Coming Soon",
    live: "Live",
    languageShort: "EN",
    readWhitePaper: "Read White Paper",
    placeholderTbd: "Placeholder · TBD",
  },
} as const;
