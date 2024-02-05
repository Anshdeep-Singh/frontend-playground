import type { Metadata } from "next";
import "./globals.css";
import { Fira_Mono } from 'next/font/google'
 
const firaMono = Fira_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Frontend Playground",
  description: "Learn front end using Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={firaMono.className}>{children}</body>
    </html>
  );
}
