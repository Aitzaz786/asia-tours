import type { ReactNode } from "react";

/** Original homepage hero height — shared by every dark-hero page */
export const HOME_HERO_HEIGHT =
  "min-h-[560px] sm:min-h-[780px] lg:min-h-[860px] xl:min-h-[940px]";

export const HOME_HERO_CONTENT_HEIGHT = HOME_HERO_HEIGHT;

type DarkHeroShellProps = {
  children: ReactNode;
  /** Extra classes merged onto the shell (height defaults to homepage) */
  className?: string;
  asSection?: boolean;
  sectionClassName?: string;
};

/** Shared homepage-style dark CSS animated hero background. */
export default function DarkHeroShell({
  children,
  className = "",
  asSection = false,
  sectionClassName = "",
}: DarkHeroShellProps) {
  const shell = (
    <div className={`relative overflow-hidden ${HOME_HERO_HEIGHT} ${className}`}>
      <div className="hero-animated-bg" aria-hidden="true">
        <div className="hero-animated-bg__ambient" />
        <div className="hero-animated-bg__grid" />
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
        <div className="hero-orb hero-orb--4" />
        <div className="hero-orb hero-orb--5" />
        <div className="hero-orb hero-orb--6" />
        <div className="hero-orb hero-orb--7" />
        <div className="hero-orb hero-orb--8" />
        <div className="hero-orb hero-orb--9" />
        <div className="hero-orb hero-orb--10" />
        <div className="hero-line hero-line--h1" />
        <div className="hero-line hero-line--h2" />
        <div className="hero-line hero-line--v1" />
        <div className="hero-line hero-line--diag" />
        <div className="hero-animated-bg__vignette" />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

  if (!asSection) return shell;

  return (
    <section
      className={`home-hero relative z-30 w-full overflow-x-hidden ${sectionClassName}`}
    >
      {shell}
    </section>
  );
}
