import type { Metadata } from "next";
import { Inter, Caveat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SongProvider } from "@/context/SongContext";
import SongPlayer from "@/components/SongPlayer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-caveat" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Tejas Ghoti | Portfolio",
  description: "AI Full Stack Engineer | B.E. Information Technology (Honors in Cybersecurity) @ PICT Pune",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${caveat.variable} ${spaceGrotesk.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedIndex = localStorage.getItem('currentSongIndex');
                  var theme = 'gods-plan'; // Default
                  if (savedIndex !== null) {
                    var index = parseInt(savedIndex, 10);
                    var themes = ['gods-plan', 'heat-waves', 'shape-of-you', 'yellow', 'co2'];
                    if (index >= 0 && index < themes.length) {
                      theme = themes[index];
                    }
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <SongProvider>
          <SongPlayer />
          <Navbar />
          <main className="min-h-screen pt-16 container mx-auto px-4 py-8">
            {children}
          </main>
        </SongProvider>
      </body>
    </html>
  );
}
