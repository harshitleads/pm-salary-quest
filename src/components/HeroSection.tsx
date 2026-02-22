const HeroSection = () => (
  <section className="gradient-hero relative overflow-hidden px-4 py-20 text-center md:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(253,181,21,0.12)_0%,_transparent_60%)]" />
    <div className="relative z-10 mx-auto max-w-3xl">
      <h1 className="animate-fade-in-up text-hero-title text-white md:text-6xl md:leading-[1.08]">
        Master PM Interviews.{" "}
        <span className="text-secondary">Land Top Salaries.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl animate-fade-in-up text-hero-subtitle text-white/75 [animation-delay:150ms]">
        Practice real interview questions mapped to actual PM compensation tiers
      </p>
    </div>
  </section>
);

export default HeroSection;
