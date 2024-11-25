export interface Order {
  id: number;
  customerName: string;
  items: string[];
  totalAmount: number;
  status: string;
}
