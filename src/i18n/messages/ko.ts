/** 한국어 문구 사전 */
import type { LocaleMessages } from "./types";

export const ko: LocaleMessages = {
  nav: {
    aria: {
      home: "DeAgentAI 홈",
      primary: "주요 내비게이션",
      toggle: "내비게이션 전환",
      logoAlt: "DeAgentAI",
    },
    languageShort: "한",
    cta: "지갑 연결",
    wrongNetwork: "잘못된 네트워크",
    getAiaModal: {
      title: "GET $AIA",
      closeAria: "닫기",
      backAria: "뒤로",
      cexTitle: "Swap via CEX",
      cexDescription: "중앙화 거래소에서 거래",
      pairLabel: "AIA / USDT",
    },
    items: [
      { id: "HOME", label: "홈", href: "/" },
      { id: "PRODUCT", label: "제품", href: "/#product" },
      { id: "ECOSYSTEM", label: "생태계", href: "/#ecosystem" },
      { id: "$AIA", label: "$AIA", href: "/#partners" },
      { id: "LEARN", label: "알아보기", href: "/#learn" },
    ],
    flyouts: {
      PRODUCT: {
        columns: [
          {
            title: "에이전트",
            items: [
              {
                title: "AI Agents",
                description: "상시 가동 에이전트 배포",
                href: "/agents",
              },
              {
                title: "CorrAI",
                description: "자율 전략 에이전트",
                href: "https://corr.ai/en",
                external: true,
              },
              {
                title: "AlphaX",
                description: "자율 트레이딩 에이전트",
                href: "/alphax",
              },
            ],
          },
          {
            title: "인프라",
            items: [
              {
                title: "AI Token Hub",
                description: "하나의 API, 모든 모델",
                href: "/token-hub",
              },
            ],
          },
        ],
      },
      ECOSYSTEM: {
        columns: [
          {
            title: "함께 구축하기",
            items: [
              {
                title: "솔루션",
                description: "모델 역량을 API로",
                href: "/solutions",
              },
              {
                title: "통합",
                description: "AliceAI 및 파트너",
                href: "/case-studies",
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
              { title: "AIA 받기", href: "#get-aia" },
              { title: "바이백 대시보드", href: "/buyback" },
              {
                title: "토큰노믹스",
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
            title: "알아보기",
            items: [
              {
                title: "커뮤니티",
                description: "이벤트 & 밋업",
                href: "/community",
              },
              {
                title: "백서",
                description: "백서 읽기",
                href: "https://deagentai.gitbook.io/deagentai",
                external: true,
              },
              {
                title: "MiCA 백서",
                description: "컴플라이언스",
                href: "https://deagent.ai/micar-whitepaper.pdf",
                external: true,
              },
              {
                title: "리소스",
                description: "문서 및 더보기",
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
      "온체인 세계를 위한 신뢰할 수 있는 AI 에이전트 인프라 — 자율 지능을 위한 신원, 연속성, 합의.",
    products: {
      title: "제품",
      links: [
        { label: "AI Agents", badge: "NEW", href: "/agents" },
        { label: "AlphaX", href: "/alphax" },
        { label: "CorrAI", href: "https://corr.ai/en" },
        { label: "AI Token Hub", href: "/token-hub" },
      ],
    },
    community: {
      title: "커뮤니티",
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
      titleLine1: "검증 가능한 지능",
      titleLine2: "모든 에이전트를 위해",
      ctaExplore: "제품 살펴보기",
      ctaLearn: "기술 알아보기",
    },
    trust: {
      eyebrow: "신뢰 레이어",
      title: "에이전트 협업을 위한 신뢰할 수 있는 기반",
      diagramAlt: "DeAgentAI 신뢰 인프라 다이어그램",
      orbitAria: "연속성, 합의, 신원",
      labels: {
        continuity: "연속성",
        consensus: "합의",
        identity: "신원",
      },
      cards: [
        {
          title: "De(cision)Agent",
          description: "신원, 연속성, 합의 — 신뢰할 수 있는 에이전트의 기반.",
        },
        {
          title: "자체 개발 모델",
          description:
            "피드백으로 학습된 독자 모델이 에이전트 판단을 재현 가능하고 보정 가능하게 만듭니다.",
        },
        {
          title: "A2A / MCP",
          description:
            "크로스 프레임워크 협업과 도구 접근을 위한 업계 표준과 호환됩니다.",
        },
        {
          title: "MPC",
          description:
            "MPC는 무신뢰 실행을 가능하게 하며, 협업을 온체인에서 안전하게 정산합니다.",
        },
      ],
    },
    product: {
      eyebrow: "제품",
      title: "항상 함께하는 지능",
      screenerAlt: "온체인 자산 스크리너",
      heading: "기준에 맞춘 일일 마켓 스크리너",
      capabilities: [
        {
          title: "원탭 배포",
          copy: "선택하고, 설정하고, 배포하세요. 호스팅과 지속성은 프로토콜이 처리합니다 — 인프라를 건드릴 필요 없습니다.",
        },
        {
          title: "보이지 않는 키",
          copy: "키는 신원에 의해 주입되고 프로토콜 아래에 숨겨지며, 계정별 서킷 브레이커가 연쇄 장애를 막습니다.",
        },
        {
          title: "모든 추론이 계량됨",
          copy: "모든 추론은 호출마다 기록되고, 소비량은 정산으로 바로 연결됩니다. 투명하고, 감사 가능하며, 침묵하지 않습니다.",
        },
      ],
    },
    ecosystem: {
      eyebrow: "생태계 & 기술",
      title: "판단을 정산 가능한 가치로",
      technologySteps: [
        {
          title: "자체 개발 모델",
          lines: ["피드백 기반 학습", "신뢰할 수 있는 판단 출력"],
        },
        {
          title: "에이전트 패키징",
          lines: ["De(cision)Agent 프레임워크", "자율 의사결정"],
        },
        {
          title: "경제 정산",
          lines: ["가치 계량", "온체인 검증 가능"],
        },
      ],
      scenarios: [
        {
          title: "CorrAI — 자율 전략 에이전트",
          copy: "CorrAI는 합의, 신원, 연속성 아래 De(cision)Agent 프레임워크 안에서 실행됩니다. DeAgentAI의 독자 모델을 호출해 전략 판단을 생성하고, 이를 자율적으로 계속 실행되는 전략 에이전트로 결정화합니다 — 온체인 판단에 처음으로 검증 가능한 전략적 연속성을 부여합니다.",
        },
        {
          title: "AliceAI — 경기 예측 에이전트",
          copy: "AliceAI의 경기 예측은 DeAgentAI의 독자 모델 위에서 직접 실행됩니다. 모델이 경기 판단을 출력하면 AliceAI가 이를 자율적으로 결정하고 경제 레이어에서 정산하는 에이전트로 결정화합니다. CorrAI와 동일한 기반 스택을 공유합니다 — 하나의 지능이 서로 다른 시나리오로 흐릅니다.",
        },
      ],
      agentCards: {
        aria: "DeAgentAI 에이전트 예시",
        items: [
          {
            chip: "전략 · 검증됨",
            name: "CorrAI",
            role: "자율 전략 에이전트",
            logoAlt: "CorrAI",
          },
          {
            chip: "스포츠 · 재사용",
            name: "AliceAI",
            role: "경기 예측 에이전트",
            logoAlt: "AliceAI",
          },
        ],
      },
      compounding: {
        title: "스스로 복리되는 역량",
        copyBefore:
          "신원, 연속성, 합의, 독자 모델, 에이전트 래핑, 경제 정산 — 어떤 레이어도 단독으로 서지 않으며, 각각이 이전 레이어 위에 재사용되고 쌓입니다. ",
        copyStrong:
          "새로운 레이어마다 전체 스택이 할 수 있는 일이 다시 확장되고, 재사용할 때마다 다음 에이전트의 비용이 제로에 가까워집니다.",
        copyAfter:
          " 이것은 벽이 아니라 스스로 복리되는 시스템입니다. 오래 실행될수록 격차는 더 커집니다.",
      },
    },
    voices: {
      eyebrow: "그들의 말로",
      title: "팀과 생태계의 목소리",
      gridAria: "추천사 플레이스홀더",
    },
    partners: {
      eyebrow: "파트너십 & 펀딩",
      title: "선도적인 생태계 파트너와 함께 구축",
    },
    launch: {
      title: "지갑을 연결하고 첫 에이전트를 배포하세요",
      copy: "관리할 키는 없습니다 — 연결하고 시작하세요. 신뢰할 수 있는 지능 인프라 위에 구축되었습니다.",
      ctaLaunch: "지갑 연결",
      ctaWhitepaper: "백서 읽기",
    },
  },

  agents: {
    hero: {
      beta: "베타 · 지갑 연결 후 시작",
      title: "AI Agents",
      description:
        "원클릭 배포 - 자체 API 키 불필요. 모든 추론은 AI Token Hub를 통해 정산되며, $AIA 또는 $USDT로 결제됩니다. 첫 에이전트: Sentry — Hyperliquid 시장 전체를 24/7 감시합니다.",
      kpis: [
        {
          label: "커버 마켓",
          value: 308,
          footnote: "Crypto 198 · Tradfi 110",
        },
        {
          label: "배포 소요 시간",
          value: 60,
          unit: "s",
          footnote: "지갑만 · 이메일 없음 · 신용카드 없음",
        },
        {
          value: 5,
          footnote: "Hyperliquid 덱스",
        },
        {
          value: 24,
          unitSuffix: "/7",
          footnote: "항상 실행",
        },
        {
          valueLabel: "$AIA / $USDT",
          footnote: "정산",
        },
      ],
    },
    sentry: {
      eyebrow: "핵심 역량",
      title: "Sentry가 스캔합니다. 당신은 결정합니다.",
      intro:
        "기준을 설정하면 Sentry는 실행하고 사실만 보고합니다. 아래는 Hyperliquid 시장의 라이브 데이터입니다 — 조건을 조정하면 매칭이 즉시 재계산됩니다.",
      filters: {
        title: "필터",
        live: "Live",
        presetTitle: "프리셋 전략",
        fineTuneTitle: "임계값 미세 조정",
        ranges: [
          {
            label: "최소 24시간 거래량",
            value: "$3M",
            aria: "최소 일일 거래량",
          },
          {
            label: "펀딩 APR, 절대값",
            value: "≥ 1.5%",
            aria: "펀딩 연이율",
          },
          {
            label: "최소 24시간 변동",
            value: "0%",
            aria: "최소 변동",
          },
        ],
        outlierGuard: {
          title: "이상치 가드",
          description:
            "깔끔하게 정산되지 않을 수 있는 극단적 괴리를 건너뜁니다.",
        },
      },
      strategies: [
        {
          title: "펀딩 차익거래",
          description: "기준에서 멀리 떨어진 펀딩, 양방향",
          count: "47",
        },
        {
          title: "낮은 회전율",
          description: "OI가 거래량보다 훨씬 높고 회전율 낮음",
          count: "52",
        },
        {
          title: "거래량 급증",
          description: "거래량과 가격이 함께 확대",
          count: "8",
        },
        {
          title: "프리미엄 괴리",
          description: "마크 가격이 오라클에서 이탈",
          count: "78",
        },
      ],
      matches: {
        title: "오늘의 매칭",
        tabs: ["전체", "Crypto", "Tradfi"],
        summary: {
          count: "47",
          text: "개 마켓 매칭 - 펀딩 차익거래",
          outlierNoteBefore: "이상치 가드가 ",
          outlierCount: "2",
          outlierNoteAfter: "개를 제거함 — 극단적 펀딩 또는 얇은 유동성",
        },
        columns: [
          "마켓",
          "펀딩 APR",
          "24시간 변동",
          "거래량",
          "미결제약정",
          "프리미엄",
        ],
        categoryLabels: {
          Crypto: "Crypto",
          Tradfi: "Tradfi",
        },
        status: {
          empty: "현재 조건에 맞는 시장이 없습니다",
          stale: "스냅샷이 5분 이상 오래되었습니다",
          partial: "부분 시장 스냅샷입니다",
          truncated: "상위 결과만 표시합니다",
          loading: "실시간 시장을 불러오는 중…",
          unavailable: "시장 데이터를 잠시 사용할 수 없습니다",
        },
      },
    },
    dailyPush: {
      badge: "곧 출시",
      title: "일일 푸시",
      copy: "매칭 결과는 매일 정해진 시간에 전달됩니다 — 플랫폼을 열 필요가 없습니다. 시장에 아무것도 없어도 보냅니다: 조작된 신호도, 침묵도 없습니다.",
      features: [
        { title: "일정에 맞춰 전달", description: "푸시 시간 설정 가능" },
        { title: "비어 있어도 전송", description: "침묵하는 날 없음" },
        { title: "장기 메모리 활용", description: "선호도에 따라 순위 지정" },
        { title: "후속 질문", description: "어떤 마켓이든 더 깊이" },
      ],
      channels: "Telegram · 앱 내",
      bot: {
        name: "Sentry BOT",
        time: "오늘 09:00",
        message:
          "오늘 Funding Arbitrage 기준에 47개 마켓이 매칭되었습니다. 강도 상위 3개:",
        assets: [
          {
            symbol: "XMR",
            category: "Crypto",
            note: "롱이 수취",
            change: "+20.93%",
          },
          {
            symbol: "CASHCAT",
            category: "Crypto",
            note: "숏이 수취",
            change: "+42.72%",
          },
          {
            symbol: "KAITO",
            category: "Crypto",
            note: "숏이 수취",
            change: "-295.73%",
          },
        ],
        memory: {
          title: "장기 메모리",
          copy: "지난번에 XMR의 펀딩 구조에 대해 물어보셨습니다 — 오늘 다시 목록에 올랐습니다.",
        },
      },
    },
    comparison: {
      eyebrow: "핵심 차이",
      title: "API 키 불필요",
      intro:
        "오픈소스 에이전트 프레임워크는 강력하지만, 각각 모델 플랫폼에 가입하고, 카드를 등록하고, 키를 받아 설정 파일에 붙여넣어야 합니다. 지갑 네이티브 사용자에게 그 경로의 모든 단계는 이탈 지점입니다.",
      openSource: {
        title: "오픈소스 에이전트를 직접 배포하기",
        steps: [
          "모델 플랫폼에 가입하고 이메일 인증",
          "신용카드 등록, 신원 확인 통과",
          "API 키 생성 및 복사",
          "설정 파일을 찾아 키와 모델 이름 입력",
          "서버 준비, 감독 및 재시작 처리",
          "키 유출 위험은 전적으로 본인 부담",
        ],
        footerBefore: "대략 ",
        footerStrong: "30-90분",
        footerAfter: ", 그리고 작동하는 신용카드 필요",
      },
      deagentai: {
        title: "DeAgentAI에서 배포하기",
        steps: [
          "지갑 연결, 로그인",
          "$AIA 또는 $USDT로 크레딧 충전",
          "에이전트 선택, 기준 설정",
          "배포 클릭, 일일 실행 시작",
        ],
        footer: "약 60초. 이메일 없음, 신용카드 없음.",
      },
    },
    credit: {
      eyebrow: "크레딧 메커니즘",
      title: "잔액 제로여도 침묵하지 않음",
      intro:
        "상시 가동 에이전트가 조용해지는 것은 최악의 경험입니다 — 사용자는 제품이 고장났다고 가정합니다. 스크리닝은 순수 연산이라 토큰을 소비하지 않으므로, 잔액이 제로여도 일일 푸시는 도착합니다. 다만 서면 설명 없이 옵니다.",
      levels: [
        {
          status: "NORMAL",
          copy: "기본 모드, 전체 푸시와 후속 질문. 스크리닝은 평소대로 실행.",
        },
        {
          status: "LOW",
          copy: "저비용 모델로 전환. 동일 콘텐츠에 충전 안내 추가.",
        },
        {
          status: "CRITICAL",
          copy: "푸시만. 남은 크레딧을 연장하기 위해 후속 채팅 끄기.",
        },
        {
          status: "EMPTY",
          copy: "설명은 중단, 원시 데이터는 계속 전송 — 스크리닝은 토큰 비용 없음.",
        },
      ],
    },
    memory: {
      eyebrow: "장기 메모리",
      title: "무엇을 보유하는지가 아니라 누구인지",
      intro:
        "에이전트는 무엇을 사고 싶은지 추측하는 것이 아니라, 행동을 제약하기 위해 메모리를 사용합니다. 모든 금액과 포지션은 실시간으로 조회되며 메모리에서 읽지 않습니다 — 의미적 회상은 퍼지 매칭이고, 트레이딩에서 잘못된 숫자 하나는 실제 손실입니다.",
      remembered: {
        title: "기억함",
        badge: "선호도 & 판단",
        copy: "주관적이고, 모호하며, 시간에 걸친 판단 — 모델이 잘 다루는 바로 그것.",
        items: [
          { before: "크립토만, ", strong: "주식 건너뛰기", after: "" },
          {
            before: "마이너스 펀딩 선호, ",
            strong: "높은 레버리지 회피",
            after: "",
          },
          {
            before: "비슷한 셋업을 쫓다 물렸고, ",
            strong: "되돌림을 기다리라고 함",
            after: "",
          },
          {
            before: "명시적으로 제외: ",
            strong: "상장 7일 미만 마켓",
            after: "",
          },
          { before: "푸시를 읽는 시간대: ", strong: "아시아 시간", after: "" },
        ],
      },
      neverStored: {
        title: "절대 저장하지 않음",
        badge: "금액 & 포지션",
        copy: "항상 실시간으로 조회하고 매번 다시 가져옵니다. 캐싱 없음, 추론 없음.",
        items: [
          "포지션 원가 기준",
          "현재 규모와 방향",
          "지갑 잔액",
          "미실현 손익",
          "과거 체결 가격",
        ],
      },
    },
    deploy: {
      eyebrow: "배포 방법",
      title: "세 단계, 60초",
      steps: [
        {
          title: "지갑 연결",
          text: "서명이 곧 로그인입니다. 이메일 없음, 비밀번호 없음. 신원은 내부 UID로 관리되므로, 나중에 여러 지갑이 크레딧과 메모리를 공유할 수 있습니다.",
        },
        {
          title: "에이전트 선택 및 기준 설정",
          text: "네 가지 프리셋 전략이 바로 작동하며, 임계값을 조정할 수 있습니다. 기준은 제약입니다: 에이전트는 당신이 그린 범위 안에서만 작동합니다.",
        },
        {
          title: "배포 클릭",
          text: "에이전트가 일일 일정으로 실행을 시작하고, 결과는 앱 내 또는 Telegram으로 푸시됩니다. 사용량과 잔액은 콘솔에서 호출별로 감사할 수 있습니다.",
        },
      ],
      codeSample: {
        commentRuntime:
          "# 에이전트 런타임: Agno AgentOS, AI Token Hub를 통해 모델 라우팅 (dim comment)",
        agentName: "Hyperliquid Screener",
        instruction: "당신은 어드바이저가 아니라 마켓 스크리너입니다.",
        commentScreening:
          "# 스크리닝은 순수 연산, 토큰 비용 제로 (dim comment)",
      },
    },
    waitlist: {
      eyebrow: "얼리 액세스",
      title: "가장 먼저 알기",
      copy: "대기자 명단 회원은 우선 액세스와 100만 시작 토큰 크레딧을 받습니다.",
      emailAria: "이메일",
      emailPlaceholder: "이메일",
      submit: "대기자 명단 참여",
      submitting: "제출 중…",
      success: "웨이팅 리스트에 등록되었습니다",
      alreadyJoined: "이미 등록된 이메일입니다",
      invalid: "유효한 이메일을 입력하세요",
      rateLimited: "시도가 너무 많습니다. 잠시 후 다시 시도하세요",
      unavailable: "웨이팅 리스트를 잠시 사용할 수 없습니다",
      error: "지금은 등록할 수 없습니다. 다시 시도하세요",
    },
  },

  alphax: {
    hero: {
      title: "AlphaX - ",
      titleAccent: "완전 자율 트레이딩 에이전트",
      copyBefore:
        "AlphaX는 DeAgentAI의 피드백 기반 학습을 통해 배양된 첫 번째 독자 AI 모델로, ",
      copyStrong1: "De(cision)Agent 프레임워크",
      copyMid:
        " 안에서 합의, 신원, 연속성 하에 실행됩니다. 독자 모델에서 예측 시그널을 생성하고 ",
      copyStrong2: "완전 자율 트레이딩 에이전트",
      copyAfter:
        "로 작동합니다 — 의사결정 지원 도구에서 독립적으로 실행되는 트레이딩 지능으로 진화합니다.",
      tagsAria: "AlphaX 제품 속성",
      tags: [
        "피드백 학습",
        "자율",
        "De(cision)Agent 프레임워크",
        "온체인 감사 가능",
      ],
    },
    does: {
      title: "AlphaX가 하는 일",
      intro:
        "AlphaX는 독자 모델 지능과 자율 실행, 검증 가능한 결과를 결합합니다.",
      capabilities: [
        {
          title: "독자 모델 시그널",
          copy: "피드백 학습 기반의 독자 모델로 예측 시그널을 생성하고, 사용자 피드백을 통해 지속적으로 보정하여 역동적인 시장에서도 신뢰성과 적응력을 유지합니다.",
        },
        {
          title: "완전 자율 트레이딩",
          copy: "의사결정 지원을 넘어 — AlphaX는 시장을 모니터링하고, 전략을 실시간으로 조정하며, 암호화폐가 요구하는 속도와 정밀도로 독립적으로 실행합니다.",
        },
        {
          title: "온체인 감사 가능한 실적",
          copy: "De(cision)Agent 프레임워크 위의 에이전트로서, 결정은 신원과 연속성 원칙을 따르며, 결과는 온체인에서 감사하고 검증할 수 있습니다.",
        },
      ],
    },
    gallery: {
      title: "제품 갤러리",
      placeholder: "Placeholder · TBD",
      items: [
        { screen: "SCREEN 01", title: "시그널 대시보드" },
        { screen: "SCREEN 02", title: "자율 실행" },
        { screen: "SCREEN 03", title: "기록 & 포지션" },
        { screen: "SCREEN 04", title: "피드백 학습" },
      ],
    },
  },

  tokenHub: {
    hero: {
      title: "하나의 API, 모든 프론티어 모델",
      copyBefore:
        "AI Token Hub는 선도적인 폐쇄형 및 오픈소스 모델을 하나의 OpenAI 호환 API 뒤로 통합합니다. 모든 호출은 요청별로 계량, 가격 책정, 정산되며, ",
      copyStrong: "$AIA 또는 USDT로 결제 가능합니다.",
      copyAfter:
        " 요청 본문은 절대 저장되지 않으며, 토큰 수와 지연 시간만 보관됩니다.",
      ctaEnter: "AI Token Hub 입장",
      ctaIntegration: "연동 보기",
    },
    role: {
      eyebrow: "DEAGENTAI 스택에서",
      title: "생태계에서의 역할",
      copyBefore:
        "AI Token Hub는 DeAgentAI 생태계 전반의 모든 AI 호출과 계량을 담당합니다. 모든 소비 단위는 호출별로 기록되고 정산됩니다. ",
      copyStrong: "실제 생태계 사용량의 계량 기반입니다.",
      copyAfter:
        " 여기서 발생하는 프로토콜 수익은 $AIA 바이백의 한 재원입니다.",
      flowAria: "AI Token Hub 수익 흐름",
      flow: [
        { title: "실제 AI 사용", copy: "업계 전반 호출을 요청별로 계량" },
        { title: "프로토콜 수익", copy: "호출당 $AIA / USDT 정산" },
        { title: "$AIA 바이백", copy: "프로토콜 수익이 바이백 재원" },
      ],
    },
    capabilities: {
      title: "핵심 역량",
      items: [
        {
          title: "하나의 API, 여러 모델",
          copy: "Claude, GPT, Gemini, DeepSeek 등을 OpenAI 호환 프로토콜로 통합. 문자열 하나만 바꿔 모델을 전환하세요.",
        },
        {
          title: "호출별 계량",
          copy: "호출당 실시간 계량, 가격 책정, 정산. 요청 본문은 절대 저장되지 않으며 토큰 수와 지연 시간만 — 감사 가능성과 프라이버시의 균형.",
        },
        {
          title: "$AIA 정산",
          copy: "$AIA 또는 USDT로 정산. $AIA로 충전하면 할인이 적용되는 네이티브 프로토콜 수준 정산 인센티브.",
        },
      ],
    },
    cta: {
      eyebrow: "시작하기",
      title: "60초 만에 연동",
      copy: "지갑을 연결하고, base_url 하나만 바꾼 뒤 모든 프론티어 모델을 호출하세요. 무료 티어: 월 100만 토큰.",
      button: "제품 입장",
    },
  },

  solutions: {
    hero: {
      title: "검증 가능한 판단, API로 호출",
      copyBefore:
        "DeAgentAI는 독자 모델을 De(cision)Agent 프레임워크 아래에 래핑하고 표준 API로 노출합니다: 컨텍스트를 입력하면 검증 가능한 신뢰도와 근거가 포함된 구조화된 판단을 받습니다. 판단은 프레임워크 안에서 ",
      copyStrong1: "신원에 귀속되고",
      copySep1: ", ",
      copyStrong2: "상태가 기록되며",
      copySep2: ", ",
      copyStrong3: "합의로 검증됩니다",
      copyAfter:
        " — 호출하는 것은 원시 추론이 아니라 추적 가능하고 재현 가능한 판단 단위입니다.",
      ctaContact: "연동 문의",
      ctaLearn: "더 알아보기",
    },
    how: {
      title: "한 번의 호출, 세 가지 보장",
      intro:
        "호출 파이프라인은 세 레이어로 캡슐화됩니다: Model → Agent → Settlement. 각 레이어가 검증 가능한 보장을 제공하고, 하나의 신뢰할 수 있는 호출로 복리됩니다 — 연동하는 것은 맨 모델 API가 아니라 검증 가능한 판단 단위입니다.",
      guarantees: [
        {
          step: "01 · MODEL",
          title: "자체 개발 모델",
          copy: "피드백 루프로 학습된 독자 모델이 구조화된 판단과 신뢰도를 출력합니다. 동일 입력에 재현 가능하며, 블랙박스 확률 출력이 아닙니다.",
        },
        {
          step: "02 · AGENT",
          title: "프레임워크 패키징",
          copy: "De(cision)Agent 프레임워크가 신원을 귀속하고, 상태를 기록하며, 합의 검사를 적용해 판단을 상태 있는 인스턴스로 래핑합니다.",
        },
        {
          step: "03 · SETTLEMENT",
          title: "경제 정산",
          copy: "판단 출력이 경제 레이어 정산으로 바로 연결되어, 온체인에서 계량되고 검증됩니다. 판단과 가치 사이에 간극이 없습니다.",
        },
      ],
    },
    capabilities: {
      title: "API 역량",
      items: [
        {
          title: "구조화된 판단",
          copy: "출력은 구조화된 판단 + 신뢰도 + 근거입니다. 합의 아래 피드백으로 지속적으로 보정되며, 동일 입력에 재현 가능하고 무작위 표류가 아닙니다.",
        },
        {
          title: "상태 있는 에이전트 인스턴스",
          copy: "각 호출은 고유 신원과 온체인 메모리를 귀속하여 판단에 상태와 연속성을 부여합니다. 범위 안에서 자율적이며, 완전히 추적 가능합니다.",
        },
        {
          title: "경제 정산 API",
          copy: "판단이 경제 레이어 정산에 직접 연결되어, 계량되고 검증 가능한 온체인 결과를 산출합니다. 판단과 가치 사이에 간극이 없습니다.",
        },
      ],
    },
    useCases: {
      title: "활용 사례",
      intro:
        "검증 가능한 판단과 정산 가능한 온체인 결과가 필요한 모든 시스템이 이 API를 재사용할 수 있습니다.",
      items: [
        {
          number: "01",
          title: "예측 & 시그널",
          copy: "경기, 시장, 이벤트 예측: 한 번의 호출로 구조화된 판단을 받아, 판단을 제품에서 분리합니다.",
        },
        {
          number: "02",
          title: "전략 & 실행 에이전트",
          copy: "판단에서 전략을 자율 실행하고, 온체인에서 감사 가능하며 경제 레이어에서 정산합니다.",
        },
        {
          number: "03",
          title: "온체인 거버넌스",
          copy: "DAO와 프로토콜을 위한 중립적이고 추적 가능한 판단 소스로, 제안 분석과 자동 실행을 지원합니다.",
        },
        {
          number: "04",
          title: "수직 의사결정 시스템",
          copy: "도메인 컨텍스트를 주입하고, 정산 가능한 판단 출력을 받아 기존 시스템에 빠르게 통합합니다.",
        },
      ],
    },
    integration: {
      title: "연동 스펙",
      intro:
        "OpenAI 호환 호출, 표준 인증, 수 분 내 연동. 프로토콜, 인증, 정산 세부사항은 문서와 함께 제공됩니다.",
      points: [
        {
          strong: "표준 API",
          text: " - OpenAI 호환; base_url 하나만 바꿔 연결",
        },
        {
          strong: "조합 가능",
          text: " - 판단 / 에이전트 / 정산 레이어를 필요한 세분도로 호출",
        },
        {
          strong: "전담 지원",
          text: " - 연동 설계 및 기술 온보딩",
        },
      ],
      codeAria: "API 요청 예시",
      codeFilename: "example.request",
      codeComments: [
        "# DeAgentAI 독자 모델 역량 호출",
        "# 자율 Agent 판단 받기",
        "# 판단이 정산에 직접 연결",
      ],
    },
    credentials: {
      title: "액세스 자격 증명 받기",
      copy: "시스템과 사용 사례를 설명해 주시면, 맞는 연동 스펙과 지원을 제공합니다.",
      inputLabel: "이메일 또는 Telegram",
      inputPlaceholder: "이메일 / Telegram",
      submit: "문의하기",
    },
  },

  caseStudies: {
    hero: {
      title: "사례 연구",
      intro:
        "DeAgentAI의 역량은 자신만을 위한 것이 아닙니다 — 생태계 파트너를 강화합니다. 아래는 실제 사례입니다: 파트너가 DeAgentAI에서 모델-에이전트-정산 전체 루프를 어떻게 실행했는지.",
      feature: {
        title:
          "파트너가 DeAgentAI 위에 구축하면, 양쪽 모두 새로운 역량을 얻습니다",
        copy: "월드컵 기간에 AliceAI는 일련의 API를 통해 DeAgentAI의 독자 모델 판단에 연결하고 경기 예측 에이전트를 출시했습니다. 자체 모델 제로, 경제 레이어에서 직접 정산.",
        meta: [
          { label: "파트너", value: "AliceAI" },
          { label: "배포", value: "월드컵 경기 예측" },
          { label: "스택", value: "DeAgentAI 독자 모델 · De(cision)Agent" },
        ],
      },
    },
    problem: {
      title: "문제 & 해결",
      constraints: {
        label: "제약",
        title: "AliceAI의 제약",
        items: [
          "신뢰할 수 있는 예측 모델 구축: 비용이 크고 느림",
          "원시 모델은 일회성 추론만 — 신원이나 상태 없음",
          "판단이 표시에서 멈추고 정산에 도달하지 못함",
        ],
      },
      interface: {
        label: "인터페이스",
        title: "DeAgentAI의 인터페이스",
        items: [
          "구조화된 경기 판단을 위한 독자 모델 직접 API",
          "De(cision)Agent가 신원 귀속, 상태 있는 에이전트로 래핑",
          "판단이 경제 레이어 정산으로 연결, 온체인 검증 가능",
        ],
      },
    },
    path: {
      title: "기술 경로",
      intro:
        "AliceAI가 호출하는 것은 원시 모델이 아니라 래핑된 판단-결정-정산 경로입니다.",
      steps: [
        { title: "독자 모델", copy: "DeAgentAI 모델이 판단 출력" },
        { title: "에이전트 래핑", copy: "De(cision)Agent 자율 에이전트" },
        { title: "경제 정산", copy: "온체인에서 계량·검증 가능한 가치" },
      ],
      noteBefore:
        "동일한 경로는 검증 가능한 판단과 정산 가능한 결과가 필요한 모든 시스템이 재사용할 수 있습니다. ",
      noteStrong: "AliceAI는 첫 번째 외부 검증입니다.",
    },
    results: {
      title: "결과",
      intro:
        "아래 수치는 실제 로그를 따릅니다 — 게시 전 확인하세요. 미확인 항목은 추정하지 말고 비워 두세요.",
      items: [
        {
          number: "2,000+",
          label: "경기 예측 시그널",
          sublabel: "월드컵 기간",
        },
        { number: "100K+", label: "누적 모델 호출", sublabel: "" },
        {
          number: "30k+",
          label: "일일 커뮤니티 화제",
          sublabel: "AliceAI 경유",
        },
      ],
    },
    product: {
      title: "제품 안에서",
      brandBadge: "ALICEAI",
      screens: [
        {
          badge: "SCREEN 01",
          title: "예측 목록",
          subtitle: "Placeholder · TBD",
        },
        {
          badge: "SCREEN 02",
          title: "경기 상세",
          subtitle: "Placeholder · TBD",
        },
        {
          badge: "SCREEN 03",
          title: "판단 & 정산",
          subtitle: "Placeholder · TBD",
        },
      ],
    },
    video: {
      title: "협업 영상",
      playAria: "협업 영상 미리보기 재생",
      heading: "협업 영상 · Placeholder",
      caption: "DeAgentAI × AliceAI 공동 인터뷰 / 사례 필름 (16:9)",
    },
  },

  community: {
    hero: {
      titleBefore: "DeAgentAI ",
      titleAccent: "커뮤니티에 참여하세요",
      copy: "탈중앙화 AI 에이전트 채택을 이끄는 개발자, 사용자, 빌더 커뮤니티 — 온라인과 현장에서.",
      social: ["X", "Discord", "Telegram", "RootData"],
    },
    traction: {
      title: "실제 커뮤니티 트랙션",
      stats: [
        {
          valueSuffix: "+",
          value: 10,
          title: "개국",
          footnote: "",
        },
        {
          value: "W3Labs",
          title: "DeAgentAI 생태계 펀드가 인큐베이팅한 오프라인 커뮤니티 브랜드",
          footnote: "",
        },
        {
          value: "다수",
          title: "AI 테마 오프라인 이벤트",
          footnote: "개발자 & 청년에게 도달",
        },
      ],
    },
    snapshots: {
      title: "커뮤니티 스냅샷",
      photoAlt: "DeAgentAI 커뮤니티 이벤트",
    },
    conversation: {
      title: "글로벌 대화에 참여하세요",
      copy: "DeAgentAI 커뮤니티는 전 세계에 걸쳐 있습니다. 빌더, 개발자, 사용자와 실시간으로 대화하세요.",
      channels: [
        { code: "TG", title: "Telegram", language: "커뮤니티" },
        { code: "chat", title: "Discord", language: "개발자" },
      ],
    },
    ambassador: {
      title: "앰버서더 프로그램",
      imageAlt: "DeAgentAI 앰버서더 비주얼",
      copy: "DeAgentAI 생태계의 촉매가 되세요. 탈중앙화 AI 채택을 이끄는 옹호자 커뮤니티에 합류하여 — 인식, 교육, 아웃리치에서 핵심 역할을 하세요.",
      cta: "곧 출시",
    },
    blogs: {
      title: "DeAgentAI 최신 소식",
      posts: [
        {
          date: "2026.04",
          title: "모델은 이미 충분히 강력하다. 다음은 무엇인가?",
          href: "https://medium.com/@deagent.ai/the-model-is-powerful-enough-what-comes-next-f1e0909ae66d",
        },
        {
          date: "2025.12",
          title: "DeAgentAI($AIA) 스마트 컨트랙트 업그레이드 및 마이그레이션",
          href: "https://medium.com/@deagent.ai/deagentai-aia-smart-contract-upgrade-migration-7144055dbe26",
        },
        {
          date: "2025.10",
          title: "AI 오라클은 고장났다. 해법은 평판이 아니라 암호학이다.",
          href: "https://medium.com/@deagent.ai/ai-oracles-are-broken-the-fix-is-cryptographic-not-reputational-e89c40db71b4",
        },
        {
          date: "2025.09",
          title: "$AIA Genesis Staking",
          href: "https://medium.com/@deagent.ai/aia-genesis-staking-81d03e1bf72d",
        },
      ],
    },
  },

  buyback: {
    hero: {
      title: "AIA 바이백 & 소각 트래커",
      copy: "투명한 바이백, 검증 가능한 소각, 지속 가능한 토큰 이코노믹스를 실시간으로.",
      metricsAria: "바이백 요약",
      metrics: [
        { label: "총 지출", value: "$5,000,127" },
        { label: "총 취득 AIA", value: "47.62M" },
        { label: "평균 바이백 가격", value: "$0.1050" },
        { label: "제거된 공급량", value: "4.76%", note: "초기 공급량 대비" },
        { label: "총 소각", value: "11M", accent: true },
      ],
    },
    burnProgress: {
      title: "소각 진행",
      live: "Live",
      stats: [
        { label: "취득 AIA 중 소각 비율", value: "23.1%" },
        { label: "소각된 AIA", value: "11M" },
        { label: "소각 대기 AIA", value: "36.62M" },
      ],
      trackAria: "취득 AIA의 23.1퍼센트 소각됨",
      progressLabels: ["11M", "47.62M"],
      noteStrong: "바이백은 중앙화 거래소를 통해 오프체인에서 실행됩니다.",
      note: "취득분의 일부가 3개월마다 온체인에서 소각됩니다 — 아래 소각 기록에서 트랜잭션 해시를 확인하세요. 분기별 소각 이벤트 후 업데이트됩니다.",
    },
    burnHistory: {
      title: "소각 기록",
      columns: ["날짜", "소각 AIA", "상태", "소각 해시"],
      statusConfirmed: "확인됨",
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
      title: "바이백 메커니즘 작동 방식",
      steps: [
        {
          title: "수익 수집",
          copy: "프로토콜 수수료, AI 트레이딩 수익, 사업 수익이 바이백을 자금 조달",
        },
        {
          title: "풀에 배분",
          copy: "수익의 대부분이 전용 바이백 펀드로 자동 유입",
        },
        {
          title: "시장 취득",
          copy: "완전한 투명성과 멀티시그 보안으로 시장 취득 실행",
        },
        {
          title: "영구 소각",
          copy: "재매입된 AIA는 공개된 커스터디에 보관되며 게시된 소각 일정에 따라 소각됩니다",
        },
      ],
    },
    priceTrend: {
      title: "AIA 가격 추이",
      periodAria: "차트 기간",
      periods: ["7D", "30D", "90D", "ALL"],
      yAxis: ["$0.0800", "$0.0600", "$0.0400", "$0.0200", "$0.0000"],
      xAxis: ["May 15", "Jun 6", "Jun 29", "Jul 21", "Aug 12"],
      legendPrice: "AIA 가격",
      legendBurn: "소각 이벤트",
      currentPrice: "$0.0741",
    },
    value: {
      title: "AIA가 중요한 이유",
      intro: "유틸리티 기반 수요가 디플레이션 공급 메커니즘을 만납니다.",
      cards: [
        {
          title: "수익 풀",
          lineOne: "에이전트 & 엔터프라이즈 자금",
          lineTwo: "USDC, 스테이블코인, 법정화폐로 결제",
        },
        {
          title: "바이백 엔진",
          lineOne: "프로그래밍 방식 시장 취득",
          lineTwo: "에이전트 네트워크 성장과 연동",
        },
        {
          title: "스테이킹 레이어",
          lineOne: "자발적 공급 락업",
          lineTwo: "독립적인 희소성 메커니즘",
        },
        {
          title: "디플레이션 설계",
          lineOne: "예정된 소각이 공급을 영구적으로 감소",
          lineTwo: "",
        },
      ],
    },
    flywheel: {
      title: "디플레이션 플라이휠",
      center: { token: "AIA", label: "플라이휠" },
      steps: [
        {
          number: "01",
          title: "에이전트 배포",
          copy: "더 많은 자율 에이전트가 온라인으로",
        },
        {
          number: "02",
          title: "AIA 소비",
          copy: "모든 에이전트가 운영에 AIA 필요",
        },
        {
          number: "03",
          title: "수익 → 소각",
          copy: "수수료가 자동으로 바이백 & 소각에 자금 조달",
        },
        {
          number: "04",
          title: "영구 제거",
          copy: "토큰이 공급에서 영원히 사라짐",
        },
      ],
    },
    outcome: {
      eyebrow: "결과",
      title: "자율 에이전트 확산과 함께 AIA 홀더가 혜택을 받습니다.",
      copy: "더 많은 에이전트가 배포될수록 프로토콜 활동이 증가합니다. 수익이 프로그래밍 방식 바이백에 자금 조달하고, 예정된 소각이 가용 공급을 영구적으로 줄입니다.",
      strong: "지속 가능한 성장. 정렬된 가치. 구조적 공급 메커니즘.",
    },
  },

  common: {
    brand: "DeAgentAI",
    launchApp: "지갑 연결",
    comingSoon: "곧 출시",
    live: "Live",
    languageShort: "한",
    readWhitePaper: "백서 읽기",
    placeholderTbd: "Placeholder · TBD",
  },
};
