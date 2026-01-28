import FloatingButtons from "@/Components/Accueil/FloatingButtons.client";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}
        {/* Boutons flottants */}
        <FloatingButtons />
      </body>
    </html>
  );
}
