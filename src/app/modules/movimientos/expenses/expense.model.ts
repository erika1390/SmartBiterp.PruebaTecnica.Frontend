export interface ExpenseDetail {
  expenseTypeId: number;
  expenseTypeName: string | null;
  amount: number;
}

export interface Expense {
  id: number;
  date: string;
  moneyFundId: number;
  moneyFundName: string | null;
  documentType: string;
  storeName: string;
  observations: string;
  details: ExpenseDetail[];
}