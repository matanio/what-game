import { useRef, useState } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clue from './Clue.tsx';
import { todaysDate, TOTAL_ATTEMPTS, WordToday } from '../lib/game.ts';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';
import InstructionsModal from './InstructionsModal.tsx';
import useModal from '../lib/util.ts';
import ResultsModal from './ResultsModal.tsx';
import { ScoreButton } from './ScoreButton.tsx';
import HelpButton from './HelpButton.tsx';

export default function Game({ word, clues }: WordToday) {
    const [currentAttempt, setCurrentAttempt] = useState<number>(1);
    const {
        isOpen: isInstructionsOpen,
        openModal: openInstructions,
        closeModal: closeInstructions,
    } = useModal(true);
    const [wasSolved, setWasSolved] = useState<boolean>(false);

    const [isGameCompletedToday, setIsGameCompletedToday] =
        useState<boolean>(false);
    const [guesses, setGuesses] = useState<string[]>([]);

    const addToGuesses = (guess: string) => {
        setGuesses([...guesses, guess]);
    };
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
        setIsGameCompletedToday(true);
        openResults();
    };
    const handleCorrectGuess = (guess: string) => {
        addToGuesses(guess);
        gameOver(true);
    };

    const handleIncorrectGuess = (guess: string) => {
        addToGuesses(guess);
        if (currentAttempt === TOTAL_ATTEMPTS) {
            gameOver(false);
            return;
        }
        setCurrentAttempt(currentAttempt + 1);
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
                <motion.div
                    variants={item}
                    className="grid w-full grid-cols-3 items-center justify-between"
                >
                    <div className="font-semibold">{todaysDate}</div>
                    <div className="justify-self-center">Guess the word!</div>
                    <div className="flex flex-row items-center justify-between gap-2 justify-self-end">
                        {isGameCompletedToday && (
                            <ScoreButton onClick={openResults} />
                        )}
                        <HelpButton onClick={openInstructions} />
                    </div>
                </motion.div>
                <Clue
                    attempt={currentAttempt}
                    clueText={clues[currentAttempt]}
                />
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        guesses={guesses}
                        ref={guessAttemptRef}
                        key={index}
                        showInput={index <= currentAttempt - 1}
                        word={word}
                        onCorrect={handleCorrectGuess}
                        onIncorrect={handleIncorrectGuess}
                    />
                ))}
            </motion.div>
        </section>
    );
}
