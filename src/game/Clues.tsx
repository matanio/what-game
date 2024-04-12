import { useEffect, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { fadeIn } from '../lib/animations.ts';
import Clue from './Clue.tsx';

interface CluesProps {
    clues: string[];
}

/**
 * Displays a list of clues with a swipe-able interface.
 *
 * @param clues
 * @constructor
 */
export default function Clues({ clues }: CluesProps) {
    const [currentClueIndex, setCurrentClueIndex] = useState<number>(0);

    // Set the current clue index to the last clue when the clues are loaded
    useEffect(() => {
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
        <motion.div className="w-full" variants={fadeIn}>
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
