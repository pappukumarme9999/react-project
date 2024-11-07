import React from 'react';
import { useHistory } from 'react-router-dom';
import './BuyNow.css'; // Import custom styles if needed

const BuyNow = ({ productId, price, redirectUrl }) => {
  const history = useHistory();

  const handleBuyNowClick = () => {
    // Redirecting to the checkout page, sending productId and price
    history.push({
      pathname: redirectUrl,
      state: { productId, price }
    });
  };

  return (
    <div className="buy-now-container">
      <button className="buy-now-button" onClick={handleBuyNowClick}>
        BUY NOW
      </button>
    </div>
  );
};

export default BuyNow;
