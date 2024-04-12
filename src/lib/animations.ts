import { Variants } from 'framer-motion';

export const mainContainer: Variants = {
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

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export const moveUp: Variants = {
    hidden: { y: '10%' },
    show: {
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};

export const notActiveClueVariant: Variants = {
    show: isPrevious => ({
        x: isPrevious ? '8%' : '-8%',
        scale: 0.95,
        opacity: 0.1,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
    }),
    hidden: isPrevious => ({
        x: isPrevious ? '8%' : '-8%',
        scale: 0.95,
        opacity: 0,
    }),
};

export const activeClueVariant: Variants = {
    show: {
        x: 0,
        scale: 1,
        opacity: 1,
    },
    hidden: {
        x: '-8%',
        scale: 0.95,
        opacity: 0,
    },
};
