import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations.ts';

/**
 * Represents a word input that hasn't been used yet.
 *
 * @constructor
 */
export default function BlankWordInput() {
    return (
        <motion.div
            variants={fadeIn}
            className="h-14 w-full rounded-lg bg-slate-100 px-4 py-2 text-center text-3xl font-bold uppercase tracking-[0.25em]"
        ></motion.div>
    );
}
