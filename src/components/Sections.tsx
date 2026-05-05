import Icon from "@/components/ui/icon";
import { SERVICES, REVIEWS, CALC_ITEMS, NAV_ITEMS } from "@/components/data";

// ─── Services ────────────────────────────────────────────────────────────────

interface ServicesSectionProps {
  visibleCards: Set<string>;
}

export function ServicesSection({ visibleCards }: ServicesSectionProps) {
  return (
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
  );
}

// ─── Calculator ───────────────────────────────────────────────────────────────

interface CalculatorSectionProps {
  area: number;
  setArea: (v: number) => void;
  selectedServices: string[];
  toggleService: (id: string) => void;
  totalCost: number;
  scrollTo: (href: string) => void;
}

export function CalculatorSection({ area, setArea, selectedServices, toggleService, totalCost, scrollTo }: CalculatorSectionProps) {
  return (
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
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

interface ReviewsSectionProps {
  visibleCards: Set<string>;
}

export function ReviewsSection({ visibleCards }: ReviewsSectionProps) {
  return (
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
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export function ContactsSection() {
  return (
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
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface FooterProps {
  scrollTo: (href: string) => void;
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer style={{ padding: "32px 24px", background: "#070709", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>⚙</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600 }}>Газ Вик Сервис</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>© 2024 Газ Вик Сервис. Все права защищены.</p>
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
  );
}
