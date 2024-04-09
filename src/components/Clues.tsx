import { useEffect, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '../lib/util.ts';
import { item } from '../lib/animations.ts';

interface CluesProps {
    clues: string[];
}

export default function Clues({ clues }: CluesProps) {
    const [currentClueIndex, setCurrentClueIndex] = useState<number>(0);

    useEffect(() => {
        console.log(clues);
        if (!clues) return;
        setCurrentClueIndex(clues.length - 1);
    }, [clues]);

    const nextClue = () => {
        if (currentClueIndex < clues.length - 1) {
            setCurrentClueIndex(currentClueIndex + 1);
        }
    };

    const previousClue = () => {
        if (currentClueIndex > 0) {
            setCurrentClueIndex(currentClueIndex - 1);
        }
    };

    const onDragEnd = (
        _e: MouseEvent | TouchEvent | PointerEvent,
        { offset, velocity }: PanInfo
    ) => {
        if (Math.abs(offset.x) > 300 || Math.abs(velocity.x) > 200) {
            const direction = offset.x > 0 ? 1 : -1;
            if (direction === 1) {
                previousClue();
            } else {
                nextClue();
            }
        }
    };

    return (
        <motion.div className="w-full" variants={item}>
            <div className="grid w-full">
                {clues.map((clue, index) => {
                    if (
                        index < currentClueIndex - 1 ||
                        index > currentClueIndex + 1
                    ) {
                        return null;
                    }

                    return (
                        <Clue
                            key={index}
                            clue={clue}
                            index={index}
                            onDragEnd={onDragEnd}
                            currentDisplayIndex={currentClueIndex}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
}

interface ClueProps {
    onDragEnd: (
        e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => void;
    index: number;
    currentDisplayIndex: number;
    clue: string;
}

const Clue = ({ onDragEnd, index, clue, currentDisplayIndex }: ClueProps) => {
    const isCurrent = currentDisplayIndex === index;
    const isPrevious = index < currentDisplayIndex;
    const isNext = index > currentDisplayIndex;

    const animateProps = isCurrent
        ? { x: 0, scale: 1, opacity: 1 }
        : {
              x: isPrevious ? '-5%' : '5%',
              scale: 0.95,
              opacity: 0.5,
          };

    return (
        <motion.div
            drag={isCurrent ? 'x' : undefined}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            initial={{
                x: isPrevious ? '-5%' : '5%',
                scale: 0.95,
                opacity: 0,
            }}
            animate={animateProps}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
                'col-start-1 col-end-1 row-start-1 row-end-1 w-full self-center overflow-x-hidden bg-slate-900 p-4 text-white shadow',
                isCurrent
                    ? 'z-10 cursor-grab justify-self-center'
                    : '-z-10 w-64 text-ellipsis opacity-50 shadow-xl',
                isPrevious && 'justify-self-start ',
                isNext && 'justify-self-end text-ellipsis text-right'
            )}
        >
            <span className={'font-bold'}>Clue #{index + 1}: </span>
            {clue}.
        </motion.div>
    );
};
