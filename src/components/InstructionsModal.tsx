import { ModalProps } from '../lib/util.ts';
import CloseButton from './CloseButton.tsx';
import { AnimatePresence, motion } from 'framer-motion';

interface InstructionsModalProps {
    totalNumberOfAttempts: number;
}

export default function InstructionsModal({
    totalNumberOfAttempts,
    showModal,
    onClose,
}: InstructionsModalProps & ModalProps) {
    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-50 flex h-full w-full items-start justify-center bg-white bg-opacity-90"
                >
                    <motion.div
                        initial={{ y: '10%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '10%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="m-4 flex max-w-xl flex-col gap-4 rounded-lg bg-white p-8 shadow-xl sm:mt-28"
                    >
                        <div className="flex flex-row justify-between">
                            <h2 className="text-2xl font-semibold">
                                How to Play
                            </h2>
                            <CloseButton onClick={onClose} />
                        </div>
                        <h3 className="text-xl font-light">
                            Guess the word based on the provided clue in{' '}
                            <span className="font-bold">
                                {totalNumberOfAttempts}{' '}
                            </span>
                            tries.
                        </h3>
                        <ul className="ms-8 list-outside list-disc ">
                            <li className="list-item">
                                Type in a word and click{' '}
                                <span className="font-bold">'Submit'</span> to
                                see if you correctly guessed the word.
                            </li>
                            <li className="list-item">
                                You will receive a clue for each attempt, where
                                each clue is easier than the previous.
                            </li>
                        </ul>
                        <p>A new word is released daily at midnight.</p>
                        <hr className="my-4" />
                        {/* Let me know on linked in */}
                        <div className="text-center font-light">
                            <p>
                                Got some thoughts? Let me know on{' '}
                                <a
                                    href="https://www.linkedin.com/in/matan-yosef-59970b219/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-semibold text-amber-500 underline-offset-4 hover:underline"
                                >
                                    LinkedIn
                                </a>
                                .
                            </p>
                            <p className="mt-1.5">❤️</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
