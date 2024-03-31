type WordInfo = {
    word: string;
    clues: Record<number, string>;
};

// TODO: Replace this with a new word fetch every day
const today: WordInfo = {
    word: 'hello',
    clues: {
        1: 'A common greeting',
        2: 'salutation',
        3: 'hi',
        4: 'hey',
        5: 'howdy',
    },
};

export const getTodaysWord = (): string => {
    return today.word;
};

export const getClue = (attempt: number): string => {
    const clue = today.clues[attempt];
    if (!clue) {
        throw new Error(`No clue available for attempt ${attempt}`);
    }
    return clue;
};

export const isGuessCorrect = (guessedWord: string): boolean => {
    const correctWord = getTodaysWord();
    return guessedWord.toLowerCase() === correctWord.toLowerCase();
};
