import { motion } from 'framer-motion';
import { extendWidth } from '../lib/animations.ts';

export default function LoadingScreen() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                    variants={extendWidth}
                    initial="initial"
                    animate="animate"
                    className="absolute h-full bg-slate-900"
                ></motion.div>
            </div>
        </div>
    );
}
