import { ModalProps } from '../lib/util.ts';
import CloseButton from './CloseButton.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GameResult, TOTAL_ATTEMPTS } from '../lib/game.ts';
import { ScoreGrid } from './ScoreGrid.tsx';

export default function ResultsModal({
    wasSolved,
    numberOfAttempts,
    showModal,
    onClose,
}: GameResult & ModalProps) {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        setMessage(wasSolved ? 'Nice one!' : 'Better luck next time!');
    }, [wasSolved]);

    const copyResultsToClipboard = () => {
        let scoreGridInText: string = '';
        const iterations = wasSolved ? numberOfAttempts : TOTAL_ATTEMPTS + 1;
        for (let i = 0; i < iterations; i++) {
            if (i === iterations - 1) {
                scoreGridInText += wasSolved ? '\n🟩🟩🟩🟩' : '\n💩💩💩💩';
            } else {
                scoreGridInText += '\n⬜️⬜️⬜️⬜';
            }
        }
        const results =
            '' +
            `What #1 ${wasSolved ? numberOfAttempts : 'X'}/${TOTAL_ATTEMPTS}` +
            `${scoreGridInText}`;
        navigator.clipboard
            .writeText(results)
            .then(r => console.log('copied', r));
    };
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-50 flex h-full w-full items-start justify-center bg-white bg-opacity-90"
                >
                    <motion.div
                        initial={{ y: '10%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '10%' }}
                        transition={{
                            delay: 0.2,
                            duration: 0.4,
                            ease: 'easeOut',
                        }}
                        className="mx-4 mt-28 flex max-w-2xl grow flex-col content-center items-center gap-4 rounded-lg bg-white px-4 py-6 shadow-xl sm:p-8"
                    >
                        <div className="flex w-full min-w-fit flex-row items-center justify-end gap-2 sm:relative">
                            <h2 className="w-full text-wrap text-center text-2xl font-semibold sm:absolute">
                                {message}
                            </h2>
                            <span className="z-10">
                                <CloseButton onClick={onClose} />
                            </span>
                        </div>
                        <h3 className="text-xl font-light">What #103</h3>
                        <p>
                            {numberOfAttempts}/{TOTAL_ATTEMPTS}
                        </p>
                        <ScoreGrid
                            wasSolved={wasSolved}
                            numberOfAttempts={numberOfAttempts}
                        />
                        {/* Share Button */}
                        <button
                            className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600"
                            onClick={copyResultsToClipboard}
                        >
                            Share Results
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
