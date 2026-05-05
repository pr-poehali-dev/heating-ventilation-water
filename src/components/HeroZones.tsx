import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { ZONES } from "@/components/data";

interface HeroZonesProps {
  scrollTo: (href: string) => void;
  heroImg: string;
}

export default function HeroZones({ scrollTo, heroImg }: HeroZonesProps) {
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
                  position: "relative", border: "none", cursor: "pointer",
                  padding: "28px 32px 32px",
                  textAlign: "left",
                  transition: "background 0.4s",
                  background: isActive ? `rgba(255,255,255,0.05)` : "transparent",
                  borderTop: isActive ? `2px solid ${z.color}` : "2px solid transparent",
                  fontFamily: "'Golos Text', sans-serif",
                  overflow: "hidden"
                }}
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
