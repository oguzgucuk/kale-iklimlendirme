import company from '@/data_files/company.json';

export interface NavLink {
  name: string;
  url: string;
  sublinks?: { name: string; url: string; description?: string }[];
}

export const navBarLinks: NavLink[] = [
  { name: 'Ana Sayfa', url: '/' },
  {
    name: 'Hizmetlerimiz',
    url: '/hizmetler/',
    sublinks: [
      { name: 'Klima Satışı', url: '/hizmetler/klima-satisi/', description: 'Bireysel ve ticari inverter klima modelleri' },
      { name: 'VRF Merkezi Sistemler', url: '/hizmetler/vrf-merkezi-sistem-projelendirme/', description: 'Oteller, plazalar ve fabrikalar için mühendislik çözümleri' },
      { name: 'Arıza, Bakım & Onarım', url: '/hizmetler/ariza-bakim-onarim/', description: '7/24 teknik servis ve periyodik hijyenik bakım' },
      { name: 'Klima Altyapı Tesisatı', url: '/hizmetler/klima-altyapi/', description: 'İnşaat aşaması bakır boru ve drenaj hatları' },
    ],
  },
  { name: 'Projelerimiz', url: '/projeler/' },
  { name: 'Hakkımızda', url: '/hakkimizda/' },
  { name: 'İletişim', url: '/iletisim/' },
];

export const footerLinks = {
  services: [
    { name: 'VRF Merkezi Sistem Projelendirme', url: '/hizmetler/vrf-merkezi-sistem-projelendirme/' },
    { name: 'Kurumsal Klima Satışı', url: '/hizmetler/klima-satisi/' },
    { name: 'Periyodik Bakım ve Onarım', url: '/hizmetler/ariza-bakim-onarim/' },
    { name: 'Bakır Boru Altyapı Tesisatı', url: '/hizmetler/klima-altyapi/' },
  ],
  company: [
    { name: 'Hakkımızda', url: '/hakkimizda/' },
    { name: 'Referans Projeler', url: '/projeler/' },
    { name: 'İletişim & Konum', url: '/iletisim/' },
    { name: 'Çözüm Ortağı Markalar', url: '/hakkimizda/#markalar' },
  ],
  contact: {
    phone: company.phone,
    phoneRaw: company.phoneRaw,
    emergencyPhone: company.emergencyPhone,
    whatsappNumber: company.whatsappNumber,
    whatsappRaw: company.whatsappRaw,
    email: company.email,
    address: `${company.address.street}, ${company.address.district} / ${company.address.city}`,
    workingHours: `${company.workingHours.weekdays} (Hafta içi)`,
  },
};
