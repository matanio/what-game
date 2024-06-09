import { formatDateAsYearMonthDay } from '../lib/util.ts';
import { GameContext } from '../contexts/GameContextProvider.tsx';
import { useContext } from 'react';

export const TOTAL_ATTEMPTS: number = 6;

export type WordToday = {
    word: string;
    clues: Record<number, string>;
    date: string; // YYYY-MM-DD format
    author: string;
    id: number;
};

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export interface GameResult {
    wasSolved: boolean;
    numberOfAttempts: number;
}

/**
 * Fetches the word data for a given date.
 * @throws NotFoundError if no data available for the given date.
 * @param date
 */
const fetchWordInfoByDate = async (date: Date): Promise<WordToday> => {
    const formattedDateString = formatDateAsYearMonthDay(date);
    try {
        const response = await fetch(`api/data/${formattedDateString}.json`);
        const data = await response.json();
        return data as WordToday;
    } catch {
        throw new NotFoundError(`No data available for ${formattedDateString}`);
    }
};

let cachedWordInfo: WordToday | null = null;

/**
 * Returns the word data for today.
 *
 * @throws NotFoundError if no data available for today.
 * @see fetchWordInfoByDate
 */
export const getToday = async (): Promise<WordToday> => {
    if (cachedWordInfo !== null) return cachedWordInfo;
    const today = await fetchWordInfoByDate(new Date());
    cachedWordInfo = today;
    return today;
};

/**
 * Returns all previous word data (i.e. a list of records from api/data)
 * @throws Error if dates.json can't be found / turned into json.
 */
export const getPreviousWords = async (): Promise<WordToday[]> => {
    const response = await fetch('api/data/dates.json');
    const dates = (await response.json()) as string[]; // assuming dates are strings in YYYY-MM-DD format
    const previousWords: WordToday[] = [];

    for (const date of dates) {
        try {
            const word = await fetchWordInfoByDate(new Date(date));
            previousWords.push(word);
        } catch (e) {
            // Handle error if necessary
        }
    }

    return previousWords;
};

/**
 * Returns a string representation of the score grid using emojis.
 *
 * @param wasSolved
 * @param numberOfAttempts
 */
export const generateScoreGridText = (
    wasSolved: boolean,
    numberOfAttempts: number
): string => {
    let scoreGridInText: string = '';
    const iterations = wasSolved ? numberOfAttempts : TOTAL_ATTEMPTS + 1;
    for (let i = 0; i < iterations; i++) {
        if (i === iterations - 1) {
            scoreGridInText += wasSolved ? '\n🟩🟩🟩🟩' : '\n💩💩💩💩';
        } else {
            scoreGridInText += '\n⬜️⬜️⬜️⬜';
        }
    }
    return scoreGridInText;
};

/**
 * Asserts if two words are equal, ignoring case.
 *
 * @param wordOne
 * @param wordTwo
 */
export const isWordsEqual = (wordOne: string, wordTwo: string): boolean => {
    return wordOne.toLowerCase() === wordTwo.toLowerCase();
};

/**
 * Custom hook to access the game state.
 */
export const useGameState = () => {
    const context = useContext(GameContext);

    if (!context)
        throw new Error(
            'useGameState must be used inside the GameContextProvider'
        );

    return context;
};
