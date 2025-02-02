import { formatNumber } from '../../utils/formatNumber';
import {
  GlobalCryptoInfoItem,
  GlobalCryptoInfoResponse,
} from './coinloreDataTypes';

export const transformGlobalCryptoInfoResponse = (
  resp: GlobalCryptoInfoResponse
): GlobalCryptoInfoItem[] => {
  return [
    {
      key: 0,
      label: 'Total number of coins',
      children: formatNumber(resp.coins_count),
    },
    {
      key: 1,
      label: 'Total cryptocurrency exchange pairs (markets)',
      children: formatNumber(resp.active_markets),
    },
    {
      key: 2,
      label: 'Total crypto market capitalization',
      children: `$${formatNumber(resp.total_mcap, 2)}`,
    },
    {
      key: 3,
      label: 'Total trading volume for last 24h',
      children: `$${formatNumber(resp.total_volume, 2)}`,
    },
    {
      key: 9,
      label: 'ATH total trading volume',
      children: `$${formatNumber(resp.volume_ath, 2)}`,
    },
    {
      key: 10,
      label: 'ATH total marketcap',
      children: `$${formatNumber(resp.mcap_ath, 2)}`,
    },
    {
      key: 6,
      label: 'How mcap changed for last 24h',
      children: resp.mcap_change,
      tag: true,
    },
    {
      key: 7,
      label: 'How trading volume changed for last 24h',
      children: resp.volume_change,
      tag: true,
    },
    {
      key: 8,
      label: 'How trading volume changed for last 24h',
      children: resp.avg_change_percent,
      tag: true,
    },
    {
      key: 4,
      label: 'Dominance of bitcoin mcap',
      children: `${resp.btc_d}%`,
    },
    {
      key: 5,
      label: 'Dominance of ethereum mcap',
      children: `${resp.eth_d}%`,
    },
  ];
};
