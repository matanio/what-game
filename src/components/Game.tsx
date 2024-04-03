import { useRef, useState } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clue from './Clue.tsx';
import { TOTAL_ATTEMPTS, WordToday } from '../lib/game.ts';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';
import InstructionsModal from './InstructionsModal.tsx';
import useModal from '../lib/util.ts';
import ResultsModal from './ResultsModal.tsx';

export default function Game({ word, clues }: WordToday) {
    const [currentAttempt, setCurrentAttempt] = useState<number>(1);
    const { isOpen: isInstructionsOpen, closeModal: closeInstructions } =
        useModal(true);
    const [wasSolved, setWasSolved] = useState<boolean>(false);

    const {
        isOpen: isResultsOpen,
        closeModal: closeResults,
        openModal: openResults,
    } = useModal(false);

    const guessAttemptRef = useRef<HTMLInputElement>(null);

    const handleCloseInstructions = () => {
        closeInstructions();
        guessAttemptRef.current?.focus();
    };
    const gameOver = (wasGameSuccess: boolean) => {
        setWasSolved(wasGameSuccess);
        openResults();
    };
    const handleCorrectGuess = () => {
        gameOver(true);
    };

    const handleIncorrectGuess = () => {
        if (currentAttempt === TOTAL_ATTEMPTS) {
            gameOver(false);
            return;
        }
        setCurrentAttempt(currentAttempt + 1);
    };

    const checkGuess = (guess: string) => {
        const isCorrect = guess.toLowerCase() === word.toLowerCase();
        if (isCorrect) {
            handleCorrectGuess();
        } else {
            handleIncorrectGuess();
        }
    };

    return (
        <section className="relative grid h-full w-full place-items-center p-4">
            <InstructionsModal
                totalNumberOfAttempts={TOTAL_ATTEMPTS}
                showModal={isInstructionsOpen}
                onClose={handleCloseInstructions}
            />
            <ResultsModal
                showModal={isResultsOpen}
                onClose={closeResults}
                wasSolved={wasSolved}
                numberOfAttempts={currentAttempt}
            />
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4"
            >
                <motion.div variants={item} className="text-lg font-medium">
                    Guess the word!
                </motion.div>
                <Clue
                    attempt={currentAttempt}
                    clueText={clues[currentAttempt]}
                />
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        ref={guessAttemptRef}
                        key={index}
                        showInput={index <= currentAttempt - 1}
                        onSubmit={checkGuess}
                    />
                ))}
            </motion.div>
        </section>
    );
}
