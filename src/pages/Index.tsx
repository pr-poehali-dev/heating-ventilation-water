import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/cef55cac-449a-4134-bf48-3f101c83b861/files/0961f5c4-c06e-4907-9bac-02e977a68bf1.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Thermometer", title: "Отопление", desc: "Проектирование и монтаж систем отопления любой сложности. Радиаторы, тёплые полы, котельные.", price: "от 1 500 ₽/м²", color: "#FF6B35" },
  { icon: "Droplets", title: "Водоснабжение", desc: "Разводка холодной и горячей воды, установка счётчиков, фильтрационные системы.", price: "от 900 ₽/м.п.", color: "#00D4FF" },
  { icon: "Wind", title: "Вентиляция", desc: "Приточно-вытяжные системы, кондиционирование, воздухоочистка для офисов и домов.", price: "от 2 200 ₽/м²", color: "#00FF88" },
  { icon: "Zap", title: "Электрика", desc: "Монтаж электрощитов, разводка кабеля, установка розеток, освещение и слаботочка.", price: "от 800 ₽/точка", color: "#FFD600" },
  { icon: "Shield", title: "Канализация", desc: "Монтаж внутренней и внешней канализации, септики, системы ливневой канализации.", price: "от 1 100 ₽/м.п.", color: "#B47AFF" },
  { icon: "Settings", title: "Комплексный проект", desc: "Полное инженерное оснащение объекта под ключ. Проектирование, монтаж, сдача.", price: "от 3 500 ₽/м²", color: "#FF6B35" },
];

const REVIEWS = [
  { name: "Алексей Миронов", role: "Собственник загородного дома", text: "Сделали отопление и водоснабжение под ключ за 3 недели. Ни единой протечки за год эксплуатации. Профессионализм на высшем уровне!", rating: 5, avatar: "А" },
  { name: "Ирина Соколова", role: "Директор ресторана", text: "Монтировали вентиляцию в нашем заведении. Работали чисто, быстро, без лишнего шума. Сделали всё как договорились и даже лучше.", rating: 5, avatar: "И" },
  { name: "Дмитрий Власов", role: "Застройщик", text: "Работаем уже на третьем объекте вместе. Чёткое соблюдение сроков, всегда на связи, документация в порядке. Рекомендую.", rating: 5, avatar: "Д" },
];

const CALC_ITEMS = [
  { id: "heating", label: "Отопление", pricePerSqm: 1800, icon: "Thermometer" },
  { id: "water", label: "Водоснабжение", pricePerSqm: 900, icon: "Droplets" },
  { id: "ventilation", label: "Вентиляция", pricePerSqm: 2200, icon: "Wind" },
  { id: "electric", label: "Электрика", pricePerSqm: 1200, icon: "Zap" },
  { id: "sewage", label: "Канализация", pricePerSqm: 700, icon: "Shield" },
];

const ZONES = [
  {
    id: "heat",
    label: "Тепло",
    tag: "Отопление",
    icon: "Thermometer",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.55)",
    glowSoft: "rgba(255,107,53,0.12)",
    desc: "Тёплые полы, радиаторы, котельные — комфортная температура в любую погоду",
    stat: "1 500 ₽/м²",
  },
  {
    id: "air",
    label: "Воздух",
    tag: "Вентиляция",
    icon: "Wind",
    color: "#00CFFF",
    glow: "rgba(0,207,255,0.55)",
    glowSoft: "rgba(0,207,255,0.10)",
    desc: "Приточно-вытяжные системы и кондиционирование — свежий воздух круглый год",
    stat: "2 200 ₽/м²",
  },
  {
    id: "water",
    label: "Вода",
    tag: "Водоснабжение",
    icon: "Droplets",
    color: "#00E5A0",
    glow: "rgba(0,229,160,0.55)",
    glowSoft: "rgba(0,229,160,0.10)",
    desc: "Горячая, холодная вода и канализация — надёжная система без протечек",
    stat: "900 ₽/м.п.",
  },
];

function HeroZones({ scrollTo, heroImg }: { scrollTo: (h: string) => void; heroImg: string }) {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const zone = ZONES[active];

  const switchZone = (idx: number) => {
    setActive(idx);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % ZONES.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Фоновое фото */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.18) saturate(0.6)",
        transition: "filter 0.8s"
      }} />

      {/* Неоновый ореол активной зоны */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 60% 55% at 50% 45%, ${zone.glowSoft} 0%, transparent 70%)`,
        transition: "background 0.8s ease"
      }} />

      {/* Сетка-текстура */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* Контент */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 24px" }}>

        {/* Верхняя часть — слоган + описание */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 100, paddingBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `rgba(255,255,255,0.06)`, border: `1px solid rgba(255,255,255,0.12)`,
            borderRadius: 100, padding: "7px 18px", marginBottom: 36, fontSize: 13,
            color: "rgba(255,255,255,0.55)", width: "fit-content"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: zone.color, boxShadow: `0 0 8px ${zone.color}`, display: "inline-block", transition: "background 0.5s, box-shadow 0.5s" }} />
            Полный контроль: тепло, воздух, вода
          </div>

          <h1 key={`title-${animKey}`} style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(52px, 9vw, 100px)",
            fontWeight: 700, lineHeight: 1.0, marginBottom: 28, letterSpacing: -2,
            animation: "heroFadeUp 0.6s ease forwards"
          }}>
            <span style={{
              color: zone.color,
              textShadow: `0 0 40px ${zone.glow}, 0 0 80px ${zone.glowSoft}`,
              transition: "color 0.5s, text-shadow 0.5s"
            }}>
              {zone.label}
            </span>
            <br />
            <span style={{ color: "#fff" }}>под контролем</span>
          </h1>

          <p key={`desc-${animKey}`} style={{
            fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 500, marginBottom: 44, lineHeight: 1.75,
            animation: "heroFadeUp 0.6s 0.1s ease forwards", opacity: 0
          }}>
            {zone.desc}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("#calculator")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: zone.color, color: "#0a0a0f",
              border: "none", borderRadius: 12, padding: "15px 28px", fontSize: 16,
              fontWeight: 700, cursor: "pointer", fontFamily: "'Golos Text', sans-serif",
              boxShadow: `0 8px 32px ${zone.glow}`,
              transition: "background 0.5s, box-shadow 0.5s"
            }}>
              <Icon name="Calculator" size={20} />
              Рассчитать стоимость
            </button>
            <button onClick={() => scrollTo("#services")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.07)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
              padding: "15px 28px", fontSize: 16, fontWeight: 500, cursor: "pointer",
              fontFamily: "'Golos Text', sans-serif"
            }}>
              Наши услуги
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </div>

        {/* Три зоны — нижняя панель */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: 0, gap: 2,
          borderTop: "1px solid rgba(255,255,255,0.07)"
        }} className="hero-zones-grid">
          {ZONES.map((z, i) => {
            const isActive = active === i;
            return (
              <button
                key={z.id}
                onClick={() => switchZone(i)}
                style={{
                  position: "relative", background: "none", border: "none", cursor: "pointer",
                  padding: "28px 32px 32px",
                  textAlign: "left",
                  transition: "background 0.4s",
                  background: isActive ? `rgba(255,255,255,0.05)` : "transparent",
                  borderTop: isActive ? `2px solid ${z.color}` : "2px solid transparent",
                  fontFamily: "'Golos Text', sans-serif",
                  overflow: "hidden"
                } as React.CSSProperties}
              >
                {isActive && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${z.glowSoft} 0%, transparent 70%)`,
                    pointerEvents: "none"
                  }} />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: isActive ? `${z.color}25` : "rgba(255,255,255,0.06)",
                    border: `1px solid ${isActive ? z.color + "60" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isActive ? z.color : "rgba(255,255,255,0.4)",
                    transition: "all 0.4s"
                  }}>
                    <Icon name={z.icon} size={20} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 600,
                      color: isActive ? z.color : "rgba(255,255,255,0.6)",
                      transition: "color 0.4s",
                      textShadow: isActive ? `0 0 20px ${z.glow}` : "none"
                    }}>{z.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{z.tag}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700,
                  fontFamily: "'Oswald', sans-serif",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.25)",
                  transition: "color 0.4s"
                }}>{z.stat}</div>

                {/* Прогресс-бар */}
                {isActive && (
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.08)" }}>
                    <div key={animKey} style={{
                      height: "100%", background: z.color,
                      animation: "zoneProgress 4s linear forwards",
                      boxShadow: `0 0 8px ${z.color}`
                    }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoneProgress { from { width: 0%; } to { width: 100%; } }
        @media (max-width: 640px) {
          .hero-zones-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default function Index() {
  const [area, setArea] = useState(80);
  const [selectedServices, setSelectedServices] = useState<string[]>(["heating"]);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#0a0a0f", color: "#fff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,107,53,0.15)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 68, gap: 32 }}>
          <button onClick={() => scrollTo("#home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>⚙</span>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: 1, color: "#fff" }}>ИнжСтрой</span>
          </button>

          <ul style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0, flex: 1, justifyContent: "center" }} className="eng-nav-desktop">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button onClick={() => scrollTo(item.href)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 14px", borderRadius: 8, fontSize: 15,
                  color: activeSection === item.href.replace("#", "") ? "#FF6B35" : "rgba(255,255,255,0.7)",
                  fontWeight: activeSection === item.href.replace("#", "") ? 600 : 400,
                  transition: "all 0.2s", fontFamily: "'Golos Text', sans-serif"
                }}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={() => scrollTo("#contacts")} style={{
            background: "linear-gradient(135deg, #FF6B35, #FF3500)", color: "#fff",
            border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14,
            fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            fontFamily: "'Golos Text', sans-serif", flexShrink: 0
          }} className="eng-cta-desktop">
            Получить расчёт
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: "none", border: "none", cursor: "pointer", color: "#fff", display: "none"
          }} className="eng-burger">
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div style={{
            background: "rgba(10,10,15,0.98)", padding: "16px 24px 24px",
            display: "flex", flexDirection: "column", gap: 4, borderTop: "1px solid rgba(255,107,53,0.15)"
          }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} style={{
                background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)",
                padding: "12px 0", fontSize: 16, textAlign: "left", fontFamily: "'Golos Text', sans-serif"
              }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contacts")} style={{
              background: "linear-gradient(135deg, #FF6B35, #FF3500)", color: "#fff",
              border: "none", borderRadius: 10, padding: "14px", fontSize: 16,
              fontWeight: 600, cursor: "pointer", marginTop: 8, fontFamily: "'Golos Text', sans-serif"
            }}>
              Получить расчёт
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <HeroZones scrollTo={scrollTo} heroImg={HERO_IMG} />

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 24px", background: "#0d0d14" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{
              display: "inline-block", background: "rgba(255,107,53,0.15)",
              border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100,
              padding: "6px 16px", fontSize: 13, color: "#FF6B35", marginBottom: 16, fontWeight: 600
            }}>Что мы делаем</span>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 16 }}>Наши услуги</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              Полный спектр инженерных решений для жилых и коммерческих объектов
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                id={`svc-${i}`}
                data-animate
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 20, padding: "32px",
                  transition: `all 0.6s ease ${i * 80}ms`,
                  opacity: visibleCards.has(`svc-${i}`) ? 1 : 0,
                  transform: visibleCards.has(`svc-${i}`) ? "translateY(0)" : "translateY(30px)",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = s.color + "60";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: s.color + "20", border: `1px solid ${s.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, marginBottom: 20
                }}>
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ color: s.color, fontWeight: 700, fontSize: 16 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #0a0a0f 0%, #12080a 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{
              display: "inline-block", background: "rgba(255,107,53,0.15)",
              border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100,
              padding: "6px 16px", fontSize: 13, color: "#FF6B35", marginBottom: 16, fontWeight: 600
            }}>Быстро и удобно</span>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 16 }}>Калькулятор стоимости</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
              Предварительный расчёт за 30 секунд — выберите услуги и площадь
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }} className="eng-calc-grid">
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px" }}>
              <div style={{ marginBottom: 36 }}>
                <label style={{ display: "block", marginBottom: 16, fontWeight: 600, fontSize: 16 }}>
                  Площадь объекта: <span style={{ color: "#FF6B35" }}>{area} м²</span>
                </label>
                <input
                  type="range" min={20} max={1000} step={10} value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#FF6B35", cursor: "pointer", height: 6 }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  <span>20 м²</span><span>500 м²</span><span>1000 м²</span>
                </div>
              </div>

              <div>
                <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Выберите услуги:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {CALC_ITEMS.map((item) => {
                    const checked = selectedServices.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleService(item.id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "14px 18px", borderRadius: 12, cursor: "pointer",
                          background: checked ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.04)",
                          border: checked ? "1px solid rgba(255,107,53,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          color: checked ? "#FF6B35" : "rgba(255,255,255,0.7)",
                          fontFamily: "'Golos Text', sans-serif", fontSize: 15, fontWeight: checked ? 600 : 400,
                          transition: "all 0.2s", textAlign: "left"
                        }}
                      >
                        <Icon name={item.icon} size={18} />
                        <span style={{ flex: 1 }}>{item.label}</span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
                          {(item.pricePerSqm * area).toLocaleString("ru-RU")} ₽
                        </span>
                        {checked && <Icon name="Check" size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ position: "sticky", top: 90 }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,53,0,0.08))",
                border: "1px solid rgba(255,107,53,0.35)", borderRadius: 24, padding: "40px"
              }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                  Предварительная стоимость
                </p>
                {totalCost > 0 ? (
                  <>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, color: "#FF6B35", lineHeight: 1, marginBottom: 8 }}>
                      {totalCost.toLocaleString("ru-RU")}
                      <span style={{ fontSize: "0.4em", marginLeft: 8, color: "rgba(255,107,53,0.7)" }}>₽</span>
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginTop: 24, marginBottom: 24 }}>
                      {CALC_ITEMS.filter((i) => selectedServices.includes(i.id)).map((item) => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 15, color: "rgba(255,255,255,0.65)" }}>
                          <span>{item.label}</span>
                          <span style={{ color: "#fff", fontWeight: 600 }}>{(item.pricePerSqm * area).toLocaleString("ru-RU")} ₽</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", margin: "24px 0", fontStyle: "italic" }}>
                    Выберите услуги
                  </div>
                )}
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 20, lineHeight: 1.5 }}>
                  * Точная стоимость определяется после выезда специалиста и замеров
                </p>
                <button onClick={() => scrollTo("#contacts")} style={{
                  width: "100%", background: "linear-gradient(135deg, #FF6B35, #FF3500)",
                  color: "#fff", border: "none", borderRadius: 12, padding: "16px",
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Golos Text', sans-serif", boxShadow: "0 8px 32px rgba(255,107,53,0.35)"
                }}>
                  Заказать точный расчёт
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "100px 24px", background: "#0d0d14" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{
              display: "inline-block", background: "rgba(255,107,53,0.15)",
              border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100,
              padding: "6px 16px", fontSize: 13, color: "#FF6B35", marginBottom: 16, fontWeight: 600
            }}>Нам доверяют</span>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700 }}>Отзывы клиентов</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                id={`rev-${i}`}
                data-animate
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 20, padding: "32px",
                  transition: `all 0.6s ease ${i * 100}ms`,
                  opacity: visibleCards.has(`rev-${i}`) ? 1 : 0,
                  transform: visibleCards.has(`rev-${i}`) ? "translateY(0)" : "translateY(30px)"
                }}
              >
                <div style={{ color: "#FF6B35", fontSize: 24, marginBottom: 16, letterSpacing: 2 }}>{"★".repeat(r.rating)}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6B35, #FF3500)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 18, flexShrink: 0
                  }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #0a0a0f, #12080a)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="eng-contacts-grid">
            <div>
              <span style={{
                display: "inline-block", background: "rgba(255,107,53,0.15)",
                border: "1px solid rgba(255,107,53,0.3)", borderRadius: 100,
                padding: "6px 16px", fontSize: 13, color: "#FF6B35", marginBottom: 24, fontWeight: 600
              }}>Свяжитесь с нами</span>
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                Обсудим<br />ваш проект
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
                Бесплатная консультация и выезд специалиста для замеров
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "Phone", text: "+7 (999) 123-45-67" },
                  { icon: "Mail", text: "info@inzhstroy.ru" },
                  { icon: "MapPin", text: "Москва и область" },
                  { icon: "Clock", text: "Пн–Пт 9:00–20:00" },
                ].map((c) => (
                  <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#FF6B35", flexShrink: 0
                    }}>
                      <Icon name={c.icon} size={20} />
                    </div>
                    <span style={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px" }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 600, marginBottom: 28 }}>Оставить заявку</h3>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Ваше имя", type: "text", placeholder: "Иван Иванов" },
                  { label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} style={{
                      width: "100%", background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
                      padding: "14px 16px", color: "#fff", fontSize: 15, outline: "none",
                      fontFamily: "'Golos Text', sans-serif", boxSizing: "border-box"
                    }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Что нужно сделать</label>
                  <textarea placeholder="Опишите задачу..." rows={4} style={{
                    width: "100%", background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
                    padding: "14px 16px", color: "#fff", fontSize: 15, outline: "none",
                    fontFamily: "'Golos Text', sans-serif", resize: "vertical", boxSizing: "border-box"
                  }} />
                </div>
                <button type="submit" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "linear-gradient(135deg, #FF6B35, #FF3500)", color: "#fff",
                  border: "none", borderRadius: 12, padding: "16px",
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Golos Text', sans-serif", boxShadow: "0 8px 32px rgba(255,107,53,0.35)"
                }}>
                  <Icon name="Send" size={18} />
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", background: "#070709", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚙</span>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600 }}>ИнжСтрой</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>© 2024 ИнжСтрой. Все права защищены.</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => scrollTo(item.href)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "'Golos Text', sans-serif"
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

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