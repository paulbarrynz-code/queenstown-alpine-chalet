import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { allRoomsQuery } from "@/sanity/lib/queries";
import type { SanityRoom } from "@/types/sanity";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Queenstown Alpine Chalet",
  description: "Interior design concepts for our Queenstown alpine renovation.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rooms: SanityRoom[] = await client.fetch(allRoomsQuery);

  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "var(--snow)", color: "var(--charcoal)" }}
      >
        <Header rooms={rooms} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
