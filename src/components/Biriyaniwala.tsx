import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import biryani from "@/assets/biryani.jpg";
import butter from "@/assets/butter-chicken.jpg";
import tandoori from "@/assets/tandoori.jpg";
import seekh from "@/assets/seekh.jpg";
import paneer from "@/assets/paneer.jpg";
import dal from "@/assets/dal.jpg";
import naan from "@/assets/naan.jpg";
import lassi from "@/assets/lassi.jpg";

const DISHES = [
  { a: "Chicken Dum", b: "Biryani", word: "Biriyani", tag: "Signature · Dum", price: "$21.90", img: biryani, desc: "Bone-in chicken and saffron basmati, sealed under dough and slow-cooked for ninety minutes." },
  { a: "Butter", b: "Chicken", word: "Makhani", tag: "Most ordered", price: "$22.90", img: butter, desc: "Tandoori chicken folded into a velvet tomato-butter gravy, finished with cream." },
  { a: "Tandoori", b: "Chicken", word: "Tandoori", tag: "From the clay oven", price: "$16.90", img: tandoori, desc: "Yogurt and Kashmiri chilli marinade, charred at 480° in the tandoor." },
  { a: "Lamb Seekh", b: "Kebab", word: "Seekh", tag: "Charcoal grill", price: "$18.90", img: seekh, desc: "Hand-minced lamb with green chilli and coriander, skewered and flame-kissed." },
  { a: "Paneer", b: "Tikka", word: "Tikka", tag: "Vegetarian", price: "$17.90", img: paneer, desc: "Fresh paneer, peppers and onion in smoky tikka masala, straight off the skewer." },
  { a: "Dal", b: "Makhani", word: "Dal", tag: "Overnight simmer", price: "$14.90", img: dal, desc: "Black lentils simmered for eighteen hours with butter and cream." },
  { a: "Garlic Butter", b: "Naan", word: "Naan", tag: "From the clay oven", price: "$5.50", img: naan, desc: "Blistered in the tandoor, brushed with garlic butter and fresh coriander." },
  { a: "Mango", b: "Lassi", word: "Lassi", tag: "To cool down", price: "$7.50", img: lassi, desc: "Alphonso mango churned with thick curd, cardamom and pistachio." },
];

const WORDS1 = ["Dum Pukht", "Saffron", "Ek Plate Aur", "Basmati", "Ghee", "Kesar"];
const WORDS2 = ["Burani Raita", "Ek Plate Aur", "Basmati", "Ghee", "Dum Pukht", "Saffron"];
const STEPS = [
  { n: "01", t: "Marinate", d: "Twelve hours in yogurt, ginger, garlic and our house garam masala.", img: tandoori },
  { n: "02", t: "Layer", d: "Par-cooked basmati, fried onions, mint and saffron milk, layer over layer.", img: seekh },
  { n: "03", t: "Seal the Dum", d: "Dough-sealed handi over low coals so nothing escapes but the aroma.", img: biryani },
  { n: "04", t: "Serve", d: "Opened at the table. The steam is the first course.", img: dal },
];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{children}</span>;
}

export default function Biriyaniwala() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".dish");
      gsap.set(slides.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".showcase",
          start: "top top",
          end: () => `+=${window.innerHeight * DISHES.length}`,
          pin: true,
          scrub: 0.8,
          onUpdate: (s) => setActive(Math.min(DISHES.length - 1, Math.round(s.progress * (DISHES.length - 1)))),
        },
      });
      slides.forEach((s, i) => {
        const img = s.querySelector(".dish-img");
        const word = s.querySelector(".dish-word");
        const txt = s.querySelectorAll(".dish-txt");
        // idle float inside each step
        tl.to(img, { scale: 1.06, rotate: i % 2 ? -3 : 3, y: -20, duration: 1, ease: "none" }, i * 2);
        if (i === slides.length - 1) return;
        const next = slides[i + 1]!;
        const at = i * 2 + 1;
        tl.to(img, { scale: 1.25, y: -80, autoAlpha: 0, filter: "blur(10px)", duration: 1 }, at)
          .to(word, { yPercent: -60, autoAlpha: 0, duration: 0.8 }, at)
          .to(txt, { y: -30, autoAlpha: 0, stagger: 0.05, duration: 0.5 }, at)
          .set(s, { autoAlpha: 0 }, at + 1)
          .set(next, { autoAlpha: 1 }, at + 0.1)
          .fromTo(next.querySelector(".dish-img"), { scale: 0.7, y: 120, rotate: -8, autoAlpha: 0, filter: "blur(10px)" }, { scale: 1, y: 0, rotate: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "none" }, at + 0.1)
          .from(next.querySelector(".dish-word"), { yPercent: 70, autoAlpha: 0, duration: 0.8 }, at + 0.3)
          .from(next.querySelectorAll(".dish-txt"), { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.5 }, at + 0.4);
      });
      tl.fromTo(".progress-bar", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);

      gsap.to(".mq1", { xPercent: -30, ease: "none", scrollTrigger: { trigger: ".marquee", scrub: true } });
      gsap.fromTo(".mq2", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".marquee", scrub: true } });

      const track = document.querySelector<HTMLElement>(".steps-track");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth * 0.55),
          ease: "none",
          scrollTrigger: { trigger: ".process", start: "top top", end: () => `+=${track.scrollWidth}`, pin: true, scrub: 1, invalidateOnRefresh: true },
        });
      }
      gsap.fromTo(".finale-word", { scale: 1.6, autoAlpha: 0, letterSpacing: "0.3em" }, {
        scale: 1, autoAlpha: 1, letterSpacing: "0em", ease: "none",
        scrollTrigger: { trigger: ".finale", start: "top bottom", end: "center center", scrub: true },
      });
      gsap.fromTo(".finale-word", { backgroundPosition: "50% 0%" }, {
        backgroundPosition: "50% 100%", ease: "none",
        scrollTrigger: { trigger: ".finale", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);

    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return (
    <div ref={root} className="bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#" className="font-display text-sm text-cream"><span className="text-gold">◆</span> Mr. Biriyaniwala</a>
        <nav className="hidden gap-8 md:flex">
          {["The Dum", "Order", "Menu", "Tandoor", "Visit"].map((l) => (
            <a key={l} href={`#${l === "Visit" ? "visit" : "menu"}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:inline">● Open · 12pm – 11pm</span>
          <a href="tel:+10000000000" className="rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-gold hover:text-gold">Call to order</a>
        </div>
      </header>

      {/* Dish showcase */}
      <section id="menu" className="showcase relative h-screen overflow-hidden">
        {DISHES.map((d, i) => (
          <div key={d.word} className="dish absolute inset-0">
            <div className="absolute left-1/2 top-[44%] h-[62vh] w-[62vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2">
              <img src={d.img} alt={`${d.a} ${d.b}`} width={1024} height={1024} loading={i ? "lazy" : "eager"} className="dish-img food-blend h-full w-full object-contain" />
              <div className="vignette pointer-events-none absolute inset-0" />
            </div>
            <div className="absolute left-6 top-24 max-w-[260px] md:left-10 md:top-28">
              <div className="dish-txt"><Label>◆ Mr. Biriyaniwala</Label></div>
              <div className="dish-txt mt-4 font-serif text-6xl italic text-gold">0{i + 1}<sup className="ml-1 font-mono text-[10px] not-italic text-muted-foreground">/ 08</sup></div>
              <div className="dish-txt mt-2"><Label>{d.tag}</Label></div>
              <h2 className="dish-txt mt-2 font-serif text-4xl leading-none text-cream">{d.a}<br /><em className="text-gold">{d.b}</em></h2>
              <p className="dish-txt mt-4 hidden text-sm leading-snug text-muted-foreground md:block">{d.desc}</p>
              <div className="dish-txt mt-5 flex items-center gap-4"><span className="font-display text-xl text-cream">{d.price}</span><Label>On the menu →</Label></div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-[9vh] text-center">
              <span className="dish-word word-glow inline-block font-display text-[22vw] leading-[0.9] md:text-[15vw]">{d.word}</span>
            </div>
          </div>
        ))}

        <div className="absolute right-10 top-28 hidden w-56 lg:block">
          <Label>The table</Label>
          <ul className="mt-3">
            {DISHES.map((d, i) => (
              <li key={d.word} className={`border-b border-border py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${i === active ? "text-gold" : "text-muted-foreground"}`}>
                0{i + 1} · {d.a} {d.b}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute right-[18rem] top-24 hidden h-24 w-24 lg:block">
          <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
            <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text className="fill-muted-foreground font-mono text-[8px] uppercase tracking-[0.3em]"><textPath href="#c">Slow cooked · Dum pukht · Since 1998 ·</textPath></text>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-gold">◆</span>
        </div>

        <div className="absolute inset-x-6 bottom-6 flex items-center gap-6 md:inset-x-10">
          <Label>Scroll to serve the next dish</Label>
          <div className="relative h-px flex-1 bg-border"><div className="progress-bar absolute inset-0 origin-left bg-gold" /></div>
          <span className="font-serif text-sm text-cream">बिरयानी वाला</span>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee overflow-hidden py-24">
        <div className="mq1 flex whitespace-nowrap font-serif text-[9vw] leading-none">
          {[...WORDS1, ...WORDS1].map((w, i) => (
            <span key={i} className="flex items-center"><span className={i % 2 ? "text-outline italic" : "text-cream"}>{w}</span><span className="mx-8 text-[3vw] text-gold">✦</span></span>
          ))}
        </div>
        <div className="mq2 mt-4 flex whitespace-nowrap font-serif text-[6vw] leading-none">
          {[...WORDS2, ...WORDS2].map((w, i) => (
            <span key={i} className="flex items-center"><span className={i % 2 ? "text-gold" : "text-outline italic"}>{w}</span><span className="mx-8 text-[2vw] text-cream">✦</span></span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="process relative flex h-screen items-center overflow-hidden">
        <div className="absolute left-6 top-1/2 z-10 max-w-xs -translate-y-1/2 md:left-10">
          <Label>The Dum · 90 min</Label>
          <h3 className="mt-4 font-serif text-5xl leading-[1.05] text-cream">Ninety minutes we will <em className="text-gold">never</em> let us skip.</h3>
          <p className="mt-4 text-sm text-muted-foreground">No shortcuts, no pressure cookers. This is the way our grandfather did it.</p>
        </div>
        <div className="steps-track flex gap-8 pl-[45vw]">
          {STEPS.map((s) => (
            <div key={s.n} className="w-[70vw] shrink-0 md:w-[26vw]">
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-card">
                <img src={s.img} alt={s.t} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
              <div className="mt-4 flex items-baseline gap-3"><span className="font-serif text-4xl italic text-gold">{s.n}</span><span className="font-serif text-2xl text-cream">{s.t}</span></div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finale */}
      <section className="finale flex h-[120vh] items-center justify-center overflow-hidden">
        <h2 className="finale-word bg-cover bg-clip-text font-display text-[19vw] leading-none text-transparent" style={{ backgroundImage: `url(${seekh})` }}>BIRIYANI</h2>
      </section>

      <footer id="visit" className="border-t border-border px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div><Label>Visit</Label><p className="mt-3 font-serif text-2xl text-cream">12 Saffron Lane<br />Your City</p></div>
          <div><Label>Hours</Label><p className="mt-3 font-serif text-2xl text-cream">Daily<br /><em className="text-gold">12pm – 11pm</em></p></div>
          <div><Label>Order</Label><p className="mt-3 font-serif text-2xl text-cream">+1 000 000 0000</p></div>
        </div>
        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">© Mr. Biriyaniwala · Ek plate aur</p>
      </footer>
    </div>
  );
}
