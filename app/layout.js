import { Geist, Geist_Mono, Sevillana } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sevillana = Sevillana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sevillana",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sevillana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
