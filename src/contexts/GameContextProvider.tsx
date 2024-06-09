import { GameResult, getToday, WordToday } from '../game/game.ts';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
    clearLocalStorage,
    formatDateAsYearMonthDay,
    useLocalStorage,
} from '../lib/util.ts';

interface GameStateContext {
    wordToday: WordToday | null;
    setWordToday: (wordToday: WordToday) => void;
    startGameWithPreviousWord: (word: WordToday) => void;
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

/**
 * The context provider for the game state.
 *
 * @param children
 * @constructor
 */
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

    const clearLocalState = () => {
        clearLocalStorage('wordToday');
        clearLocalStorage('currentAttempt');
        clearLocalStorage('gameResult');
        clearLocalStorage('guesses');
        setWordToday(null);
        setCurrentAttempt(1);
        setGameResult(null);
        setGuesses([]);
    };

    const [guesses, setGuesses] = useLocalStorage<string[]>('guesses', []);

    const addGuess = (guess: string) => {
        setGuesses([...guesses, guess]);
    };

    const incrementAttempt = () => {
        setCurrentAttempt(currentAttempt + 1);
    };

    const startGameWithPreviousWord = (word: WordToday) => {
        clearLocalState();
        setError(null); // Required so that the error screen does not show up
        setWordToday(word);
        setIsLoading(false);
    };

    // Core load game logic
    useEffect(() => {
        const fetchGame = () => {
            clearLocalState();
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

        // Load the game data with some artificial delay to show the loading screen
        const LOADING_DELAY = 500;
        setTimeout(() => {
            // If there is no word today stored, fetch the game as it is new
            if (!wordToday) {
                fetchGame();
                return;
            }

            // If we do have a wordToday stored, but it was for a different day, clear the state and fetch the game
            // This also means that we ignore the state of any 'previous' game that was in progress
            if (wordToday.date !== formatDateAsYearMonthDay(new Date())) {
                fetchGame();
                return;
            }

            //  If we do have a wordToday stored, the date is today, we are either mid-game or have completed it.
            //  Either way, just load the game.
            setIsLoading(false);
        }, LOADING_DELAY);
    }, []);

    return (
        <GameContext.Provider
            value={{
                wordToday,
                setWordToday,
                startGameWithPreviousWord,
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
