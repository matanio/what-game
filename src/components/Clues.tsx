import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { item } from '../lib/animations.ts';

interface ClueProps {
    clues: string[];
}

export default function Clues({ clues }: ClueProps) {
    const [setCurrentClueIndex, setSetCurrentClueIndex] = useState<number>(0);

    useEffect(() => {
        console.log(clues);
        if (!clues) return;
        setSetCurrentClueIndex(clues.length - 1);
    }, [clues]);

    const nextClue = () => {
        if (setCurrentClueIndex < clues.length - 1) {
            setSetCurrentClueIndex(setCurrentClueIndex + 1);
        }
    };

    const previousClue = () => {
        if (setCurrentClueIndex > 0) {
            setSetCurrentClueIndex(setCurrentClueIndex - 1);
        }
    };

    return (
        <motion.div
            variants={item}
            className="w-full self-start bg-slate-900 p-4 shadow"
        >
            <button onClick={previousClue} disabled={setCurrentClueIndex === 0}>
                Previous
            </button>
            <div className="text-white">
                <span className="font-bold">
                    Clue #{setCurrentClueIndex + 1}:{' '}
                </span>
                {clues[setCurrentClueIndex]}.
            </div>
            <button
                onClick={nextClue}
                disabled={setCurrentClueIndex === clues.length - 1}
            >
                Next
            </button>
        </motion.div>
    );
}
