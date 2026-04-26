import { Market } from "@/lib/types";

export const featuredFlow = [
  {
    title: "1. Create",
    body: "Launch a market with a question, close time, and resolution criteria that the GenLayer resolver can inspect."
  },
  {
    title: "2. Take a side",
    body: "Users buy YES or NO exposure. In a live build, this panel would submit a contract transaction and refresh balances."
  },
  {
    title: "3. Resolve",
    body: "When the market closes, the resolver gathers evidence and returns a structured answer back to the EVM market contract."
  },
  {
    title: "4. Claim",
    body: "Winning wallets claim their payout or receive refunds if the market is marked INVALID."
  }
] as const;

export const markets: Market[] = [
  {
    id: "genlayer-mainnet-q3",
    question: "Will GenLayer launch a public mainnet before October 1, 2026?",
    category: "Protocol",
    description: "A milestone market designed to show the full product flow from creation to settlement. The UI is mocked, but the copy maps directly to onchain actions.",
    status: "trading",
    endDate: "2026-09-20 18:00 UTC",
    resolutionDate: "2026-10-01 18:00 UTC",
    totalLiquidityEth: 84.6,
    yesPoolEth: 52.4,
    noPoolEth: 32.2,
    probabilityYes: 62,
    probabilityNo: 38,
    oraclePrompt: "Check official GenLayer channels and release announcements for evidence that public mainnet access is live before the deadline.",
    resolutionOutcome: "PENDING",
    evidenceSummary: [
      "Official release post on the GenLayer blog or docs",
      "Public network access instructions or launch announcement",
      "Cross-check with social channels to confirm timing"
    ],
    position: {
      side: "YES",
      amountEth: 1.8,
      averagePrice: 0.59,
      estimatedPayoutEth: 2.9
    },
    claimStatus: {
      walletConnected: true,
      hasClaimed: false,
      claimableEth: 0,
      note: "No claim yet because the market is still open."
    },
    resolutionSteps: [
      {
        label: "Market funded",
        detail: "Liquidity is live and users can take YES / NO positions.",
        state: "complete"
      },
      {
        label: "Await close time",
        detail: "Trading remains open until September 20, 2026.",
        state: "current"
      },
      {
        label: "GenLayer evidence run",
        detail: "The resolver will fetch public evidence and submit a structured decision.",
        state: "upcoming"
      },
      {
        label: "Claims enabled",
        detail: "The contract opens settlement after final resolution is posted.",
        state: "upcoming"
      }
    ]
  },
  {
    id: "eth-etf-volume",
    question: "Will spot ETH ETF daily volume exceed $3B on any day in June 2026?",
    category: "Markets",
    description: "Example of a market in the resolution window. Judges can see exactly where GenLayer evidence would connect before claim is enabled.",
    status: "resolving",
    endDate: "2026-06-30 20:00 UTC",
    resolutionDate: "2026-07-01 20:00 UTC",
    totalLiquidityEth: 52.1,
    yesPoolEth: 21.1,
    noPoolEth: 31,
    probabilityYes: 41,
    probabilityNo: 59,
    oraclePrompt: "Review ETF issuer data, exchange summaries, and reputable market data sources for a one-day spot ETH ETF volume print above $3B.",
    resolutionOutcome: "PENDING",
    evidenceSummary: [
      "Issuer and exchange-reported ETF volumes",
      "Bloomberg or equivalent market data summary",
      "Structured evidence bundle persisted for the contract operator"
    ],
    position: {
      side: "NO",
      amountEth: 2.4,
      averagePrice: 0.57,
      estimatedPayoutEth: 4.1
    },
    claimStatus: {
      walletConnected: true,
      hasClaimed: false,
      claimableEth: 0,
      note: "Claim unlocks after the resolver result is written onchain."
    },
    resolutionSteps: [
      {
        label: "Market closed",
        detail: "New positions are disabled at the smart contract level.",
        state: "complete"
      },
      {
        label: "Evidence collection",
        detail: "GenLayer fetches relevant public market data sources.",
        state: "current"
      },
      {
        label: "Operator posts outcome",
        detail: "A live integration would call the EVM resolution function with the structured result.",
        state: "upcoming"
      },
      {
        label: "Claim payout",
        detail: "Winners can settle against the final pool once resolution is final.",
        state: "upcoming"
      }
    ]
  },
  {
    id: "ai-act-invalid-demo",
    question: "Will the EU AI Act enforcement dashboard publish a weekly update every Friday in May 2026?",
    category: "Policy",
    description: "Example invalid market flow. This shows refund messaging and proves the settlement panel handles more than winner-takes-all.",
    status: "invalid",
    endDate: "2026-05-31 18:00 UTC",
    resolutionDate: "2026-06-02 18:00 UTC",
    totalLiquidityEth: 18.9,
    yesPoolEth: 9.2,
    noPoolEth: 9.7,
    probabilityYes: 49,
    probabilityNo: 51,
    oraclePrompt: "Determine whether the source of truth remained available and precise enough to settle the question.",
    resolutionOutcome: "INVALID",
    evidenceSummary: [
      "The official dashboard changed URL structure mid-month",
      "Archived records were incomplete and conflicting",
      "Resolver recommended INVALID because evidence could not support a fair YES / NO outcome"
    ],
    position: {
      side: "YES",
      amountEth: 0.7,
      averagePrice: 0.5,
      estimatedPayoutEth: 0.7
    },
    claimStatus: {
      walletConnected: true,
      hasClaimed: false,
      claimableEth: 0.7,
      note: "Mock refund available because the market resolved INVALID."
    },
    resolutionSteps: [
      {
        label: "Trading complete",
        detail: "The market reached its close time without incident.",
        state: "complete"
      },
      {
        label: "Evidence inspection",
        detail: "Resolver found inconsistent and incomplete official data.",
        state: "complete"
      },
      {
        label: "Invalidated",
        detail: "The operator marked the market INVALID instead of forcing a YES / NO answer.",
        state: "complete"
      },
      {
        label: "Refund open",
        detail: "Each participant can reclaim their original stake.",
        state: "current"
      }
    ]
  }
];

export const getMarketById = (id: string) => markets.find((market) => market.id === id);
