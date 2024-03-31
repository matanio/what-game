import WordInput from './WordInput.tsx';
import { useState } from 'react';

const TOTAL_ATTEMPTS: number = 5;

export default function Game() {
    const [attempt, setAttempt] = useState<number>(1);

    const handleCorrect = () => {
        console.log('game finished!');
        setAttempt(attempt + 1);
    };

    const handleIncorrect = () => {
        console.log('incorrect guess!');
        if (attempt === TOTAL_ATTEMPTS) {
            console.log('game over!');
        } else {
            setAttempt(attempt + 1);
        }
    };

    return (
        <section className="grid h-full w-full place-items-center p-4">
            <div className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4">
                <div className="text-lg font-medium">Guess the word!</div>
                <div className="w-full self-start bg-slate-900 p-4 text-white shadow">
                    <span className="font-bold">Clue #1: </span>This is clue 1.
                </div>
                <WordInput
                    onCorrect={handleCorrect}
                    onIncorrect={handleIncorrect}
                />
            </div>
        </section>
    );
}
