import Link from "next/link";
import { CreateMarketForm } from "@/components/create-market-form";

export default function CreateMarketPage() {
  return (
    <div className="stack-lg">
      <CreateMarketForm />
      <section className="card stack-md">
        <div>
          <p className="eyebrow">Architecture note</p>
          <h2>Why this page matters</h2>
        </div>
        <p className="muted">
          For judging, this page shows the inputs required to launch a clear market and the handoff between the EVM market contract and the GenLayer resolver contract.
        </p>
        <Link href="/markets/genlayer-mainnet-q3" className="button secondary-button">
          Jump to a filled market example
        </Link>
      </section>
    </div>
  );
}
