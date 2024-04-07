import Header from './components/Header.tsx';
import StartScreen from './components/StartScreen.tsx';
import Footer from './components/Footer.tsx';
import Game from './components/Game.tsx';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen.tsx';
import { getToday } from './lib/game.ts';
import ErrorScreen from './components/ErrorScreen.tsx';

function App() {
    // States
    const [showGame, setShowGame] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Data
    const [word, setWord] = useState<string>('');
    const [clues, setClues] = useState<Record<number, string>>({});

    const startGame = () => {
        setShowGame(true);
    };

    useEffect(() => {
        // Load the game data with a delay to show the loading screen
        const delay = 500;
        setTimeout(() => {
            loadGame();
        }, delay);
    }, []);

    const loadGame = () => {
        getToday()
            .then(today => {
                setWord(today.word);
                setClues(today.clues);
                setIsLoading(false);
            })
            .catch(e => {
                setError(e);
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                {/* Main Space */}
                <main className="grow">
                    {showGame && !isLoading && !error && (
                        <Game word={word} clues={clues} />
                    )}
                    {!showGame && !isLoading && !error && (
                        <StartScreen onStart={startGame} />
                    )}
                    {isLoading && <LoadingScreen />}
                    {error && !isLoading && <ErrorScreen error={error} />}
                </main>

                <div className="justify-self-end">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
