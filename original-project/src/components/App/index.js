import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import './styles.css';
import loadingLogo from 'src/assets/loading.png';

import Bilan from 'src/components/Bilan';
import Details from 'src/components/Details';
import Devise from 'src/components/Devise';
import Transactions from 'src/components/Transaction';
import Graphique from 'src/components/Graphique';

import transactionsData from 'src/data/transaction';

const data = {
  transactions: transactionsData,
  invest: null,
  bitcoin: null,
  ethereum: null,
  totalAchete: null,
  totalVendu: null,
  totalFrais: null,
};
const lastPrice = [];
const growthAim = 1;
const purchaseFee = 0.0018;
const saleFee = 0.0018;
const credit = transactionsData[0].sommeReelle;
const bitcoinGoal = transactionsData[0].combien;
const totalInvest = 2900;

transactionsData.forEach((element) => {
  if (element.type === 'Acheté') {
    data.totalAchete += element.somme;
  }
  if (element.type === 'Vendu') {
    data.totalVendu += element.sommeReelle;
  }
  data.totalFrais += element.frais;
  if (element.devise === 'Bitcoin (BTC)') {
    if (element.type === 'Acheté' || element.type === 'Reçu') {
      data.bitcoin += element.combien;
    }
    else {
      data.bitcoin -= element.combien;
    }
  }
  if (element.devise === 'Ethereum (ETH)') {
    if (element.type === 'Acheté' || data.type === 'Reçu') {
      data.ethereum += element.combien;
    }
    else {
      data.ethereum -= element.combien;
    }
  }
});

const App = () => {
  if (data.bitcoin > 0) {
    data.invest = transactionsData[0].somme;
  }
  else {
    data.invest = 0;
  }

  const [update, setUpdate] = useState('app');
  const [loading, setLoading] = useState('loading');
  const [bitcoinV, setBitcoinV] = useState(0);
  const [delayAPI, setDelayAPI] = useState(300);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  const getValue = async () => {
    try {
      const responseB = await axios.get('https://blockchain.info/tobtc?currency=EUR&value=1');
      const bitcoinPrice = (Math.round((1 / responseB.data) * 100)) / 100;
      // const responseC = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/EUR.json');
      // const bitcoinPrice = Math.round((1 / responseC.data.bpi.EUR.rate_float) * 100);
      if (bitcoinV !== bitcoinPrice) {
        setBitcoinV(bitcoinPrice);
        const date = new Date();
        lastPrice.push({
          time: Math.round(Date.now() / 1000),
          hour: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear().toString().substr(2, 3)} ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`,
          price: bitcoinPrice,
        });
        if (data.bitcoin === 0) {
          document.title = `Bitcoin | ${Math.round(bitcoinPrice)} €`;
        }
        else {
          document.title = `Bitcoin | ${Math.round(((bitcoinPrice * data.bitcoin * (1 - saleFee)) - data.invest) * 100) / 100} € | ${Math.round(bitcoinPrice)} €`;
        }
        if (lastPrice.length >= 201) {
          lastPrice.splice(0, 1);
        }
      }
    }
    finally {
      setLoading('');
      setDelayAPI(12000);
    }
  };

  useEffect(() => {
    if (loading !== 'loading') {
      setUpdate('app update');
    }
    setTimeout(() => {
      setUpdate('app');
    }, 600);
  }, [bitcoinV]);

  useInterval(() => {
    getValue();
  }, delayAPI);

  const classGroup = `${update} ${loading}`;

  return (
    <div className={classGroup}>
      <h1 className="title1">Le crypto récap d'Alex</h1>
      <Devise
        bitcoinV={bitcoinV}
        bitcoinP={data.bitcoin}
      />
      <Bilan
        invest={data.invest}
        bitcoinP={data.bitcoin}
        bitcoinV={bitcoinV}
        credit={credit}
        growthAim={growthAim}
        purchaseFee={purchaseFee}
        saleFee={saleFee}
        bitcoinGoal={bitcoinGoal}
      />
      <Details
        bitcoinV={bitcoinV}
        invest={data.invest}
        bitcoinP={data.bitcoin}
        totalAchete={data.totalAchete}
        totalVendu={data.totalVendu}
        totalFrais={data.totalFrais}
        purchaseFee={purchaseFee}
        saleFee={saleFee}
        totalInvest={totalInvest}
      />
      {
        lastPrice.length >= 1 ? (
          <Graphique
            lastPrice={lastPrice}
            invest={data.invest}
            credit={credit}
            bitcoinP={data.bitcoin}
            purchaseFee={purchaseFee}
            saleFee={saleFee}
            bitcoinGoal={bitcoinGoal}
          />
        ) : <></>
      }
      <Transactions
        transactions={transactionsData}
      />
      <div className="loading--div">
        <div className="loading__progress--background" />
        <div className="loading__progress--front" />
        <img className="loading--logo" src={loadingLogo} alt="logo de chargement" />
      </div>
    </div>
  );
};

export default App;
