import type {Metadata} from 'next';
import { Anton, Permanent_Marker, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'VOID',
  description: 'Grunge revival dating and social app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${anton.variable} ${permanentMarker.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="bg-black text-white font-inter antialiased overflow-hidden" suppressHydrationWarning>
        <div className="relative w-full max-w-md mx-auto h-[100dvh] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-neon-green/20 border-x border-white/5">
          {children}
        </div>
      </body>
    </html>
  );
}
