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
  if (x === 2) {
    i = number.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1 ').replace('.', ', ');
  }
  return i;
}

const Bilan = ({
  invest, bitcoinV, bitcoinP, credit, growthAim, purchaseFee, saleFee, bitcoinGoal,
}) => (
  <div className="bilan">
    {
      bitcoinP === 0
        ? (
          <>
            <p className="bilan--text">Pour racheter du Bitcoin sans perte, il faudrait le faire à moins de <span className="span--bitcoin">{spaceN(credit * (1 - purchaseFee) / bitcoinGoal)} €</span></p>
            <p className="bilan--text">À la valeur actuelle du Bitcoin, je peux en acheter <span className="span--gain">{(Math.round(credit * (1 - purchaseFee) / bitcoinV / bitcoinGoal * 1000) / 10)} %</span> par rapport à ma dernière transaction.</p>
          </>
        )
        : (
          <>
            <p className="bilan--text">Somme personnel de <span className="span--somme">{spaceN(bitcoinV * bitcoinP * (1 - saleFee))} €</span> ce qui donne <span className="span--gain">{spaceN((bitcoinV * bitcoinP * (1 - saleFee)) - invest)} €</span> de bénéfice net, soit <span className="span--growth">{spaceN(bitcoinV * bitcoinP * (1 - saleFee) * 100 / invest)} %</span> de croissance.</p>
            <p className="bilan--text">Pour un bénéfice net de <span className="span--gain">{growthAim} % (soit {spaceN(invest / (100 / growthAim))} €)</span>, le Bitcoin doit atteindre <span className="span--bitcoin">{spaceN(invest * (1 + (growthAim / 100)) / (1 - saleFee) / bitcoinP)} €</span> (minimum <span className="span--bitcoin">{spaceN(invest / (1 - saleFee) / bitcoinP)} €</span>).</p>
            <p className="bilan--text">Pour remplir l'objectif de Mars de <span className="span--gain">4 137 €</span>, le Bitcoin doit atteindre <span className="span--bitcoin">{spaceN(4137 / (1 - saleFee) / bitcoinP)} €</span>.</p>
            <p className="bilan--text">Si je vend maintenant, je devrai racheter à moins de <span className="span--bitcoin">{spaceN(Math.floor((1 - purchaseFee) * (1 - saleFee) * bitcoinV / 10) * 10, 2)} € </span>pour que ça vaille le coup.</p>
          </>
        )
    }
  </div>
);

Bilan.propTypes = {
  invest: PropTypes.number.isRequired,
  bitcoinV: PropTypes.number.isRequired,
  bitcoinP: PropTypes.number.isRequired,
  credit: PropTypes.number.isRequired,
  growthAim: PropTypes.number.isRequired,
  purchaseFee: PropTypes.number.isRequired,
  saleFee: PropTypes.number.isRequired,
  bitcoinGoal: PropTypes.number.isRequired,
};

export default Bilan;
