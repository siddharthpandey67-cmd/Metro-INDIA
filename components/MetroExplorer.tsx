 "use client";
import { useMemo, useState } from "react";
import type { MetroNetwork } from "@/lib/types";
import { statusLabel } from "@/lib/types";
import { Search, MapPin, TrainFront, Ticket, ArrowUpRight } from "lucide-react";

const initialNetworks: MetroNetwork[] = [
  { id:"delhi", name:"Delhi Metro", city:"Delhi", state_name:"Delhi (NCT)", status:"operational", description:"An operational multi-line metro network. Verify current routes and service notices with the official operator.", official_url:"https://www.delhimetrorail.com/", booking_url:"https://www.dmrcsmartcard.com/", last_verified_at:null },
  { id:"namma", name:"Namma Metro", city:"Bengaluru", state_name:"Karnataka", status:"operational", description:"Bengaluru metro network. Check official service information before travelling.", official_url:"https://english.bmrc.co.in/", booking_url:"https://english.bmrc.co.in/", last_verified_at:null },
  { id:"mumbai", name:"Mumbai Metro", city:"Mumbai", state_name:"Maharashtra", status:"operational", description:"Multiple corridors are operated by different agencies. Confirm line-specific services and tickets.", official_url:"https://www.mmrda.maharashtra.gov.in/", booking_url:"https://www.mmmocl.co.in/", last_verified_at:null },
  { id:"kolkata", name:"Kolkata Metro", city:"Kolkata", state_name:"West Bengal", status:"operational", description:"Kolkata metro services and corridor details should be checked with the official operator.", official_url:"https://mtp.indianrailways.gov.in/", booking_url:"https://mtp.indianrailways.gov.in/", last_verified_at:null },
  { id:"lucknow", name:"Lucknow Metro", city:"Lucknow", state_name:"Uttar Pradesh", status:"operational", description:"Lucknow Metro operational corridor information. Check official updates for current service.", official_url:"https://www.lmrcl.com/", booking_url:"https://www.lmrcl.com/", last_verified_at:null },
  { id:"agra", name:"Agra Metro", city:"Agra", state_name:"Uttar Pradesh", status:"operational", description:"Agra Metro service information. Station openings and service availability must be confirmed from UPMRC.", official_url:"https://www.upmetrorail.com/", booking_url:"https://www.upmetrorail.com/", last_verified_at:null },
  { id:"pune", name:"Pune Metro", city:"Pune", state_name:"Maharashtra", status:"operational", description:"Pune Metro network information. Check the operator for current routes and tickets.", official_url:"https://www.punemetrorail.org/", booking_url:"https://www.punemetrorail.org/", last_verified_at:null },
  { id:"chennai", name:"Chennai Metro", city:"Chennai", state_name:"Tamil Nadu", status:"operational", description:"Chennai Metro network and service information.", official_url:"https://chennaimetrorail.org/", booking_url:"https://chennaimetrorail.org/", last_verified_at:null },
  { id:"hyderabad", name:"Hyderabad Metro", city:"Hyderabad", state_name:"Telangana", status:"operational", description:"Hyderabad Metro network information and official ticketing options.", official_url:"https://www.ltmetro.com/", booking_url:"https://www.ltmetro.com/", last_verified_at:null },
  { id:"kochi", name:"Kochi Metro", city:"Kochi", state_name:"Kerala", status:"operational", description:"Kochi Metro services and official ticketing information.", official_url:"https://kochimetro.org/", booking_url:"https://kochimetro.org/", last_verified_at:null }
];

export default function MetroExplorer({ networks = initialNetworks }: { networks?: MetroNetwork[] }) {
  const [query,setQuery] = useState("");
  const [filter,setFilter] = useState("all");
  const filtered = useMemo(() => networks.filter(n => {
    const matches = `${n.name} ${n.city} ${n.state_name}`.toLowerCase().includes(query.toLowerCase());
    return matches && (filter === "all" || n.status === filter);
  }),[networks,query,filter]);
  return <>
    <div className="searchbox">
      <Search color="#667085" />
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search metro, city or state..." aria-label="Search metro, city or state" />
      <select value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Filter by status">
        <option value="all">All statuses</option><option value="operational">Operational</option>
        <option value="under_construction">Under construction</option><option value="approved">Approved</option><option value="proposed">Proposed</option>
      </select>
    </div>
    <div className="section">
      <div className="sectionhead"><div><h2>Explore metro networks</h2><p className="muted">Search by network, city or state.</p></div><span className="muted">{filtered.length} shown</span></div>
      <div className="grid">
        {filtered.map(n=><article className="card" key={n.id}>
          <span className={`pill ${n.status}`}>{statusLabel[n.status]}</span>
          <h3><TrainFront size={18} style={{display:"inline",verticalAlign:"middle",marginRight:7}}/>{n.name}</h3>
          <p className="muted"><MapPin size={14} style={{display:"inline",verticalAlign:"middle"}}/> {n.city}, {n.state_name}</p>
          <p>{n.description}</p>
          <div className="cardfoot">
            {n.official_url && <a className="btn secondary" href={n.official_url} target="_blank" rel="noreferrer">Official info <ArrowUpRight size={15}/></a>}
            {n.booking_url && <a className="btn" href={n.booking_url} target="_blank" rel="noreferrer"><Ticket size={15}/> Ticket info</a>}
          </div>
        </article>)}
      </div>
      {filtered.length===0 && <div className="card">No matching metro network in the current dataset.</div>}
    </div>
  </>;
}
