import Header from './components/Header.tsx';
import StartScreen from './components/StartScreen.tsx';
import Footer from './components/Footer.tsx';
import Game from './components/Game.tsx';
import { useState } from 'react';

function App() {
    const [showGame, setShowGame] = useState<boolean>(false);
    const startGame = () => {
        setShowGame(true);
    };

    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                {/* Main Space */}
                <main className="grow">
                    {showGame && <Game />}
                    {!showGame && <StartScreen onStart={startGame} />}
                </main>

                <div className="justify-self-end">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
