import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/manrope/wght.css";
import { AppProvider } from "./providers";
import "./globals.css";
import "./design-system.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Casa Digital Segura | Leroy Merlin";
  const description =
    "Protótipo funcional de uma plataforma gamificada de conscientização sobre phishing para colaboradores da Leroy Merlin.";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Casa Digital Segura — Segurança se constrói em equipe",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
