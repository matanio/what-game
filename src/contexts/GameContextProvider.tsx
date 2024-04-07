import { GameResult, getToday, WordToday } from '../lib/game.ts';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
    clearLocalStorage,
    formatDateAsYearMonthDay,
    useLocalStorage,
} from '../lib/util.ts';

interface GameStateContext {
    wordToday: WordToday | null;
    setWordToday: (wordToday: WordToday) => void;
    currentAttempt: number;
    gameResult: GameResult | null;
    guesses: string[];
    addGuess: (guess: string) => void;
    incrementAttempt: () => void;
    setGameResult: (gameResult: GameResult) => void;
    isLoading: boolean;
    error: Error | null;
}

export const GameContext = createContext<GameStateContext | null>(null);

interface GameContextProviderProps {
    children: ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
    // States
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Data
    const [wordToday, setWordToday] = useLocalStorage<WordToday | null>(
        'wordToday',
        null
    );
    const [currentAttempt, setCurrentAttempt] = useLocalStorage<number>(
        'currentAttempt',
        1
    );
    const [gameResult, setGameResult] = useLocalStorage<GameResult | null>(
        'gameResult',
        null
    );

    const [guesses, setGuesses] = useLocalStorage<string[]>('guesses', []);

    const addGuess = (guess: string) => {
        setGuesses([...guesses, guess]);
    };

    const incrementAttempt = () => {
        setCurrentAttempt(currentAttempt + 1);
    };

    useEffect(() => {
        const fetchGame = () => {
            getToday()
                .then(today => {
                    setWordToday(today);
                    setIsLoading(false);
                })
                .catch(e => {
                    setError(e);
                    setIsLoading(false);
                });
        };

        const delay = 500;
        // Load the game data with a delay to show the loading screen
        setTimeout(() => {
            // If there is no word today stored, fetch the game as it is new
            if (!wordToday) {
                fetchGame();
                return;
            }

            // If there is a wordToday stored, but no game result, we are mid game; do nothing
            if (!gameResult) {
                setIsLoading(false);
                return;
            }
            // If we do have a game result, but it was for a different day, clear the state and fetch the game
            if (wordToday.date !== formatDateAsYearMonthDay(new Date())) {
                clearLocalStorage('wordToday');
                clearLocalStorage('currentAttempt');
                clearLocalStorage('gameResult');
                clearLocalStorage('guesses');
                fetchGame();
            }

            // If we have a game result for today, and the day is still today, skip straight to the screen
            setIsLoading(false);
        }, delay);
    });

    return (
        <GameContext.Provider
            value={{
                wordToday,
                setWordToday,
                currentAttempt,
                gameResult,
                guesses,
                addGuess,
                incrementAttempt,
                setGameResult,
                isLoading,
                error,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
