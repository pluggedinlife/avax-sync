export default interface Transaction {
  timestamp: Date;
  status: boolean;
  block_number: string;
  tx_index: string;
  from: string;
  to: string;
  gas_limit: string;
  gas_used: string;
  gas_price: string;
  value: string;
}
