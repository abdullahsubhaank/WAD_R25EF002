import { useState } from "react";

function MatchCard({ homeTeam, awayTeam, date, venue, price, availableSeats }) {
  const [booked, setBooked] = useState(false);
  const soldOut = availableSeats <= 0;

  return (
    <div className="match-card">
      <h3>{homeTeam} vs {awayTeam}</h3>
      <p className="meta">{date} • {venue}</p>
      <p className="price">₹{price} • {availableSeats} seats left</p>
      <button onClick={() => setBooked(!booked)} disabled={soldOut}>
        {soldOut ? "Sold Out" : booked ? "Booked ✓" : "Book Tickets"}
      </button>
    </div>
  );
}

export default MatchCard;