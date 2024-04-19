import { motion, PanInfo } from 'framer-motion';
import { MouseEventHandler } from 'react';
import { notActiveClueVariant } from '../lib/animations.ts';
import { cn } from '../lib/util.ts';
import Arrow from '../components/Arrow.tsx';

interface ClueProps {
    onDragEnd: (
        e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => void;
    index: number;
    currentDisplayIndex: number;
    clue: string;
    totalClueLength: number;
    onClickNext: MouseEventHandler<HTMLButtonElement>;
    onClickPrevious: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A clue component that displays a clue and allows the user to swipe to the next or previous clue.
 * It is also used for rendering of the 'previous' or 'next' clue.
 *
 * @param onDragEnd
 * @param index
 * @param clue
 * @param currentDisplayIndex
 * @param totalClueLength
 * @param onClickNext
 * @param onClickPrevious
 * @constructor
 */
const Clue = ({
    onDragEnd,
    index,
    clue,
    currentDisplayIndex,
    totalClueLength,
    onClickNext,
    onClickPrevious,
}: ClueProps) => {
    const isCurrent = currentDisplayIndex === index;
    const isPrevious = index < currentDisplayIndex;
    const isNext = index > currentDisplayIndex;

    return (
        <motion.div
            drag={isCurrent && totalClueLength > 1 ? 'x' : undefined}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            custom={isPrevious}
            initial="hide"
            animate="show"
            variants={!isCurrent ? notActiveClueVariant : undefined}
            className={cn(
                'col-start-1 col-end-1 row-start-1 row-end-1 flex w-full flex-row items-center gap-2 self-center overflow-x-hidden',
                isCurrent ? 'z-10 justify-self-center' : '-z-10 w-64',
                isPrevious && 'justify-self-start',
                isNext && 'justify-self-end text-right',
                totalClueLength > 1 && 'cursor-grab'
            )}
        >
            {isCurrent && (
                <button
                    onClick={onClickPrevious}
                    className={cn(
                        index > 0 ? 'visible' : 'invisible',
                        'transition-colors hover:text-slate-500'
                    )}
                >
                    <Arrow direction="left" />
                </button>
            )}
            <div
                className={cn(
                    'grow bg-slate-900 p-4 text-white',
                    (isNext || isPrevious) && 'truncate'
                )}
            >
                <span className={'font-bold'}>Clue #{index + 1}: </span>
                {clue}.
            </div>
            {isCurrent && (
                <button
                    onClick={onClickNext}
                    className={cn(
                        index < totalClueLength - 1 ? 'visible' : 'invisible',
                        'transition-colors hover:text-slate-500'
                    )}
                >
                    <Arrow direction="right" />
                </button>
            )}
        </motion.div>
    );
};

export default Clue;
