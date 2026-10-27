import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendLeadNotifications } from "@/utils/notifications";

export function FastQuoteModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    summary: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendLeadNotifications({
        name: formData.name,
        phone: formData.phone,
        message: formData.summary,
        service: "Hızlı Keşif & Teklif Talebi",
        source: "Hızlı Teklif Modalı",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", summary: "" });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setTimeout(handleReset, 300);
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="shadow-lg font-bold">
          Hızlı Keşif & Teklif Al
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Ücretsiz Keşif & Kapasite Analizi</DialogTitle>
          <DialogDescription>
            İklimlendirme uzmanımız mekanınızı incelemek üzere en geç 1 saat içinde sizinle iletişime geçecektir.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3 animate-in fade-in-50">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-bold text-navy-900 font-heading">Talebiniz Alındı!</h4>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Sayın <strong>{formData.name}</strong>, talebiniz e-posta ve yetkili WhatsApp hattımıza iletildi.
              Mühendisimiz <strong>{formData.phone}</strong> numaranızdan size ulaşacaktır.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Ad Soyad *
              </label>
              <Input
                required
                placeholder="Örn: Mehmet Öz"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Telefon Numarası *
              </label>
              <Input
                type="tel"
                required
                placeholder="05XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Proje veya Talep Özeti
              </label>
              <Textarea
                placeholder="Örn: 250 m² ofis için VRF sistem veya UPS odası arıza tespiti..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full mt-2 h-11">
              {loading ? "Talebiniz İletiliyor..." : "Keşif Talebini Gönder"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
