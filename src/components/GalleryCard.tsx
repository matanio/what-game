import { WordToday } from '../game/game.ts';
import { formatDateAsMonthDayYear } from '../lib/util.ts';

interface Props {
    word: WordToday;
    clickHandler: (word: WordToday) => void;
}

/**
 * A card component for displaying a word in the 'previous words' gallery.
 */
const GalleryCard = ({ word, clickHandler }: Props) => {
    return (
        <button
            onClick={() => clickHandler(word)}
            className="relative flex aspect-square transform flex-col items-center justify-center gap-1 rounded-lg border bg-white p-8 shadow-lg transition-transform duration-500 hover:z-10 hover:scale-125 hover:bg-gray-100"
        >
            <h2 className="mb-1 text-2xl font-bold">
                {formatDateAsMonthDayYear(new Date(word.date))}
            </h2>
            <p className="text-sm text-gray-500">Author: {word.author}</p>
            <p className="text-sm text-gray-500">#{word.id}</p>
        </button>
    );
};
export default GalleryCard;
