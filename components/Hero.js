import { Kanit } from "next/font/google";
import CallToAction from "./CallToAction";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>
      <h1 className={`text-5xl sm:text-6xl md:text-7xl text-center ${kanit.className}`}>
        <span className="textGradient">Pleq</span> helps you find your <span className="textGradient">favourite</span> classrooms!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[700px] ">
        You&apos;re not a waste of space, why should the rooms be?
      </p>
      <CallToAction/>
    </div>
  )
}
