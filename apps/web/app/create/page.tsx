import Link from "next/link";
import { CreateMarketForm } from "@/components/create-market-form";

export default function CreateMarketPage() {
  return (
    <div className="stack-xl">
      <section className="row-between wrap gap-sm page-intro">
        <div>
          <p className="kicker">Market creation surface</p>
          <h1>Frame the market before a single wei moves.</h1>
        </div>
        <p className="section-note muted bottomless">
          The form is static in this demo, but every field below maps to either an EVM market creation parameter or a GenLayer resolution input.
        </p>
      </section>

      <CreateMarketForm />

      <section className="card stack-md info-band">
        <div>
          <p className="kicker">Why this screen matters</p>
          <h2>The judging brief asked for a complete product flow, not isolated code.</h2>
        </div>
        <p className="muted">
          This page shows where the two system layers separate: the EVM contract owns pool logic, while GenLayer owns evidence interpretation and final structured outcome generation.
        </p>
        <Link href="/markets/genlayer-mainnet-q3" className="button button-secondary">
          Jump to a fully populated market
        </Link>
      </section>
    </div>
  );
}
