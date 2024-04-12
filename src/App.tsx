import Header from './components/Header.tsx';
import StartScreen from './screens/StartScreen.tsx';
import Footer from './components/Footer.tsx';
import Game from './game/Game.tsx';
import { useState } from 'react';
import LoadingScreen from './screens/LoadingScreen.tsx';
import { useGameState } from './game/game.ts';
import ErrorScreen from './screens/ErrorScreen.tsx';

function App() {
    // States
    const [showGame, setShowGame] = useState<boolean>(false);
    const { isLoading, error } = useGameState();

    const startGame = () => {
        setShowGame(true);
    };

    return (
        <div className="flex h-screen flex-col">
            <Header />
            {/* Main Space */}
            <main className="grow">
                {showGame && !isLoading && !error && <Game />}
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
    );
}

export default App;
