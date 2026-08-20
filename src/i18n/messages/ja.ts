/** 日语文案字典 */
import type { LocaleMessages } from './types'

export const ja: LocaleMessages = {
  nav: {
    aria: {
      home: 'DeAgentAI ホーム',
      primary: 'メインナビゲーション',
      toggle: 'ナビゲーションを切り替え',
      logoAlt: 'DeAgentAI',
    },
    languageShort: 'JA',
    cta: 'ウォレット接続',
    wrongNetwork: 'ネットワークが正しくありません',
    getAiaModal: {
      title: 'GET $AIA',
      closeAria: '閉じる',
      backAria: '戻る',
      cexTitle: 'Swap via CEX',
      cexDescription: '中央集権取引所で取引',
      pairLabel: 'AIA / USDT',
    },
    items: [
      { id: 'HOME', label: 'ホーム', href: '/' },
      { id: 'PRODUCT', label: 'プロダクト', href: '/#product' },
      { id: 'ECOSYSTEM', label: 'エコシステム', href: '/#ecosystem' },
      { id: '$AIA', label: '$AIA', href: '/#partners' },
      { id: 'LEARN', label: '学ぶ', href: '/#learn' },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: 'エージェント',
            items: [
              {
                title: 'AI Agents',
                description: '常時稼働エージェントをデプロイ',
                href: '/agents',
              },
              {
                title: 'CorrAI',
                description: '自律型ストラテジーエージェント',
                href: 'https://corr.ai/en',
                external: true,
              },
              {
                title: 'AlphaX',
                description: '自律型トレーディングエージェント',
                href: '/alphax',
              },
            ],
          },
          {
            title: 'インフラ',
            items: [
              {
                title: 'AI Token Hub',
                description: '1つの API ですべてのモデル',
                href: '/token-hub',
              },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: '基盤として構築',
            items: [
              {
                title: 'ソリューション',
                description: 'モデル能力を API として提供',
                href: '/solutions',
              },
              {
                title: 'インテグレーション',
                description: 'AliceAI とパートナー',
                href: '/integrations',
              },
            ],
          },
        ],
      },
      $AIA: {
        columns: [
          {
            title: '$AIA',
            items: [
              { title: 'AIA を入手', href: '#get-aia' },
              { title: 'バイバックダッシュボード', href: '/buyback' },
              {
                title: 'トークノミクス',
                href: 'https://deagentai.gitbook.io/deagentai',
                external: true,
              },
            ],
          },
        ],
      },
      LEARN: {
        columns: [
          {
            title: '学ぶ',
            items: [
              {
                title: 'コミュニティ',
                description: 'イベントとミートアップ',
                href: '/community',
              },
              {
                title: 'ホワイトペーパー',
                description: '論文を読む',
                href: 'https://deagentai.gitbook.io/deagentai',
                external: true,
              },
              {
                title: 'MiCA ホワイトペーパー',
                description: 'コンプライアンス',
                href: 'https://deagent.ai/micar-whitepaper.pdf',
                external: true,
              },
              {
                title: 'リソース',
                description: 'ドキュメントなど',
                href: 'https://medium.com/@deagent.ai',
                external: true,
              },
            ],
          },
        ],
      },
    },
  },

  footer: {
    logoAlt: 'DeAgentAI',
    tagline:
      'オンチェーン世界のための信頼できる AI エージェント基盤 — 自律知能にアイデンティティ、継続性、コンセンサスを。',
    products: {
      title: 'プロダクト',
      links: [
        { label: 'AI Agents', badge: 'NEW', href: '/agents' },
        { label: 'AlphaX', href: '/alphax' },
        { label: 'CorrAI', href: 'https://corr.ai/en' },
        { label: 'AI Token Hub', href: '/token-hub' },
      ],
    },
    community: {
      title: 'コミュニティ',
      social: [
        {
          label: 'Discord',
          href: 'https://discord.com/invite/officialdeagentai',
        },
        { label: 'Telegram', href: 'https://t.me/officialdeagentai' },
        { label: 'X', href: 'https://x.com/DeAgentAI' },
      ],
    },
    copyright: 'Copyright © 2026 DeAgentAI network. All right reserved.',
  },

  home: {
    hero: {
      titleLine1: '検証可能なインテリジェンス',
      titleLine2: 'すべてのエージェントへ',
      ctaExplore: 'プロダクトを見る',
      ctaLearn: '技術を学ぶ',
    },
    trust: {
      eyebrow: 'THE TRUST LAYER',
      title: 'エージェント協働の信頼基盤',
      diagramAlt: 'DeAgentAI 信頼インフラ図',
      orbitAria: '継続性、コンセンサス、アイデンティティ',
      labels: {
        continuity: '継続性',
        consensus: 'コンセンサス',
        identity: 'アイデンティティ',
      },
      cards: [
        {
          title: 'De(cision)Agent',
          description: 'アイデンティティ、継続性、コンセンサス — 信頼できるエージェントの基盤。',
        },
        {
          title: '自社開発モデル',
          description: 'フィードバック学習の独自モデルにより、判断を再現・校正可能にします。',
        },
        {
          title: 'A2A / MCP',
          description: '業界標準に対応し、クロスフレームワーク協働とツールアクセスを実現。',
        },
        {
          title: 'MPC',
          description: 'MPC によりトラストレス実行を可能にし、協働を安全にオンチェーンで決済。',
        },
      ],
    },
    product: {
      eyebrow: 'PRODUCT',
      title: '常にそこにいるインテリジェンス',
      screenerAlt: 'オンチェーン資産スクリーナー',
      heading: 'あなたの条件に合わせたデイリーマーケットスクリーナー',
      capabilities: [
        {
          title: 'ワンタップデプロイ',
          copy: '選択、設定、デプロイ。ホスティングと永続化はプロトコルが担当 — インフラに触れる必要はありません。',
        },
        {
          title: '見えない鍵',
          copy: '鍵はアイデンティティ経由で注入され、プロトコル下に隠蔽。アカウント単位のサーキットブレーカーが連鎖しません。',
        },
        {
          title: '推論はすべて計量',
          copy: 'すべての推論はコール単位で記録され、消費は決済に直結。透明で監査可能、沈黙しません。',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'ECOSYSTEM & TECHNOLOGY',
      title: '判断を決済可能な価値へ',
      technologySteps: [
        {
          title: '自社開発モデル',
          lines: ['フィードバック駆動の学習', '信頼性の高い判断出力'],
        },
        {
          title: 'エージェント包装',
          lines: ['De(cision)Agent フレームワーク', '自律的意思決定'],
        },
        {
          title: '経済決済',
          lines: ['価値の計量', 'オンチェーンで検証可能'],
        },
      ],
      scenarios: [
        {
          title: 'CorrAI — 自律型ストラテジーエージェント',
          copy: 'CorrAI はコンセンサス、アイデンティティ、継続性のもと De(cision)Agent フレームワーク内で稼働します。DeAgentAI の独自モデルを呼び出して戦略判断を生成し、常時稼働する自律戦略エージェントとして結晶化 — オンチェーン判断に検証可能な戦略的継続性を初めて与えます。',
        },
        {
          title: 'AliceAI — 試合予測エージェント',
          copy: 'AliceAI の試合予測は DeAgentAI の独自モデル上で直接実行されます。モデルが試合判断を出力し、AliceAI が自律決定・経済層決済のエージェントとして結晶化します。CorrAI と同じ基盤スタック — 一つのインテリジェンスが異なるシナリオへ流れます。',
        },
      ],
      agentCards: {
        aria: 'DeAgentAI エージェント例',
        items: [
          {
            chip: 'Strategy · Verified',
            name: 'CorrAI',
            role: '自律型ストラテジーエージェント',
            logoAlt: 'CorrAI',
          },
          {
            chip: 'Sports · Reuse',
            name: 'AliceAI',
            role: '試合予測エージェント',
            logoAlt: 'AliceAI',
          },
        ],
      },
      compounding: {
        title: '自ら複利で積み上がる能力',
        copyBefore:
          'アイデンティティ、継続性、コンセンサス、独自モデル、エージェント包装、経済決済 — どの層も孤立せず、前の層の上に再利用・積層されます。',
        copyStrong:
          '新しい層はスタック全体の能力を再拡張し、再利用するほど次のエージェントはゼロコストに近づきます。',
        copyAfter:
          ' これは壁ではなく、自己複利のシステムです。稼働が長いほど差は広がります。',
      },
    },
    voices: {
      eyebrow: 'IN THEIR WORDS',
      title: 'チームとエコシステムの声',
      gridAria: '推薦コメントのプレースホルダー',
    },
    partners: {
      eyebrow: 'PARTNERSHIP & FUNDING',
      title: '主要エコシステムパートナーとともに構築',
    },
    launch: {
      title: 'ウォレットを接続し、最初のエージェントをデプロイ',
      copy: '鍵の管理は不要 — 接続して始めるだけ。信頼できるインテリジェンス基盤の上に構築。',
      ctaLaunch: 'ウォレット接続',
      ctaWhitepaper: 'ホワイトペーパーを読む',
    },
  },

  agents: {
    hero: {
      beta: 'IN BETA · ウォレット接続で開始',
      title: 'AI Agents',
      description:
        'ワンクリックでデプロイ — 独自 API キーは不要。すべての推論は AI Token Hub 経由で決済され、$AIA または $USDT で支払います。最初のエージェントは Sentry。Hyperliquid 市場全体を 24/7 監視します。',
      kpis: [
        {
          label: '対象マーケット',
          value: 308,
          footnote: 'Crypto 198 · Tradfi 110',
        },
        {
          label: 'デプロイ時間',
          value: 60,
          unit: 's',
          footnote: 'ウォレットのみ · メール不要 · カード不要',
        },
        {
          value: 5,
          footnote: 'Hyperliquid DEX',
        },
        {
          value: 24,
          unitSuffix: '/7',
          footnote: '常時稼働',
        },
        {
          valueLabel: '$AIA / $USDT',
          footnote: '決済',
        },
      ],
    },
    sentry: {
      eyebrow: 'CORE CAPABILITY',
      title: 'Sentry がスキャン。判断はあなたが。',
      intro:
        '条件はあなたが設定し、Sentry は実行と事実の提示のみ。以下は Hyperliquid 市場のライブデータです。条件を変えるとマッチは即座に再計算されます。',
      filters: {
        title: 'フィルター',
        live: 'Live',
        presetTitle: 'プリセット戦略',
        fineTuneTitle: 'しきい値の微調整',
        ranges: [
          {
            label: '最小 24h 出来高',
            value: '$3M',
            aria: '最小日次出来高',
          },
          {
            label: 'ファンディング APR（絶対値）',
            value: '≥ 1.5%',
            aria: 'ファンディング年率',
          },
          {
            label: '最小 24h 変動',
            value: '0%',
            aria: '最小変動',
          },
        ],
        outlierGuard: {
          title: '外れ値ガード',
          description: '決済が不安定になり得る極端な乖離をスキップします。',
        },
      },
      strategies: [
        {
          title: 'ファンディング裁定',
          description: 'ベースラインから大きく乖離したファンディング（双方向）',
          count: '47',
        },
        {
          title: '低回転',
          description: 'OI が出来高を大きく上回り、回転率が低い',
          count: '52',
        },
        {
          title: '出来高急増',
          description: '出来高と価格が同時に拡大',
          count: '8',
        },
        {
          title: 'プレミアム乖離',
          description: 'マーク価格がオラクルから乖離',
          count: '78',
        },
      ],
      matches: {
        title: '本日のマッチ',
        tabs: ['すべて', 'Crypto', 'Tradfi'],
        summary: {
          count: '47',
          text: '件のマーケットがマッチ - ファンディング裁定',
          outlierNoteBefore: '外れ値ガードが除外 ',
          outlierCount: '2',
          outlierNoteAfter: ' 件（極端なファンディングまたは薄い流動性）',
        },
        columns: [
          'マーケット',
          'ファンディング APR',
          '24h 変動',
          '出来高',
          '建玉',
          'プレミアム',
        ],
        categoryLabels: {
          Crypto: 'Crypto',
          Tradfi: 'Tradfi',
        },
        status: {
          empty: '現在のフィルターに一致するマーケットはありません',
          stale: 'スナップショットが 5 分以上前です',
          partial: '部分スナップショット',
          truncated: '上位結果のみ表示',
          loading: 'ライブマーケットを読み込み中…',
          unavailable: '市場データは一時的に利用できません',
        },
      },
    },
    dailyPush: {
      badge: '近日公開',
      title: 'デイリープッシュ',
      copy: 'マッチは毎日決まった時刻に配信され、プラットフォームを開く必要はありません。市場に何もなくても送信します。作られたシグナルも、沈黙もありません。',
      features: [
        {
          title: 'スケジュール配信',
          description: 'プッシュ時刻は設定可能',
        },
        { title: '空でも送信', description: '沈黙の日はありません' },
        {
          title: '長期メモリを使用',
          description: 'あなたの好みで順位付け',
        },
        { title: 'フォローアップ質問', description: 'どの市場でも深掘り' },
      ],
      channels: 'Telegram · In-app',
      bot: {
        name: 'Sentry BOT',
        time: '本日 09:00',
        message:
          '本日、ファンディング裁定の条件に 47 件のマーケットがマッチしました。強度上位 3 件：',
        assets: [
          {
            symbol: 'XMR',
            category: 'Crypto',
            note: 'ロングが徴収',
            change: '+20.93%',
          },
          {
            symbol: 'CASHCAT',
            category: 'Crypto',
            note: 'ショートが徴収',
            change: '+42.72%',
          },
          {
            symbol: 'KAITO',
            category: 'Crypto',
            note: 'ショートが徴収',
            change: '-295.73%',
          },
        ],
        memory: {
          title: '長期メモリ',
          copy: '前回 XMR のファンディング構造について質問されました — 本日リストに再登場しています。',
        },
      },
    },
    comparison: {
      eyebrow: 'KEY DIFFERENCE',
      title: 'API キーは不要',
      intro:
        'オープンソースのエージェントフレームワークは強力ですが、モデル基盤への登録、カード登録、キー取得、設定ファイルへの貼り付けが求められます。ウォレットネイティブなユーザーにとって、その各ステップが離脱点です。',
      openSource: {
        title: 'オープンソースエージェントを自分でデプロイする場合',
        steps: [
          'モデル基盤に登録し、メール認証',
          'クレジットカードを追加し、本人確認',
          'API キーを作成してコピー',
          '設定ファイルを探し、キーとモデル名を入力',
          'サーバーを用意し、監視と再起動を担当',
          'キー漏洩リスクはすべて自分持ち',
        ],
        footerBefore: 'およそ ',
        footerStrong: '30〜90 分',
        footerAfter: '、加えて有効なクレジットカード',
      },
      deagentai: {
        title: 'DeAgentAI でのデプロイ',
        steps: [
          'ウォレット接続、サインイン',
          '$AIA または $USDT でクレジットをチャージ',
          'エージェントを選び、条件を設定',
          'デプロイをクリック、デイリー実行が開始',
        ],
        footer: '約 60 秒。メールもクレジットカードも不要。',
      },
    },
    credit: {
      eyebrow: 'CREDIT MECHANICS',
      title: '残高ゼロでも沈黙しない',
      intro:
        '常時稼働エージェントが静かになるのは最悪の体験です — ユーザーは製品が壊れたと思い込みます。スクリーニングは純粋な計算でトークンを消費しないため、残高ゼロでもデイリープッシュは届きます。書面の説明だけが付きません。',
      levels: [
        {
          status: 'NORMAL',
          copy: 'デフォルト。フルプッシュとフォローアップ。スクリーニングは通常どおり。',
        },
        {
          status: 'LOW',
          copy: '低コストモデルに切替。同じ内容に加え、チャージ案内。',
        },
        {
          status: 'CRITICAL',
          copy: 'プッシュのみ。残クレジットを伸ばすためフォローアップチャットはオフ。',
        },
        {
          status: 'EMPTY',
          copy: '説明は停止。生データは配信 — スクリーニングはトークンを消費しません。',
        },
      ],
    },
    memory: {
      eyebrow: 'LONG-TERM MEMORY',
      title: '何を持っているかではなく、誰であるか',
      intro:
        'エージェントはメモリで行動を制約し、何を買いたいかを推測しません。金額とポジションは毎回ライブ照会し、メモリからは読みません。意味検索は曖昧一致であり、取引では桁一つが実損になります。',
      remembered: {
        title: '記憶する',
        badge: '好みと判断',
        copy: '主観的で曖昧、時間をまたぐ判断 — まさにモデルが得意とする領域。',
        items: [
          { before: '暗号資産のみ、', strong: '株式はスキップ', after: '' },
          {
            before: 'マイナスファンディングを好み、',
            strong: '高レバレッジを避ける',
            after: '',
          },
          {
            before: '似たセットアップで追撃して失敗し、',
            strong: '押し目を待つよう指示',
            after: '',
          },
          {
            before: '明示的に除外：',
            strong: '上場 7 日未満の市場',
            after: '',
          },
          {
            before: 'プッシュを読む時間帯は',
            strong: 'アジア時間',
            after: '',
          },
        ],
      },
      neverStored: {
        title: '保存しない',
        badge: '金額とポジション',
        copy: '常にライブ照会し、毎回再取得。キャッシュも推論もしません。',
        items: [
          'ポジションの取得単価',
          '現在のサイズと方向',
          'ウォレット残高',
          '未実現損益',
          '過去の約定価格',
        ],
      },
    },
    deploy: {
      eyebrow: 'HOW TO DEPLOY',
      title: '3 ステップ、60 秒',
      steps: [
        {
          title: 'ウォレットを接続',
          text: '署名がログインです。メールもパスワードも不要。アイデンティティは内部 UID で運ばれ、複数ウォレットでクレジットとメモリを後から共有できます。',
        },
        {
          title: 'エージェントを選び、条件を設定',
          text: '4 つのプリセット戦略はすぐ使え、しきい値は調整可能。条件は制約です。エージェントはあなたが描いた境界の中でのみ動きます。',
        },
        {
          title: 'デプロイをクリック',
          text: 'エージェントは日次スケジュールで稼働を開始し、結果はアプリ内または Telegram にプッシュされます。利用量と残高はコンソールでコール単位に監査できます。',
        },
      ],
      codeSample: {
        filename: 'agent.py',
        commentRuntime:
          '# Agent runtime: Agno AgentOS, model routed via AI Token Hub',
        agentName: 'Hyperliquid Screener',
        instruction: 'You are a market screener, not an advisor.',
        commentScreening:
          '# Screening is pure computation, zero token cost',
      },
    },
    waitlist: {
      eyebrow: 'EARLY ACCESS',
      title: 'いち早く知る',
      copy: 'ウェイトリスト登録者は優先アクセスと 100 万トークンの初期クレジットを受け取れます。',
      emailAria: 'メールアドレス',
      emailPlaceholder: 'メールアドレス',
      submit: 'ウェイトリストに参加',
      submitting: '登録中…',
      success: 'リストに追加されました',
      alreadyJoined: 'すでにリストに登録済みです',
      invalid: '有効なメールアドレスを入力してください',
      rateLimited: '試行が多すぎます。しばらくしてから再度お試しください。',
      unavailable: 'ウェイトリストは一時的に利用できません',
      error: '現在登録できません。もう一度お試しください。',
    },
  },

  alphax: {
    hero: {
      title: 'AlphaX - ',
      titleAccent: '完全自律トレーディングエージェント',
      copyBefore:
        'AlphaX は DeAgentAI のフィードバック駆動学習で孵化した最初の独自 AI モデルであり、',
      copyStrong1: 'De(cision)Agent フレームワーク',
      copyMid:
        ' 内でコンセンサス、アイデンティティ、継続性のもと稼働します。独自モデルから予測シグナルを生成し、',
      copyStrong2: '完全自律トレーディングエージェント',
      copyAfter:
        ' として機能します — 意思決定支援ツールから、独立稼働するトレーディング知能へと進化します。',
      tagsAria: 'AlphaX プロダクト属性',
      tags: [
        'フィードバック学習',
        '自律',
        'De(cision)Agent フレームワーク',
        'オンチェーン監査可能',
      ],
    },
    does: {
      title: 'AlphaX ができること',
      intro:
        'AlphaX は独自モデルの知能と自律実行、検証可能な成果を組み合わせます。',
      capabilities: [
        {
          title: '独自モデルシグナル',
          copy: 'フィードバック学習に基づく独自モデルで予測シグナルを生成し、ユーザーフィードバックで継続的に校正。変動市場でも信頼性と適応性を維持します。',
        },
        {
          title: '完全自律トレーディング',
          copy: '意思決定支援を超えて — AlphaX は市場を監視し、戦略をライブで調整し、暗号市場が求める速度と精度で独立執行します。',
        },
        {
          title: 'オンチェーンで監査可能な実績',
          copy: 'De(cision)Agent フレームワーク上のエージェントとして、判断はアイデンティティと継続性に従い、結果はオンチェーンで監査・検証できます。',
        },
      ],
    },
    gallery: {
      title: 'プロダクトギャラリー',
      placeholder: 'Placeholder · TBD',
      items: [
        { screen: 'SCREEN 01', title: 'シグナルダッシュボード' },
        { screen: 'SCREEN 02', title: '自律執行' },
        { screen: 'SCREEN 03', title: '記録とポジション' },
        { screen: 'SCREEN 04', title: 'フィードバック学習' },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: "AI TOKEN HUB",
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
      codeAria: "AI Token Hub 連携サンプル",
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
      copy: "AI Token Hub は新製品ではなく、自社エージェントが最初から利用してきた推論レイヤー。内部 8.4 億コール処理後、外部開発者に公開。",
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
        hubTitle: "AI Token Hub",
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
  },

  solutions: {
    hero: {
      title: '検証可能な判断を、API として呼ぶ',
      copyBefore:
        'DeAgentAI は独自モデルを De(cision)Agent フレームワークの下に包装し、標準 API として公開します。コンテキストを入力すると、検証可能な信頼度と根拠付きの構造化判断が返ります。判断はフレームワーク内で ',
      copyStrong1: 'アイデンティティに紐づき',
      copySep1: '、',
      copyStrong2: '状態が記録され',
      copySep2: '、',
      copyStrong3: 'コンセンサスで検証',
      copyAfter:
        ' されます。あなたが呼ぶのは生の推論ではなく、追跡可能で再現可能な判断単位です。',
      ctaContact: '統合について問い合わせ',
      ctaLearn: '詳しく見る',
    },
    how: {
      title: '1 コール、3 つの保証',
      intro:
        '呼び出しパイプラインは 3 層にカプセル化されています：Model → Agent → Settlement。各層が検証可能な保証を提供し、一つの信頼できるコールに複利します。統合するのは裸のモデル API ではなく、検証可能な判断単位です。',
      guarantees: [
        {
          step: '01 · MODEL',
          title: '自社開発モデル',
          copy: 'フィードバックループで学習した独自モデルが構造化判断と信頼度を出力。同一入力で再現可能であり、ブラックボックスの確率出力ではありません。',
        },
        {
          step: '02 · AGENT',
          title: 'フレームワーク包装',
          copy: 'De(cision)Agent フレームワークがアイデンティティを結び、状態を記録し、コンセンサスチェックを適用。判断をステートフルなインスタンスに包装します。',
        },
        {
          step: '03 · SETTLEMENT',
          title: '経済決済',
          copy: '判断出力は経済層決済に直結し、オンチェーンで計量・検証可能。判断と価値の間にギャップはありません。',
        },
      ],
    },
    capabilities: {
      title: 'API 能力',
      items: [
        {
          title: '構造化判断',
          copy: '出力は構造化判断＋信頼度＋根拠。コンセンサス下でフィードバックにより継続校正され、同一入力で再現可能。ランダムドリフトではありません。',
        },
        {
          title: 'ステートフルエージェントインスタンス',
          copy: '各コールは一意のアイデンティティとオンチェーンメモリに結び、判断に状態と継続性を与えます。スコープ内で自律し、完全に追跡可能。',
        },
        {
          title: '経済決済 API',
          copy: '判断は経済層決済に直結し、計量され検証可能なオンチェーン結果を生みます。判断と価値の間にギャップはありません。',
        },
      ],
    },
    useCases: {
      title: 'ユースケース',
      intro:
        '検証可能な判断と、決済可能なオンチェーン結果が必要なシステムは、この API を再利用できます。',
      items: [
        {
          number: '01',
          title: '予測とシグナル',
          copy: '試合、市場、イベント予測：1 コールで構造化判断を取得し、判断とプロダクトを分離。',
        },
        {
          number: '02',
          title: '戦略と執行エージェント',
          copy: '判断から戦略を自律執行。オンチェーン監査可能で、経済層で決済。',
        },
        {
          number: '03',
          title: 'オンチェーンガバナンス',
          copy: 'DAO とプロトコル向けの中立で追跡可能な判断源。提案分析と自動執行を支えます。',
        },
        {
          number: '04',
          title: '垂直意思決定システム',
          copy: 'ドメインコンテキストを注入し、決済可能な判断出力を得て、既存システムへ迅速に統合。',
        },
      ],
    },
    integration: {
      title: '統合仕様',
      intro:
        'OpenAI 互換の呼び出し、標準認証、数分で統合。プロトコル、認証、決済の詳細はドキュメントに同梱。',
      points: [
        {
          strong: '標準 API',
          text: ' - OpenAI 互換。base_url を一つ変えて接続',
        },
        {
          strong: 'コンポーザブル',
          text: ' - 判断 / エージェント / 決済層を必要な粒度で呼び出し',
        },
        {
          strong: '専任サポート',
          text: ' - 統合設計と技術オンボーディング',
        },
      ],
      codeAria: 'API リクエスト例',
      codeFilename: 'example.request',
      codeComments: [
        '# Call DeAgentAI proprietary model capability',
        '# Get autonomous Agent judgment',
        '# Judgment connects directly to settlement',
      ],
    },
    credentials: {
      title: 'アクセス資格情報を取得',
      copy: 'システムとユースケースをご記入ください。対応する統合仕様とサポートを提供します。',
      inputLabel: 'メールまたは Telegram',
      inputPlaceholder: 'メール / Telegram',
      submit: 'お問い合わせ',
    },
  },

  caseStudies: {
    hero: {
      title: 'インテグレーション',
      intro: 'インテグレーション',
      feature: {
        title: 'パートナーが DeAgentAI 上に構築すると、双方に新しい能力が生まれる',
        copy: 'ワールドカップ期間中、AliceAI は一連の API を通じて DeAgentAI の独自モデル判断に接続し、試合予測エージェントを出荷しました。自前モデルはゼロ。経済層で直接決済。',
        meta: [
          { label: 'PARTNER', value: 'AliceAI' },
          { label: 'DEPLOYMENT', value: 'ワールドカップ試合予測' },
          {
            label: 'STACK',
            value: 'DeAgentAI 独自モデル · De(cision)Agent',
          },
        ],
      },
    },
    problem: {
      title: '課題と解決',
      constraints: {
        label: 'CONSTRAINTS',
        title: 'AliceAI の制約',
        items: [
          '信頼性の高い予測モデル構築：高コスト、遅い',
          '生モデルはワンショット推論 — アイデンティティも状態もない',
          '判断は表示で止まり、決済に届かない',
        ],
      },
      interface: {
        label: 'INTERFACE',
        title: 'DeAgentAI のインターフェース',
        items: [
          '独自モデルへの直接 API で構造化試合判断',
          'De(cision)Agent がアイデンティティ紐付けのステートフルエージェントに包装',
          '判断は経済層決済に直結し、オンチェーンで検証可能',
        ],
      },
    },
    path: {
      title: '技術パス',
      steps: [
        {
          title: '独自モデル',
          copy: 'DeAgentAI モデルが判断を出力',
        },
        { title: 'エージェント包装', copy: 'De(cision)Agent 自律エージェント' },
        {
          title: '経済決済',
          copy: '価値はオンチェーンで計量・検証可能',
        },
      ],
    },
    results: {
      title: '成果',
      intro:
        '以下の数値は実ログに基づきます。公開前に検証し、未確認項目は推定せず空欄にします。',
      items: [
        {
          number: '2,000+',
          label: '試合予測シグナル',
          sublabel: 'ワールドカップ期間',
        },
        { number: '100K+', label: '累計モデルコール', sublabel: '' },
        {
          number: '30k+',
          label: '日次コミュニティ話題',
          sublabel: 'AliceAI 経由',
        },
      ],
    },
    product: {
      title: 'プロダクト内',
      brandBadge: 'ALICEAI',
      screens: [
        {
          badge: 'SCREEN 01',
          title: '予測リスト',
          subtitle: 'Placeholder · TBD',
        },
        {
          badge: 'SCREEN 02',
          title: '試合詳細',
          subtitle: 'Placeholder · TBD',
        },
        {
          badge: 'SCREEN 03',
          title: '判断と決済',
          subtitle: 'Placeholder · TBD',
        },
      ],
    },
    video: {
      title: 'コラボレーション動画',
      playAria: 'コラボレーション動画プレビューを再生',
      heading: 'コラボレーション動画 · Placeholder',
      caption: 'DeAgentAI × AliceAI 共同インタビュー / ケースフィルム (16:9)',
    },
  },

  community: {
    hero: {
      titleBefore: 'DeAgentAI ',
      titleAccent: 'コミュニティ',
      copy: '開発者、ユーザー、ビルダーが、分散型 AI エージェントの普及をオンラインと現場で推進するコミュニティです。',
      social: ['X', 'Discord', 'Telegram', 'RootData'],
    },
    traction: {
      title: '実際のコミュニティトラクション',
      stats: [
        {
          valueSuffix: '+',
          value: 10,
          title: 'カ国',
          footnote: '',
        },
        {
          value: 'W3Labs',
          title: 'DeAgentAI エコシステムファンドが孵化したオフラインコミュニティブランド',
          footnote: '',
        },
        {
          value: '複数回',
          title: 'AI テーマのオフラインイベント',
          footnote: '開発者と若者にリーチ',
        },
      ],
    },
    snapshots: {
      title: 'コミュニティスナップショット',
      photoAlt: 'DeAgentAI コミュニティイベント',
    },
    conversation: {
      title: 'グローバルな会話に参加',
      copy: 'DeAgentAI コミュニティは世界に広がっています。ビルダー、開発者、ユーザーとリアルタイムで話しましょう。',
      channels: [
        { code: 'TG', title: 'Telegram', language: 'Community' },
        { code: 'chat', title: 'Discord', language: 'Developers' },
      ],
    },
    ambassador: {
      title: 'アンバサダープログラム',
      imageAlt: 'DeAgentAI アンバサダービジュアル',
      copy: 'DeAgentAI エコシステムの触媒になりましょう。分散型 AI の普及を推進するアドボケイトコミュニティに参加し、認知、教育、アウトリーチで重要な役割を担います。',
      cta: '近日公開',
    },
    blogs: {
      title: 'DeAgentAI 最新情報',
      posts: [
        {
          date: '2026年4月',
          title: 'モデルは十分に強力だ。次は何か？',
          href: 'https://medium.com/@deagent.ai/the-model-is-powerful-enough-what-comes-next-f1e0909ae66d',
        },
        {
          date: '2025年12月',
          title: 'DeAgentAI（$AIA）スマートコントラクトのアップグレードと移行',
          href: 'https://medium.com/@deagent.ai/deagentai-aia-smart-contract-upgrade-migration-7144055dbe26',
        },
        {
          date: '2025年10月',
          title: 'AI オラクルは壊れている。修正は評判ではなく暗号学だ。',
          href: 'https://medium.com/@deagent.ai/ai-oracles-are-broken-the-fix-is-cryptographic-not-reputational-e89c40db71b4',
        },
        {
          date: '2025年9月',
          title: '$AIA Genesis Staking',
          href: 'https://medium.com/@deagent.ai/aia-genesis-staking-81d03e1bf72d',
        },
      ],
    },
  },

  buyback: {
    hero: {
      title: 'AIA バイバック＆バーン トラッカー',
      copy: '透明なバイバック、検証可能なバーン、持続可能なトークン経済をリアルタイムで。',
      metricsAria: 'バイバック概要',
      metrics: [
        { label: '総支出', value: '$5,000,127' },
        { label: '取得 AIA 合計', value: '47.62M' },
        { label: '平均バイバック価格', value: '$0.1050' },
        { label: '供給削減', value: '4.76%', note: '初期供給に対して' },
        { label: '総バーン', value: '11M', accent: true },
      ],
    },
    burnProgress: {
      title: 'バーン進捗',
      live: 'Live',
      stats: [
        { label: '取得 AIA のうちバーン済み', value: '23.1%' },
        { label: 'バーン済み AIA', value: '11M' },
        { label: 'バーン待ち AIA', value: '36.62M' },
      ],
      trackAria: '取得 AIA の 23.1% がバーン済み',
      progressLabels: ['11M', '47.62M'],
      noteStrong: 'バイバックは中央集権取引所経由でオフチェーン実行されます。',
      note: '取得分の一部は 3 か月ごとにオンチェーンでバーンされます。四半期バーン後に更新されるトランザクションハッシュは下記 Burn History を参照。',
    },
    burnHistory: {
      title: 'バーン履歴',
      columns: ['日付', 'バーン AIA', 'ステータス', 'バーンハッシュ'],
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
      title: 'バイバックの仕組み',
      steps: [
        {
          title: '収益の収集',
          copy: 'プロトコル手数料、AI 取引利益、事業収益がバイバック原資',
        },
        {
          title: 'プールへの配分',
          copy: '収益の大部分が専用バイバックファンドへ自動流入',
        },
        {
          title: '市場での取得',
          copy: '完全な透明性とマルチシグセキュリティで市場取得を実行',
        },
        {
          title: '恒久バーン',
          copy: '買い戻した AIA は開示カストディで保有され、公開スケジュールに従ってバーン',
        },
      ],
    },
    priceTrend: {
      title: 'AIA 価格トレンド',
      periodAria: 'チャート期間',
      periods: ['7D', '30D', '90D', 'ALL'],
      yAxis: ['$0.0800', '$0.0600', '$0.0400', '$0.0200', '$0.0000'],
      xAxis: ['May 15', 'Jun 6', 'Jun 29', 'Jul 21', 'Aug 12'],
      legendPrice: 'AIA 価格',
      legendBurn: 'バーンイベント',
      currentPrice: '$0.0741',
    },
    value: {
      title: 'AIA が重要な理由',
      intro: 'ユーティリティ駆動の需要と、デフレ型の供給メカニクス。',
      cards: [
        {
          title: 'Revenue Pool',
          lineOne: 'エージェントと企業からの資金',
          lineTwo: 'USDC、ステーブルコイン、法定通貨での支払い',
        },
        {
          title: 'Buyback Engine',
          lineOne: 'プログラム的な市場取得',
          lineTwo: 'エージェントネットワーク成長と連動',
        },
        {
          title: 'Staking Layer',
          lineOne: '任意の供給ロックアップ',
          lineTwo: '独立した希少性メカニズム',
        },
        {
          title: 'Deflationary Design',
          lineOne: 'スケジュールされたバーンが供給を恒久削減',
          lineTwo: '',
        },
      ],
    },
    flywheel: {
      title: 'デフレフライホイール',
      center: { token: 'AIA', label: 'Flywheel' },
      steps: [
        {
          number: '01',
          title: 'エージェントデプロイ',
          copy: 'より多くの自律エージェントがオンラインに',
        },
        {
          number: '02',
          title: 'AIA 消費',
          copy: 'すべてのエージェントが運用に AIA を必要とする',
        },
        {
          number: '03',
          title: '収益 → バーン',
          copy: '手数料が自動でバイバック＆バーンを資金調達',
        },
        {
          number: '04',
          title: '恒久除去',
          copy: 'トークンは供給から永遠に消える',
        },
      ],
    },
    outcome: {
      eyebrow: 'The outcome',
      title: '自律エージェントの増加とともに、AIA 保有者も恩恵を受けます。',
      copy: 'エージェントが増えるほどプロトコル活動は上昇します。収益がプログラム的バイバックを資金調達し、スケジュールされたバーンが利用可能供給を恒久削減します。',
      strong: '持続可能な成長。揃った価値。構造的な供給メカニクス。',
    },
  },

  common: {
    brand: 'DeAgentAI',
    launchApp: 'ウォレット接続',
    comingSoon: '近日公開',
    live: 'Live',
    languageShort: 'JA',
    readWhitePaper: 'ホワイトペーパーを読む',
    placeholderTbd: 'Placeholder · TBD',
  },
}
