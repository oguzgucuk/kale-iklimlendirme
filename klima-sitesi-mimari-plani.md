# Klima Firması Web Sitesi — Mimari & İnşa Planı

Bu doküman, bir klima satış/VRF proje/bakım-onarım firması için sıfırdan kurulacak bir kurumsal web sitesinin **teknik mimarisini**, **sayfa/bileşen planını** ve **adım adım inşa sırasını** tanımlar. Antigravity, Codex gibi AI kodlama ajanlarına doğrudan bağlam olarak verilmek üzere yazılmıştır.

Referans aldığın site (ScrewFast README) **Astro + Tailwind CSS + Preline UI** üzerine kurulu. Bu üçlü, senin ihtiyacın için de doğru seçim — gerekçesi aşağıda. Genel mimariyi bu referanstan koruyorum, içerik modelini ve sayfa planını tamamen klima/VRF firması işine göre yeniden tasarladım.

---

## 1. Proje Özeti

**İş tanımı:** Klima satışı, VRF (Variable Refrigerant Flow) merkezi sistem klima projelendirme, arıza/bakım/onarım servisi, klima altyapı (tesisat) işleri yapan bir firma.

**Sitenin birincil amacı:** Kurumsal güven vermek + hizmetleri net şekilde anlatmak + ziyaretçiyi mümkün olduğunca çok temas noktasından (telefon, WhatsApp, form) **iletişime yönlendirmek**. Bu bir e-ticaret sitesi değil, bir **lead generation / kurumsal tanıtım sitesi**.

**Hedef kitle:** İki farklı segment var, ikisi de sitede karşılanmalı:
- **B2C / küçük işletme:** Ev/ofis için klima satışı ve bakım arıyor. Hızlı karar verir, fiyat ve güven arar.
- **B2B / kurumsal:** Bina, AVM, fabrika, otel gibi yerler için VRF merkezi sistem projesi arıyor. Referans, teknik yeterlilik, geçmiş proje kanıtı arar.

Bu ikili yapı sayfa planını ve içerik tonunu doğrudan etkiliyor (aşağıda ayrıntılı).

---

## 2. Teknoloji Yığını ve Gerekçe

| Katman | Seçim | Neden |
|---|---|---|
| Framework | **Astro** | Statik üretim (SSG) yapan içerik-ağırlıklı kurumsal siteler için en doğru araç. Sayfa başına gereksiz JS göndermez, SEO ve hız (Core Web Vitals) çok iyi çıkar — klima firması gibi yerel aramada ("bölgende klima servisi") üst sıraya çıkmak isteyen bir iş için bu kritik. |
| Stil | **Tailwind CSS** | Utility-first yaklaşım; tek başına hızlı geliştirme, tutarlı spacing/renk sistemi. AI kod ajanlarının en rahat çalıştığı CSS yaklaşımlarından biri. |
| Bileşen kütüphanesi | **Preline UI** | Navbar, accordion, modal, carousel gibi hazır etkileşimli bileşenler — sıfırdan JS yazmadan profesyonel görünüm. |
| İçerik | **Astro Content Collections** (Markdown/MDX + `content.config.ts`) | Hizmetler, projeler, referanslar gibi tekrarlayan içerik tiplerini kod yazmadan, tip-güvenli şekilde yönetmeni sağlar. Tanıdığın site geliştikçe yeni proje/hizmet eklemek bir kod değişikliği değil, bir `.md` dosyası eklemek olur. |
| Form backend | **Web3Forms veya Formspree** (bkz. Bölüm 8) | Astro statik bir site üretir, kendi backend'i yoktur. İletişim formunun bir yere POST etmesi gerekir; sunucu yönetmeden bunu çözer. |
| Hosting | **Vercel** (alternatif: Netlify) | Astro ile birinci sınıf entegrasyon, otomatik SSL, git push ile deploy, ücretsiz katman bu ölçekte yeterli. |
| Dil | **TypeScript** (Astro'da varsayılan gelen kısım) | Component prop'ları ve content collection şemaları tip-güvenli olur, AI ajanları hata yapınca derleme anında yakalanır. |

**Neden bu mimariyi aynen kopyalamıyoruz, uyarlıyoruz:** ScrewFast şablonu genel amaçlı bir "landing + blog + docs" şablonu (Starlight docs teması, i18n, bookmark gibi blog-odaklı özellikler dahil). Senin firman için blog/docs teması, bookmark, social share gibi özellikler gereksiz karmaşıklık. Onun yerine **hizmet + proje + iletişim odaklı** daha sade bir içerik modeli kuruyoruz. Astro/Tailwind/Preline iskeletini koruyup üstüne inşa ediyoruz.

---

## 3. Tasarım Yönü (AI ajanına stil talimatı olarak ver)

Klima/VRF sektörü **teknik, güvenilir, endüstriyel** bir alan — dekoratif değil, "işini bilen usta/mühendislik firması" hissi vermeli. Jenerik "SaaS başlangıç sayfası" görünümünden kaçınılmalı (yuvarlak köşeli aynı kartlar, gradyan arka planlar, her başlığın üstünde ALL-CAPS etiket gibi klişelerden uzak durulmalı).

**Renk paleti (öneri, ton üzerinden):**
- Zemin: kırık beyaz / açık gri (`#F7F8FA`) — temiz, teknik
- Ana koyu ton: lacivert-antrasit (`#101828` civarı) — güven, mühendislik hissi
- Vurgu rengi: soğuk mavi-camgöbeği tonu (`#0EA5B7` civarı, "soğutma/klima" çağrışımı yapan ama klişe "buz mavisi" değil, daha doygun ve endüstriyel bir ton) — CTA butonları, ikonlar, linkler için
- İkincil vurgu: turuncu-amber (`#F59E0B` civarı) — "arıza/acil servis" gibi aciliyet gerektiren CTA'larda tek noktada kullanılacak, her yerde değil

**Tipografi:** Başlıklar için orta-genişlikte, teknik/net bir grotesk (ör. Inter, Manrope veya Sora); gövde metni için okunabilirliği yüksek aynı aile. Tek font ailesi + ağırlık farklılaşması yeterli, ikinci bir serif fontla "editoryal" hava katmaya gerek yok — bu bir mühendislik/servis firması, dergi değil.

**Layout ilkesi:** Sol hizalı, net grid tabanlı bölümler. Kart kullanılacaksa (hizmet kartları gibi) hepsi aynı köşe yuvarlaklığı ve gölge kullanmasın diye özenle tek bir sistem seç ve tutarlı uygula — ama "her şey kart" yaklaşımına düşme; bazı bölümler (istatistikler, süreç adımları) düz metin + ikon + ince ayraç çizgileriyle de kurulabilir.

**Hareket/animasyon:** Sayfa yüklenirken her bölümde aynı fade-up animasyonunu tekrarlamak yerine, tek bir dikkat çekici an seç (ör. hero'daki başlık/istatistik girişi). Hover geçişleri butonlarda/kartlarda sade ve hızlı olsun, abartılı olmasın.

> Bu bölümü Antigravity/Codex'e verirken şu talimatı ekle: *"Jenerik AI-tasarım klişelerinden kaçın: tek renk vurgulu başlıklar, ALL-CAPS etiketler, her kartta aynı gri gölge, gereksiz gradyanlar kullanma. Rengi ve tipografiyi yukarıdaki tablodan seç ve tutarlı uygula."*

---

## 4. Proje Klasör Yapısı

```
src/
├── assets/
│   ├── scripts/            # Sayfa-özel küçük JS (form validasyonu, WhatsApp linki vs.)
│   └── styles/              # global.css (Tailwind importları + custom CSS değişkenleri)
├── components/
│   ├── Meta.astro           # SEO meta component
│   ├── sections/            # Sayfa bölümleri (bkz. Bölüm 6)
│   │   ├── HeroSection.astro
│   │   ├── ServicesGrid.astro
│   │   ├── WhyUsSection.astro
│   │   ├── ProjectsShowcase.astro
│   │   ├── StatsSection.astro
│   │   ├── TestimonialsSection.astro
│   │   ├── ProcessSteps.astro
│   │   ├── CtaBanner.astro
│   │   └── ContactSection.astro
│   ├── ui/                  # Buton, badge, card gibi küçük tekrar kullanılabilir parçalar
│   │   ├── Button.astro
│   │   ├── ServiceCard.astro
│   │   ├── ProjectCard.astro
│   │   └── WhatsAppButton.astro   # Sağ altta sabit duran WhatsApp CTA
│   ├── Header.astro
│   └── Footer.astro
├── content/
│   ├── services/             # Her hizmet için bir .md (klima-satisi.md, vrf-projelendirme.md, ariza-bakim-onarim.md, klima-altyapi.md)
│   ├── projects/              # Referans projeler (VRF uygulamaları, kurumsal işler)
│   └── testimonials/           # Müşteri yorumları
├── data_files/
│   └── company.json          # Telefon, adres, çalışma saatleri, sosyal medya, WhatsApp numarası — TEK yerden yönetilir
├── images/
│   ├── projects/
│   ├── services/
│   └── brand/                 # logo, favicon kaynağı
├── layouts/
│   └── MainLayout.astro
├── pages/
│   ├── index.astro            # Ana sayfa
│   ├── hizmetler/
│   │   ├── index.astro        # Tüm hizmetler listesi
│   │   └── [slug].astro       # Her hizmetin detay sayfası (content collection'dan otomatik üretilir)
│   ├── projeler/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── hakkimizda.astro
│   ├── iletisim.astro
│   ├── 404.astro
│   └── robots.txt.ts
├── utils/
│   └── navigation.ts          # navBarLinks, footerLinks, socialLinks
└── content.config.ts
```

**Neden `data_files/company.json` önemli:** Telefon numarası, WhatsApp numarası, adres gibi bilgiler muhtemelen 5-6 farklı yerde (header, footer, iletişim sayfası, WhatsApp butonu, structured data) kullanılacak. Bunu tek bir JSON dosyasında tutmak, tanıdığın "numaramız değişti" dediğinde tek yerden güncelleme yapmanı sağlar — kod içinde arayıp bulmak zorunda kalmazsın.

---

## 5. Sayfa Haritası (Sitemap)

| Sayfa | Yol | Amaç |
|---|---|---|
| Ana Sayfa | `/` | Hero + hizmet özeti + neden biz + öne çıkan projeler + istatistikler + CTA. Tüm diğer sayfalara giriş noktası. |
| Hizmetler (liste) | `/hizmetler` | 4 ana hizmetin (satış, VRF proje, bakım-onarım, altyapı) kartlı listesi |
| Hizmet Detayı | `/hizmetler/[slug]` | Her hizmet için ayrı, SEO'ya uygun detay sayfası (ör. `/hizmetler/vrf-merkezi-sistem-projelendirme`) — bu, "klima servisi [şehir]" gibi aramalarda ayrı ayrı indekslenebilmesi için kritik |
| Projeler / Referanslar | `/projeler` | Tamamlanmış VRF/kurumsal projelerin galerisi — B2B güven için en önemli sayfalardan biri |
| Proje Detayı | `/projeler/[slug]` | Tek bir projenin öncesi/sonrası, kapsamı, kullanılan sistem (opsiyonel ama B2B için güçlü) |
| Hakkımızda | `/hakkimizda` | Firma hikayesi, yetkinlik, sertifikalar/marka bayilikleri varsa (ör. Daikin, Mitsubishi, LG yetkili bayisi gibi), ekip |
| İletişim | `/iletisim` | Form + telefon + WhatsApp + harita (Google Maps embed) + çalışma saatleri |
| 404 | özel | Marka tutarlılığı için özelleştirilmiş, ana sayfaya/iletişime yönlendiren |

> Blog/insights, i18n, Starlight dokümantasyon teması gibi ScrewFast'te bulunan modüller **bilinçli olarak dahil edilmedi** — bu firma için şu an gereksiz karmaşıklık. Blog, ileride SEO için içerik üretmek istersen Bölüm 11'de "genişletme" olarak bırakıldı.

---

## 6. Content Collections Şeması

`src/content.config.ts` içinde üç koleksiyon tanımlanır:

**`services`** — her hizmet bir `.md` dosyası:
```ts
{
  title: string;           // "VRF Merkezi Sistem Klima Projelendirme"
  slug: string;
  shortDescription: string; // Kart görünümünde kullanılan kısa özet
  icon: string;             // Icon component'inde kullanılacak isim
  order: number;            // Ana sayfada/liste sayfasında gösterim sırası
  featuredImage: image();
  body: markdown;           // Detay sayfasının ana içeriği
}
```
Başlangıç 4 kayıt: **Klima Satışı**, **VRF Merkezi Sistem Projelendirme**, **Arıza / Bakım / Onarım**, **Klima Altyapı (Tesisat)**.

**`projects`** — tamamlanmış işler:
```ts
{
  title: string;
  slug: string;
  client: string;           // "Otel", "AVM", "Fabrika" gibi genel tip (müşteri gizliliği varsa isim vermeden sektör yaz)
  location: string;
  systemType: string;       // "VRF", "Split", "Chiller" vs.
  summary: string;
  images: image()[];        // Öncesi/sonrası veya kurulum fotoğrafları
  completedDate: date;
  featured: boolean;        // Ana sayfada gösterilecek mi
}
```

**`testimonials`** — müşteri yorumları:
```ts
{
  authorName: string;
  authorRole: string;       // "Site Yöneticisi", "İşletme Sahibi" vs.
  quote: string;
  rating: number;           // 1-5, opsiyonel yıldız gösterimi için
}
```

Bu şema sayesinde tanıdığın (veya sen) yeni bir proje eklemek için tek yapman gereken `src/content/projects/` altına yeni bir `.md` dosyası koymak — kod değişikliği gerekmez.

---

## 7. Bileşen Envanteri (sections/)

Ana sayfanın akışı, hem B2C hem B2B ziyaretçiyi karşılayacak şekilde kurgulanmalı:

1. **HeroSection** — Net başlık (ör. "Klima Satışından VRF Merkezi Sistem Projelendirmeye Uçtan Uca Çözüm"), kısa alt başlık, iki CTA butonu: birincil "Teklif Al" (forma/WhatsApp'a gider), ikincil "Hizmetlerimiz" (sayfa içi kaydırma). Arka planda gerçek bir kurulum/proje fotoğrafı — jenerik stok görsel yerine.
2. **ServicesGrid** — 4 hizmetin kart görünümü, her biri `/hizmetler/[slug]`'a link verir.
3. **WhyUsSection** — Deneyim yılı, tamamlanan proje sayısı, servis süresi (ör. "7/24 arıza müdahalesi") gibi güven unsurları. Sayı + kısa etiket formatında, abartılı istatistik kartı değil.
4. **ProjectsShowcase** — `featured: true` olan projelerden 3-4 tanesi, görsel ağırlıklı.
5. **ProcessSteps** — "Nasıl çalışıyoruz" (Talep → Keşif/Teklif → Uygulama → Bakım) — bu gerçekten sıralı bir süreç olduğu için numaralandırma burada anlamlı kullanılabilir.
6. **TestimonialsSection** — Müşteri yorumları.
7. **CtaBanner** — Sayfa ortasında/sonunda tekrar güçlü bir "Hemen Ara / WhatsApp'tan Yaz" çağrısı.
8. **ContactSection** — Ana sayfada özet iletişim bloğu (tam form `/iletisim` sayfasında).

**ui/** altında tekrar kullanılan parçalar: `Button.astro` (primary/secondary/whatsapp variant'ları), `ServiceCard.astro`, `ProjectCard.astro`, `WhatsAppButton.astro` (tüm sayfalarda sağ altta sabit duran floating buton — bkz. Bölüm 8).

---

## 8. İletişim & CTA Stratejisi (sitenin en kritik kısmı)

İstediğin "bol bol iletişime yönlendiren" yapı için üç katman kuruyoruz:

1. **Floating WhatsApp butonu** — `MainLayout.astro` içine konur, tüm sayfalarda sağ altta sabit görünür. `https://wa.me/90XXXXXXXXXX?text=Merhaba,%20klima%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum` formatında hazır mesajlı link. En düşük sürtünmeli iletişim kanalı olduğu için en görünür yerde olmalı.
2. **Header'da tıklanabilir telefon numarası** — `tel:` linki, mobilde direkt arama başlatır.
3. **İletişim formu** (`/iletisim` ve ana sayfa özeti) — Astro statik olduğu için form bir API'ye POST etmeli:
   - **Web3Forms** (ücretsiz, sadece bir access key ile çalışır, backend kurmana gerek yok) veya
   - **Formspree** (benzer, ücretsiz katmanı var)
   - Form alanları: Ad Soyad, Telefon, İlgilendiği hizmet (dropdown: `services` koleksiyonundan otomatik dolar), Mesaj.
   - Gönderim sonrası: "Teşekkürler, en kısa sürede dönüş yapacağız" mesajı + otomatik olarak WhatsApp'a da yönlendirme opsiyonu sunulabilir.

Her hizmet detay sayfasının sonuna da bağlama uygun bir CTA konmalı (ör. VRF sayfasının sonunda "Projeniz için keşif talep edin", bakım sayfasının sonunda "Arıza mı var? Hemen arayın").

---

## 9. SEO & Yapılandırılmış Veri

- **`Meta.astro`** component'i her sayfada title/description/OG image üretir (ScrewFast'teki yaklaşımın aynısı).
- **Structured Data (JSON-LD):** Ana sayfaya `LocalBusiness` (daha spesifik olarak mümkünse `HVACBusiness`) şeması eklenir — firma adı, adres, telefon, çalışma saatleri, hizmet alanı (`areaServed`). Bu, Google'da "yakınımdaki klima servisi" gibi yerel aramalarda kritik.
- Her hizmet sayfasına `Service` şeması eklenebilir.
- **`astro-sitemap`** entegrasyonu ile otomatik sitemap.
- **`robots.txt.ts`** ScrewFast'teki gibi dinamik üretilir.
- Görseller için Astro'nun yerleşik `<Image />` component'i kullanılmalı (otomatik boyutlandırma, lazy-loading, WebP dönüşümü) — özellikle proje galerisi görselleri için performans açısından önemli.
- Sayfa başlıkları ve URL slug'ları gerçek arama niyetini yansıtmalı: `/hizmetler/vrf-merkezi-sistem-projelendirme` gibi anahtar kelime içeren, açıklayıcı slug'lar — `/hizmetler/hizmet-2` gibi anlamsız slug'lardan kaçın.

---

## 10. Performans & Erişilebilirlik Kontrol Listesi

- Mobil öncelikli test et — müşterilerin büyük kısmı telefonundan arıza anında arama yapacak.
- Tüm buton/link'lerde klavye ile erişilebilir odak (focus) durumu görünür olmalı.
- Görsel `alt` metinleri gerçek açıklamalar içermeli (SEO + erişilebilirlik).
- `astro-compressor` entegrasyonu ile build sonrası gzip/brotli sıkıştırma (ScrewFast'teki gibi).
- Lighthouse skorunu (Performance/SEO/Accessibility) düzenli kontrol et; statik Astro sitesinde 90+ almak zor olmamalı.

---

## 11. Deployment Planı

1. Proje GitHub'a push edilir (private repo yeterli).
2. **Vercel**'e bağlanır (`vercel.json` ile güvenlik header'ları — CSP, X-Frame-Options vs. — ScrewFast örneğindeki gibi eklenir).
3. Form servisi (Web3Forms/Formspree) access key'i **environment variable** olarak Vercel'e girilir, koda gömülmez.
4. Özel alan adı (`.com.tr` veya `.com`) Vercel'e bağlanır, SSL otomatik gelir.
5. Google Search Console'a site eklenir, sitemap gönderilir.
6. Google Business Profile ile site senkronize edilir (yerel SEO için ayrı ama tamamlayıcı bir iş — dokümanın kapsamı dışında ama unutma).

---

## 12. Adım Adım İnşa Planı (Fazlar)

AI kodlama ajanına bu fazları sırayla, her fazı ayrı bir görev olarak vermeni öneririm — tek seferde "tüm siteyi yap" demek yerine adım adım gitmek hem senin kontrolünü artırır hem de ajanın hata yapma ihtimalini azaltır.

**Faz 1 — İskelet**
- Astro projesi kur, Tailwind + Preline entegrasyonu yap.
- Klasör yapısını (Bölüm 4) oluştur.
- `MainLayout.astro`, `Header.astro`, `Footer.astro` — henüz gerçek içerik olmadan, boş/placeholder ile.
- `data_files/company.json` içine gerçek/placeholder iletişim bilgilerini gir.

**Faz 2 — İçerik Modeli**
- `content.config.ts` içinde 3 koleksiyonu (Bölüm 6) tanımla.
- 4 hizmet için gerçek metinlerle `.md` dosyaları oluştur.
- 2-3 örnek proje ve 2-3 örnek testimonial ekle (gerçek veriler gelene kadar placeholder olabilir, ama placeholder olduğu açıkça belli olmasın — gerçekçi yaz).

**Faz 3 — Ana Sayfa Bileşenleri**
- Bölüm 7'deki bileşenleri tek tek inşa et: Hero → ServicesGrid → WhyUs → ProjectsShowcase → ProcessSteps → Testimonials → CtaBanner.
- Her bileşeni bitirdikçe tarayıcıda kontrol et, bir sonrakine geç.

**Faz 4 — İç Sayfalar**
- `/hizmetler` liste + `[slug]` detay sayfası (content collection'dan otomatik).
- `/projeler` liste + `[slug]` detay sayfası.
- `/hakkimizda`, `/iletisim`, `/404`.

**Faz 5 — İletişim Katmanı**
- WhatsApp floating buton tüm layout'a eklenir.
- İletişim formu + form backend entegrasyonu (Bölüm 8).
- Google Maps embed (iletişim sayfası).

**Faz 6 — SEO & Yapılandırılmış Veri**
- `Meta.astro`, JSON-LD şemaları, sitemap, robots.txt.

**Faz 7 — Performans & Cilalama**
- Görsel optimizasyonu, `astro-compressor`, Lighthouse testi, erişilebilirlik kontrolü.

**Faz 8 — Deploy**
- Vercel'e bağlama, env variable'lar, domain, SSL, Search Console.

---

## 13. Antigravity / Codex ile Çalışırken Pratik İpuçları

- Bu dokümanı ajana **tamamını** ilk mesajda ver, sonra "Faz 1'i uygula" diyerek başla — her fazı ayrı bir konuşma turu / commit olarak ilerlet.
- Her faz sonunda `npm run dev` ile kontrol et, bir sonraki faza geçmeden önce gördüğün sorunları söyle (ör. "buton rengi yanlış", "mobilde header taşıyor").
- Ajana "ScrewFast README'sindeki genel Astro/Tailwind/Preline kurulum adımlarını takip et ama içerik ve sayfa yapısı için bu dokümanı esas al" şeklinde net bir öncelik sırası ver — iki kaynak çelişirse hangisinin kazanacağını baştan söylemiş olursun.
- Tasarım için Bölüm 3'teki renk/tipografi tablosunu ajana doğrudan yapıştır; serbest bırakırsan jenerik bir "SaaS" görünümüne kayma riski var.
- Gerçek firma bilgileri (telefon, adres, marka bayilikleri, gerçek proje fotoğrafları) eline geçtikçe `data_files/company.json` ve `content/` klasörlerini güncellemen yeterli — mimariye dokunman gerekmeyecek.

---

## 14. İleride Eklenebilecekler (şimdilik kapsam dışı)

- **Blog/İçerik pazarlaması** — "klima bakımı ne sıklıkla yapılmalı" gibi SEO odaklı yazılarla organik trafik artırımı (ScrewFast'in blog altyapısı buraya taşınabilir).
- **Çok dilli site (i18n)** — bölgede yabancı/turist müşteri kitlesi varsa.
- **Online randevu/keşif talep sistemi** — basit formdan öteye, takvim entegrasyonlu bir sisteme geçiş.
- **Müşteri paneli** — bakım geçmişi, garanti takibi gibi (uzun vadede, gerçek ihtiyaç doğarsa).

Bu dört madde şu an **bilinçli olarak yapılmıyor** — önce sağlam bir temel + net bir lead-generation deneyimi kurulmalı, karmaşıklık sonradan eklenmeli.
