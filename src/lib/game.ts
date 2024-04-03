export const TOTAL_ATTEMPTS: number = 6;

export type WordToday = {
    word: string;
    clues: Record<number, string>;
};

class NotFoundError extends Error {
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
 * @throws Error if no data available for the given date
 * @param date
 */
const fetchWordInfoByDate = async (date: Date): Promise<WordToday> => {
    const formattedDateString = date.toLocaleString('en-CA').split(', ')[0];
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
 * @throws NotFoundError if no data available for today.
 * @see fetchWordInfoByDate
 */
export const getToday = async (): Promise<WordToday> => {
    if (cachedWordInfo !== null) return cachedWordInfo;
    const today = await fetchWordInfoByDate(new Date());
    cachedWordInfo = today;
    return today;
};

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
