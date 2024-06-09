import { getPreviousWords, NotFoundError, WordToday } from '../game/game.ts';
import { useEffect, useState } from 'react';
import GalleryCard from '../components/GalleryCard.tsx';

interface ErrorScreenProps {
    error: Error;
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
    const isNotFoundError = error instanceof NotFoundError;
    const [previousWords, setPreviousWords] = useState<WordToday[]>([]);

    useEffect(() => {
        if (!isNotFoundError) return;
        getPreviousWords().then(words => {
            if (words.length > 0) {
                setPreviousWords(words);
            }
        });
    }, [isNotFoundError]);

    const handleCardClick = (word: WordToday) => {
        console.log(word);
    };

    return (
        <div className="flex h-full w-full  flex-col items-center justify-center gap-4">
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
            {isNotFoundError && (
                <>
                    <p className="py-4 text-gray-400">
                        or, choose a previous day!
                    </p>
                    <div>
                        {previousWords.length > 0 && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {previousWords.map(word => (
                                    <GalleryCard
                                        word={word}
                                        key={word.date}
                                        clickHandler={handleCardClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
