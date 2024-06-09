import { WordToday } from '../game/game.ts';
import { formatDateAsMonthDayYear } from '../lib/util.ts';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface Props {
    word: WordToday;
    clickHandler: (word: WordToday) => void;
}

const GalleryCard = forwardRef<HTMLButtonElement, Props>(
    ({ word, clickHandler }, ref) => {
        return (
            <button
                ref={ref}
                onClick={() => clickHandler(word)}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border bg-white p-8 shadow-lg"
            >
                <h2 className="mb-1 text-2xl font-bold">
                    {formatDateAsMonthDayYear(new Date(word.date))}
                </h2>
                <p className="text-sm text-gray-500">Author: {word.author}</p>
                <p className="text-sm text-gray-500">#{word.id}</p>
            </button>
        );
    }
);
export default GalleryCard;
export const GalleryCardMotion = motion(GalleryCard);
