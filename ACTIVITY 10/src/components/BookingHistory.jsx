function BookingHistory({ bookings }) {
  if (bookings.length === 0) {
    return <p className="empty">No bookings yet.</p>;
  }

  return (
    <section className="history">
      <h2>Booking History</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Match</th>
            <th>Tickets</th>
            <th>Total</th>
            <th>Booked at</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.user_name}</td>
              <td>{b.match_title}</td>
              <td>{b.tickets}</td>
              <td>₹{b.total_price}</td>
              <td>{new Date(b.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BookingHistory;