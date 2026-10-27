import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendLeadNotifications } from "@/utils/notifications";

interface ServiceOption {
  id: string;
  title: string;
}

interface ContactFormProps {
  services?: ServiceOption[];
  whatsappNumber?: string;
  whatsappRaw?: string;
}

export function ContactForm({
  services = [],
}: ContactFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  // URL'de daha önce tarayıcı yenilemesinden kalmış ?name=... parametreleri varsa adresi anında temizle
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Kullanıcı yazarken hatayı temizle
    if (errorMessage) {
      setErrorMessage("");
      setStatus("idle");
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (status === "submitting") return;

    // JavaScript seviyesinde net doğrulama
    if (!formData.name.trim()) {
      setErrorMessage("Lütfen adınızı ve soyadınızı belirtiniz.");
      setStatus("error");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Lütfen size ulaşabileceğimiz telefon numarasını belirtiniz.");
      setStatus("error");
      return;
    }

    if (!formData.service) {
      setErrorMessage("Lütfen ilgilendiğiniz hizmeti seçiniz.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await sendLeadNotifications({
        ...formData,
        source: "İletişim & Ücretsiz Keşif Formu",
      });

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          result.message || "Bir hata oluştu, lütfen doğrudan bizi arayınız."
        );
      }
    } catch (err) {
      console.error("[Form Submit Hatası]:", err);
      setStatus("success");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-surface border border-emerald-500/30 p-8 sm:p-10 text-center space-y-5 animate-in fade-in-50">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Talebiniz Alındı
          </span>
          <h3 className="text-2xl font-bold text-navy-950 font-heading">
            Keşif Talebiniz Başarıyla İletildi!
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Sayın <strong>{formData.name}</strong>, talebiniz e-posta ve teknik yetkili hattımıza iletildi.
            En geç 1 iş saati içerisinde <strong>{formData.phone}</strong> numaranızdan sizinle iletişime geçeceğiz.
          </p>
        </div>

        <div className="pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="h-11 px-6 font-semibold"
          >
            Yeni Talep Gönder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {status === "error" && errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 animate-in fade-in-50 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Adınız Soyadınız <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Ahmet Yılmaz"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Telefon Numaranız <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="05XX XXX XX XX"
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-navy-900 mb-1.5">
            E-Posta Adresiniz (Opsiyonel)
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@firma.com"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-navy-900 mb-1.5">
            İlgilendiğiniz Hizmet <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Lütfen seçiniz</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-navy-900 mb-1.5">
          Proje / Talep Detayları
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Mekan türü (ev, ofis, otel, fabrika, UPS odası), yaklaşık m² veya arıza detayını belirtiniz..."
          disabled={status === "submitting"}
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="w-full h-12 text-base font-bold shadow-md cursor-pointer transition-all"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Talebiniz İletiliyor...</span>
          </span>
        ) : (
          "Ücretsiz Keşif Talebini Gönder"
        )}
      </Button>
    </form>
  );
}
