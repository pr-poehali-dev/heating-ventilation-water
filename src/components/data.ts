export const HERO_IMG = "https://cdn.poehali.dev/projects/cef55cac-449a-4134-bf48-3f101c83b861/files/0961f5c4-c06e-4907-9bac-02e977a68bf1.jpg";

export const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export const SERVICES = [
  { icon: "Thermometer", title: "Отопление", desc: "Проектирование и монтаж систем отопления любой сложности. Радиаторы, тёплые полы, котельные.", price: "от 1 500 ₽/м²", color: "#FF6B35" },
  { icon: "Droplets", title: "Водоснабжение", desc: "Разводка холодной и горячей воды, установка счётчиков, фильтрационные системы.", price: "от 900 ₽/м.п.", color: "#00D4FF" },
  { icon: "Wind", title: "Вентиляция", desc: "Приточно-вытяжные системы, кондиционирование, воздухоочистка для офисов и домов.", price: "от 2 200 ₽/м²", color: "#00FF88" },
  { icon: "Shield", title: "Канализация", desc: "Монтаж внутренней и внешней канализации, септики, системы ливневой канализации.", price: "от 1 100 ₽/м.п.", color: "#B47AFF" },
];

export const REVIEWS = [
  { name: "Алексей Миронов", role: "Собственник загородного дома", text: "Сделали отопление и водоснабжение под ключ за 3 недели. Ни единой протечки за год эксплуатации. Профессионализм на высшем уровне!", rating: 5, avatar: "А" },
  { name: "Ирина Соколова", role: "Директор ресторана", text: "Монтировали вентиляцию в нашем заведении. Работали чисто, быстро, без лишнего шума. Сделали всё как договорились и даже лучше.", rating: 5, avatar: "И" },
  { name: "Дмитрий Власов", role: "Застройщик", text: "Работаем уже на третьем объекте вместе. Чёткое соблюдение сроков, всегда на связи, документация в порядке. Рекомендую.", rating: 5, avatar: "Д" },
];

export const CALC_ITEMS = [
  { id: "heating", label: "Отопление", pricePerSqm: 1800, icon: "Thermometer" },
  { id: "water", label: "Водоснабжение", pricePerSqm: 900, icon: "Droplets" },
  { id: "ventilation", label: "Вентиляция", pricePerSqm: 2200, icon: "Wind" },
  { id: "sewage", label: "Канализация", pricePerSqm: 700, icon: "Shield" },
];

export const ZONES = [
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
