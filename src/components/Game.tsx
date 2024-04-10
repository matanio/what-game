import { useRef } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clues from './Clues.tsx';
import { TOTAL_ATTEMPTS, useGameState } from '../lib/game.ts';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';
import InstructionsModal from './InstructionsModal.tsx';
import useModal, { formatDateAsMonthDayYear } from '../lib/util.ts';
import ResultsModal from './ResultsModal.tsx';
import { ScoreButton } from './ScoreButton.tsx';
import HelpButton from './HelpButton.tsx';

export default function Game() {
    // Refs
    const guessAttemptRef = useRef<HTMLInputElement>(null);

    // Game state
    const {
        wordToday,
        currentAttempt,
        incrementAttempt,
        addGuess,
        setGameResult,
        gameResult,
        guesses,
    } = useGameState();

    // Modals
    const {
        isOpen: isInstructionsOpen,
        openModal: openInstructions,
        closeModal: closeInstructions,
    } = useModal(!gameResult);
    const {
        isOpen: isResultsOpen,
        closeModal: closeResults,
        openModal: openResults,
    } = useModal(gameResult !== null);

    const handleCloseInstructions = () => {
        closeInstructions();
        guessAttemptRef.current?.focus();
    };
    const gameOver = (wasGameSuccess: boolean) => {
        setGameResult({
            wasSolved: wasGameSuccess,
            numberOfAttempts: currentAttempt,
        });
        openResults();
    };
    const handleCorrectGuess = (guess: string) => {
        addGuess(guess);
        gameOver(true);
    };

    const handleIncorrectGuess = (guess: string) => {
        addGuess(guess);
        if (currentAttempt === TOTAL_ATTEMPTS) {
            gameOver(false);
            return;
        }
        incrementAttempt();
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
                wasSolved={gameResult?.wasSolved ?? false}
                numberOfAttempts={currentAttempt}
                word={wordToday!.word}
            />
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4"
            >
                <motion.div
                    variants={item}
                    className="grid w-full grid-cols-2 items-center justify-between gap-1 sm:grid-cols-3 sm:gap-0"
                >
                    <div className="font-semibold">
                        {formatDateAsMonthDayYear(new Date(wordToday!.date))}
                    </div>
                    <div className="order-3 col-span-2 justify-self-center text-center sm:order-none sm:col-auto">
                        Guess the word!
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2 justify-self-end">
                        {gameResult && <ScoreButton onClick={openResults} />}
                        <HelpButton onClick={openInstructions} />
                    </div>
                </motion.div>
                <Clues
                    clues={Object.values(wordToday!.clues).slice(
                        0,
                        currentAttempt
                    )}
                />
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        currentAttempt={currentAttempt}
                        ref={guessAttemptRef}
                        key={index}
                        showInput={index <= currentAttempt - 1}
                        word={wordToday!.word}
                        onCorrect={handleCorrectGuess}
                        onIncorrect={handleIncorrectGuess}
                        initialGuessText={guesses[index] ?? ''}
                    />
                ))}
            </motion.div>
        </section>
    );
}
