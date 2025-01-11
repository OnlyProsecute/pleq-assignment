import { Kanit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export const metadata = {
  title: "Pleq",
  description: "The assignment to apply for an internship at Pleq",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href="/">
        <h1 className={`text-base sm:text-lg textGradient ${kanit.className}`} >PLEQ</h1> 
      </Link>
      <div className="flex items-center justify-between">
        PLACEHOLDER
      </div>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href="https://caprea-media.nl">
        <p className={`text-slate-700 ${kanit.className}`}>Caprea-Media</p>
      </Link>
    </footer> 
  )
  return (
    <html lang="en">
      <Head/>
        <AuthProvider>
          <body
            className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${kanit.variable} antialiased`}
          >
            {header}
            {children}
            {footer}
          </body>
        </AuthProvider>
    </html>
  );
}
