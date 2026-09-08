import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "VRF merkezi sistem ile bireysel split klimalar arasındaki temel fark nedir?",
    answer:
      "VRF (Değişken Soğutucu Akışkan Debili) sistemler, tek bir dış ünite grubuna bağlanan onlarca iç ünitenin her birinin bağımsız derecelerde çalışmasını sağlar. Isı geri kazanımlı modellerde aynı anda bir oda soğutulurken diğer oda ısıtılabilir, böylece %35'e varan enerji tasarrufu ve bina cephesinde estetik kazanım elde edilir.",
  },
  {
    question: "Ücretsiz keşif hizmetiniz hangi bölgeleri kapsamaktadır?",
    answer:
      "İstanbul genelinde (tüm Avrupa ve Anadolu yakası ilçeleri) ile Kocaeli, Gebze ve Tekirdağ sanayi bölgelerinde hem bireysel hem kurumsal projeler için yerinde keşif ve kapasite hesabı hizmetimiz tamamen ücretsizdir.",
  },
  {
    question: "Klimalara ne sıklıkla periyodik bakım yaptırılmalıdır?",
    answer:
      "Konut tipi klimalar için yılda en az iki kez (yaz ve kış sezonu öncesi), yoğun kullanılan ofis, otel, plaza ve restoran sistemleri için ise 3 ayda bir periyodik antibakteriyel bakım ve gaz basınç kontrolü önerilmektedir.",
  },
  {
    question: "7/24 acil servis ve arıza müdahale süreciniz nasıl işliyor?",
    answer:
      "Server odaları, hastaneler, oteller ve gıda depoları gibi kesintisiz soğutma gerektiren tesisler için nöbetçi teknik ekiplerimiz çağrı merkezimize gelen arıza kaydına 2 saat içinde yerinde müdahale garantisi vermektedir.",
  },
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
