import React, { useState } from 'react';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(10000);
  const [currencyType, setCurrencyType] = useState('fiduciaria');

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    updateTotals(expense);
  };

  const handleAddFunds = (amount) => {
    setBalance(balance + amount);
  };

  const handleWithdrawFunds = (amount) => {
    if (balance - amount >= 0) {
      setBalance(balance - amount);
    } else {
      alert('Saldo insuficiente para retirada.');
    }
  };

  const handleEditExpense = (index, editedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = editedExpense;
    setExpenses(updatedExpenses);
    updateTotals(editedExpense);
  };

  const handleDeleteExpense = (index) => {
    const deletedExpense = expenses[index];
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    updateTotals(deletedExpense, true);
  };

  const updateTotals = (expense, isDeleted) => {
    if (isDeleted) {
      if (expense.tipo === 'receita') {
        setRevenue(revenue - expense.valor);
      } else {
        setExpenseTotal(expenseTotal - expense.valor);
      }
    } else {
      if (expense.tipo === 'receita') {
        setRevenue(revenue + expense.valor);
      } else {
        setExpenseTotal(expenseTotal + expense.valor);
      }
    }
  };

  const formatCurrency = (value) => {
    switch (currencyType) {
      case 'fiduciaria':
        return `R$${value.toFixed(2)}`;
      case 'bitcoin':
        return `${value.toFixed(8)} BTC`;
      case 'ethereum':
        return `${value.toFixed(8)} ETH`;
      case 'litecoin':
        return `${value.toFixed(8)} LTC`;
      default:
        return `R$${value.toFixed(2)}`;
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#3498db', marginBottom: '20px' }}>
        Calculadora Financeira
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ flex: '1', textAlign: 'center' }}>
          <h2 style={{ color: '#4caf50' }}>Receita</h2>
          <p>{formatCurrency(revenue)}</p>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <h2 style={{ color: '#e91e63' }}>Despesa</h2>
          <p>{formatCurrency(expenseTotal)}</p>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <h2 style={{ color: '#3498db' }}>Saldo</h2>
          <p>{formatCurrency(balance)}</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <div style={{ flex: '1', textAlign: 'center' }}>
          <h2 style={{ color: '#3498db' }}>Adicionar Fundos</h2>
          <button
            onClick={() => handleAddFunds(1000)}
            style={{
              padding: '10px',
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Adicionar R$1000
          </button>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <h2 style={{ color: '#3498db' }}>Retirar Fundos</h2>
          <button
            onClick={() => handleWithdrawFunds(500)}
            style={{
              padding: '10px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Retirar R$500
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nome = e.target.nome.value;
          const valor = parseFloat(e.target.valor.value);
          const tipo = e.target.tipo.value;
          const pagoPor = e.target.pagoPor.value;

          const expense = { nome, valor, tipo, pagoPor };
          handleAddExpense(expense);

          // Limpar o formulário após adicionar uma despesa
          e.target.reset();
        }}
        style={{
          marginBottom: '20px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          Nome:
          <input
            type="text"
            name="nome"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          Valor:
          <input
            type="number"
            name="valor"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          Tipo:
          <select
            name="tipo"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </label>
        <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          Pago por:
          <input
            type="text"
            name="pagoPor"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          Moeda:
          <select
            name="moeda"
            onChange={(e) => setCurrencyType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            required
          >
            <option value="fiduciaria">Fiduciária (R$)</option>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="litecoin">Litecoin (LTC)</option>
          </select>
        </label>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3498db',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Adicionar Despesa
        </button>
      </form>

      {/* Lista de despesas */}
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {expenses.map((expense, index) => (
          <li
            key={index}
            style={{
              backgroundColor: '#fff',
              marginBottom: '10px',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              color: expense.tipo === 'receita' ? '#4caf50' : '#e91e63',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              {expense.nome} - {formatCurrency(expense.valor)} ({expense.tipo})
            </div>
            <div>
              <button
                onClick={() => handleEditExpense(index, prompt('Editar despesa:', expense.nome))}
                style={{
                  padding: '5px',
                  marginRight: '5px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteExpense(index)}
                style={{
                  padding: '5px',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;