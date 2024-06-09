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
        scale: 0.9,
        x: isPrevious ? -12.2 : 12.2,
        opacity: 0.035,
        transition: {
            duration: 0.1,
            ease: 'easeIn',
        },
    }),
    hidden: {
        opacity: 0,
    },
};

export const previousWordsContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const galleryCard: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};
