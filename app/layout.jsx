import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ReaderExpo — A Universe Built for Readers',
  description: 'Discover remarkable books, classics, free reading sources and manga in a premium reading discovery experience.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />

        <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_efiI9zqkY9zKR2zRda2V0j1T" defer></script>
      </body>
    </html>
  );
}
