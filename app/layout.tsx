import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Fox Family Home Videos",
  description: "Videos by Jim Fox, website by Jude Clark",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ overflowX: "hidden" }}>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
