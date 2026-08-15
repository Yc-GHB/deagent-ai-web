/** 简体中文文案字典 */
import type { LocaleMessages } from './types'

export const zhCN: LocaleMessages = {
  nav: {
    aria: {
      home: 'DeAgentAI 首页',
      primary: '主导航',
      toggle: '切换导航',
      logoAlt: 'DeAgentAI',
    },
    languageShort: '简',
    cta: '连接钱包',
    wrongNetwork: '网络错误',
    getAiaModal: {
      title: 'GET $AIA',
      closeAria: '关闭',
      backAria: '返回',
      cexTitle: 'Swap via CEX',
      cexDescription: '在中心化交易所交易',
      pairLabel: 'AIA / USDT',
    },
    items: [
      { id: 'HOME', label: '首页', href: '/' },
      { id: 'PRODUCT', label: '产品', href: '/#product' },
      { id: 'ECOSYSTEM', label: '生态', href: '/#ecosystem' },
      { id: '$AIA', label: '$AIA', href: '/#partners' },
      { id: 'LEARN', label: '学习', href: '/#learn' },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: '智能体',
            items: [
              { title: 'AI Agents', description: '部署常驻运行的智能体', href: '/agents' },
              { title: 'CorrAI', description: '自主策略智能体', href: 'https://corr.ai/en', external: true },
              { title: 'AlphaX', description: '自主交易智能体', href: '/alphax' },
            ],
          },
          {
            title: '基础设施',
            items: [
              { title: 'AI Token Hub', description: '一个 API，全部模型', href: '/token-hub' },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: '基于我们构建',
            items: [
              { title: '解决方案', description: '模型能力即 API', href: '/solutions' },
              { title: '案例研究', description: 'AliceAI 与合作伙伴', href: '/case-studies' },
            ],
          },
        ],
      },
      '$AIA': {
        columns: [
          {
            title: '$AIA',
            items: [
              { title: '获取 AIA', href: '#get-aia' },
              { title: '回购看板', href: '/buyback' },
              { title: '代币经济', href: 'https://deagentai.gitbook.io/deagentai', external: true },
            ],
          },
        ],
      },
      LEARN: {
        columns: [
          {
            title: '学习',
            items: [
              { title: '社区', description: '活动与聚会', href: '/community' },
              {
                title: '白皮书',
                description: '阅读白皮书',
                href: 'https://deagentai.gitbook.io/deagentai',
                external: true,
              },
              { title: 'MiCA 白皮书', description: '合规', href: 'https://deagent.ai/micar-whitepaper.pdf', external: true },
              { title: '资源', description: '文档与更多', href: 'https://medium.com/@deagent.ai', external: true },
            ],
          },
        ],
      },
    },
  },

  footer: {
    logoAlt: 'DeAgentAI',
    tagline:
      '面向链上世界的可信 AI 智能体基础设施——为自主智能提供身份、连续性与共识。',
    products: {
      title: '产品',
      links: [
        { label: 'AI Agents', badge: 'NEW', href: '/agents' },
        { label: 'AlphaX', href: '/alphax' },
        { label: 'AliceAI', href: '/case-studies' },
        { label: 'AI Token Hub', href: '/token-hub' },
      ],
    },
    community: {
      title: '社区',
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
      titleLine1: '可验证智能',
      titleLine2: '赋能每一个智能体',
      ctaExplore: '探索产品',
      ctaLearn: '了解技术',
    },
    trust: {
      eyebrow: '信任层',
      title: '智能体协作的可信基石',
      diagramAlt: 'DeAgentAI 信任基础设施示意图',
      orbitAria: '连续性、共识与身份',
      labels: {
        continuity: '连续性',
        consensus: '共识',
        identity: '身份',
      },
      cards: [
        {
          title: 'De(cision)Agent',
          description: '身份、连续性、共识——可信智能体的根基。',
        },
        {
          title: '自研模型',
          description: '基于反馈训练的专有模型，使智能体判断可复现、可校准。',
        },
        {
          title: 'A2A / MCP',
          description: '兼容行业标准，支持跨框架协作与工具调用。',
        },
        {
          title: 'MPC',
          description: 'MPC 实现无信任执行，将协作安全结算至链上。',
        },
      ],
    },
    product: {
      eyebrow: '产品',
      title: '始终在场的智能',
      screenerAlt: '链上资产筛选器',
      heading: '按你的标准定制的每日市场筛选',
      capabilities: [
        {
          title: '一键部署',
          copy:
            '选择、配置、部署。托管与持久化由协议处理——你无需触碰任何基础设施。',
        },
        {
          title: '密钥不可见',
          copy:
            '密钥由身份注入，隐于协议之下，并具备按账户熔断、互不级联的保护。',
        },
        {
          title: '每次推理均可计量',
          copy:
            '每一次推理按次记录，消耗直连结算。透明、可审计，绝不静默。',
        },
      ],
    },
    ecosystem: {
      eyebrow: '生态与技术',
      title: '将判断转化为可结算价值',
      technologySteps: [
        {
          title: '自研模型',
          lines: ['反馈驱动训练', '可靠判断输出'],
        },
        {
          title: '智能体封装',
          lines: ['De(cision)Agent 框架', '自主决策'],
        },
        {
          title: '经济结算',
          lines: ['价值可计量', '链上可验证'],
        },
      ],
      scenarios: [
        {
          title: 'CorrAI —— 自主策略智能体',
          copy:
            'CorrAI 运行于 De(cision)Agent 框架，受共识、身份与连续性约束。它调用 DeAgentAI 专有模型生成策略判断，结晶为自主、持续运行的策略智能体——首次让链上判断具备可验证的策略连续性。',
        },
        {
          title: 'AliceAI —— 赛事预测智能体',
          copy:
            'AliceAI 的赛事预测直接运行在 DeAgentAI 专有模型之上：模型输出赛事判断，AliceAI 将其结晶为可自主决策并在经济层结算的智能体。它与 CorrAI 共享同一底层栈——同一智能，流向不同场景。',
        },
      ],
      agentCards: {
        aria: 'DeAgentAI 智能体示例',
        items: [
          {
            chip: '策略 · 已验证',
            name: 'CorrAI',
            role: '自主策略智能体',
            logoAlt: 'CorrAI',
          },
          {
            chip: '体育 · 复用',
            name: 'AliceAI',
            role: '赛事预测智能体',
            logoAlt: 'AliceAI',
          },
        ],
      },
      compounding: {
        title: '自我复利的能力',
        copyBefore:
          '身份、连续性、共识、专有模型、智能体封装、经济结算——没有一层是孤立的；每一层都在上一层之上被复用与叠加。',
        copyStrong:
          '每一层新能力都会重新扩展整栈边界；每一次复用都让下一个智能体更接近零成本。',
        copyAfter:
          ' 这不是一堵墙——而是一套自我复利的系统。运行越久，差距越大。',
      },
    },
    voices: {
      eyebrow: '他们如是说',
      title: '来自团队与生态的声音',
      gridAria: '推荐语占位',
    },
    partners: {
      eyebrow: '合作与融资',
      title: '与领先生态伙伴共同构建',
    },
    launch: {
      title: '连接钱包，部署你的第一个智能体',
      copy: '无需管理密钥——连接即可开始。基于可信智能基础设施构建。',
      ctaLaunch: '连接钱包',
      ctaWhitepaper: '阅读白皮书',
    },
  },

  agents: {
    hero: {
      beta: '内测中 · 连接钱包即可开始',
      title: 'AI Agents',
      description:
        '一键部署——无需自备 API Key。每次推理经 AI Token Hub 结算，可用 $AIA 或 $USDT 支付。首个智能体：Sentry，全天候监控整个 Hyperliquid 市场。',
      kpis: [
        {
          label: '覆盖市场',
          value: 308,
          footnote: '加密 198 · 传统金融 110',
        },
        {
          label: '部署耗时',
          value: 60,
          unit: 's',
          footnote: '仅需钱包 · 无需邮箱 · 无需信用卡',
        },
        {
          value: 5,
          footnote: 'Hyperliquid 交易所',
        },
        {
          value: 24,
          unitSuffix: '/7',
          footnote: '始终运行',
        },
        {
          valueLabel: '$AIA / $USDT',
          footnote: '结算',
        },
      ],
    },
    sentry: {
      eyebrow: '核心能力',
      title: 'Sentry 扫描。你来决策。',
      intro:
        '你设定条件；Sentry 只执行并陈述事实。以下为 Hyperliquid 市场实时数据——调整任一条件，匹配结果即时重算。',
      filters: {
        title: '筛选条件',
        live: '实时',
        presetTitle: '预设策略',
        fineTuneTitle: '精细阈值',
        ranges: [
          {
            label: '最低 24 小时成交量',
            value: '$3M',
            aria: '最低日成交量',
          },
          {
            label: '资金费率年化（绝对值）',
            value: '≥ 1.5%',
            aria: '资金费率年化',
          },
          {
            label: '最低 24 小时涨跌幅',
            value: '0%',
            aria: '最低涨跌幅',
          },
        ],
        outlierGuard: {
          title: '异常值保护',
          description: '跳过可能无法干净结算的极端错位行情。',
        },
      },
      strategies: [
        { title: '资金费率套利', description: '资金费率远离基准，双向均可', count: '47' },
        { title: '低换手', description: '持仓远高于成交量，换手偏低', count: '52' },
        { title: '放量突破', description: '成交量与价格同步扩张', count: '8' },
        { title: '溢价错位', description: '标记价格偏离预言机', count: '78' },
      ],
      matches: {
        title: '今日匹配',
        tabs: ['全部', '加密', '传统金融'],
        summary: {
          count: '47',
          text: '个市场匹配 — 资金费率套利',
          outlierNoteBefore: '异常值保护已剔除 ',
          outlierCount: '2',
          outlierNoteAfter: ' 个极端资金费率或流动性过薄的市场',
        },
        columns: ['市场', '资金费率年化', '24 小时涨跌', '成交量', '未平仓合约', '溢价'],
        categoryLabels: {
          Crypto: '加密',
          Tradfi: '传统金融',
        },
        status: {
          empty: '当前条件无匹配市场',
          stale: '快照已超过 5 分钟',
          partial: '当前为部分市场快照',
          truncated: '仅展示前列结果',
          loading: '正在加载实时市场…',
          unavailable: '市场数据暂时不可用',
        },
      },
    },
    dailyPush: {
      badge: '即将推出',
      title: '每日推送',
      copy:
        '匹配结果每天在固定时间送达——无需打开平台。当市场无可匹配时，我们仍会发送：不捏造信号，也不沉默。',
      features: [
        { title: '按时送达', description: '推送时间可配置' },
        { title: '空结果也会发送', description: '无静默日' },
        { title: '调用长期记忆', description: '按你的偏好排序' },
        { title: '可追问', description: '深入任一市场' },
      ],
      channels: 'Telegram · 应用内',
      bot: {
        name: 'Sentry BOT',
        time: '今天 09:00',
        message: '今日有 47 个市场匹配你的资金费率套利条件。按强度前三：',
        assets: [
          { symbol: 'XMR', category: 'Crypto', note: '多头收费', change: '+20.93%' },
          { symbol: 'CASHCAT', category: 'Crypto', note: '空头收费', change: '+42.72%' },
          { symbol: 'KAITO', category: 'Crypto', note: '空头收费', change: '-295.73%' },
        ],
        memory: {
          title: '长期记忆',
          copy: '你上次问过 XMR 的资金费率结构——今天它又回到列表上了。',
        },
      },
    },
    comparison: {
      eyebrow: '关键差异',
      title: '无需 API Key',
      intro:
        '开源智能体框架能力很强，但每个都要求你在模型平台注册、绑卡、取 Key，再粘贴进配置文件。对钱包原生用户而言，这条路径上的每一步都是流失点。',
      openSource: {
        title: '自行部署开源智能体',
        steps: [
          '在模型平台注册并验证邮箱',
          '添加信用卡并通过身份核验',
          '创建并复制 API Key',
          '找到配置文件，填入 Key 与模型名',
          '自备服务器，处理监控与重启',
          '密钥泄露风险完全由你承担',
        ],
        footerBefore: '大约 ',
        footerStrong: '30–90 分钟',
        footerAfter: '，还需要一张可用的信用卡',
      },
      deagentai: {
        title: '在 DeAgentAI 上部署',
        steps: [
          '连接钱包并登录',
          '用 $AIA 或 $USDT 充值额度',
          '选择智能体并设定条件',
          '点击部署，每日运行即开始',
        ],
        footer: '约 60 秒。无需邮箱，无需信用卡。',
      },
    },
    credit: {
      eyebrow: '额度机制',
      title: '余额为零，仍不静默',
      intro:
        '常驻智能体突然静默是最差体验——用户会以为产品坏了。由于筛选是纯计算、不消耗 token，余额为零时每日推送仍会到达；只是不再附带文字解读。',
      levels: [
        {
          status: 'NORMAL',
          copy: '默认模式，完整推送与追问。筛选照常运行。',
        },
        {
          status: 'LOW',
          copy: '切换至更低成本模型。内容不变，并附带充值提示。',
        },
        {
          status: 'CRITICAL',
          copy: '仅推送。关闭追问聊天以延长剩余额度。',
        },
        {
          status: 'EMPTY',
          copy: '解读停止，原始数据仍会送达——筛选不消耗 token。',
        },
      ],
    },
    memory: {
      eyebrow: '长期记忆',
      title: '记住你是谁，而非你持有什么',
      intro:
        '智能体用记忆约束自身行为，而非猜测你想买什么。金额与持仓一律实时查询，绝不从记忆读取——语义召回是模糊匹配，而在交易中一个错误数字就是真实损失。',
      remembered: {
        title: '会记住',
        badge: '偏好与判断',
        copy: '主观、模糊、跨时间的判断——正是模型擅长承载的内容。',
        items: [
          { before: '仅加密，', strong: '跳过股票', after: '' },
          { before: '偏好负资金费率，', strong: '回避高杠杆', after: '' },
          { before: '曾追过类似形态，', strong: '提醒等待回调', after: '' },
          { before: '明确排除', strong: '上市不足七天的市场', after: '' },
          { before: '在', strong: '亚洲时段', after: '阅读推送' },
        ],
      },
      neverStored: {
        title: '永不存储',
        badge: '金额与持仓',
        copy: '始终实时查询、每次重新获取。不缓存，不推断。',
        items: [
          '持仓成本基础',
          '当前仓位与方向',
          '钱包余额',
          '未实现盈亏',
          '历史成交价格',
        ],
      },
    },
    deploy: {
      eyebrow: '如何部署',
      title: '三步，六十秒',
      steps: [
        {
          title: '连接钱包',
          text:
            '签名即登录。无需邮箱，无需密码。身份由内部 UID 承载，后续多个钱包可共享额度与记忆。',
        },
        {
          title: '选择智能体并设定条件',
          text:
            '四种预设策略开箱即用，阈值可调。条件即约束：智能体只能在你划定的边界内工作。',
        },
        {
          title: '点击部署',
          text:
            '智能体按每日计划运行，结果推送到应用内或 Telegram。用量与余额可在控制台按次审计。',
        },
      ],
      codeSample: {
        commentRuntime:
          '# 智能体运行时：Agno AgentOS，模型经 AI Token Hub 路由（弱化注释）',
        agentName: 'Hyperliquid Screener',
        instruction: '你是市场筛选器，不是顾问。',
        commentScreening: '# 筛选是纯计算，零 token 成本（弱化注释）',
      },
    },
    waitlist: {
      eyebrow: '抢先体验',
      title: '第一时间获知',
      copy: '候补名单成员可获优先访问权限与 100 万起始 token 额度。',
      emailAria: '你的邮箱',
      emailPlaceholder: '你的邮箱',
      submit: '加入候补名单',
      submitting: '提交中…',
      success: '已加入候补名单',
      alreadyJoined: '该邮箱已在名单中',
      invalid: '请输入有效邮箱',
      rateLimited: '尝试次数过多，请稍后再试',
      unavailable: '候补名单暂时不可用',
      error: '暂时无法加入，请稍后重试',
    },
  },

  alphax: {
    hero: {
      title: 'AlphaX - ',
      titleAccent: '完全自主交易智能体',
      copyBefore:
        'AlphaX 是首个经 DeAgentAI 反馈驱动训练孵化的专有 AI 模型，运行于 ',
      copyStrong1: 'De(cision)Agent 框架',
      copyMid:
        '，受共识、身份与连续性约束。它由专有模型生成预测信号，并以 ',
      copyStrong2: '完全自主交易智能体',
      copyAfter:
        ' 的形态行动——从决策辅助工具演进为独立运行的交易智能。',
      tagsAria: 'AlphaX 产品属性',
      tags: [
        '反馈训练',
        '自主运行',
        'De(cision)Agent 框架',
        '链上可审计',
      ],
    },
    does: {
      title: 'AlphaX 能做什么',
      intro: 'AlphaX 将专有模型智能与自主执行、可验证结果结合。',
      capabilities: [
        {
          title: '专有模型信号',
          copy:
            '基于反馈训练的专有模型生成预测信号，并经用户反馈持续校准，在动态市场中保持可靠与适应力。',
        },
        {
          title: '完全自主交易',
          copy:
            '不止于决策支持——AlphaX 监控市场、实时调整策略，并以加密市场所需的速度与精度独立执行。',
        },
        {
          title: '链上可审计业绩',
          copy:
            '作为 De(cision)Agent 框架上的智能体，其决策遵循身份与连续性原则，结果可在链上审计与验证。',
        },
      ],
    },
    gallery: {
      title: '产品画廊',
      placeholder: '占位 · 待定',
      items: [
        { screen: 'SCREEN 01', title: '信号看板' },
        { screen: 'SCREEN 02', title: '自主执行' },
        { screen: 'SCREEN 03', title: '记录与持仓' },
        { screen: 'SCREEN 04', title: '反馈训练' },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: '一个 API，接入全部前沿模型',
      copyBefore:
        'AI Token Hub 将领先的闭源与开源模型统一在兼容 OpenAI 的单一 API 之后。每次调用按请求计量、定价与结算，',
      copyStrong: '可用 $AIA 或 USDT 支付。',
      copyAfter: ' 请求体永不持久化，仅保留 token 计数与延迟。',
      ctaEnter: '进入 AI Token Hub',
      ctaIntegration: '查看集成说明',
    },
    role: {
      eyebrow: '在 DeAgentAI 技术栈中',
      title: '它在生态中的角色',
      copyBefore:
        'AI Token Hub 承载 DeAgentAI 生态中全部 AI 调用与计量。每一单位消耗均按次记录并结算。',
      copyStrong: '它是真实生态用量的计量底座。',
      copyAfter: ' 其产生的协议收入是 $AIA 回购的来源之一。',
      flowAria: 'AI Token Hub 收入流转',
      flow: [
        { title: '真实 AI 用量', copy: '全行业调用按请求计量' },
        { title: '协议收入', copy: '每次调用以 $AIA / USDT 结算' },
        { title: '回购 $AIA', copy: '协议收入作为回购来源' },
      ],
    },
    capabilities: {
      title: '核心能力',
      items: [
        {
          title: '一个 API，多种模型',
          copy:
            'Claude、GPT、Gemini、DeepSeek 等，统一于兼容 OpenAI 的协议。改一个字符串即可切换模型。',
        },
        {
          title: '按次计量',
          copy:
            '实时按次计量、定价与结算。请求体永不持久化，仅保留 token 计数与延迟，兼顾可审计与隐私。',
        },
        {
          title: '$AIA 结算',
          copy:
            '可用 $AIA 或 USDT 结算。使用 $AIA 充值可享折扣，这是原生协议层结算激励。',
        },
      ],
    },
    cta: {
      eyebrow: '开始使用',
      title: '60 秒完成集成',
      copy:
        '连接钱包，改一个 base_url，即可调用全部前沿模型。免费额度：每月 100 万 tokens。',
      button: '进入产品',
    },
  },

  solutions: {
    hero: {
      title: '可验证判断，以 API 调用',
      copyBefore:
        'DeAgentAI 将专有模型封装在 De(cision)Agent 框架之下，并以标准 API 对外暴露：输入上下文，获得带可验证置信度与依据的结构化判断。判断在框架内 ',
      copyStrong1: '绑定身份',
      copySep1: '、',
      copyStrong2: '记录状态',
      copySep2: '，并经 ',
      copyStrong3: '共识校验',
      copyAfter:
        '——你调用的不是原始推理，而是可追溯、可复现的判断单元。',
      ctaContact: '联系集成',
      ctaLearn: '了解更多',
    },
    how: {
      title: '一次调用，三重保障',
      intro:
        '调用管线封装为三层：模型 → 智能体 → 结算。每一层提供可验证保障，复利为一次可信调用——你集成的不是裸模型 API，而是可验证判断单元。',
      guarantees: [
        {
          step: '01 · 模型',
          title: '自研模型',
          copy:
            '经反馈循环训练的专有模型输出结构化判断与置信度。相同输入可复现，而非黑盒概率输出。',
        },
        {
          step: '02 · 智能体',
          title: '框架封装',
          copy:
            'De(cision)Agent 框架绑定身份、记录状态并施加共识校验，将判断封装为有状态实例。',
        },
        {
          step: '03 · 结算',
          title: '经济结算',
          copy:
            '判断输出直连经济层结算，可计量、链上可验证。判断与价值之间无断层。',
        },
      ],
    },
    capabilities: {
      title: 'API 能力',
      items: [
        {
          title: '结构化判断',
          copy:
            '输出为结构化判断 + 置信度 + 依据。在共识下经反馈持续校准，相同输入可复现，而非随机漂移。',
        },
        {
          title: '有状态智能体实例',
          copy:
            '每次调用绑定唯一身份与链上记忆，使判断具备状态与连续性。在范围内自主，全程可追溯。',
        },
        {
          title: '经济结算 API',
          copy:
            '判断直接连接经济层结算，产出可计量、链上可验证的结果。判断与价值之间无断层。',
        },
      ],
    },
    useCases: {
      title: '应用场景',
      intro: '任何需要可验证判断与可结算链上结果的系统，均可复用此 API。',
      items: [
        {
          number: '01',
          title: '预测与信号',
          copy:
            '赛事、市场与事件预测：一次调用获得结构化判断，将判断与产品解耦。',
        },
        {
          number: '02',
          title: '策略与执行智能体',
          copy:
            '基于判断自主执行策略，链上可审计，并可在经济层结算。',
        },
        {
          number: '03',
          title: '链上治理',
          copy:
            '为 DAO 与协议提供中立、可追溯的判断源，支撑提案分析与自动化执行。',
        },
        {
          number: '04',
          title: '垂直决策系统',
          copy:
            '注入领域上下文，获得可结算判断输出，并快速接入现有系统。',
        },
      ],
    },
    integration: {
      title: '集成规格',
      intro:
        '兼容 OpenAI 的调用方式、标准鉴权，数分钟即可集成。协议、鉴权与结算细节随文档提供。',
      points: [
        {
          strong: '标准 API',
          text: ' — 兼容 OpenAI；改一个 base_url 即可接入',
        },
        {
          strong: '可组合',
          text: ' — 按需调用判断 / 智能体 / 结算层，粒度自定',
        },
        {
          strong: '专属支持',
          text: ' — 提供集成设计与技术入门支持',
        },
      ],
      codeAria: 'API 请求示例',
      codeFilename: 'example.request',
      codeComments: [
        '# 调用 DeAgentAI 专有模型能力',
        '# 获取自主 Agent 判断',
        '# 判断直连结算',
      ],
    },
    credentials: {
      title: '获取访问凭证',
      copy: '描述你的系统与用例；我们将提供匹配的集成规格与支持。',
      inputLabel: '你的邮箱或 Telegram',
      inputPlaceholder: '你的邮箱 / Telegram',
      submit: '联系我们',
    },
  },

  caseStudies: {
    hero: {
      title: '案例研究',
      intro:
        'DeAgentAI 的能力不止服务自身——也赋能生态伙伴。以下是真实案例：合作伙伴如何在 DeAgentAI 上跑通「模型 → 智能体 → 结算」全链路。',
      feature: {
        title: '当伙伴基于 DeAgentAI 构建，双方都获得新能力',
        copy:
          '世界杯期间，AliceAI 通过一组 API 接入 DeAgentAI 专有模型判断，并上线赛事预测智能体。零自研模型，直接在经济层结算。',
        meta: [
          { label: '合作伙伴', value: 'AliceAI' },
          { label: '部署场景', value: '世界杯赛事预测' },
          { label: '技术栈', value: 'DeAgentAI 专有模型 · De(cision)Agent' },
        ],
      },
    },
    problem: {
      title: '问题与方案',
      constraints: {
        label: '约束',
        title: 'AliceAI 的约束',
        items: [
          '自建可靠预测模型：成本高、周期长',
          '裸模型只给一次性推理——无身份、无状态',
          '判断止于展示，无法抵达结算',
        ],
      },
      interface: {
        label: '接口',
        title: 'DeAgentAI 的接口',
        items: [
          '直连 API 调用专有模型，获得结构化赛事判断',
          'De(cision)Agent 将其封装为绑定身份、有状态的智能体',
          '判断接入经济层结算，链上可验证',
        ],
      },
    },
    path: {
      title: '技术路径',
      intro: 'AliceAI 调用的不是裸模型，而是封装好的「判断—决策—结算」路径。',
      steps: [
        { title: '专有模型', copy: 'DeAgentAI 模型输出判断' },
        { title: '智能体封装', copy: 'De(cision)Agent 自主智能体' },
        { title: '经济结算', copy: '价值可计量、链上可验证' },
      ],
      noteBefore:
        '同一路径可被任何需要可验证判断与可结算结果的系统复用。',
      noteStrong: 'AliceAI 是其首次外部验证。',
    },
    results: {
      title: '成果',
      intro:
        '以下数字以真实日志为准——发布前请核实；未确认项请留空，勿估算。',
      items: [
        { number: '2,000+', label: '赛事预测信号', sublabel: '世界杯期间' },
        { number: 'XXk', label: '累计模型调用', sublabel: '待核实' },
        { number: '30k+', label: '日社区讨论热度', sublabel: '经由 AliceAI' },
      ],
    },
    product: {
      title: '产品内呈现',
      brandBadge: 'ALICEAI',
      screens: [
        { badge: 'SCREEN 01', title: '预测列表', subtitle: '占位 · 待定' },
        { badge: 'SCREEN 02', title: '赛事详情', subtitle: '占位 · 待定' },
        { badge: 'SCREEN 03', title: '判断与结算', subtitle: '占位 · 待定' },
      ],
    },
    video: {
      title: '合作视频',
      playAria: '播放合作视频预览',
      heading: '合作视频 · 占位',
      caption: 'DeAgentAI × AliceAI 联合访谈 / 案例片（16:9）',
    },
  },

  community: {
    hero: {
      titleBefore: '加入 DeAgentAI ',
      titleAccent: '社区',
      copy:
        '由开发者、用户与建设者组成的社区，线上线下共同推动去中心化 AI 智能体的采用。',
      social: ['X', 'Discord', 'Telegram', 'RootData'],
    },
    traction: {
      title: '真实的社区势能',
      disclaimer: '数字以真实统计为准——发布前请核实。',
      stats: [
        {
          valueSuffix: 'k+',
          value: 30,
          title: '每日讨论',
          footnote: '线上 · 经由 AliceAI',
        },
        {
          value: '香港 · 深圳 · 西安',
          title: '线下活动城市',
          footnote: 'W3Labs × Jisit Future',
        },
        {
          value: '多场',
          title: 'AI 主题线下活动',
          footnote: '触达开发者与青年群体',
        },
      ],
    },
    snapshots: {
      title: '社区瞬间',
      filterAll: '全部年份 · 全部地区',
      sourcePhotosSuffix: ' 张源图',
      yearAria: '快照年份',
      cityAria: '快照城市',
      years: ['2024', '2025', '2026'],
      cities: ['深圳 AI Meetup', '香港', '西安'],
      photoAltTemplate: '{city} DeAgentAI 社区活动',
    },
    conversation: {
      title: '加入全球对话',
      copy:
        'DeAgentAI 社区遍布全球。与建设者、开发者和用户实时交流。',
      channels: [
        { code: 'TG', title: 'Telegram', language: '社区' },
        { code: 'chat', title: 'Discord', language: '开发者' },
      ],
    },
    ambassador: {
      title: '大使计划',
      imageAlt: 'DeAgentAI 大使视觉',
      copy:
        '成为 DeAgentAI 生态的催化剂。加入倡导者社区，推动去中心化 AI 采用——在认知、教育与触达中发挥关键作用。',
      cta: '即将推出',
    },
    blogs: {
      title: 'DeAgentAI 最新动态',
      posts: [
        { date: 'JUL 2026', title: '文章标题占位 · 请替换为真实文章' },
        { date: 'JUL 2026', title: '文章标题占位 · 请替换为真实文章' },
        { date: 'JUN 2026', title: '文章标题占位 · 请替换为真实文章' },
        { date: 'JUN 2026', title: '文章标题占位 · 请替换为真实文章' },
      ],
    },
  },

  buyback: {
    hero: {
      title: 'AIA 回购与销毁追踪',
      copy: '透明回购、可验证销毁，以及可持续代币经济——实时呈现。',
      metricsAria: '回购摘要',
      metrics: [
        { label: '累计支出', value: '$5,000,127' },
        { label: '累计购入 AIA', value: '47.62M' },
        { label: '平均回购价格', value: '$0.1050' },
        { label: '供应量削减', value: '4.76%', note: '相对初始供应量' },
        { label: '累计销毁', value: '11M', accent: true },
      ],
    },
    burnProgress: {
      title: '销毁进度',
      live: '实时',
      stats: [
        { label: '已购入 AIA 中已销毁占比', value: '23.1%' },
        { label: '已销毁 AIA', value: '11M' },
        { label: '待销毁 AIA', value: '36.62M' },
      ],
      trackAria: '已购入 AIA 中已销毁 23.1%',
      progressLabels: ['11M', '47.62M'],
      noteStrong: '回购通过中心化交易所在链下执行。',
      note:
        '每 3 个月在链上销毁一部分——交易哈希见下方销毁历史，于每次季度销毁事件后更新。',
    },
    burnHistory: {
      title: '销毁历史',
      columns: ['日期', '销毁 AIA', '状态', '销毁哈希'],
      statusConfirmed: '已确认',
      rows: [
        {
          date: '2026年7月22日',
          amount: '10.00M',
          hashPreview: '8G2MPM3s...Z1Nycr',
        },
        {
          date: '2026年4月13日',
          amount: '1.00M',
          hashPreview: 'HBmTxfJy...NPyFpf',
        },
      ],
    },
    mechanism: {
      title: '回购机制如何运作',
      steps: [
        {
          title: '收入归集',
          copy: '协议费用、AI 交易利润与业务收入为回购提供资金',
        },
        {
          title: '划拨至资金池',
          copy: '大部分收入自动流入专用回购基金',
        },
        {
          title: '市场收购',
          copy: '以充分透明与多签安全执行市场收购',
        },
        {
          title: '永久销毁',
          copy:
            '回购所得 AIA 存放于已披露托管，并按公布的销毁计划销毁',
        },
      ],
    },
    priceTrend: {
      title: 'AIA 价格走势',
      periodAria: '图表周期',
      periods: ['7D', '30D', '90D', 'ALL'],
      yAxis: ['$0.0800', '$0.0600', '$0.0400', '$0.0200', '$0.0000'],
      xAxis: ['5月15日', '6月6日', '6月29日', '7月21日', '8月12日'],
      legendPrice: 'AIA 价格',
      legendBurn: '销毁事件',
      currentPrice: '$0.0741',
    },
    value: {
      title: '为何 AIA 重要',
      intro: '效用驱动的需求，遇上通缩型供给机制。',
      cards: [
        {
          title: '收入池',
          lineOne: '来自智能体与企业的资金',
          lineTwo: '以 USDC、稳定币与法币支付',
        },
        {
          title: '回购引擎',
          lineOne: '程序化市场收购',
          lineTwo: '与智能体网络增长相关',
        },
        {
          title: '质押层',
          lineOne: '自愿锁定供给',
          lineTwo: '独立的稀缺性机制',
        },
        {
          title: '通缩设计',
          lineOne: '按计划销毁永久削减供给',
          lineTwo: '',
        },
      ],
    },
    flywheel: {
      title: '通缩飞轮',
      center: { token: 'AIA', label: '飞轮' },
      steps: [
        {
          number: '01',
          title: '智能体部署',
          copy: '更多自主智能体上线',
        },
        {
          number: '02',
          title: 'AIA 消耗',
          copy: '每个智能体运营都需要 AIA',
        },
        {
          number: '03',
          title: '收入 → 销毁',
          copy: '费用自动资助回购与销毁',
        },
        {
          number: '04',
          title: '永久移除',
          copy: '代币永久退出流通供给',
        },
      ],
    },
    outcome: {
      eyebrow: '结果',
      title: 'AIA 持有者与自主智能体扩张同行受益。',
      copy:
        '随着更多智能体部署，协议活动上升。收入资助程序化回购，而按计划销毁永久削减可用供给。',
      strong: '可持续增长。价值对齐。结构性供给机制。',
    },
  },

  common: {
    brand: 'DeAgentAI',
    launchApp: '连接钱包',
    comingSoon: '即将推出',
    live: '实时',
    languageShort: '简',
    readWhitePaper: '阅读白皮书',
    placeholderTbd: '占位 · 待定',
  },
}
