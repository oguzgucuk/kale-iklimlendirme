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

export function FastQuoteModal() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="shadow-lg">
          Hızlı Keşif & Teklif Al
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Ücretsiz Keşif & Kapasite Analizi</DialogTitle>
          <DialogDescription>
            İklimlendirme uzmanımız mekanınızı incelemek üzere 1 saat içinde sizinle iletişime geçecektir.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-bold text-navy-900">Talebiniz Alındı!</h4>
            <p className="text-sm text-gray-600">
              Mühendislerimiz talebinizi inceleyip belirttiğiniz telefon numarasından size ulaşacaktır.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Ad Soyad *
              </label>
              <Input required placeholder="Örn: Mehmet Öz" />
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Telefon Numarası *
              </label>
              <Input type="tel" required placeholder="05XX XXX XX XX" />
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-900 block mb-1">
                Proje veya Talep Özeti
              </label>
              <Textarea placeholder="Örn: 250 m² ofis için VRF sistem veya arıza tespiti..." />
            </div>
            <Button type="submit" className="w-full mt-2">
              Keşif Talebini Gönder
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
