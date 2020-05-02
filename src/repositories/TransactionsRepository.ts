import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    interface Acc {
      income: number;
      outcome: number;
    }

    const reducer = (acc: Acc, transaction: Transaction): Acc => {
      if (transaction.type === 'income') {
        return { income: acc.income + transaction.value, outcome: acc.outcome };
      }

      return { income: acc.income, outcome: acc.outcome + transaction.value };
    };

    const initial = { income: 0, outcome: 0 };

    const { income, outcome } = this.transactions.reduce(reducer, initial);

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
