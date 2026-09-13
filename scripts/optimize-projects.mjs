import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_DIR = 'public/images/projects/raw';
const OUT_DIR = 'public/images/projects';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const mappings = [
  {
    src: 'TCDD 1. bölge müdürlüğü vrf klima bakım onarı.jpg',
    dest: 'tcdd-haydarpasa-vrf-1.webp'
  },
  {
    src: 'Tablo adalar konutları satış ve montajı dış ünite.jpg',
    dest: 'tablo-adalar-samsung-dis-unite.webp'
  },
  {
    src: 'Tablo adalar konutları satış ve montajı iç ünite 1.jpg',
    dest: 'tablo-adalar-samsung-ic-unite-1.webp'
  },
  {
    src: 'Tablo adalar konutları satış ve montajı iç ünite 2.jpg',
    dest: 'tablo-adalar-samsung-ic-unite-2.webp'
  },
  {
    src: 'Tablo adalar konutları satış ve montajı iç ünite 3.jpg',
    dest: 'tablo-adalar-samsung-ic-unite-3.webp'
  },
  {
    src: 'Pilavcı rahim klima satış ve montajı - ataşehir kayışdağı iç ünitesi dikey klima.jpg',
    dest: 'pilavci-rahim-gree-salon-tipi.webp'
  },
  {
    src: 'Pilavcı rahim klima satış ve montajı - ataşehir kayışdağı dış ünitesi.jpg',
    dest: 'pilavci-rahim-gree-dis-unite.webp'
  },
  {
    src: 'Multi klima carrier satış ve montajı.jpg',
    dest: 'carrier-multi-inverter-dis-unite.webp'
  },
  {
    src: 'Arçelik vrf arıza onarım maltepe bağlarbaşı.jpg',
    dest: 'arcelik-vrf-maltepe-baglarbasi.webp'
  },
  {
    src: 'Mitsubishi vrf klima arıza onarı ve bakım işlemi zümrütevler.jpeg',
    dest: 'mitsubishi-vrf-maltepe-zumrutevler.webp'
  },
  {
    src: 'Daikin vrf gaz kaçağı ve onarımı.jpg',
    dest: 'daikin-vrv-gaz-kacak-onarim.webp'
  },
  {
    src: 'samsung vrf satış ve montaj.jpg',
    dest: 'samsung-vrf-ticari-montaj.webp'
  },
  {
    src: 'Samsung vrf  gaz kaçak onarım işlemi.jpg',
    dest: 'samsung-vrf-vakum-gaz-sarji.webp'
  },
  {
    src: 'mitsubishi Bungalov klima satış ve montajı.jpg',
    dest: 'sile-bungalov-mitsubishi-ic-unite.webp'
  },
  {
    src: 'mitsubishi Bungalov klima satış ve montajı dış ünite.jpg',
    dest: 'sile-bungalov-mitsubishi-dis-unite.webp'
  },
  {
    src: 'adını bilmiyorum bu klimanın ama tavanın içinde sen ayarlarsın başlık ismini ve açıklamasını.jpg',
    dest: 'midea-kaset-tipi-tavan-klima.webp'
  },
  {
    src: 'Gree Klima saıtş ve montajı dış ünitesi.jpg',
    dest: 'gree-dis-unite-kale-sticker.webp'
  },
  {
    src: 'Gree Klima saıtş ve montajı iç ünitesi.jpg',
    dest: 'gree-ic-unite-ahsap-panel.webp'
  },
  {
    src: 'Gree klima satış ve montajı 2 dış ünitesi.jpg',
    dest: 'gree-balkon-tavan-montaj.webp'
  },
  {
    src: 'Gree klima satış ve montajı 2 iç ünitesi.jpg',
    dest: 'gree-ic-unite-duvar.webp'
  },
  {
    src: 'Klima altyapı tesisat (maltepe) 2. foto dış foto.jpg',
    dest: 'maltepe-santiye-adalar-manzara-cati.webp'
  },
  {
    src: 'Klima altyapı tesisat (maltepe).jpg',
    dest: 'maltepe-santiye-tugla-kanal-borulama.webp'
  },
  {
    src: 'Klima altyapı borulama.jpg',
    dest: 'maltepe-santiye-oda-borulama.webp'
  }
];

async function processAll() {
  console.log('Optimizing images to WebP...');
  for (const item of mappings) {
    const srcPath = path.join(RAW_DIR, item.src);
    const destPath = path.join(OUT_DIR, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    try {
      await sharp(srcPath)
        .rotate() // preserve EXIF orientation
        .resize(1400, 1400, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 82 })
        .toFile(destPath);

      const stats = fs.statSync(destPath);
      console.log(`✓ ${item.dest} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`Error processing ${item.src}:`, err.message);
    }
  }
  console.log('Optimization complete!');
}

processAll();
