export interface MoneyFund {
  id: number;
  name: string;
  fundType: 'CashBox' | 'BankAccount';
  initialBalance: number;
}