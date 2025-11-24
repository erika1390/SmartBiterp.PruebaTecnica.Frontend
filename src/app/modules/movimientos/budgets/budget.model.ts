export interface Budget {
  id: number;
  expenseTypeId: number;
  expenseTypeName: string;
  year: number;
  month: number;
  allocatedAmount: number;
  status: string;
}