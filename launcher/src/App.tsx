import { useState } from "react";
import "./App.css";

const games = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const data = [{}];

function App() {
  const [selectedGame, setSelectedGame] = useState(1);

  const handleButtonClick = (game: any) => {
    setSelectedGame(game);
  };

  return (
    <>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        {games.map((game, index) => (
          <button
            key={index}
            className="inline-flex items-center h-14 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
            onClick={() => handleButtonClick(game)}
          >
            {game}
          </button>
        ))}
      </div>
      {selectedGame && <div>Selected Game: {selectedGame}</div>}
      <button
        className="fixed right-4 bottom-4 text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full"
      >
        Play!
      </button>
    </>
  );
}

export default App;