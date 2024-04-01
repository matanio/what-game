import { Variants } from 'framer-motion';

export const container: Variants = {
    hidden: { y: '2%', opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
            staggerChildren: 0.08,
        },
    },
};

export const item: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};
