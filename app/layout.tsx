import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Fox Family Home Videos",
  description: "Videos by Jim Fox, website by Jude Clark"
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
