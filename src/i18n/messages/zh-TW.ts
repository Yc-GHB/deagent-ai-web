/** 繁體中文文案字典 */
import type { LocaleMessages } from './types'

export const zhTW: LocaleMessages = {
  nav: {
    aria: {
      home: 'DeAgentAI 首頁',
      primary: '主導覽',
      toggle: '切換導覽',
      logoAlt: 'DeAgentAI',
    },
    languageShort: '繁',
    cta: '連接錢包',
    wrongNetwork: '網路錯誤',
    getAiaModal: {
      title: 'GET $AIA',
      closeAria: '關閉',
      backAria: '返回',
      cexTitle: 'Swap via CEX',
      cexDescription: '在中心化交易所交易',
      pairLabel: 'AIA / USDT',
    },
    items: [
      { id: 'HOME', label: '首頁', href: '/' },
      { id: 'PRODUCT', label: '產品', href: '/#product' },
      { id: 'ECOSYSTEM', label: '生態', href: '/#ecosystem' },
      { id: '$AIA', label: '$AIA', href: '/#partners' },
      { id: 'LEARN', label: '學習', href: '/#learn' },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: '智慧體',
            items: [
              { title: 'AI Agents', description: '部署常駐運行的智慧體', href: '/agents' },
              { title: 'CorrAI', description: '自主策略智慧體', href: 'https://corr.ai/en', external: true },
              { title: 'AlphaX', description: '自主交易智慧體', href: '/alphax' },
            ],
          },
          {
            title: '基礎設施',
            items: [
              { title: 'AI Token Hub', description: '一個 API，全部模型', href: '/token-hub' },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: '基於我們構建',
            items: [
              { title: '解決方案', description: '模型能力即 API', href: '/solutions' },
              { title: '案例研究', description: 'AliceAI 與合作夥伴', href: '/case-studies' },
            ],
          },
        ],
      },
      '$AIA': {
        columns: [
          {
            title: '$AIA',
            items: [
              { title: '取得 AIA', href: '#get-aia' },
              { title: '回購看板', href: '/buyback' },
              { title: '代幣經濟', href: 'https://deagentai.gitbook.io/deagentai', external: true },
            ],
          },
        ],
      },
      LEARN: {
        columns: [
          {
            title: '學習',
            items: [
              { title: '社群', description: '活動與聚會', href: '/community' },
              {
                title: '白皮書',
                description: '閱讀白皮書',
                href: 'https://deagentai.gitbook.io/deagentai',
                external: true,
              },
              { title: 'MiCA 白皮書', description: '合規', href: 'https://deagent.ai/micar-whitepaper.pdf', external: true },
              { title: '資源', description: '文件與更多', href: 'https://medium.com/@deagent.ai', external: true },
            ],
          },
        ],
      },
    },
  },

  footer: {
    logoAlt: 'DeAgentAI',
    tagline:
      '面向鏈上世界的可信 AI 智慧體基礎設施——為自主智慧提供身分、連續性與共識。',
    products: {
      title: '產品',
      links: [
        { label: 'AI Agents', badge: 'NEW', href: '/agents' },
        { label: 'AlphaX', href: '/alphax' },
        { label: 'AliceAI', href: '/case-studies' },
        { label: 'AI Token Hub', href: '/token-hub' },
      ],
    },
    community: {
      title: '社群',
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
      titleLine1: '可驗證智慧',
      titleLine2: '賦能每一個智慧體',
      ctaExplore: '探索產品',
      ctaLearn: '了解技術',
    },
    trust: {
      eyebrow: '信任層',
      title: '智慧體協作的可信基石',
      diagramAlt: 'DeAgentAI 信任基礎設施示意圖',
      orbitAria: '連續性、共識與身分',
      labels: {
        continuity: '連續性',
        consensus: '共識',
        identity: '身分',
      },
      cards: [
        {
          title: 'De(cision)Agent',
          description: '身分、連續性、共識——可信智慧體的根基。',
        },
        {
          title: '自研模型',
          description: '基於回饋訓練的專有模型，使智慧體判斷可複現、可校準。',
        },
        {
          title: 'A2A / MCP',
          description: '相容行業標準，支援跨框架協作與工具呼叫。',
        },
        {
          title: 'MPC',
          description: 'MPC 實現無信任執行，將協作安全結算至鏈上。',
        },
      ],
    },
    product: {
      eyebrow: '產品',
      title: '始終在場的智慧',
      screenerAlt: '鏈上資產篩選器',
      heading: '按你的標準客製的每日市場篩選',
      capabilities: [
        {
          title: '一鍵部署',
          copy:
            '選擇、設定、部署。託管與持久化由協議處理——你無需觸碰任何基礎設施。',
        },
        {
          title: '金鑰不可見',
          copy:
            '金鑰由身分注入，隱於協議之下，並具備按帳戶熔斷、互不級聯的保護。',
        },
        {
          title: '每次推理均可計量',
          copy:
            '每一次推理按次記錄，消耗直連結算。透明、可稽核，絕不靜默。',
        },
      ],
    },
    ecosystem: {
      eyebrow: '生態與技術',
      title: '將判斷轉化為可結算價值',
      technologySteps: [
        {
          title: '自研模型',
          lines: ['回饋驅動訓練', '可靠判斷輸出'],
        },
        {
          title: '智慧體封裝',
          lines: ['De(cision)Agent 框架', '自主決策'],
        },
        {
          title: '經濟結算',
          lines: ['價值可計量', '鏈上可驗證'],
        },
      ],
      scenarios: [
        {
          title: 'CorrAI —— 自主策略智慧體',
          copy:
            'CorrAI 運行於 De(cision)Agent 框架，受共識、身分與連續性約束。它呼叫 DeAgentAI 專有模型生成策略判斷，結晶為自主、持續運行的策略智慧體——首次讓鏈上判斷具備可驗證的策略連續性。',
        },
        {
          title: 'AliceAI —— 賽事預測智慧體',
          copy:
            'AliceAI 的賽事預測直接運行在 DeAgentAI 專有模型之上：模型輸出賽事判斷，AliceAI 將其結晶為可自主決策並在經濟層結算的智慧體。它與 CorrAI 共享同一底層棧——同一智慧，流向不同場景。',
        },
      ],
      agentCards: {
        aria: 'DeAgentAI 智慧體示例',
        items: [
          {
            chip: '策略 · 已驗證',
            name: 'CorrAI',
            role: '自主策略智慧體',
            logoAlt: 'CorrAI',
          },
          {
            chip: '體育 · 複用',
            name: 'AliceAI',
            role: '賽事預測智慧體',
            logoAlt: 'AliceAI',
          },
        ],
      },
      compounding: {
        title: '自我複利的能力',
        copyBefore:
          '身分、連續性、共識、專有模型、智慧體封裝、經濟結算——沒有一層是孤立的；每一層都在上一層之上被複用與疊加。',
        copyStrong:
          '每一層新能力都會重新擴展整棧邊界；每一次複用都讓下一個智慧體更接近零成本。',
        copyAfter:
          ' 這不是一堵牆——而是一套自我複利的系統。運行越久，差距越大。',
      },
    },
    voices: {
      eyebrow: '他們如是說',
      title: '來自團隊與生態的聲音',
      gridAria: '推薦語佔位',
    },
    partners: {
      eyebrow: '合作與融資',
      title: '與領先生態夥伴共同構建',
    },
    launch: {
      title: '連接錢包，部署你的第一個智慧體',
      copy: '無需管理金鑰——連接即可開始。基於可信智慧基礎設施構建。',
      ctaLaunch: '連接錢包',
      ctaWhitepaper: '閱讀白皮書',
    },
  },

  agents: {
    hero: {
      beta: '內測中 · 連接錢包即可開始',
      title: 'AI Agents',
      description:
        '一鍵部署——無需自備 API Key。每次推理經 AI Token Hub 結算，可用 $AIA 或 $USDT 支付。首個智慧體：Sentry，全天候監控整個 Hyperliquid 市場。',
      kpis: [
        {
          label: '覆蓋市場',
          value: 308,
          footnote: '加密 198 · 傳統金融 110',
        },
        {
          label: '部署耗時',
          value: 60,
          unit: 's',
          footnote: '僅需錢包 · 無需信箱 · 無需信用卡',
        },
        {
          value: 5,
          footnote: 'Hyperliquid 交易所',
        },
        {
          value: 24,
          unitSuffix: '/7',
          footnote: '始終運行',
        },
        {
          valueLabel: '$AIA / $USDT',
          footnote: '結算',
        },
      ],
    },
    sentry: {
      eyebrow: '核心能力',
      title: 'Sentry 掃描。你來決策。',
      intro:
        '你設定條件；Sentry 只執行並陳述事實。以下為 Hyperliquid 市場即時資料——調整任一條件，匹配結果即時重算。',
      filters: {
        title: '篩選條件',
        live: '即時',
        presetTitle: '預設策略',
        fineTuneTitle: '精細閾值',
        ranges: [
          {
            label: '最低 24 小時成交量',
            value: '$3M',
            aria: '最低日成交量',
          },
          {
            label: '資金費率年化（絕對值）',
            value: '≥ 1.5%',
            aria: '資金費率年化',
          },
          {
            label: '最低 24 小時漲跌幅',
            value: '0%',
            aria: '最低漲跌幅',
          },
        ],
        outlierGuard: {
          title: '異常值保護',
          description: '跳過可能無法乾淨結算的極端錯位行情。',
        },
      },
      strategies: [
        { title: '資金費率套利', description: '資金費率遠離基準，雙向均可', count: '47' },
        { title: '低換手', description: '持倉遠高於成交量，換手偏低', count: '52' },
        { title: '放量突破', description: '成交量與價格同步擴張', count: '8' },
        { title: '溢價錯位', description: '標記價格偏離預言機', count: '78' },
      ],
      matches: {
        title: '今日匹配',
        tabs: ['全部', '加密', '傳統金融'],
        summary: {
          count: '47',
          text: '個市場匹配 — 資金費率套利',
          outlierNoteBefore: '異常值保護已剔除 ',
          outlierCount: '2',
          outlierNoteAfter: ' 個極端資金費率或流動性過薄的市場',
        },
        columns: ['市場', '資金費率年化', '24 小時漲跌', '成交量', '未平倉合約', '溢價'],
        categoryLabels: {
          Crypto: '加密',
          Tradfi: '傳統金融',
        },
        status: {
          empty: '目前條件沒有符合的市場',
          stale: '快照已超過 5 分鐘',
          partial: '目前為部分市場快照',
          truncated: '僅顯示前列結果',
          loading: '正在載入即時市場…',
          unavailable: '市場資料暫時無法使用',
        },
      },
    },
    dailyPush: {
      badge: '即將推出',
      title: '每日推送',
      copy:
        '匹配結果每天在固定時間送達——無需開啟平台。當市場無可匹配時，我們仍會發送：不捏造訊號，也不沉默。',
      features: [
        { title: '按時送達', description: '推送時間可設定' },
        { title: '空結果也會發送', description: '無靜默日' },
        { title: '呼叫長期記憶', description: '按你的偏好排序' },
        { title: '可追問', description: '深入任一市場' },
      ],
      channels: 'Telegram · 應用內',
      bot: {
        name: 'Sentry BOT',
        time: '今天 09:00',
        message: '今日有 47 個市場匹配你的資金費率套利條件。按強度前三：',
        assets: [
          { symbol: 'XMR', category: 'Crypto', note: '多頭收費', change: '+20.93%' },
          { symbol: 'CASHCAT', category: 'Crypto', note: '空頭收費', change: '+42.72%' },
          { symbol: 'KAITO', category: 'Crypto', note: '空頭收費', change: '-295.73%' },
        ],
        memory: {
          title: '長期記憶',
          copy: '你上次問過 XMR 的資金費率結構——今天它又回到列表上了。',
        },
      },
    },
    comparison: {
      eyebrow: '關鍵差異',
      title: '無需 API Key',
      intro:
        '開源智慧體框架能力很強，但每個都要求你在模型平台註冊、綁卡、取 Key，再貼進設定檔。對錢包原生使用者而言，這條路徑上的每一步都是流失點。',
      openSource: {
        title: '自行部署開源智慧體',
        steps: [
          '在模型平台註冊並驗證信箱',
          '新增信用卡並通過身分核驗',
          '建立並複製 API Key',
          '找到設定檔，填入 Key 與模型名',
          '自備伺服器，處理監控與重啟',
          '金鑰洩漏風險完全由你承擔',
        ],
        footerBefore: '大約 ',
        footerStrong: '30–90 分鐘',
        footerAfter: '，還需要一張可用的信用卡',
      },
      deagentai: {
        title: '在 DeAgentAI 上部署',
        steps: [
          '連接錢包並登入',
          '用 $AIA 或 $USDT 儲值額度',
          '選擇智慧體並設定條件',
          '點擊部署，每日運行即開始',
        ],
        footer: '約 60 秒。無需信箱，無需信用卡。',
      },
    },
    credit: {
      eyebrow: '額度機制',
      title: '餘額為零，仍不靜默',
      intro:
        '常駐智慧體突然靜默是最差體驗——使用者會以為產品壞了。由於篩選是純計算、不消耗 token，餘額為零時每日推送仍會到達；只是不再附帶文字解讀。',
      levels: [
        {
          status: 'NORMAL',
          copy: '預設模式，完整推送與追問。篩選照常運行。',
        },
        {
          status: 'LOW',
          copy: '切換至更低成本模型。內容不變，並附帶儲值提示。',
        },
        {
          status: 'CRITICAL',
          copy: '僅推送。關閉追問聊天以延長剩餘額度。',
        },
        {
          status: 'EMPTY',
          copy: '解讀停止，原始資料仍會送達——篩選不消耗 token。',
        },
      ],
    },
    memory: {
      eyebrow: '長期記憶',
      title: '記住你是誰，而非你持有什麼',
      intro:
        '智慧體用記憶約束自身行為，而非猜測你想買什麼。金額與持倉一律即時查詢，絕不從記憶讀取——語意召回是模糊匹配，而在交易中一個錯誤數字就是真實損失。',
      remembered: {
        title: '會記住',
        badge: '偏好與判斷',
        copy: '主觀、模糊、跨時間的判斷——正是模型擅長承載的內容。',
        items: [
          { before: '僅加密，', strong: '跳過股票', after: '' },
          { before: '偏好負資金費率，', strong: '迴避高槓桿', after: '' },
          { before: '曾追過類似形態，', strong: '提醒等待回檔', after: '' },
          { before: '明確排除', strong: '上市不足七天的市場', after: '' },
          { before: '在', strong: '亞洲時段', after: '閱讀推送' },
        ],
      },
      neverStored: {
        title: '永不儲存',
        badge: '金額與持倉',
        copy: '始終即時查詢、每次重新取得。不快取，不推斷。',
        items: [
          '持倉成本基礎',
          '當前倉位與方向',
          '錢包餘額',
          '未實現損益',
          '歷史成交價格',
        ],
      },
    },
    deploy: {
      eyebrow: '如何部署',
      title: '三步，六十秒',
      steps: [
        {
          title: '連接錢包',
          text:
            '簽名即登入。無需信箱，無需密碼。身分由內部 UID 承載，後續多個錢包可共享額度與記憶。',
        },
        {
          title: '選擇智慧體並設定條件',
          text:
            '四種預設策略開箱即用，閾值可調。條件即約束：智慧體只能在你劃定的邊界內工作。',
        },
        {
          title: '點擊部署',
          text:
            '智慧體按每日計畫運行，結果推送到應用內或 Telegram。用量與餘額可在控制台按次稽核。',
        },
      ],
      codeSample: {
        commentRuntime:
          '# 智慧體運行時：Agno AgentOS，模型經 AI Token Hub 路由（弱化註解）',
        agentName: 'Hyperliquid Screener',
        instruction: '你是市場篩選器，不是顧問。',
        commentScreening: '# 篩選是純計算，零 token 成本（弱化註解）',
      },
    },
    waitlist: {
      eyebrow: '搶先體驗',
      title: '第一時間獲知',
      copy: '候補名單成員可獲優先存取權限與 100 萬起始 token 額度。',
      emailAria: '你的信箱',
      emailPlaceholder: '你的信箱',
      submit: '加入候補名單',
      submitting: '提交中…',
      success: '已加入候補名單',
      alreadyJoined: '此信箱已在名單中',
      invalid: '請輸入有效信箱',
      rateLimited: '嘗試次數過多，請稍後再試',
      unavailable: '候補名單暫時無法使用',
      error: '暫時無法加入，請稍後重試',
    },
  },

  alphax: {
    hero: {
      title: 'AlphaX - ',
      titleAccent: '完全自主交易智慧體',
      copyBefore:
        'AlphaX 是首個經 DeAgentAI 回饋驅動訓練孵化的專有 AI 模型，運行於 ',
      copyStrong1: 'De(cision)Agent 框架',
      copyMid:
        '，受共識、身分與連續性約束。它由專有模型生成預測訊號，並以 ',
      copyStrong2: '完全自主交易智慧體',
      copyAfter:
        ' 的形態行動——從決策輔助工具演進為獨立運行的交易智慧。',
      tagsAria: 'AlphaX 產品屬性',
      tags: [
        '回饋訓練',
        '自主運行',
        'De(cision)Agent 框架',
        '鏈上可稽核',
      ],
    },
    does: {
      title: 'AlphaX 能做什麼',
      intro: 'AlphaX 將專有模型智慧與自主執行、可驗證結果結合。',
      capabilities: [
        {
          title: '專有模型訊號',
          copy:
            '基於回饋訓練的專有模型生成預測訊號，並經使用者回饋持續校準，在動態市場中保持可靠與適應力。',
        },
        {
          title: '完全自主交易',
          copy:
            '不止於決策支援——AlphaX 監控市場、即時調整策略，並以加密市場所需的速度與精度獨立執行。',
        },
        {
          title: '鏈上可稽核業績',
          copy:
            '作為 De(cision)Agent 框架上的智慧體，其決策遵循身分與連續性原則，結果可在鏈上稽核與驗證。',
        },
      ],
    },
    gallery: {
      title: '產品畫廊',
      placeholder: '佔位 · 待定',
      items: [
        { screen: 'SCREEN 01', title: '訊號看板' },
        { screen: 'SCREEN 02', title: '自主執行' },
        { screen: 'SCREEN 03', title: '記錄與持倉' },
        { screen: 'SCREEN 04', title: '回饋訓練' },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: '一個 API，接入全部前沿模型',
      copyBefore:
        'AI Token Hub 將領先的閉源與開源模型統一在相容 OpenAI 的單一 API 之後。每次呼叫按請求計量、定價與結算，',
      copyStrong: '可用 $AIA 或 USDT 支付。',
      copyAfter: ' 請求體永不持久化，僅保留 token 計數與延遲。',
      ctaEnter: '進入 AI Token Hub',
      ctaIntegration: '查看整合說明',
    },
    role: {
      eyebrow: '在 DeAgentAI 技術棧中',
      title: '它在生態中的角色',
      copyBefore:
        'AI Token Hub 承載 DeAgentAI 生態中全部 AI 呼叫與計量。每一單位消耗均按次記錄並結算。',
      copyStrong: '它是真實生態用量的計量底座。',
      copyAfter: ' 其產生的協議收入是 $AIA 回購的來源之一。',
      flowAria: 'AI Token Hub 收入流轉',
      flow: [
        { title: '真實 AI 用量', copy: '全行業呼叫按請求計量' },
        { title: '協議收入', copy: '每次呼叫以 $AIA / USDT 結算' },
        { title: '回購 $AIA', copy: '協議收入作為回購來源' },
      ],
    },
    capabilities: {
      title: '核心能力',
      items: [
        {
          title: '一個 API，多種模型',
          copy:
            'Claude、GPT、Gemini、DeepSeek 等，統一於相容 OpenAI 的協議。改一個字串即可切換模型。',
        },
        {
          title: '按次計量',
          copy:
            '即時按次計量、定價與結算。請求體永不持久化，僅保留 token 計數與延遲，兼顧可稽核與隱私。',
        },
        {
          title: '$AIA 結算',
          copy:
            '可用 $AIA 或 USDT 結算。使用 $AIA 儲值可享折扣，這是原生協議層結算激勵。',
        },
      ],
    },
    cta: {
      eyebrow: '開始使用',
      title: '60 秒完成整合',
      copy:
        '連接錢包，改一個 base_url，即可呼叫全部前沿模型。免費額度：每月 100 萬 tokens。',
      button: '進入產品',
    },
  },

  solutions: {
    hero: {
      title: '可驗證判斷，以 API 呼叫',
      copyBefore:
        'DeAgentAI 將專有模型封裝在 De(cision)Agent 框架之下，並以標準 API 對外暴露：輸入脈絡，獲得帶可驗證置信度與依據的結構化判斷。判斷在框架內 ',
      copyStrong1: '綁定身分',
      copySep1: '、',
      copyStrong2: '記錄狀態',
      copySep2: '，並經 ',
      copyStrong3: '共識校驗',
      copyAfter:
        '——你呼叫的不是原始推理，而是可追溯、可複現的判斷單元。',
      ctaContact: '聯繫整合',
      ctaLearn: '了解更多',
    },
    how: {
      title: '一次呼叫，三重保障',
      intro:
        '呼叫管線封裝為三層：模型 → 智慧體 → 結算。每一層提供可驗證保障，複利為一次可信呼叫——你整合的不是裸模型 API，而是可驗證判斷單元。',
      guarantees: [
        {
          step: '01 · 模型',
          title: '自研模型',
          copy:
            '經回饋循環訓練的專有模型輸出結構化判斷與置信度。相同輸入可複現，而非黑盒機率輸出。',
        },
        {
          step: '02 · 智慧體',
          title: '框架封裝',
          copy:
            'De(cision)Agent 框架綁定身分、記錄狀態並施加共識校驗，將判斷封裝為有狀態實例。',
        },
        {
          step: '03 · 結算',
          title: '經濟結算',
          copy:
            '判斷輸出直連經濟層結算，可計量、鏈上可驗證。判斷與價值之間無斷層。',
        },
      ],
    },
    capabilities: {
      title: 'API 能力',
      items: [
        {
          title: '結構化判斷',
          copy:
            '輸出為結構化判斷 + 置信度 + 依據。在共識下經回饋持續校準，相同輸入可複現，而非隨機漂移。',
        },
        {
          title: '有狀態智慧體實例',
          copy:
            '每次呼叫綁定唯一身分與鏈上記憶，使判斷具備狀態與連續性。在範圍內自主，全程可追溯。',
        },
        {
          title: '經濟結算 API',
          copy:
            '判斷直接連接經濟層結算，產出可計量、鏈上可驗證的結果。判斷與價值之間無斷層。',
        },
      ],
    },
    useCases: {
      title: '應用場景',
      intro: '任何需要可驗證判斷與可結算鏈上結果的系統，均可複用此 API。',
      items: [
        {
          number: '01',
          title: '預測與訊號',
          copy:
            '賽事、市場與事件預測：一次呼叫獲得結構化判斷，將判斷與產品解耦。',
        },
        {
          number: '02',
          title: '策略與執行智慧體',
          copy:
            '基於判斷自主執行策略，鏈上可稽核，並可在經濟層結算。',
        },
        {
          number: '03',
          title: '鏈上治理',
          copy:
            '為 DAO 與協議提供中立、可追溯的判斷源，支撐提案分析與自動化執行。',
        },
        {
          number: '04',
          title: '垂直決策系統',
          copy:
            '注入領域脈絡，獲得可結算判斷輸出，並快速接入現有系統。',
        },
      ],
    },
    integration: {
      title: '整合規格',
      intro:
        '相容 OpenAI 的呼叫方式、標準鑑權，數分鐘即可整合。協議、鑑權與結算細節隨文件提供。',
      points: [
        {
          strong: '標準 API',
          text: ' — 相容 OpenAI；改一個 base_url 即可接入',
        },
        {
          strong: '可組合',
          text: ' — 按需呼叫判斷 / 智慧體 / 結算層，粒度自定',
        },
        {
          strong: '專屬支援',
          text: ' — 提供整合設計與技術入門支援',
        },
      ],
      codeAria: 'API 請求示例',
      codeFilename: 'example.request',
      codeComments: [
        '# 呼叫 DeAgentAI 專有模型能力',
        '# 取得自主 Agent 判斷',
        '# 判斷直連結算',
      ],
    },
    credentials: {
      title: '取得存取憑證',
      copy: '描述你的系統與用例；我們將提供匹配的整合規格與支援。',
      inputLabel: '你的信箱或 Telegram',
      inputPlaceholder: '你的信箱 / Telegram',
      submit: '聯繫我們',
    },
  },

  caseStudies: {
    hero: {
      title: '案例研究',
      intro:
        'DeAgentAI 的能力不止服務自身——也賦能生態夥伴。以下是真實案例：合作夥伴如何在 DeAgentAI 上跑通「模型 → 智慧體 → 結算」全鏈路。',
      feature: {
        title: '當夥伴基於 DeAgentAI 構建，雙方都獲得新能力',
        copy:
          '世界盃期間，AliceAI 透過一組 API 接入 DeAgentAI 專有模型判斷，並上線賽事預測智慧體。零自研模型，直接在經濟層結算。',
        meta: [
          { label: '合作夥伴', value: 'AliceAI' },
          { label: '部署場景', value: '世界盃賽事預測' },
          { label: '技術棧', value: 'DeAgentAI 專有模型 · De(cision)Agent' },
        ],
      },
    },
    problem: {
      title: '問題與方案',
      constraints: {
        label: '約束',
        title: 'AliceAI 的約束',
        items: [
          '自建可靠預測模型：成本高、週期長',
          '裸模型只給一次性推理——無身分、無狀態',
          '判斷止於展示，無法抵達結算',
        ],
      },
      interface: {
        label: '介面',
        title: 'DeAgentAI 的介面',
        items: [
          '直連 API 呼叫專有模型，獲得結構化賽事判斷',
          'De(cision)Agent 將其封裝為綁定身分、有狀態的智慧體',
          '判斷接入經濟層結算，鏈上可驗證',
        ],
      },
    },
    path: {
      title: '技術路徑',
      intro: 'AliceAI 呼叫的不是裸模型，而是封裝好的「判斷—決策—結算」路徑。',
      steps: [
        { title: '專有模型', copy: 'DeAgentAI 模型輸出判斷' },
        { title: '智慧體封裝', copy: 'De(cision)Agent 自主智慧體' },
        { title: '經濟結算', copy: '價值可計量、鏈上可驗證' },
      ],
      noteBefore:
        '同一路徑可被任何需要可驗證判斷與可結算結果的系統複用。',
      noteStrong: 'AliceAI 是其首次外部驗證。',
    },
    results: {
      title: '成果',
      intro:
        '以下數字以真實日誌為準——發布前請核實；未確認項請留空，勿估算。',
      items: [
        { number: '2,000+', label: '賽事預測訊號', sublabel: '世界盃期間' },
        { number: 'XXk', label: '累計模型呼叫', sublabel: '待核實' },
        { number: '30k+', label: '日社群討論熱度', sublabel: '經由 AliceAI' },
      ],
    },
    product: {
      title: '產品內呈現',
      brandBadge: 'ALICEAI',
      screens: [
        { badge: 'SCREEN 01', title: '預測列表', subtitle: '佔位 · 待定' },
        { badge: 'SCREEN 02', title: '賽事詳情', subtitle: '佔位 · 待定' },
        { badge: 'SCREEN 03', title: '判斷與結算', subtitle: '佔位 · 待定' },
      ],
    },
    video: {
      title: '合作影片',
      playAria: '播放合作影片預覽',
      heading: '合作影片 · 佔位',
      caption: 'DeAgentAI × AliceAI 聯合訪談 / 案例片（16:9）',
    },
  },

  community: {
    hero: {
      titleBefore: '加入 DeAgentAI ',
      titleAccent: '社群',
      copy:
        '由開發者、使用者與建設者組成的社群，線上線下共同推動去中心化 AI 智慧體的採用。',
      social: ['X', 'Discord', 'Telegram', 'RootData'],
    },
    traction: {
      title: '真實的社群勢能',
      disclaimer: '數字以真實統計為準——發布前請核實。',
      stats: [
        {
          valueSuffix: 'k+',
          value: 30,
          title: '每日討論',
          footnote: '線上 · 經由 AliceAI',
        },
        {
          value: '香港 · 深圳 · 西安',
          title: '線下活動城市',
          footnote: 'W3Labs × Jisit Future',
        },
        {
          value: '多場',
          title: 'AI 主題線下活動',
          footnote: '觸達開發者與青年群體',
        },
      ],
    },
    snapshots: {
      title: '社群瞬間',
      filterAll: '全部年份 · 全部地區',
      sourcePhotosSuffix: ' 張源圖',
      yearAria: '快照年份',
      cityAria: '快照城市',
      years: ['2024', '2025', '2026'],
      cities: ['深圳 AI Meetup', '香港', '西安'],
      photoAltTemplate: '{city} DeAgentAI 社群活動',
    },
    conversation: {
      title: '加入全球對話',
      copy:
        'DeAgentAI 社群遍布全球。與建設者、開發者和使用者即時交流。',
      channels: [
        { code: 'TG', title: 'Telegram', language: '社群' },
        { code: 'chat', title: 'Discord', language: '開發者' },
      ],
    },
    ambassador: {
      title: '大使計畫',
      imageAlt: 'DeAgentAI 大使視覺',
      copy:
        '成為 DeAgentAI 生態的催化劑。加入倡導者社群，推動去中心化 AI 採用——在認知、教育與觸達中發揮關鍵作用。',
      cta: '即將推出',
    },
    blogs: {
      title: 'DeAgentAI 最新動態',
      posts: [
        { date: 'JUL 2026', title: '文章標題佔位 · 請替換為真實文章' },
        { date: 'JUL 2026', title: '文章標題佔位 · 請替換為真實文章' },
        { date: 'JUN 2026', title: '文章標題佔位 · 請替換為真實文章' },
        { date: 'JUN 2026', title: '文章標題佔位 · 請替換為真實文章' },
      ],
    },
  },

  buyback: {
    hero: {
      title: 'AIA 回購與銷毀追蹤',
      copy: '透明回購、可驗證銷毀，以及可持續代幣經濟——即時呈現。',
      metricsAria: '回購摘要',
      metrics: [
        { label: '累計支出', value: '$5,000,127' },
        { label: '累計購入 AIA', value: '47.62M' },
        { label: '平均回購價格', value: '$0.1050' },
        { label: '供應量削減', value: '4.76%', note: '相對初始供應量' },
        { label: '累計銷毀', value: '11M', accent: true },
      ],
    },
    burnProgress: {
      title: '銷毀進度',
      live: '即時',
      stats: [
        { label: '已購入 AIA 中已銷毀佔比', value: '23.1%' },
        { label: '已銷毀 AIA', value: '11M' },
        { label: '待銷毀 AIA', value: '36.62M' },
      ],
      trackAria: '已購入 AIA 中已銷毀 23.1%',
      progressLabels: ['11M', '47.62M'],
      noteStrong: '回購透過中心化交易所在鏈下執行。',
      note:
        '每 3 個月在鏈上銷毀一部分——交易雜湊見下方銷毀歷史，於每次季度銷毀事件後更新。',
    },
    burnHistory: {
      title: '銷毀歷史',
      columns: ['日期', '銷毀 AIA', '狀態', '銷毀雜湊'],
      statusConfirmed: '已確認',
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
      title: '回購機制如何運作',
      steps: [
        {
          title: '收入歸集',
          copy: '協議費用、AI 交易利潤與業務收入為回購提供資金',
        },
        {
          title: '劃撥至資金池',
          copy: '大部分收入自動流入專用回購基金',
        },
        {
          title: '市場收購',
          copy: '以充分透明與多簽安全執行市場收購',
        },
        {
          title: '永久銷毀',
          copy:
            '回購所得 AIA 存放於已揭露託管，並按公布的銷毀計畫銷毀',
        },
      ],
    },
    priceTrend: {
      title: 'AIA 價格走勢',
      periodAria: '圖表週期',
      periods: ['7D', '30D', '90D', 'ALL'],
      yAxis: ['$0.0800', '$0.0600', '$0.0400', '$0.0200', '$0.0000'],
      xAxis: ['5月15日', '6月6日', '6月29日', '7月21日', '8月12日'],
      legendPrice: 'AIA 價格',
      legendBurn: '銷毀事件',
      currentPrice: '$0.0741',
    },
    value: {
      title: '為何 AIA 重要',
      intro: '效用驅動的需求，遇上通縮型供給機制。',
      cards: [
        {
          title: '收入池',
          lineOne: '來自智慧體與企業的資金',
          lineTwo: '以 USDC、穩定幣與法幣支付',
        },
        {
          title: '回購引擎',
          lineOne: '程式化市場收購',
          lineTwo: '與智慧體網路增長相關',
        },
        {
          title: '質押層',
          lineOne: '自願鎖定供給',
          lineTwo: '獨立的稀缺性機制',
        },
        {
          title: '通縮設計',
          lineOne: '按計畫銷毀永久削減供給',
          lineTwo: '',
        },
      ],
    },
    flywheel: {
      title: '通縮飛輪',
      center: { token: 'AIA', label: '飛輪' },
      steps: [
        {
          number: '01',
          title: '智慧體部署',
          copy: '更多自主智慧體上線',
        },
        {
          number: '02',
          title: 'AIA 消耗',
          copy: '每個智慧體營運都需要 AIA',
        },
        {
          number: '03',
          title: '收入 → 銷毀',
          copy: '費用自動資助回購與銷毀',
        },
        {
          number: '04',
          title: '永久移除',
          copy: '代幣永久退出流通供給',
        },
      ],
    },
    outcome: {
      eyebrow: '結果',
      title: 'AIA 持有者與自主智慧體擴張同行受益。',
      copy:
        '隨著更多智慧體部署，協議活動上升。收入資助程式化回購，而按計畫銷毀永久削減可用供給。',
      strong: '可持續增長。價值對齊。結構性供給機制。',
    },
  },

  common: {
    brand: 'DeAgentAI',
    launchApp: '連接錢包',
    comingSoon: '即將推出',
    live: '即時',
    languageShort: '繁',
    readWhitePaper: '閱讀白皮書',
    placeholderTbd: '佔位 · 待定',
  },
}
