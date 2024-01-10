import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function spaceN(number, x = 0) {
  let i = null;
  if (x === 0) {
    i = number.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g, '$1 ').replace('.', ', ');
  }
  if (x === 1) {
    i = number.toFixed(8).replace(/(\d)(?=(\d{4})+\b)/g, '$1 ').replace('.', ', ');
  }
  return i;
}

const Devise = ({ bitcoinV, bitcoinP }) => (
  <table className="currencies--table">
    <thead>
      <tr className="currencies__first--line">
        <th>Devise</th>
        <th>Cours actuel</th>
        <th>En possession</th>
        <th>Valeur</th>
      </tr>
    </thead>
    <tbody>
      <tr className="currency currency--bitcoin">
        <td>Bitcoin (BTC)</td>
        <td>{spaceN(bitcoinV)} €</td>
        <td>{spaceN(bitcoinP, 1)}</td>
        <td>{spaceN(bitcoinV * bitcoinP)} €</td>
      </tr>
    </tbody>
  </table>
);

Devise.propTypes = {
  bitcoinV: PropTypes.number.isRequired,
  bitcoinP: PropTypes.number.isRequired,
};

export default Devise;
