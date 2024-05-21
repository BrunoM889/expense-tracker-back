export class CreateIncomeExpense {
  title: string;
  type: number;
  total: number;
  userId: number;
}

export class IncomeExpense extends CreateIncomeExpense {
  id: number;
  createdAt: string;
}

export type IncomeOrExpense = 'incomes' | 'expenses';

export type DeleteMovement={
  id: number;
  balance: number;
  userId: number;
  type: IncomeOrExpense;
}