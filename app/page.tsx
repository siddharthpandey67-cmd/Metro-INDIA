import MetroExplorer from "@/components/MetroExplorer";
import { TrainFront, Map, Ticket } from "lucide-react";
export default function Home() {
  return <>
    <header className="topbar"><div className="container nav">
      <a className="logo" href="/">METRO <span>INDIA</span></a>
      <nav className="navlinks"><a href="#explore">Explore</a><a href="#status">Project status</a><a href="#booking">Ticket booking</a><a href="/login">Login</a></nav>
      <a className="btn" href="/login">Sign in</a>
    </div></header>
    <main>
      <section className="hero"><div className="container">
        <div className="eyebrow">ONE NATION · ONE METRO INFORMATION PLATFORM</div>
        <h1>Explore India's metro network, all in one place.</h1>
        <p>Find metro networks, station information, routes, upcoming projects and official ticket booking options across Indian cities.</p>
        <a href="#explore" className="btn">Explore metro networks <TrainFront size={17}/></a>
      </div></section>
      <div className="container statrow">
        <div className="stat"><strong>28 + 8</strong><span className="muted">States and Union Territories coverage framework</span></div>
        <div className="stat"><strong>City-wise</strong><span className="muted">Metro networks and station directory</span></div>
        <div className="stat"><strong>Verified</strong><span className="muted">Source and last-checked status fields</span></div>
      </div>
      <div className="container" id="explore"><MetroExplorer /></div>
      <section className="container section" id="status"><div className="notice"><b>Data accuracy notice:</b> This initial build contains a small starter directory, not a complete verified national inventory. Live train positions, construction percentages, opening dates and fares are not guessed. They will appear only after verified operator data or an approved data feed is connected.</div></section>
      <section className="container section" id="booking"><div className="grid">
        <div className="card"><Map size={25}/><h3>Metro map and routes</h3><p className="muted">Next module: line geometry, station coordinates, interchange and journey planning.</p></div>
        <div className="card"><Ticket size={25}/><h3>Ticket booking</h3><p className="muted">Use operator-approved booking links now. Direct booking requires an official operator integration and payment provider approval.</p><a className="btn secondary" href="/login">Login to continue</a></div>
        <div className="card"><TrainFront size={25}/><h3>Upcoming metro projects</h3><p className="muted">Project proposals, approvals, construction milestones and operational status will be stored separately.</p></div>
      </div></section>
    </main>
    <footer className="footer"><div className="container"><b>METRO INDIA</b><p>Independent metro information directory. Always confirm service, fares and ticket rules with the relevant official metro operator.</p><small>© {new Date().getFullYear()} Metro India · Prototype build</small></div></footer>
  </>;
}
