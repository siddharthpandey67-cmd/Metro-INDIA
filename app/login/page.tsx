 "use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export default function LoginPage() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  async function signIn(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage("");
    try { const supabase=createClient(); const {error}=await supabase.auth.signInWithPassword({email,password});
      if(error) throw error; window.location.href="/account";
    } catch(err){setMessage(err instanceof Error?err.message:"Unable to sign in.");}
    finally{setBusy(false);}
  }
  return <main className="container section" style={{maxWidth:500}}>
    <Link href="/">← Back to Metro India</Link><div className="card" style={{marginTop:22}}>
      <h1>Sign in</h1><p className="muted">Login is required for account and booking features. Public metro information remains open.</p>
      <form onSubmit={signIn} style={{display:"grid",gap:13}}>
        <label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} style={field}/></label>
        <label>Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} style={field}/></label>
        <button className="btn" disabled={busy}>{busy?"Signing in...":"Sign in"}</button>
      </form>
      {message&&<p role="alert" style={{color:"#b42318"}}>{message}</p>}
      <p className="muted">New user? <Link href="/signup" style={{color:"#1457d9"}}>Create an account</Link></p>
    </div>
  </main>;
}
const field:React.CSSProperties={display:"block",width:"100%",padding:12,border:"1px solid #d0d5dd",borderRadius:8,marginTop:6};
