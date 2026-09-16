"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { Messages } from "@/i18n/messages/types";
import { MediaGlobe } from "./media-globe";
import { ScaleFrame } from "./scale-frame";

type W3LabsHeroCopy = Messages["w3labs"]["hero"];
type W3LabsEventCards = Messages["w3labs"]["eventCards"];
type HeroFrameCopy = {
  hero: W3LabsHeroCopy;
  cards: W3LabsEventCards;
};

const A = "/originkit/hero-24";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const PHONE_QUERY = "(max-width: 639px)";
const TABLET_QUERY = "(min-width: 640px) and (max-width: 1279px)";
const DESKTOP_QUERY = "(min-width: 1280px)";

const REVEAL = "animate-hero-reveal";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

const Backdrop = ({ src, className }: { src: string; className: string }) => (
  <img
    alt=""
    aria-hidden
    className={`pointer-events-none absolute left-0 top-0 h-full min-h-screen w-full max-w-none object-cover ${className}`}
    src={`${A}/${src}`}
  />
);

const EDGE_FADE = {
  left: "linear-gradient(to right, transparent 0%, #000 18%, #000 100%)",
  right: "linear-gradient(to left, transparent 0%, #000 18%, #000 100%)",
} as const;

const HAND_SLIDE = {
  left: "animate-hand-slide-in-left",
  right: "animate-hand-slide-in-right",
} as const;

const HandCutout = ({
  box,
  mask,
  maskSize,
  image,
  from,
  step,
}: {
  box: string;
  mask: string;
  maskSize: string;
  image: string;
  from: "left" | "right";
  step: number;
}) => (
  <div
    className={`absolute ${HAND_SLIDE[from]} ${box}`}
    style={{
      ...delay(step),
      maskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      WebkitMaskImage: `url("${A}/${mask}"), ${EDGE_FADE[from]}`,
      maskMode: "alpha",
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskSize: `${maskSize}, 100% 100%`,
      WebkitMaskSize: `${maskSize}, 100% 100%`,
    }}
  >
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{ inset: 0 }}
    >
      <img alt="" className={`absolute max-w-none ${image}`} src={`${A}/hands.png`} />
    </div>
  </div>
);

const GlassCard = ({
  className,
  step,
  children,
}: {
  className: string;
  step: number;
  children: ReactNode;
}) => (
  <div
    style={delay(step)}
    className={`${REVEAL} hero-event-glass isolate absolute z-[6] flex flex-col items-start overflow-clip border-solid border-[rgba(133,238,244,0.22)] bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(44,224,234,0.025)_48%,rgba(0,0,0,0.08))] shadow-[0_14px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(44,224,234,0.07)] ${className}`}
  >
    {children}
  </div>
);

const HeroEventCard = ({
  className,
  title,
  lines,
  step,
  prefix = true,
}: {
  className: string;
  title: string;
  lines: readonly string[];
  step: number;
  prefix?: boolean;
}) => (
  <GlassCard
    className={`${className} gap-[4px] border p-[9px_14px]`}
    step={step}
  >
    <p className="relative w-full shrink-0 text-[15px] leading-[1.2] text-[#2ce0ea]" style={{ margin: 0 }}>
      {prefix ? "·" : ""}{title}
    </p>
    <div className="relative w-full text-[9px] leading-[1.25] text-[rgba(255,255,255,0.88)]">
      {lines.map((line) => <p className="m-0" style={{ margin: 0 }} key={line}>{line}</p>)}
    </div>
  </GlassCard>
);

const PhoneFrame = ({ hero, cards }: HeroFrameCopy) => (
  <div className="relative h-[836px] w-[402px] overflow-clip">

    {}
    {}
    <div className="absolute left-1/2 top-[90px] flex w-[370px] -translate-x-1/2 flex-col items-center gap-[24px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[8px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-[320px] shrink-0 text-[40px] leading-[44px] tracking-[-1.6px]`}
        >
          {hero.title}
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[14px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          {hero.subtitle}
        </p>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} w3labs-hero-globe absolute left-[calc(50%+0.5px)] top-[418px] h-[324px] w-[323px] -translate-x-1/2`}>
      <MediaGlobe query={PHONE_QUERY} />
    </div>

    <HandCutout
      box="left-[172px] top-[344.46px] h-[177.31px] w-[230px]"
      mask="hand-mask-top.svg"
      maskSize="230px 177.309px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-[-27px] top-[571.65px] h-[212.8px] w-[224px]"
      mask="hand-mask-bottom.svg"
      maskSize="224px 212.801px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    <HeroEventCard className="left-[16px] top-[452px] w-[158px]" title={cards.openClawShenzhen.title} lines={cards.openClawShenzhen.lines} step={400} />
    <HeroEventCard className="left-[228px] top-[484px] w-[158px]" title={cards.szhkWeb3.title} lines={cards.szhkWeb3.lines} step={450} />
    <HeroEventCard className="left-[190px] top-[690px] w-[196px]" title={cards.hichuangEurasia.title} lines={cards.hichuangEurasia.lines} step={500} />
  </div>
);

const TabletFrame = ({ hero, cards }: HeroFrameCopy) => (
  <div className="relative h-[994px] w-[744px] overflow-clip">

    {}
    {}
    <div className="absolute left-[149px] top-[120px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[56px] leading-[60px] tracking-[-2.24px]`}
        >
          {hero.title}
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          {hero.subtitle}
        </p>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} w3labs-hero-globe absolute left-[163px] top-[432px] h-[420px] w-[418px]`}>
      <MediaGlobe query={TABLET_QUERY} />
    </div>

    <HandCutout
      box="left-[401px] top-[383.289px] h-[264.423px] w-[343px]"
      mask="ipad-mask-top.svg"
      maskSize="343px 264.423px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-0 top-[692.875px] h-[267.9px] w-[282px]"
      mask="ipad-mask-bottom.svg"
      maskSize="282px 267.9px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    <HeroEventCard className="left-[82px] top-[430px] w-[190px]" title={cards.openClawShenzhen.title} lines={cards.openClawShenzhen.lines} step={400} />
    <HeroEventCard className="left-[500px] top-[486px] w-[190px]" title={cards.szhkWeb3.title} lines={cards.szhkWeb3.lines} step={440} />
    <HeroEventCard className="left-[24px] top-[620px] w-[216px]" title={cards.hichuangRaccoonAi.title} lines={cards.hichuangRaccoonAi.lines} prefix={false} step={480} />
    <HeroEventCard className="left-[270px] top-[810px] w-[196px]" title={cards.opcWorkBuddy.title} lines={cards.opcWorkBuddy.lines} step={520} />
    <HeroEventCard className="left-[493px] top-[785px] w-[214px]" title={cards.hichuangEurasia.title} lines={cards.hichuangEurasia.lines} step={560} />
  </div>
);

const DesktopFrame = ({ hero, cards }: HeroFrameCopy) => (
  <div className="relative h-[913px] w-[1280px] overflow-clip">

    {}
    <div className="absolute left-[417px] top-[144px] flex w-[446px] flex-col items-center gap-[32px]">
      <div className="relative flex w-full shrink-0 flex-col items-center gap-[16px] text-center text-white">
        <h1
          style={delay(80)}
          className={`${REVEAL} relative w-full shrink-0 text-[64px] leading-[68px] tracking-[-2.56px]`}
        >
          {hero.title}
        </h1>
        <p
          style={delay(160)}
          className={`${REVEAL} relative w-full shrink-0 text-[16px] leading-[1.5] text-[rgba(255,255,255,0.7)]`}
        >
          {hero.subtitle}
        </p>
      </div>
    </div>

    {}
    <div style={delay(320)} className={`${REVEAL} w3labs-hero-globe absolute left-[431px] top-[448px] h-[420px] w-[418px]`}>
      <MediaGlobe query={DESKTOP_QUERY} />
    </div>

    <HandCutout
      box="left-[794px] top-[269.169px] h-[374.664px] w-[486px]"
      mask="desk-mask-top.svg"
      maskSize="486px 374.664px"
      image="left-[-97.68%] top-[-17.2%] h-[170.95%] w-[197.68%]"
      from="right"
      step={360}
    />

    <HandCutout
      box="left-0 top-[592.398px] h-[420.85px] w-[443px]"
      mask="desk-mask-bottom.svg"
      maskSize="443px 420.85px"
      image="left-[-15.3%] top-[-63.32%] h-[163.32%] w-[232.73%]"
      from="left"
      step={440}
    />

    <HeroEventCard className="left-[335px] top-[358px] w-[196px]" title={cards.openClawShenzhen.title} lines={cards.openClawShenzhen.lines} step={400} />
    <HeroEventCard className="left-[830px] top-[397px] w-[196px]" title={cards.szhkWeb3.title} lines={cards.szhkWeb3.lines} step={440} />
    <HeroEventCard className="left-[205px] top-[500px] w-[216px]" title={cards.hichuangRaccoonAi.title} lines={cards.hichuangRaccoonAi.lines} prefix={false} step={480} />
    <HeroEventCard className="left-[382px] top-[690px] w-[196px]" title={cards.opcWorkBuddy.title} lines={cards.opcWorkBuddy.lines} step={520} />
    <HeroEventCard className="left-[702px] top-[688px] w-[216px]" title={cards.hichuangEurasia.title} lines={cards.hichuangEurasia.lines} step={560} />
  </div>
);

/**
 * W3Labs Hero：地球与活动数据卡。
 */
export const Sec2Hero = () => {
  const { messages } = useI18n()
  const hero = messages.w3labs.hero
  const cards = messages.w3labs.eventCards
  const frameCopy: HeroFrameCopy = { hero, cards }
  return (
  <section
    className="relative w-full overflow-hidden bg-[#101216]"
    style={{ fontFamily: HELVETICA }}
  >
    <Backdrop src="bg.png" className="min-[640px]:hidden" />
    <Backdrop src="bg-ipad.png" className="hidden min-[640px]:block desktop-sm:hidden" />
    <Backdrop src="bg-desktop.png" className="hidden desktop-sm:block" />

    {}
    <ScaleFrame frameWidth={402} className="relative w-full overflow-hidden min-[640px]:hidden">
      <PhoneFrame {...frameCopy} />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={744}
      className="relative hidden w-full overflow-hidden min-[640px]:block desktop-sm:hidden"
    >
      <TabletFrame {...frameCopy} />
    </ScaleFrame>
    <ScaleFrame
      frameWidth={1280}
      className="relative hidden w-full overflow-hidden desktop-sm:block"
    >
      <DesktopFrame {...frameCopy} />
    </ScaleFrame>
  </section>
  )
}
