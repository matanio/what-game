import { motion, MotionStyle, PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import { activeClueVariant, notActiveClueVariant } from '../lib/animations.ts';
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
 * @constructor
 */
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

    const [swipeOffset, setSwipeOffset] = useState<number>(0);
    const [arrowOpacity, setArrowOpacity] = useState<number>(0);
    const [arrowScale, setArrowScale] = useState<number>(0);

    useEffect(() => {
        // Arrow Scale
        const SCALE_DAMPENER = 400; // higher means slower to get to 1 scale
        const scaleVal = 0.4 + Math.abs(swipeOffset) / SCALE_DAMPENER;
        const scale = Math.min(scaleVal, 1);
        setArrowScale(scale);

        // Arrow Opacity
        const OPACITY_DAMPENER = 300; // higher means slower to get to 1 opacity
        const opacityVal = Math.abs(swipeOffset) / OPACITY_DAMPENER;
        const opacity = Math.min(opacityVal, 1);
        setArrowOpacity(opacity);
    }, [swipeOffset]);

    const [isLeftArrowVisible, setLeftArrowVisible] = useState<boolean>(false);
    const [isRightArrowVisible, setRightArrowVisible] =
        useState<boolean>(false);

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

    const leftArrowStyle: MotionStyle = {
        opacity: arrowOpacity,
        scale: arrowScale,
        visibility: isLeftArrowVisible && index > 0 ? 'visible' : 'hidden',
    };

    const rightArrowStyle: MotionStyle = {
        opacity: arrowOpacity,
        scale: arrowScale,
        visibility:
            isRightArrowVisible && index < totalClueLength - 1
                ? 'visible'
                : 'hidden',
    };

    return (
        <motion.div
            drag={isCurrent && totalClueLength > 1 ? 'x' : undefined}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_e, { offset }) => {
                setSwipeOffset(offset.x);
            }}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            initial="hide"
            animate="show"
            variants={isCurrent ? activeClueVariant : notActiveClueVariant}
            className={cn(
                'col-start-1 col-end-1 row-start-1 row-end-1 flex w-full flex-row items-center gap-2 self-center overflow-x-hidden',
                isCurrent ? 'z-10 justify-self-center' : '-z-10 w-64',
                isPrevious && 'justify-self-start',
                isNext && 'justify-self-end text-right',
                totalClueLength > 1 && 'cursor-grab'
            )}
        >
            {isCurrent && (
                <motion.div style={leftArrowStyle}>
                    <Arrow direction="left" />
                </motion.div>
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
                <motion.div style={rightArrowStyle}>
                    <Arrow direction="right" />
                </motion.div>
            )}
        </motion.div>
    );
};

export default Clue;
