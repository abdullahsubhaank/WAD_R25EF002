function Navbar({ totalBookings, onNavigate }) {
  return (
    <nav className="navbar">
      <h2 className="logo">IPL TICKETS</h2>
      <div className="nav-links">
        <button className="nav-link" onClick={() => onNavigate("home")}>Home</button>
        <button className="nav-link" onClick={() => onNavigate("matches")}>Matches</button>
        <button className="nav-link" onClick={() => onNavigate("history")}>Booking History</button>
      </div>
      <div className="nav-bookings">Bookings: <strong>{totalBookings}</strong></div>
    </nav>
  );
}

export default Navbar;