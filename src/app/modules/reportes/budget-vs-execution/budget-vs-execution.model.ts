export interface BudgetVsExecution {
  type: string;
  budget: number;
  execution: number;
}

export interface BudgetVsExecutionApiResponse {
  success: boolean;
  message: string;
  data: BudgetVsExecution[];
}
