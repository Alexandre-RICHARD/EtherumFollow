import React from 'react';
import PropTypes from 'prop-types';
import Transaction from './Transaction';

import './styles.css';

const Transactions = ({ transactions }) => (
  <>
    <h2 className="title2">Historique des transaction</h2>
    <div className="scroll--table">
      <table className="transaction--table">
        <thead>
          <tr className="transaction__first--line">
            <th>Date</th>
            <th>Type</th>
            <th>Somme</th>
            <th>Frais</th>
            <th>Somme réelle</th>
            <th>Devise</th>
            <th>Combien</th>
            <th>Cours</th>
            <th>Bénéfice</th>
          </tr>
        </thead>
        <tbody>
          {
          transactions.map((transaction) => (
            <Transaction {...transaction} key={transaction.id} />
          ))
        }
        </tbody>
      </table>
    </div>
  </>
);

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      somme: PropTypes.number.isRequired,
      frais: PropTypes.number.isRequired,
      sommeReelle: PropTypes.number.isRequired,
      devise: PropTypes.string.isRequired,
      combien: PropTypes.number.isRequired,
      cours: PropTypes.number.isRequired,
      benef: PropTypes.number.isRequired,
    }),
  ),
};

Transactions.defaultProps = {
  transactions: [],
};

export default Transactions;
