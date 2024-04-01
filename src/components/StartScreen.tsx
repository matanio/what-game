import { LogoMotion } from './Logo.tsx';
import React from 'react';
import { motion } from 'framer-motion';
import { container, item } from '../lib/animations.ts';

interface StartScreenProps {
    onStart: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    const todaysDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

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
                {/* WordToday's date */}
                <motion.div variants={item} className="font-medium">
                    {todaysDate}
                </motion.div>
            </motion.div>
        </section>
    );
}
