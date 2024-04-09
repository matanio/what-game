import { LogoMotion } from './Logo.tsx';
import React from 'react';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';
import { formatDateAsMonthDayYear } from '../lib/util.ts';
import { useGameState } from '../lib/game.ts';

interface StartScreenProps {
    onStart: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    const { wordToday } = useGameState();

    return (
        <section className="flex h-full w-full items-center justify-center">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center justify-center gap-6 p-4"
            >
                <LogoMotion
                    variants={item}
                    className="h-12 w-12 text-slate-900"
                />
                <motion.h1
                    variants={item}
                    className="text-6xl font-extrabold text-slate-900"
                >
                    What?
                </motion.h1>
                <motion.p variants={item} className="text-2xl">
                    A game of deduction.
                </motion.p>
                <motion.button
                    variants={item}
                    onClick={onStart}
                    className="mt-8 rounded-md bg-slate-900 px-10 py-2 text-xl text-white transition-colors hover:bg-slate-600"
                >
                    Start
                </motion.button>
                <motion.div
                    variants={item}
                    className="flex flex-col items-center justify-center gap-1"
                >
                    <p className="font-medium">
                        {formatDateAsMonthDayYear(new Date(wordToday!.date))}
                    </p>
                    <p className="text-sm">By {wordToday!.author}</p>
                </motion.div>
            </motion.div>
        </section>
    );
}
