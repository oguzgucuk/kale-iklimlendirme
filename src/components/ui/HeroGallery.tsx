import * as React from "react";

interface Slide {
  image: string;
  title: string;
  desc: string;
}

const slides: Slide[] = [
  {
    image: "/images/projects/tcdd-haydarpasa-vrf-1.webp",
    title: "TCDD Haydarpaşa VRF Projesi",
    desc: "Merkezi Dış Ünite & Kollektör Borulama Devresi",
  },
  {
    image: "/images/projects/carrier-multi-inverter-montaj.jpg",
    title: "Carrier 5'li Multi Inverter Montajı",
    desc: "Özel Karkas Platform Üzeri Dış Ünite & Azot / Vakum Testi",
  },
  {
    image: "/images/projects/gree-dis-unite-kale-sticker.webp",
    title: "GREE Inverter Dış Ünite Montajı",
    desc: "Hassas Terazi ve Titreşim Önleyici Takoz Sistemi",
  },
  {
    image: "/images/projects/midea-kaset-tipi-tavan-klima.webp",
    title: "Kaset Tipi Tavan Klima",
    desc: "Restoran ve Ofisler İçin 360° Homojen Hava Dağılımı",
  },
  {
    image: "/images/projects/pilavci-rahim-gree-salon-tipi.webp",
    title: "GREE Salon Tipi Ticari Klima",
    desc: "Geniş Hacimli Ticari Mekanlarda Hızlı İklimlendirme",
  },
];

export function HeroGallery() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Otomatik geçiş (4.5 saniye)
  React.useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200/90 bg-slate-900 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Görseller Çerçevesi */}
      <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[380px] xl:h-[410px] overflow-hidden bg-slate-950">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Hafif karartma gradyanı (metin okunurluğu için) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
            </div>
          );
        })}
      </div>

      {/* Modern Sol / Sağ Kaydırma Butonları (Tailark & shadcn stili cam butonlar) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Önceki Proje Fotoğrafı"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-navy-950 flex items-center justify-center backdrop-blur-md shadow-md border border-white/60 opacity-80 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 focus:outline-none"
      >
        <svg
          className="w-5 h-5 -ml-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Sonraki Proje Fotoğrafı"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-navy-950 flex items-center justify-center backdrop-blur-md shadow-md border border-white/60 opacity-80 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 focus:outline-none"
      >
        <svg
          className="w-5 h-5 -mr-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Alt Bilgi Kartı & İndikatörler */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 flex flex-col gap-2 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white truncate drop-shadow-sm">
            {slides[current].title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 truncate font-normal mt-0.5">
            {slides[current].desc}
          </p>
        </div>

        {/* Nokta İndikatörleri (Clickable Progress Dots) */}
        <div className="flex items-center gap-1.5 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`${idx + 1}. fotoğrafa geç`}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                idx === current
                  ? "w-8 bg-brand-400"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
