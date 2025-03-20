import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Favorites.module.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((res) => res.json())
      .then((data) => {
        const favCoins = data.data.filter((coin) => favorites.includes(coin.id));
        setCoins(favCoins);
      })
      .catch((err) => console.error(err));
  }, [favorites]);

  if (favorites.length === 0) return <p className={styles.empty}>No hay criptomonedas favoritas.</p>;

  return (
    <div className={styles.container}>
      <h1>Mis Favoritas</h1>
      <ul className={styles.list}>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link className={styles.coinLink} to={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol}) - ${parseFloat(coin.priceUsd).toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}