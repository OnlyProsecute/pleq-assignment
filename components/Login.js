import { Kanit } from "next/font/google";
import Button from "./Button";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kanit"
});

export default function Login() {

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl md:text-6xl `}>
        LOGIN/REGISTER
      </h3>
      <p>One more step to a life without worries! (about classrooms)</p>
      <input className="w-full max-w-[400] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" placeholder="Email"/>
      <input className="w-full max-w-[400] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" placeholder="Password" type="password"/>
      <div className="max-w-[400px] mx-auto">
        <Button text="Submit" full/>
      </div>    
      <p className="text-center">Don&apos;t have an account yet? <span className="textGradient">Sign up here</span> </p>
    </div>
  )
}
