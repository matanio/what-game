import { useRef } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clues from './Clues.tsx';
import { TOTAL_ATTEMPTS, useGameState } from './game.ts';
import { motion } from 'framer-motion';
import { mainContainer, fadeIn } from '../lib/animations.ts';
import InstructionsModal from '../modals/InstructionsModal.tsx';
import { formatDateAsMonthDayYear } from '../lib/util.ts';
import ResultsModal from '../modals/ResultsModal.tsx';
import { ScoreButton } from '../components/ScoreButton.tsx';
import HelpButton from '../components/HelpButton.tsx';
import useModal from '../modals/modal.ts';

/**
 * Core game component that uses game state and displays the game UI.
 *
 * @constructor
 */
export default function Game() {
    // Refs
    const guessAttemptRef = useRef<HTMLInputElement>(null);

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
    // Instructions (initially open if game is not over)
    const {
        isOpen: isInstructionsOpen,
        openModal: openInstructions,
        closeModal: closeInstructions,
    } = useModal(!gameResult);
    // Results (initially open if game is over)
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
                showModal={isInstructionsOpen}
                onClose={handleCloseInstructions}
            />
            <ResultsModal
                showModal={isResultsOpen}
                onClose={closeResults}
                wasSolved={gameResult?.wasSolved ?? false}
                numberOfAttempts={currentAttempt}
                word={wordToday!.word}
                id={wordToday!.id}
            />
            <motion.div
                variants={mainContainer}
                initial="hidden"
                animate="show"
                className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4"
            >
                <motion.div
                    variants={fadeIn}
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

                {/* Pass in 1 to N clues, where N is the current attempt */}
                <Clues
                    clues={Object.values(wordToday!.clues).slice(
                        0,
                        currentAttempt
                    )}
                />

                {/* Creates a guess attempt for every attempt */}
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        isInstructionsOpen={isInstructionsOpen}
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
