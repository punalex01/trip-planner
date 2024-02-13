export interface IRepayment {
  receiver: string; // uuid of receiver
  total: number;
  itemsRepaid: string[]; // uuid's of payments that are being repaid
}
