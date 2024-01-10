import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function spaceN(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1 ').replace('.', ', ');
}

const GraphPart = ({
  min, max, price, hour, bitcoinP, invest, purchaseFee, saleFee, credit, bitcoinGoal,
}) => {
  const pourcent = ((min - price) / (min - max));
  const total = spaceN((Math.round((price * bitcoinP * (1 - saleFee)) * 100)) / 100);
  const growth = spaceN((Math.round(((price * bitcoinP * (1 - saleFee)) - invest) * 100)) / 100);
  return (
    <div className="graphPart--box">
      <div className="graphPart--legend">
        <p className="graph__hour--legend">{hour}</p>
        <p className="graph__bitcoinV--legend">{spaceN(Math.round(price))} €</p>
        {
        bitcoinP > 0
          ? (
            <>
              <p className="graph__total--legend">{total} €</p>
              <p className={((price * bitcoinP * (1 - saleFee)) - invest) > 0 ? 'graph__growthP--legend' : 'graph__growthN--legend'}>{((price * bitcoinP * (1 - saleFee)) - invest) > 0 ? `+ ${growth}` : growth} €</p>
            </>
          )
          : (
            <>
              <p className="graph__potential--bitcoin">{Math.round(credit * (1 - purchaseFee) / price * 100000000) / 100000000}</p>
              <p className={(Math.round(credit * (1 - purchaseFee) / price / bitcoinGoal * 1000) / 10) > 0 ? 'graph__growthP--legend' : 'graph__potential--bitcoin'}>Btc ({(Math.round(credit * (1 - purchaseFee) / price / bitcoinGoal * 1000) / 10)}%)</p>
            </>
          )
        }
      </div>
      <div className="graphPart" style={{ height: `${(pourcent * 190) + 10}px` }} price={price} />
    </div>
  );
};

GraphPart.propTypes = {
  min: PropTypes.number.isRequired,
  credit: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  hour: PropTypes.string.isRequired,
  bitcoinP: PropTypes.number.isRequired,
  invest: PropTypes.number.isRequired,
  purchaseFee: PropTypes.number.isRequired,
  saleFee: PropTypes.number.isRequired,
  bitcoinGoal: PropTypes.number.isRequired,
};

export default GraphPart;
