import React from 'react';
import PropTypes from 'prop-types';
import GraphPart from './GraphPart';

import './styles.css';

function spaceN(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1 ').replace('.', ', ');
}

const Graphique = ({
  lastPrice, invest, bitcoinP, saleFee, purchaseFee, credit, bitcoinGoal,
}) => {
  let minPrice = 0;
  let maxPrice = 0;
  if (lastPrice[0]) {
    minPrice = lastPrice[0].price;
  }
  lastPrice.forEach((element) => {
    if (element.price <= minPrice) {
      minPrice = element.price;
    }
    if (element.price >= maxPrice) {
      maxPrice = element.price;
    }
  });
  const currentPrice = lastPrice[lastPrice.length - 1].price;
  const max = Math.round((maxPrice + (currentPrice * 0.0005)) / 10) * 10;
  const min = Math.round((minPrice - (currentPrice * 0.0005)) / 10) * 10;
  const time = lastPrice[lastPrice.length - 1].time - lastPrice[0].time;
  return (
    <>
      <h2 className="title2">Cours du Bitcoin récent ({lastPrice.length} prix affichés)</h2>
      <div className="graph">
        <div className="upper__graph--box">
          <div className="left__graph--box">
            {
            lastPrice.map((graphPart) => (
              <GraphPart
                {...graphPart}
                key={graphPart.time}
                min={min}
                max={max}
                bitcoinP={bitcoinP}
                credit={credit}
                invest={invest}
                purchaseFee={purchaseFee}
                saleFee={saleFee}
                bitcoinGoal={bitcoinGoal}
              />
            ))
          }
          </div>
          <div className="legende__box--right">
            <div className="legende__span--box">
              <p className="legende">{spaceN(max)} €</p>
              <p className="legende__hypothetic--benef">{spaceN((Math.round(((max * bitcoinP * (1 - saleFee)) - invest) * 10)) / 10)} €</p>
            </div>
            <div className="legende__span--box">
              <p className="legende--now">Actuel :</p>
              <p className="legende--now">{spaceN(Math.round(currentPrice))} €</p>
              <p className="legende--benef">Bénef :</p>
              <p className="legende--benef">{spaceN((Math.round(((currentPrice * bitcoinP * (1 - saleFee)) - invest) * 100)) / 100)} €</p>
            </div>
            <div className="legende__span--box">
              <p className="legende__hypothetic--benef">{spaceN((Math.round(((min * bitcoinP * (1 - saleFee)) - invest) * 10)) / 10)} €</p>
              <p className="legende">{spaceN(min)} €</p>
            </div>
          </div>
        </div>
        <div className="legende__box--bottom">
          {time / 60 > 60
            ? <p className="legende">Il y a {Math.floor(time / 3600)} {Math.floor(time / 3600) <= 1 ? 'heure' : 'heures'} et {Math.round((time / 60) % 60)} {Math.round(time / 60) <= 1 ? 'minute' : 'minutes'}</p>
            : <p className="legende">Il y a {Math.round(time / 60)} {Math.round(time / 60) <= 1 ? 'minute' : 'minutes'}</p>}
          <p className="legende">Maintenant</p>
        </div>
      </div>
    </>
  );
};

Graphique.propTypes = {
  lastPrice: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      hour: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ),
  invest: PropTypes.number.isRequired,
  bitcoinP: PropTypes.number.isRequired,
  saleFee: PropTypes.number.isRequired,
  credit: PropTypes.number.isRequired,
  purchaseFee: PropTypes.number.isRequired,
  bitcoinGoal: PropTypes.number.isRequired,
};

Graphique.defaultProps = {
  lastPrice: [],
};

export default Graphique;
