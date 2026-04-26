export type MarketStatus = "funding" | "trading" | "resolving" | "resolved" | "invalid";
export type ResolutionOutcome = "YES" | "NO" | "INVALID" | "PENDING";

export type Position = {
  side: "YES" | "NO";
  amountEth: number;
  averagePrice: number;
  estimatedPayoutEth?: number;
};

export type ResolutionStep = {
  label: string;
  detail: string;
  state: "complete" | "current" | "upcoming";
};

export type ClaimStatus = {
  walletConnected: boolean;
  hasClaimed: boolean;
  claimableEth: number;
  note: string;
};

export type Market = {
  id: string;
  question: string;
  category: string;
  description: string;
  status: MarketStatus;
  endDate: string;
  resolutionDate: string;
  totalLiquidityEth: number;
  yesPoolEth: number;
  noPoolEth: number;
  probabilityYes: number;
  probabilityNo: number;
  oraclePrompt: string;
  resolutionOutcome: ResolutionOutcome;
  evidenceSummary: string[];
  position?: Position;
  claimStatus: ClaimStatus;
  resolutionSteps: ResolutionStep[];
};
