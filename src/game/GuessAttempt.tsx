import React, { forwardRef, useEffect } from 'react';
import BlankWordInput from './BlankWordInput.tsx';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations.ts';
import { cn, isOnlyLetters } from '../lib/util.ts';
import { isWordsEqual } from './game.ts';

interface GuessAttemptProps {
    showInput: boolean;
    onCorrect: (guess: string) => void;
    onIncorrect: (guess: string) => void;
    word: string;
    initialGuessText: string;
    isInstructionsOpen: boolean;
}

/**
 * The user input for guessing the word.
 */
const GuessAttempt = forwardRef<HTMLInputElement, GuessAttemptProps>(
    (
        {
            showInput,
            onCorrect,
            onIncorrect,
            word,
            initialGuessText,
            isInstructionsOpen,
        }: GuessAttemptProps,
        ref
    ) => {
        const [guess, setGuess] = React.useState<string>(initialGuessText);

        const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

        const [color, setColor] = React.useState<string>();

        // Check if the guess is correct on initial render (used for local storage)
        useEffect(() => {
            if (initialGuessText !== '') {
                const isCorrect = isWordsEqual(guess, word);
                setIsDisabled(true);
                colorGuess(isCorrect);
            }
        }, [guess, initialGuessText, word]);

        const handleKeyPress = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (isDisabled) return;
            const keyValue = event.key;
            if (keyValue === 'Enter') {
                handleSubmitPressed();
                return;
            }
            // Don't allow non-letter characters
            if (!isOnlyLetters(keyValue)) event.preventDefault();
        };

        const isGuessValid = () => {
            return guess.length > 0 && isOnlyLetters(guess);
        };

        const colorGuess = (isCorrect: boolean) => {
            // Colors
            const correctColor =
                'disabled:text-green-800 disabled:border-green-800 disabled:bg-green-400';

            if (isCorrect) {
                setColor(correctColor);
            }
        };

        const handleSubmitPressed = () => {
            // Don't do anything if the input is disabled or the guess is invalid
            if (isDisabled) return;
            if (!isGuessValid()) return;

            const isCorrect = isWordsEqual(guess, word);

            setIsDisabled(true);
            colorGuess(isCorrect);
            if (isCorrect) {
                onCorrect(guess);
            } else {
                onIncorrect(guess);
            }
        };

        return showInput ? (
            <motion.div
                variants={fadeIn}
                className="flex h-14 w-full flex-row gap-2"
            >
                <input
                    ref={ref}
                    autoFocus={!isInstructionsOpen}
                    disabled={isDisabled}
                    className={cn(
                        'h-full w-full rounded-lg border-2 border-slate-800 px-4 py-2 text-center text-3xl font-bold uppercase tracking-[0.25em]  placeholder:font-medium placeholder:normal-case placeholder:tracking-wide placeholder:text-slate-300 focus:border-amber-500 focus:bg-slate-50 focus:outline-amber-500 disabled:text-slate-300',
                        color
                    )}
                    value={guess}
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
            </motion.div>
        ) : (
            <BlankWordInput />
        );
    }
);
export default GuessAttempt;
