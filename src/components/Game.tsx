import { useState } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clue from './Clue.tsx';
import { WordToday } from '../lib/game.ts';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';

const TOTAL_ATTEMPTS: number = 5;

export default function Game({ word, clues }: WordToday) {
    const [currentAttempt, setCurrentAttempt] = useState<number>(1);

    const handleCorrect = () => {
        console.log('correct guess at attempt ', currentAttempt);
        console.log('Game finished!');
    };

    const handleIncorrect = () => {
        console.log('Incorrect guess at attempt ', currentAttempt);
        if (currentAttempt === TOTAL_ATTEMPTS) {
            console.log('Game over!');
            return;
        }
        setCurrentAttempt(currentAttempt + 1);
    };

    const checkGuess = (guess: string) => {
        const isCorrect = guess.toLowerCase() === word.toLowerCase();
        if (isCorrect) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    };

    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="show"
            className="grid h-full w-full place-items-center p-4"
        >
            <div className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4">
                <motion.div variants={item} className="text-lg font-medium">
                    Guess the word!
                </motion.div>
                <Clue
                    attempt={currentAttempt}
                    clueText={clues[currentAttempt]}
                />
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        key={index}
                        showInput={index <= currentAttempt - 1}
                        onSubmit={checkGuess}
                    />
                ))}
            </div>
        </motion.section>
    );
}
