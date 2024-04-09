import { useEffect, useState } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
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
                            totalClueLength={clues.length}
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
    showArrow: boolean;
    totalClueLength: number;
}

const Clue = ({
    onDragEnd,
    index,
    clue,
    currentDisplayIndex,
    totalClueLength,
}: ClueProps) => {
    const isCurrent = currentDisplayIndex === index;
    const isPrevious = index < currentDisplayIndex;
    const isNext = index > currentDisplayIndex;

    const dragX = useMotionValue(0);

    const [isLeftArrowVisible, setLeftArrowVisible] = useState<boolean>(false);
    const [isRightArrowVisible, setRightArrowVisible] =
        useState<boolean>(false);

    const animateProps = isCurrent
        ? { x: 0, scale: 1, opacity: 1 }
        : {
              x: isPrevious ? '8%' : '-8%',
              scale: 0.95,
              opacity: 0.2,
          };

    const handleDragStart = (
        _e: MouseEvent | TouchEvent | PointerEvent,
        { offset }: PanInfo
    ) => {
        if (offset.x > 0) {
            setRightArrowVisible(false);
            setLeftArrowVisible(true);
        } else {
            setLeftArrowVisible(false);
            setRightArrowVisible(true);
        }
    };

    const handleDragEnd = (
        e: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        setRightArrowVisible(false);
        setLeftArrowVisible(false);
        onDragEnd(e, info);
    };

    return (
        <motion.div
            drag={isCurrent ? 'x' : undefined}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_e, { point }) => {
                dragX.set(point.x);
            }}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            initial={{
                x: isPrevious ? '8%' : '-8%',
                scale: 0.95,
                opacity: 0,
            }}
            animate={animateProps}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
                'col-start-1 col-end-1 row-start-1 row-end-1 flex w-full flex-row items-center gap-2 self-center overflow-x-hidden',
                isCurrent
                    ? 'z-10 cursor-grab justify-self-center'
                    : '-z-10 w-64 text-ellipsis',
                isPrevious && 'justify-self-start ',
                isNext && 'justify-self-end text-ellipsis text-right'
            )}
        >
            {isCurrent && (
                <motion.div
                    animate={{
                        opacity: isLeftArrowVisible && index > 0 ? 1 : 0,
                        scale: isLeftArrowVisible ? 1 : 0,
                    }}
                >
                    <LeftArrow />
                </motion.div>
            )}
            <div className="grow bg-slate-900 p-4 text-white ">
                <span className={'font-bold'}>Clue #{index + 1}: </span>
                {clue}.
            </div>
            {isCurrent && (
                <motion.div
                    animate={{
                        opacity:
                            isRightArrowVisible && index < totalClueLength - 1
                                ? 1
                                : 0,
                        scale: isRightArrowVisible ? 1 : 0,
                    }}
                >
                    <RightArrow />
                </motion.div>
            )}
        </motion.div>
    );
};

const LeftArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );
};

const RightArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
};
