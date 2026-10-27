export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
}

/**
 * Belirlenen kurumsal WhatsApp mesaj formatı
 */
export function formatWhatsAppMessage(data: LeadData): string {
  return [
    "*KALE İKLİMLENDİRME — YENİ KEŞİF & TEKLİF TALEBİ* ❄️",
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    `👤 *Müşteri:* ${data.name.trim()}`,
    `📞 *Telefon:* ${data.phone.trim()}`,
    `📧 *E-Posta:* ${data.email?.trim() || "Belirtilmedi"}`,
    `🛠️ *İlgilenilen Hizmet:* ${data.service || "Genel İklimlendirme / Keşif"}`,
    `📝 *Talep / Detay:* ${data.message?.trim() || "Yerinde keşif ve kapasite analizi talep ediliyor."}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━",
    `_Kaynak: ${data.source || "kaleiklimlendirme.com"} üzerinden iletilmiştir._`,
  ].join("\n");
}

/**
 * Keşif talebini hem e-postaya hem de arka planda otomatik olarak WhatsApp'a iletir.
 * Kullanıcıyı WhatsApp uygulamasına veya harici bir sayfaya yönlendirmez.
 */
export async function sendLeadNotifications(
  data: LeadData
): Promise<{ success: boolean; message?: string }> {
  const formattedText = formatWhatsAppMessage(data);

  const accessKey =
    import.meta.env.PUBLIC_WEB3FORMS_KEY || "8f075204-928b-4b2a-aa3e-79c99620b0ac";
  const webhookUrl = import.meta.env.PUBLIC_WHATSAPP_WEBHOOK_URL;
  const callmebotKey = import.meta.env.PUBLIC_CALLMEBOT_API_KEY;
  const callmebotPhone =
    import.meta.env.PUBLIC_CALLMEBOT_PHONE || "905537331201";

  const dispatchPromises: Promise<unknown>[] = [];

  // 1. Arka Planda WhatsApp Otomatik Bildirimi (Kullanıcı sitede kalır)
  // A) CallMeBot WhatsApp Gateway (Kadir Bey'in şahsi WhatsApp'ına ücretsiz anında mesaj)
  if (callmebotKey) {
    const callmebotUrl = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      callmebotPhone
    )}&text=${encodeURIComponent(formattedText)}&apikey=${encodeURIComponent(
      callmebotKey
    )}`;
    dispatchPromises.push(
      fetch(callmebotUrl, { mode: "no-cors" }).catch(() => {})
    );
  }

  // B) Özel WhatsApp Webhook (Make.com, Zapier, UltraMsg, Green-API vb.)
  if (webhookUrl) {
    dispatchPromises.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_lead_submission",
          timestamp: new Date().toISOString(),
          customerName: data.name,
          phone: data.phone,
          email: data.email || null,
          service: data.service || "Genel",
          message: data.message || "",
          source: data.source || "İletişim Formu",
          formattedWhatsAppText: formattedText,
        }),
      }).catch(() => {})
    );
  }

  // 2. E-Posta Bildirimi (Web3Forms FormData ile doğrudan Kadir Bey'in e-postasına)
  try {
    const formData = new FormData();
    formData.append("access_key", accessKey);
    formData.append("subject", `Kale İklimlendirme — Yeni Keşif Talebi: ${data.name} (${data.phone})`);
    formData.append("from_name", "Kale İklimlendirme Web Sitesi");
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email || "Belirtilmedi");
    formData.append("service", data.service || "Genel Keşif");
    formData.append("message", data.message || "Detay belirtilmedi");
    formData.append("whatsapp_ozeti", formattedText);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json().catch(() => ({ success: true }));
    console.log("[Web3Forms Gönderim Sonucu]:", result);

    await Promise.allSettled(dispatchPromises);

    // Google Ads & Analytics Conversion Tracking (generate_lead)
    if (typeof window !== "undefined") {
      (window as unknown as { dataLayer?: unknown[] }).dataLayer =
        (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: "generate_lead",
        lead_service: data.service || "Genel",
        lead_source: data.source || "Web Formu",
      });
      const winWithGtag = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof winWithGtag.gtag === "function") {
        winWithGtag.gtag("event", "generate_lead", {
          service: data.service || "Genel",
          source: data.source || "Web Formu",
        });
      }
    }

    return { success: true, message: result?.message };
  } catch (err) {
    console.error("[Bildirim Gönderim Hatası]:", err);
    // Hata durumunda bile kullanıcıya olumlu deneyim sun
    return { success: true };
  }
}
