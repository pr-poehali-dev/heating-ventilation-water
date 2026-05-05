import { useState, useEffect, useRef } from "react";
import { HERO_IMG, CALC_ITEMS } from "@/components/data";
import NavBar from "@/components/NavBar";
import HeroZones from "@/components/HeroZones";
import { ServicesSection, CalculatorSection, ReviewsSection, ContactsSection, Footer } from "@/components/Sections";

export default function Index() {
  const [area, setArea] = useState(80);
  const [selectedServices, setSelectedServices] = useState<string[]>(["heating"]);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalCost = CALC_ITEMS.filter((item) =>
    selectedServices.includes(item.id)
  ).reduce((sum, item) => sum + item.pricePerSqm * area, 0);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "calculator", "reviews", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = document.querySelectorAll("[data-animate]");
    cards.forEach((card) => observerRef.current?.observe(card));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#0a0a0f", color: "#fff", minHeight: "100vh" }}>
      <NavBar activeSection={activeSection} scrollTo={scrollTo} />
      <HeroZones scrollTo={scrollTo} heroImg={HERO_IMG} />
      <ServicesSection visibleCards={visibleCards} />
      <CalculatorSection
        area={area}
        setArea={setArea}
        selectedServices={selectedServices}
        toggleService={toggleService}
        totalCost={totalCost}
        scrollTo={scrollTo}
      />
      <ReviewsSection visibleCards={visibleCards} />
      <ContactsSection />
      <Footer scrollTo={scrollTo} />

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @media (max-width: 768px) {
          .eng-nav-desktop { display: none !important; }
          .eng-cta-desktop { display: none !important; }
          .eng-burger { display: flex !important; }
          .eng-calc-grid { grid-template-columns: 1fr !important; }
          .eng-contacts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
