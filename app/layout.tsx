// Next.js dependencies
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Internal dependencies
import { Layout, Main } from '@/components/layouts';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ThemeProvider from '@/components/themes/theme-provider';

// Styles
import './globals.css';
import ThemeToggle from '@/components/theme-toggle';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'WordPress Headless with Next.js',
    description: 'A headless WordPress site built with Next.js',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${inter.className} ${inter.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <Layout>
                        <Main>{children}</Main>
                    </Layout>

                    <ThemeToggle />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
