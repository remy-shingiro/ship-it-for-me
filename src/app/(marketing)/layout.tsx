import type { ReactNode } from "react";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-floating-button";

export default function MarketingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <WhatsAppFloatingButton />
    </>
  );
}
