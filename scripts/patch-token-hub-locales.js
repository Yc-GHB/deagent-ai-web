const fs = require('fs')
const path = require('path')

const messagesDir = path.join(__dirname, '../src/i18n/messages')

function extractTokenHubBlock(source) {
  const start = source.indexOf('  tokenHub: {')
  let depth = 0
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] === '}') {
      depth -= 1
      if (depth === 0) return source.slice(start, index + 1)
    }
  }
  throw new Error('tokenHub block not found')
}

function replaceTokenHub(fileName, nextBlock) {
  const filePath = path.join(messagesDir, fileName)
  const source = fs.readFileSync(filePath, 'utf8')
  const currentBlock = extractTokenHubBlock(source)
  fs.writeFileSync(filePath, source.replace(currentBlock, nextBlock))
}

function toTraditional(text) {
  const mapping = {
    企业: '企業',
    个: '個',
    开: '開',
    发: '發',
    者: '者',
    结: '結',
    算: '算',
    务: '務',
    户: '戶',
    累计: '累計',
    较: '較',
    过: '過',
    在线: '在線',
    历: '履',
    历: '歷',
    稳: '穩',
    运: '運',
    环: '環',
    境: '境',
    级: '級',
    产: '產',
    转: '轉',
    与: '與',
    获: '獲',
    无: '無',
    调: '調',
    审计: '審計',
    仅: '僅',
    储: '儲',
    应: '應',
    响: '響',
    当: '當',
    复: '複',
    盖: '蓋',
    统: '統',
    换: '換',
    闭: '閉',
    协议: '協議',
    连: '連',
    铸: '鑄',
    签: '簽',
    邮: '郵',
    绑: '綁',
    随: '隨',
    销: '銷',
    现: '現',
    见: '見',
    费: '費',
    构: '構',
    独: '獨',
    产: '產',
    亿: '億',
    经: '經',
    鉴: '鑑',
    配额: '配額',
    抢: '搶',
    候补: '候補',
    单: '單',
    万: '萬',
    额: '額',
    输: '輸',
    请: '請',
    试: '試',
    暂: '暫',
    败: '敗',
    后: '後',
  }
  return Object.entries(mapping).reduce((result, [from, to]) => result.replaceAll(from, to), text)
}

const zhCnBlock = extractTokenHubBlock(fs.readFileSync(path.join(messagesDir, 'zh-CN.ts'), 'utf8'))
const zhTwBlock = toTraditional(zhCnBlock)
  .replace('AI Token Smart Router 集成示例', 'AI Token Smart Router 整合示例')
  .replace('集成', '整合')
  .replace('连接钱包，铸造 Key', '連接錢包，鑄造 Key')
  .replace('将 base_url 指向 Hub', '將 base_url 指向 Hub')
  .replace('集成示例', '整合示例')

const jaBlock = `  tokenHub: {
    hero: {
      title: "AI TOKEN SMART ROUTER",
      copyBefore: "すべてのフロンティアモデルに接続する単一エンドポイント。トークン課金、",
      copyStrongAia: "$AIA",
      copyMiddle: " または ",
      copyStrongUsdt: "$USDT",
      copyAfter: " で決済。",
      copyStrongClients: "8 社のエンタープライズ顧客",
      copyEnd: "に提供中。個人向けは近日公開。",
      kpis: {
        totalRequests: {
          label: "処理済みリクエスト総数",
          value: "1,284,739,261",
          delta: "▲ 8.4%",
          deltaNote: "過去 24 時間比",
        },
        tokensProcessed: {
          label: "処理済みトークン",
          value: "847.26",
          unit: "B",
          delta: "▲ 12.1%",
          deltaNote: "過去 24 時間比",
        },
        mini: [
          { label: "オンラインモデル", value: "38" },
          { label: "アクティブ API キー", value: "260+" },
          { label: "エンタープライズ顧客", value: "8" },
          { label: "30 日間稼働率", value: "99.97%" },
        ],
      },
    },
    enterprise: {
      eyebrow: "エンタープライズ実績",
      title: "まず企業、次に個人。",
      copy: "個人向け公開前から、このゲートウェイはエンタープライズ本番環境で稼働していました。",
      asideTitle: "同じゲートウェイ。同じ SLA。",
      asideCopy: "レート制限、フェイルオーバー、コール単位のメータリングはすべてエンタープライズ要件から生まれました。個人も同等の機能を利用できます。",
      facts: [
        { value: "8", label: "エンタープライズ顧客 · 本番稼働" },
        { value: "99.97%", label: "30 日間稼働率", highlight: true },
      ],
    },
    usage: {
      eyebrow: "利用データ",
      title: "透明な利用状況。コール単位で監査可能。",
      copy: "トークン課金、利用量は時間単位で集計。保存するのはトークン数とレイテンシのみ。リクエスト/レスポンス内容は保存しません。",
      recentCalls: {
        title: "最近のコール",
        updated: "毎時更新",
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
        title: "トークン / 時間 · 直近 24 時間",
        peak: "ピーク 61.4M",
        axis: ["00:00", "08:00", "16:00", "現在"],
      },
    },
    models: {
      eyebrow: "モデルカバレッジ",
      title: "単一 API キーで 38 モデル。",
      copy: "主要なクローズド/オープンモデルを OpenAI 互換プロトコルで統合。モデル切替は文字列 1 つ。",
      items: [
        { name: "Claude Opus 5", provider: "ANTHROPIC", price: "$15.00 / 1M out", volume: "Hub 流量 34%", volumePercent: 85, logo: "A", logoColor: "#d97757" },
        { name: "GPT-5.2", provider: "OPENAI", price: "$12.00 / 1M out", volume: "Hub 流量 26%", volumePercent: 65, logo: "O", logoColor: "#10a37f" },
        { name: "Gemini 3 Pro", provider: "GOOGLE", price: "$8.00 / 1M out", volume: "Hub 流量 17%", volumePercent: 42, logo: "G", logoColor: "#4285f4" },
        { name: "DeepSeek V4", provider: "DEEPSEEK", price: "$1.10 / 1M out", volume: "Hub 流量 12%", volumePercent: 30, logo: "D", logoColor: "#4d6bfe" },
        { name: "Grok 4", provider: "XAI", price: "$9.00 / 1M out", volume: "Hub 流量 6%", volumePercent: 15, logo: "X", logoColor: "#ffffff", logoTextColor: "#1a1a1a" },
        { name: "Qwen 3 Max", provider: "ALIBABA", price: "$2.40 / 1M out", volume: "Hub 流量 3%", volumePercent: 8, logo: "Q", logoColor: "#7c3aed" },
        { name: "Llama 4 405B", provider: "META · OSS", price: "$0.90 / 1M out", volume: "Hub 流量 1.5%", volumePercent: 4, logo: "M", logoColor: "#0668e1" },
      ],
      more: {
        name: "+31 モデル以上",
        provider: "MISTRAL · COHERE · KIMI · ...",
        price: "-",
        volume: "Hub 流量 6.5%",
        volumePercent: 18,
        logo: "+",
        logoColor: "#6b6b73",
      },
    },
    integration: {
      eyebrow: "インテグレーション",
      title: "3 行のコードで移行。",
      codeFilename: "client.py",
      codeAria: "AI Token Smart Router 連携サンプル",
      steps: [
        {
          title: "ウォレット接続、キー発行",
          copy: "ウォレット署名でキーを発行。メール登録不要。キーはアドレスに紐づき、いつでもローテーション/失効可能。",
        },
        {
          title: "base_url を Hub に設定",
          copy: "OpenAI SDK と完全互換。既存コードの変更は不要。Python、TypeScript、Go、cURL に対応。",
        },
        {
          title: "$AIA または $USDT でチャージ",
          copyBefore: "$AIA チャージで ",
          copyStrong: "15% 割引",
          copyAfter: "。残高と利用量はコンソールでリアルタイム確認、支出アラートも利用可能。",
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
      eyebrow: "エコシステムでの役割",
      title: "自社エージェントのために最初から構築。",
      copy: "AI Token Smart Router は新製品ではなく、自社エージェントが最初から利用してきた推論レイヤー。内部 8.4 億コール処理後、外部開発者に公開。",
      steps: [
        { number: "01", title: "エージェント", copy: "Sentry を含む全エージェントの推論は Hub 経由。" },
        { number: "02", title: "ルーティング", copy: "38 モデル間で自動ルーティング/フェイルオーバー。レイテンシ・コスト・可用性で重み付け。" },
        { number: "03", title: "メータリング", copy: "トークン単位で計測。リクエスト/レスポンス本文は保存せず、件数とレイテンシのみ保持。" },
        { number: "04", title: "オープンアクセス", copy: "同じゲートウェイと SLA を第三者開発者に直接提供。" },
      ],
      diagram: {
        callersLabel: "CALLERS",
        gatewayLabel: "UNIFIED GATEWAY",
        modelsLabel: "MODEL LAYER",
        hubTitle: "AI Token Smart Router",
        hubSubtitle: "OpenAI 互換 · 直結・自社構築",
        hubBullets: [
          "統一認証とクォータ",
          "レイテンシ・コスト・可用性でルーティング",
          "トークン単位計測、内容は非保存",
        ],
        hubStats: [
          { value: "38", label: "オンラインモデル" },
          { value: "99.97%", label: "30 日間稼働率" },
        ],
        callers: [
          { title: "エンタープライズ顧客", copy: "8 · 本番稼働中" },
          { title: "DeAgentAI エージェント", copy: "Sentry と全社内エージェント" },
          { title: "個人開発者", copy: "近日公開", badge: "NEW" },
        ],
        models: [
          "Claude Opus 5",
          "GPT-5.2",
          "Gemini 3 Pro",
          "DeepSeek V4",
          "Grok 4 · Qwen 3 Max",
          "+31 モデル以上",
        ],
      },
    },
    waitlist: {
      title: "最初にお知らせ",
      copy: "ウェイトリスト登録者は優先アクセスと 100 万トークンの初期クレジットを獲得。",
      emailAria: "メールアドレス",
      emailPlaceholder: "メールアドレスを入力",
      submit: "ウェイトリストに参加",
      submitting: "送信中…",
      success: "ウェイトリストに登録されました",
      alreadyJoined: "すでに登録済みです",
      invalid: "有効なメールアドレスを入力してください",
      rateLimited: "試行回数が多すぎます。しばらくしてから再試行してください",
      unavailable: "ウェイトリストは一時的に利用できません",
      error: "送信に失敗しました。後でもう一度お試しください",
    },
  }`

const ruBlock = `  tokenHub: {
    hero: {
      title: "AI TOKEN SMART ROUTER",
      copyBefore: "Один endpoint для всех frontier-моделей. Оплата за токен, расчёт в ",
      copyStrongAia: "$AIA",
      copyMiddle: " или ",
      copyStrongUsdt: "$USDT",
      copyAfter: ". Обслуживаем ",
      copyStrongClients: "8 enterprise-клиентов",
      copyEnd: ", скоро откроем доступ для частных разработчиков.",
      kpis: {
        totalRequests: { label: "ВСЕГО ОБРАБОТАНО ЗАПРОСОВ", value: "1,284,739,261", delta: "▲ 8.4%", deltaNote: "за 24 ч" },
        tokensProcessed: { label: "ОБРАБОТАНО ТОКЕНОВ", value: "847.26", unit: "B", delta: "▲ 12.1%", deltaNote: "за 24 ч" },
        mini: [
          { label: "МОДЕЛЕЙ ОНЛАЙН", value: "38" },
          { label: "АКТИВНЫХ API KEY", value: "260+" },
          { label: "ENTERPRISE-КЛИЕНТОВ", value: "8" },
          { label: "UPTIME 30 ДНЕЙ", value: "99.97%" },
        ],
      },
    },
    enterprise: {
      eyebrow: "Enterprise Track Record",
      title: "Сначала enterprise, затем частные пользователи.",
      copy: "До открытия для частных пользователей шлюз уже работал в enterprise production.",
      asideTitle: "Тот же gateway. Тот же SLA.",
      asideCopy: "Rate limits, failover и metering per call родились из enterprise-требований. Частные пользователи получают то же — без downgraded tier.",
      facts: [
        { value: "8", label: "ENTERPRISE-КЛИЕНТОВ · LIVE" },
        { value: "99.97%", label: "UPTIME 30 ДНЕЙ", highlight: true },
      ],
    },
    usage: {
      eyebrow: "USAGE DATA",
      title: "Прозрачное использование, аудит per call.",
      copy: "Биллинг per token, агрегация почасово. Храним только counts и latency — never request/response content.",
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
      chart: { title: "TOKENS / HOUR · LAST 24H", peak: "PEAK 61.4M", axis: ["00:00", "08:00", "16:00", "NOW"] },
    },
    models: {
      eyebrow: "MODEL COVERAGE",
      title: "38 моделей за одним API key.",
      copy: "Все major closed/open models в одном OpenAI-compatible протоколе. Смена модели — одна строка.",
      items: [
        { name: "Claude Opus 5", provider: "ANTHROPIC", price: "$15.00 / 1M out", volume: "34% HUB VOLUME", volumePercent: 85, logo: "A", logoColor: "#d97757" },
        { name: "GPT-5.2", provider: "OPENAI", price: "$12.00 / 1M out", volume: "26% HUB VOLUME", volumePercent: 65, logo: "O", logoColor: "#10a37f" },
        { name: "Gemini 3 Pro", provider: "GOOGLE", price: "$8.00 / 1M out", volume: "17% HUB VOLUME", volumePercent: 42, logo: "G", logoColor: "#4285f4" },
        { name: "DeepSeek V4", provider: "DEEPSEEK", price: "$1.10 / 1M out", volume: "12% HUB VOLUME", volumePercent: 30, logo: "D", logoColor: "#4d6bfe" },
        { name: "Grok 4", provider: "XAI", price: "$9.00 / 1M out", volume: "6% HUB VOLUME", volumePercent: 15, logo: "X", logoColor: "#ffffff", logoTextColor: "#1a1a1a" },
        { name: "Qwen 3 Max", provider: "ALIBABA", price: "$2.40 / 1M out", volume: "3% HUB VOLUME", volumePercent: 8, logo: "Q", logoColor: "#7c3aed" },
        { name: "Llama 4 405B", provider: "META · OSS", price: "$0.90 / 1M out", volume: "1.5% HUB VOLUME", volumePercent: 4, logo: "M", logoColor: "#0668e1" },
      ],
      more: { name: "+31 моделей", provider: "MISTRAL · COHERE · KIMI · ...", price: "-", volume: "6.5% HUB VOLUME", volumePercent: 18, logo: "+", logoColor: "#6b6b73" },
    },
    integration: {
      eyebrow: "INTEGRATION",
      title: "Миграция в три строки кода.",
      codeFilename: "client.py",
      codeAria: "Пример интеграции AI Token Smart Router",
      steps: [
        { title: "Connect wallet, mint a key", copy: "Mint key через подпись кошелька; email не нужен. Keys привязаны к адресу, rotate/revoke anytime." },
        { title: "Point base_url to the hub", copy: "Полная совместимость с OpenAI SDK. Python, TypeScript, Go, cURL." },
        { title: "Top up in $AIA or $USDT", copyBefore: "Top up $AIA — ", copyStrong: "15% discount", copyAfter: ". Balance и usage в консоли real-time, spend alerts." },
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
      copy: "AI Token Smart Router — inference layer наших agents с первого дня. После 840M internal calls открыли external developers.",
      steps: [
        { number: "01", title: "Agents", copy: "Every inference from Sentry и всех agents — через Hub." },
        { number: "02", title: "Routing", copy: "Auto routing/failover across 38 models by latency, cost, availability." },
        { number: "03", title: "Metering", copy: "Metered per token. Bodies never persisted — only counts & latency." },
        { number: "04", title: "Open Access", copy: "Same gateway & SLA для third-party developers." },
      ],
      diagram: {
        callersLabel: "CALLERS",
        gatewayLabel: "UNIFIED GATEWAY",
        modelsLabel: "MODEL LAYER",
        hubTitle: "AI Token Smart Router",
        hubSubtitle: "OpenAI-compatible · direct, self-built",
        hubBullets: ["Unified auth and quota", "Routed by latency, cost, availability", "Metered per token, content never stored"],
        hubStats: [{ value: "38", label: "models online" }, { value: "99.97%", label: "30-day uptime" }],
        callers: [
          { title: "Enterprise clients", copy: "8 · live in production" },
          { title: "DeAgentAI agents", copy: "Sentry and every in-house agent" },
          { title: "Individual developers", copy: "Opening soon", badge: "NEW" },
        ],
        models: ["Claude Opus 5", "GPT-5.2", "Gemini 3 Pro", "DeepSeek V4", "Grok 4 · Qwen 3 Max", "+31 more models"],
      },
    },
    waitlist: {
      title: "Узнать первым",
      copy: "Участники waitlist получают приоритетный доступ и 1M стартовых token credits.",
      emailAria: "Email",
      emailPlaceholder: "Ваш email",
      submit: "В waitlist",
      submitting: "Отправка…",
      success: "Вы в списке",
      alreadyJoined: "Вы уже в списке",
      invalid: "Введите корректный email",
      rateLimited: "Слишком много попыток. Подождите и повторите",
      unavailable: "Waitlist временно недоступен",
      error: "Не удалось отправить. Попробуйте позже",
    },
  }`
replaceTokenHub('zh-TW.ts', zhTwBlock)
replaceTokenHub('ja.ts', jaBlock)
replaceTokenHub('ru.ts', ruBlock)

console.log('tokenHub locales patched')
