import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { matches } from "./data/matches";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="match-list">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            date={match.date}
            venue={match.venue}
            price={match.price}
            availableSeats={match.availableSeats}
          />
        ))}
      </section>
    </>
  );
}

export default App;