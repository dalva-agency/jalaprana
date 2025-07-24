'use client';
import Navigation from '../components/navigation/navigation';
import '../app/global.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
