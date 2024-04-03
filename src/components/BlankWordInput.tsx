import { motion } from 'framer-motion';
import { item } from '../lib/animations.ts';

export default function BlankWordInput() {
    return (
        <motion.div
            variants={item}
            className="h-14 w-full rounded-lg bg-slate-100 px-4 py-2 text-center text-3xl font-bold uppercase tracking-[0.25em]"
        ></motion.div>
    );
}
