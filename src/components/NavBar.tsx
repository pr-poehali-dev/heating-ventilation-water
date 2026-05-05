import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/components/data";

interface NavBarProps {
  activeSection: string;
  scrollTo: (href: string) => void;
}

export default function NavBar({ activeSection, scrollTo }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    scrollTo(href);
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,107,53,0.15)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 68, gap: 32 }}>
        <button onClick={() => handleNav("#home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
          <span style={{ fontSize: 28, lineHeight: 1 }}>⚙</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: 1, color: "#fff" }}>Газ Вик Сервис</span>
        </button>

        <ul style={{ display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0, flex: 1, justifyContent: "center" }} className="eng-nav-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button onClick={() => handleNav(item.href)} style={{
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

        <button onClick={() => handleNav("#contacts")} style={{
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
            <button key={item.href} onClick={() => handleNav(item.href)} style={{
              background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)",
              padding: "12px 0", fontSize: 16, textAlign: "left", fontFamily: "'Golos Text', sans-serif"
            }}>
              {item.label}
            </button>
          ))}
          <button onClick={() => handleNav("#contacts")} style={{
            background: "linear-gradient(135deg, #FF6B35, #FF3500)", color: "#fff",
            border: "none", borderRadius: 10, padding: "14px", fontSize: 16,
            fontWeight: 600, cursor: "pointer", marginTop: 8, fontFamily: "'Golos Text', sans-serif"
          }}>
            Получить расчёт
          </button>
        </div>
      )}
    </nav>
  );
}
