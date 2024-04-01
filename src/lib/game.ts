type WordInfo = {
    word: string;
    clues: Record<number, string>;
};

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * @throws Error if no data available for the given date
 * @param date
 */
const fetchWordInfoByDate = (date: Date): WordInfo | null => {
    let wordInfo: WordInfo | null = null;
    const formattedDateString = date.toISOString().split('T')[0];
    fetch(`api/data/${formattedDateString}.json`)
        .then(response => response.json())
        .then(data => {
            wordInfo = data as WordInfo;
        })
        .catch(() => {
            throw new NotFoundError(
                `No data available for ${formattedDateString}`
            );
        });
    return wordInfo;
};

let cachedWordInfo: WordInfo | null = null;

/**
 * @throws NotFoundError if no data available for today.
 * @see fetchWordInfoByDate
 */
export const getToday = (): WordInfo | null => {
    if (cachedWordInfo !== null) return cachedWordInfo;
    const today = fetchWordInfoByDate(new Date());
    cachedWordInfo = today;
    return today;
};

/**
 * @throws NotFoundError if no data available for the given date
 * @throws Error if no clue available for the given attempt
 *
 * @param attempt
 */
export const getClue = (attempt: number): string => {
    const wordInfo = getToday();
    if (!wordInfo) throw new NotFoundError('No data available for today');
    const clue = wordInfo.clues[attempt];
    if (!clue) throw new Error(`No clue available for attempt ${attempt}`);
    return clue;
};

export const isGuessCorrect = (guessedWord: string): boolean => {
    const wordInfo = getToday();
    if (!wordInfo) return false; // No word data available, so no correct answer
    const correctWord = wordInfo.word;
    return guessedWord.toLowerCase() === correctWord.toLowerCase();
};
