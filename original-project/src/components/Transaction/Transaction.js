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

const Transaction = ({
  date, type, somme, frais, sommeReelle, devise, combien, cours, benef,
}) => (
  <tr className="transaction--line">
    <th>{date}</th>
    <th>{type}</th>
    <th>{spaceN(somme)} €</th>
    <th>{spaceN(frais)} €</th>
    <th>{spaceN(sommeReelle)} €</th>
    <th>{devise}</th>
    <th>{spaceN(combien, 1)} </th>
    <th>{spaceN(cours)} €</th>
    <th>{spaceN(benef)} €</th>
  </tr>
);

Transaction.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  somme: PropTypes.number.isRequired,
  frais: PropTypes.number.isRequired,
  sommeReelle: PropTypes.number.isRequired,
  devise: PropTypes.string.isRequired,
  combien: PropTypes.number.isRequired,
  cours: PropTypes.number.isRequired,
  benef: PropTypes.number.isRequired,
};

export default Transaction;
