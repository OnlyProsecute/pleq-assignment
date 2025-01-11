  'use client';

  import { Kanit } from "next/font/google";
  import React, { useState } from 'react';
  import Button from "./Button";
  import { useAuth } from "@/context/AuthContext";

  const kanit = Kanit({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-kanit"
  });

  export default function Login() {

    const {signUp, login} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);

    async function handleSubmit() {
      if(!email || !password || password.length < 5) {
        return;
      }
      
      setAuthenticating(true);
      try {
        if(isRegister) {
          console.log('Register');
          await signUp(email, password);
        } else {
          console.log('Login');
          await login(email, password);
        }
      }
      catch(err) {
        console.log(err.message);
      }
      finally {
        setAuthenticating(false);  
      }


    }

    return (
      <div className="flex flex-col flex-1 justify-center items-center gap-4">
        <h3 className={`text-4xl sm:text-5xl md:text-6xl `}>
          {isRegister ? 'Register' : 'Login'}
        </h3>
        <p>One more step to a life without worries! (about classrooms)</p>
        <input value={ email } onChange={(e) => {
          setEmail(e.target.value)
        }}className="w-full max-w-[400] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" placeholder="Email"/>
        <input value={ password } onChange={(e) => {
          setPassword(e.target.value)
        }} className="w-full max-w-[400] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-slate-400 rounded-sm outline-none" placeholder="Password" type="password"/>
        <div className="max-w-[400px] mx-auto">
          <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : 'Submit'} full/>
        </div>    
        <p className="text-center">{isRegister ? 'Already haven an account?' : 'Don\'t have an account yet?'} <button onClick={() => setIsRegister(!isRegister)} className="textGradient">{isRegister ? 'Sign in' : 'Sign up here'}</button> </p>
      </div>
    )
  }
