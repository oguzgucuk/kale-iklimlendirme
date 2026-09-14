import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Fiyatlandırma ve ücretlendirme nasıl belirleniyor?",
    answer:
      "İklimlendirme ve VRF projelerinde maliyet; mekanın net metrekaresi, tavan yüksekliği, cephe yönü ve gereken soğutma/ısıtma yüküne (BTU / HP) göre belirlenir. Sitemizde yer alan 'Hızlı Keşif Al' formunu doldurarak veya doğrudan WhatsApp hattımız üzerinden mekan detaylarınızı ileterek mühendislerimizin hazırlayacağı en doğru, şeffaf ve rekabetçi fiyat teklifini aynı gün içinde alabilirsiniz.",
  },
  {
    question: "Keşif hizmetiniz ücretli midir ve neleri kapsar?",
    answer:
      "Hayır, keşif hizmetimiz tamamen ücretsizdir. Uzman mühendis ekibimiz adresinize gelerek mekanın mimari yapısını inceler, ısı kayıp ve kazanç hesaplarını yapar, cihazların en verimli konumlandırılacağı yerleri belirler ve size özel keşif raporunu ücretsiz sunar.",
  },
  {
    question: "VRF merkezi sistem ile bireysel split klimalar arasındaki temel fark nedir?",
    answer:
      "VRF (Değişken Soğutucu Akışkan Debili) sistemler, tek bir dış ünite grubuna bağlanan onlarca bağımsız iç ünitenin aynı anda veya farklı derecelerde çalışmasını sağlar. Binanın dış cephesinde klima motoru kirliliğini önler ve bağımsız inverter teknolojisi sayesinde %35'e varan enerji tasarrufu sağlar.",
  },
  {
    question: "Klima altyapı bakır borulama tesisatı ne zaman yapılmalıdır?",
    answer:
      "En sağlıklı ve estetik çözüm; inşaat, kaba sıva veya daire/ofis tadilatı aşamasında yapılmasıdır. Bu aşamada bakır borular, drenaj hatları ve sinyal kabloları duvar veya asma tavan içerisine gizlenir. Tesisat bittikten sonra azot gazı basılarak kaçak testi yapılır ve dekorasyon tamamlandığında cihaz montajına hazır hale getirilir.",
  },
  {
    question: "Montaj ve servis hizmetlerinizde garanti süresi ne kadardır?",
    answer:
      "Gerçekleştirdiğimiz tüm klima montajı, VRF devreye alma ve altyapı tesisat işleri 2 yıl işçilik garantimiz altındadır. Satışı yapılan tüm cihazlarda üretici markaların resmi 2 ila 5 yıl garanti süreleri geçerlidir ve onarımlarda %100 orijinal yedek parça kullanılır.",
  },
  {
    question: "Klimam soğutmuyor veya gaz kaçağı var, süreç nasıl ilerliyor?",
    answer:
      "Teknik servis ekibimiz adresinize gelerek sisteme yüksek basınçlı azot testi uygular ve elektronik kaçak dedektörleriyle kaçağın yerini noktasal olarak belirler. Bakır borudaki sızıntı lehimlenip tamir edildikten sonra sistem vakumlanır ve üretici gramajına uygun orijinal gaz (R410A / R32) şarjı yapılarak çalışır vaziyette teslim edilir.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 py-1">
          <AccordionTrigger className="text-left font-bold text-navy-900 hover:text-brand-600 hover:no-underline py-4 text-sm sm:text-base">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-xs sm:text-sm text-gray-600 leading-relaxed pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
