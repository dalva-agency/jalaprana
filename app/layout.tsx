'use client';
import './global.css';
import { Bodoni_Moda, Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Navigation from '../components/navigation/navigation';
import FloatingNavigation from '@/components/navigation/floatingNavigation';
import Footer from '@/components/footer/page';

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
  const pathname = usePathname();

  // Check if we're on a service page or contact page
  const isServiceOrContactPage = pathname?.includes('/natation') || pathname?.includes('/meditation') || pathname?.includes('/reiki') || pathname?.includes('presentation');

  // Determine background color based on route
  const getBackgroundClass = () => {
    if (pathname?.includes('/natation')) {
      return 'from-blue-50 to-white';
    } else if (pathname?.includes('/meditation')) {
      return 'from-yellow-50 to-white';
    } else if (pathname?.includes('/reiki')) {
      return 'from-green-50 to-white';
    }
    // Default background
    return 'white';
  };

  // Determine if we should show the background pattern
  const shouldShowPattern = pathname?.includes('/natation') || pathname?.includes('/meditation') || pathname?.includes('/reiki');

  return (
    <html lang="en" className={`${bodoni.variable} ${roboto.variable}`}>
      <body>
        {/* Full width background wrapper */}
        <div className={`min-h-screen bg-gradient-to-b ${getBackgroundClass()} relative`}>
          {/* Background Pattern - Full width (only for service pages) */}
          {shouldShowPattern && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'url("/assets/images/background.jpg")',
                backgroundRepeat: 'repeat',
                backgroundSize: '500px 500px',
                opacity: 0.04,
              }}
            />
          )}

          {/* Content with max-width and padding */}
          <div className="relative z-10">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Conditional Navigation */}
              {!isServiceOrContactPage && <Navigation />}

              {/* Floating Navigation for service and contact pages */}
              {isServiceOrContactPage && <FloatingNavigation />}

              <main className={isServiceOrContactPage ? 'pt-20' : 'py-20'}>{children}</main>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
