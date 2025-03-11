export interface PortfolioState {
  isDrawerOpen: boolean;
  showSuccessTransaction: boolean;
  selectedAsset: { value: string; label: string } | null;
}
