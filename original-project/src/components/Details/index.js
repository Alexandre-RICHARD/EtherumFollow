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

const Details = ({
  bitcoinV, invest, bitcoinP, totalAchete, totalVendu,
  totalFrais, saleFee, purchaseFee, totalInvest,
}) => (
  <div className="details">
    <div>
      <h2 className="title2">invest actuel</h2>
      <table>
        <thead>
          <tr className="yellow">
            <th className="left">invest actuel</th>
            <td className="center">{spaceN(invest)} €</td>
          </tr>
        </thead>
        <tbody>
          <tr className="orange">
            <th className="left">Frais engrangé</th>
            <td className="center">{spaceN(invest * purchaseFee)} €</td>
          </tr>
          <tr className="yellow">
            <th className="left">invest réel</th>
            <td className="center">{spaceN(invest * (1 - purchaseFee))} €</td>
          </tr>
          <tr className="blue">
            <th className="left">Valeur actuelle</th>
            <td className="center">{spaceN(bitcoinV * bitcoinP * (1 - saleFee))}</td>
          </tr>
          <tr className="green">
            <th className="left">Bénéfice actuel</th>
            <td className="center">{spaceN((bitcoinV * bitcoinP * (1 - saleFee)) - invest)} €</td>
          </tr>
          <tr className="green">
            <th className="left">Stonks level</th>
            <td className="center">{spaceN(bitcoinV * bitcoinP * (1 - saleFee) * 100 / invest)} %</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 className="title2">invest total</h2>
      <table>
        <thead>
          <tr className="yellow">
            <th className="left">Total investi</th>
            <td className="center">{spaceN(totalAchete)} €</td>
          </tr>
        </thead>
        <tbody>
          <tr className="orange">
            <th className="left">Total des frais</th>
            <td className="center">{spaceN(totalFrais)} €</td>
          </tr>
          <tr className="yellow">
            <th className="left">Total vendu</th>
            <td className="center">{spaceN(totalVendu)} €</td>
          </tr>
          <tr className="blue">
            <th className="left">Total en jeu</th>
            <td className="center">{spaceN(invest)} €</td>
          </tr>
          <tr className="green">
            <th className="left">Bénéfice totaux</th>
            <td className="center">{spaceN(totalVendu - totalAchete + invest)} €</td>
          </tr>
          <tr className="green">
            <th className="left">Stonks level</th>
            <td className="center">{spaceN((totalInvest + totalVendu - totalAchete + invest) / totalInvest * 100)} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

Details.propTypes = {
  bitcoinV: PropTypes.number.isRequired,
  invest: PropTypes.number.isRequired,
  bitcoinP: PropTypes.number.isRequired,
  totalAchete: PropTypes.number.isRequired,
  totalVendu: PropTypes.number.isRequired,
  totalFrais: PropTypes.number.isRequired,
  purchaseFee: PropTypes.number.isRequired,
  saleFee: PropTypes.number.isRequired,
  totalInvest: PropTypes.number.isRequired,
};

export default Details;
