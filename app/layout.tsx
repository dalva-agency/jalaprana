'use client';
import './global.css';
import { Bodoni_Moda, Roboto } from 'next/font/google';
import Navigation from '../components/navigation/navigation';

const bodoni = Bodoni_Moda({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bodoni',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${roboto.variable}`}>
      <body className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Navigation />
        <main className="my-20">{children}</main>
      </body>
    </html>
  );
}
