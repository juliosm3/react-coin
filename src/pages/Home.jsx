import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Home.module.css';

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((res) => res.json())
      .then((data) => setCoins(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Cryptocurrencies</h1>
      <ul className={styles.list}>
        {coins.length > 0 ? (
          coins.map((coin) => (
            <li key={coin.id}>
              <Link className={styles.coinLink} to={`/coin/${coin.id}`}>
                {coin.name} ({coin.symbol}) - ${parseFloat(coin.priceUsd).toFixed(2)}
              </Link>
            </li>
          ))
        ) : (
          <p>Loading or no data available.</p>
        )}
      </ul>
    </div>
  );
}