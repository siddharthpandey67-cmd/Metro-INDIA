 "use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export default function SignupPage(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage("");try{const s=createClient();const {error}=await s.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+"/account"}});if(error)throw error;setMessage("Account request submitted. Check your email for the verification link.");}catch(e){setMessage(e instanceof Error?e.message:"Unable to create account.");}finally{setBusy(false);}}
 return <main className="container section" style={{maxWidth:500}}><Link href="/">← Back</Link><div className="card" style={{marginTop:22}}><h1>Create account</h1><form onSubmit={submit} style={{display:"grid",gap:13}}><label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} style={field}/></label><label>Password<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} style={field}/></label><button className="btn" disabled={busy}>{busy?"Creating...":"Create account"}</button></form>{message&&<p>{message}</p>}<p className="muted">Already registered? <Link href="/login">Sign in</Link></p></div></main>;
}
const field:React.CSSProperties={display:"block",width:"100%",padding:12,border:"1px solid #d0d5dd",borderRadius:8,marginTop:6};
