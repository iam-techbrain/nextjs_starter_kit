import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'NextAcademy | Modular Frontend Learning App with DummyJSON',
  description: 'Production-ready Next.js application teaching modular component architecture, parent-child prop flow, and asynchronous API integration.',
};

/**
 * Root Layout Component
 * 
 * Provides:
 * 1. Global styling via globals.css
 * 2. AuthProvider wrapping the entire application
 * 3. Consistent Header and Footer across all pages
 * 4. Semantic main element for page contents
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
