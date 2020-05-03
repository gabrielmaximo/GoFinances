import React, { useState, useEffect } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import { formatValue, formatDate } from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [orderBy, setOrder] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('/transactions');

      setTransactions(data.transactions);
      setBalance(data.balance);
    }

    loadTransactions();
  }, []);

  function handleOrderSubmit(
    param: 'title' | 'value' | 'category' | 'created_at',
  ): void {
    if (param === orderBy) {
      const order = transactions.reverse();
      setOrder('');
      setTransactions(order);
      return;
    }

    const order = transactions.sort((x, y) => {
      let sort = 0;
      if (param === 'value') sort = x.value - y.value;
      if (param === 'category')
        sort = x.category.title < y.category.title ? -1 : 1;
      if (x[param].toString().toLowerCase() < y[param].toString().toLowerCase())
        sort = -1;
      if (x[param].toString().toLowerCase() > y[param].toString().toLowerCase())
        sort = 1;
      return sort;
    });

    setOrder(param);
    setTransactions([...order]);
  }

  return (
    <>
      <Header path="list" />

      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleOrderSubmit('title')}>
                  Título
                  {orderBy === 'title' ? (
                    <FiChevronUp color="#FF872C" size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </th>
                <th onClick={() => handleOrderSubmit('value')}>
                  Preço
                  {orderBy === 'value' ? (
                    <FiChevronUp color="#FF872C" size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </th>
                <th onClick={() => handleOrderSubmit('category')}>
                  Categoria
                  {orderBy === 'category' ? (
                    <FiChevronUp color="#FF872C" size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </th>
                <th onClick={() => handleOrderSubmit('created_at')}>
                  Data
                  {orderBy === 'created_at' ? (
                    <FiChevronUp color="#FF872C" size={20} />
                  ) : (
                    <FiChevronDown size={20} />
                  )}
                </th>
              </tr>
            </thead>

            {transactions.map(
              ({ id, title, type, value, category, created_at: createdAt }) => (
                <tbody key={id}>
                  <tr>
                    <td className="title">{title}</td>
                    <td className={type}>
                      {formatValue(type === 'outcome' ? -value : value)}
                    </td>
                    <td>{category.title}</td>
                    <td>{formatDate(createdAt)}</td>
                  </tr>
                </tbody>
              ),
            )}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
