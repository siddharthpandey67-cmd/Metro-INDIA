export type MetroStatus = "operational" | "under_construction" | "approved" | "proposed";
export type MetroNetwork = {
  id: string; name: string; city: string; state_name: string;
  status: MetroStatus; description: string | null; official_url: string | null;
  booking_url: string | null; last_verified_at: string | null;
};
export const statusLabel: Record<MetroStatus, string> = {
  operational: "Operational", under_construction: "Under construction",
  approved: "Approved", proposed: "Proposed"
};
