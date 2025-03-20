import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Coin.module.css';

export default function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${id}`)
      .then((res) => res.json())
      .then((data) => setCoin(data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!coin) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>{coin.name} ({coin.symbol})</h1>
      <p>Price USD: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Rank: {coin.rank}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toFixed(2)}</p>
      <button className={styles.button} onClick={toggleFavorite}>
        {favorites.includes(id) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}