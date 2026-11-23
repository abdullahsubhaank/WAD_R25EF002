import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import BookingHistory from "./components/BookingHistory";
import Footer from "./components/Footer";
import { supabase } from "./supabase";

function App() {
  const [page, setPage] = useState("home");
  const [matches, setMatches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  async function fetchData() {
    const { data: matchData, error: matchError } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (matchError) setStatusMessage("Error loading matches: " + matchError.message);
    else setMatches(matchData);

    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (bookingError) setStatusMessage("Error loading bookings: " + bookingError.message);
    else setBookings(bookingData);
  }

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("ipl-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "matches" }, fetchData)
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleBook(match) {
    if (match.available_seats <= 0) return;

    const name = window.prompt("Your name?");
    if (!name) return;

    const input = window.prompt(`How many tickets? (max ${match.available_seats})`, "1");
    const tickets = parseInt(input, 10);

    if (!tickets || tickets < 1 || tickets > match.available_seats) {
      setStatusMessage("Invalid ticket count.");
      return;
    }

    const { error: bookingError } = await supabase.from("bookings").insert({
      match_id: match.id,
      user_name: name,
      match_title: `${match.team1} vs ${match.team2}`,
      tickets,
      total_price: match.price * tickets,
    });

    if (bookingError) {
      setStatusMessage("Booking failed: " + bookingError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: match.available_seats - tickets })
      .eq("id", match.id);

    if (updateError) {
      setStatusMessage("Seat update failed: " + updateError.message);
      return;
    }

    setStatusMessage(`Booked ${tickets} ticket(s) for ${name}.`);
  }

  return (
    <>
      <Navbar totalBookings={bookings.length} onNavigate={setPage} />

      {page === "home" && <Hero />}

      {statusMessage && <p className="status">{statusMessage}</p>}

      {page === "history" ? (
        <BookingHistory bookings={bookings} />
      ) : (
        <section className="match-list">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} onBook={handleBook} />
          ))}
        </section>
      )}

      <Footer />
    </>
  );
}

export default App;