import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total: balance } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance) {
      throw Error('There is no enough balance to complete the transaction.');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
