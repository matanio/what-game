import CloseButton from '../components/CloseButton.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
    GameResult,
    generateScoreGridText,
    TOTAL_ATTEMPTS,
} from '../game/game.ts';
import { ScoreGrid } from '../components/ScoreGrid.tsx';
import CountdownTimer from '../components/CountdownTimer.tsx';
import { ModalProps } from './modal.ts';

interface ResultsModalProps extends GameResult, ModalProps {
    word: string;
    id: number;
}

export default function ResultsModal({
    wasSolved,
    numberOfAttempts,
    showModal,
    onClose,
    word,
    id,
}: ResultsModalProps) {
    const [message, setMessage] = useState<string>('');
    const [shareButtonText, setShareButtonText] =
        useState<string>('Share Results');

    useEffect(() => {
        setMessage(wasSolved ? 'Nice one! 🎉' : 'Better luck next time!');
    }, [wasSolved]);

    const copyResultsToClipboard = () => {
        const scoreGridInText: string = generateScoreGridText(
            wasSolved,
            numberOfAttempts
        );

        const results = `What #${id} ${wasSolved ? numberOfAttempts : 'X'}/${TOTAL_ATTEMPTS}${scoreGridInText}`;

        navigator.clipboard.writeText(results).then(() => {
            setShareButtonText('Copied!');
            setTimeout(() => {
                setShareButtonText('Share Results');
            }, 2000);
        });
    };

    const handleOuterClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOuterClick}
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
                        className="mx-4 mt-16 flex max-w-2xl grow flex-col content-center items-center gap-4 rounded-lg bg-white px-4 py-6 shadow-xl sm:mt-28 sm:p-8"
                    >
                        <div className="flex w-full min-w-fit flex-row items-center justify-end gap-2 sm:relative">
                            <h2 className="w-full text-wrap text-center text-2xl font-semibold sm:absolute">
                                {message}
                            </h2>
                            <span className="z-10">
                                <CloseButton onClick={onClose} />
                            </span>
                        </div>
                        <h3 className="text-xl font-light">What #{id}</h3>
                        <p className="font-extrabold uppercase">
                            <span>"{word}"</span>
                        </p>
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
                            {shareButtonText}
                        </button>

                        <hr />

                        <div className="flex flex-col items-center justify-center ">
                            <div className="font-semibold">NEXT WORD IN</div>
                            <CountdownTimer />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
