import {
    getPreviousWords,
    NotFoundError,
    useGameState,
    WordToday,
} from '../game/game.ts';
import { useEffect, useState } from 'react';
import GalleryCard from '../components/GalleryCard.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { galleryCard, previousWordsContainer } from '../lib/animations.ts';

interface ErrorScreenProps {
    error: Error;
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
    const isNotFoundError = error instanceof NotFoundError;
    const [previousWords, setPreviousWords] = useState<WordToday[]>([]);

    const { startGameWithPreviousWord } = useGameState();

    useEffect(() => {
        if (!isNotFoundError) return;
        getPreviousWords().then(words => {
            if (words.length > 0) {
                setPreviousWords(words);
            }
        });
    }, [isNotFoundError]);

    const handleCardClick = (word: WordToday) => {
        startGameWithPreviousWord(word);
    };

    return (
        <div className="h-full w-full pb-12">
            <div className="mt-28 flex flex-col items-center justify-center gap-4">
                <h1 className="text-center text-4xl font-extrabold text-slate-900">
                    {isNotFoundError
                        ? '404 Not Found'
                        : 'Uh oh... Something went wrong.'}
                </h1>
                <p className="text-center text-slate-600">
                    {isNotFoundError
                        ? "Hmm. It doesn't look like today's word has been set 😅. Apologies — please check back later!"
                        : 'Please refresh the page to try again.'}
                </p>
                <p>
                    Want to submit a word? Get in touch on{' '}
                    <a
                        href="https://www.linkedin.com/in/matan-yosef-59970b219/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-amber-500 underline-offset-4 hover:underline"
                    >
                        LinkedIn
                    </a>
                    .
                </p>
            </div>
            <AnimatePresence>
                {isNotFoundError && previousWords.length > 0 && (
                    <motion.div
                        className="flex flex-col items-center justify-center gap-4"
                        variants={previousWordsContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <p className="py-4 text-center text-gray-400">
                            or, choose a previous day!
                        </p>
                        <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {previousWords.map(word => (
                                <motion.div
                                    variants={galleryCard}
                                    key={word.date}
                                >
                                    <GalleryCard
                                        word={word}
                                        key={word.date}
                                        clickHandler={handleCardClick}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
