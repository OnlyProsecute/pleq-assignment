import { Kanit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head"
import Header from "@/components/Header";

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
            <Header/>
            {children}
            {footer}
          </body>
        </AuthProvider>
    </html>
  );
}
