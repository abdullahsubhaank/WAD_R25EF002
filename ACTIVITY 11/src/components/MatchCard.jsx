function MatchCard({ match, onBook }) {
  const soldOut = match.available_seats <= 0;

  return (
    <div className="match-card">
      <h3>{match.team1} vs {match.team2}</h3>
      <p className="meta">{match.match_date} • {match.venue}</p>
      <p className="price">₹{match.price} • {match.available_seats} seats left</p>
      <button onClick={() => onBook(match)} disabled={soldOut}>
        {soldOut ? "Sold Out" : "Book Tickets"}
      </button>
    </div>
  );
}

export default MatchCard;