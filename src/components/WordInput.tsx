import React from 'react';

const isOnlyLetters = (str: string): boolean => {
    return /^[a-zA-Z]*$/.test(str);
};

const isCorrect = (guessText: string): boolean => {
    const word = 'test';
    return guessText.toLowerCase() === word.toLowerCase();
};

interface WordInputProps {
    onCorrect: () => void;
    onIncorrect: () => void;
}

export default function WordInput({ onCorrect, onIncorrect }: WordInputProps) {
    const [guess, setGuess] = React.useState<string>('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyValue = event.key;
        if (!isOnlyLetters(keyValue)) event.preventDefault();
    };

    const onSubmit = () => {
        isCorrect(guess);
        if (isCorrect(guess)) {
            onCorrect();
        } else {
            onIncorrect();
        }
    };

    return (
        <div className="flex h-14 w-full flex-row gap-2">
            <input
                className="h-full w-full rounded-lg border-2 border-slate-800 px-4 py-2 text-center text-3xl font-bold uppercase tracking-[0.25em]  placeholder:font-medium placeholder:normal-case placeholder:tracking-wide placeholder:text-slate-300 focus:border-amber-500 focus:bg-slate-50 focus:outline-amber-500"
                type="text"
                placeholder="Start typing..."
                onKeyDown={handleKeyPress}
                onChange={e => setGuess(e.target.value)}
            ></input>
            <button
                onClick={onSubmit}
                className="h-full rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600 "
            >
                Submit
            </button>
        </div>
    );
}
