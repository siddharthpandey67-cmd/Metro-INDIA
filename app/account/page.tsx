 "use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export default function AccountPage(){
 const [email,setEmail]=useState<string|null>(null);const [message,setMessage]=useState("Loading account...");
 useEffect(()=>{let active=true;try{const s=createClient();s.auth.getUser().then(({data,error})=>{if(!active)return;if(error||!data.user){window.location.href="/login";return;}setEmail(data.user.email??null);setMessage("Your account is active. Booking integrations will appear here after the relevant metro operator connection is approved.");});}catch(e){setMessage(e instanceof Error?e.message:"Account unavailable.");}return()=>{active=false}},[]);
 async function logout(){const s=createClient();await s.auth.signOut();window.location.href="/";}
 return <main className="container section" style={{maxWidth:760}}><Link href="/">← Metro India</Link><div className="card" style={{marginTop:20}}><h1>My account</h1><p>{message}</p>{email&&<p className="muted">Signed in as {email}</p>}<button className="btn" onClick={logout}>Sign out</button></div></main>;
}
