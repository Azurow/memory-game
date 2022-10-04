import { useEffect, useState } from 'react';
import './Styles/App.css';

// Card Generation Utility
import { createCards } from './cardShuffle';

// React Components
import Card from './Components/Card';
import Timer from './Components/Timer';

function App() {

  const cardAmount = 12; // changable
  const [cards, setCards] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCards, setSelectedCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

  const [moves, setMoves] = useState();
  const [timerIsActive, setTimerActive] = useState(false);

  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    startGame();
  },[])

  useEffect(() => {

    if (foundPairs.length === cardAmount / 2) {
      // win game
      setTimerActive(false);
      setHasWon(true);
    }
  }, [foundPairs])

  const startGame = async () => {
    //Reset all states
    setMoves(0);
    setFoundPairs([]);
    setSelectedCards([]);
    setTimerActive(false);
    setHasWon(false);

    setIsLoading(true);
    setCards(await createCards(cardAmount));
    // Await Card creation, then set loading to false
    setIsLoading(false);
    setTimerActive(true);
  }

  const onCardSelected = (id) => {
    // Add selected Card's id to selected Cards
    setSelectedCards([...selectedCards, id]);

    // Guard clause: If move's not finished, return
    if (selectedCards.length < 1) return;

    setMoves(moves + 1);

    if (selectedCards[0] === id) {
      //correct pair
      setFoundPairs([...foundPairs, id]);
      setSelectedCards([]);
    }
    else {
      // wrong pair
      setTimeout(() => setSelectedCards([]), 1000)
    }
  }

  return (
    <main className='app'>
      <Timer isActive={timerIsActive} />
      {hasWon &&
        <>
          <h2>You've won!</h2>
          <button onClick={e => startGame()}>Play Again</button>
        </>
      }

      {isLoading ? <>Loading</>
        :
        <div className='grid'>
          {cards.map((card, index) =>
            <Card url={card.url} id={card.id} key={index} onSelect={onCardSelected} selectedCards={selectedCards} foundPairs={foundPairs} />
          )}
        </div>}

      <div className='menu'>
        <h3>Moves: {moves}</h3>
        {!hasWon &&
          <button onClick={e => startGame()}>Restart</button>
        }
      </div>

    </main>
  );
}

export default App;
