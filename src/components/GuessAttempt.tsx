import React from 'react';
import BlankWordInput from './BlankWordInput.tsx';

interface GuessAttemptProps {
    showInput: boolean;
    onSubmit: (guess: string) => void;
}

export default function GuessAttempt({
    showInput,
    onSubmit,
}: GuessAttemptProps) {
    const [guess, setGuess] = React.useState<string>('');

    const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isDisabled) return;

        const keyValue = event.key;
        if (!isOnlyLetters(keyValue)) event.preventDefault();
    };

    const handleSubmitPressed = () => {
        if (isDisabled) return;
        setIsDisabled(true);
        onSubmit(guess);
    };

    return showInput ? (
        <div className="flex h-14 w-full flex-row gap-2">
            <input
                disabled={isDisabled}
                className="h-full w-full rounded-lg border-2 border-slate-800 px-4 py-2 text-center text-3xl font-bold uppercase tracking-[0.25em]  placeholder:font-medium placeholder:normal-case placeholder:tracking-wide placeholder:text-slate-300 focus:border-amber-500 focus:bg-slate-50 focus:outline-amber-500 disabled:text-slate-300"
                type="text"
                placeholder="Start typing..."
                onKeyDown={handleKeyPress}
                onChange={e => setGuess(e.target.value)}
            ></input>
            {!isDisabled && (
                <button
                    onClick={handleSubmitPressed}
                    className="h-full rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600 "
                >
                    Submit
                </button>
            )}
        </div>
    ) : (
        <BlankWordInput />
    );
}

/**
 * Uses regex to check if a string contains only letters.
 * @param str
 */
const isOnlyLetters = (str: string): boolean => {
    return /^[a-zA-Z]*$/.test(str);
};
