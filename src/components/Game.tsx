import { useState } from 'react';
import GuessAttempt from './GuessAttempt.tsx';
import Clue from './Clue.tsx';

const TOTAL_ATTEMPTS: number = 5;

export default function Game() {
    const [currentAttempt, setCurrentAttempt] = useState<number>(1);

    const handleCorrect = () => {
        console.log('correct guess at attempt ', currentAttempt);
        console.log('Game finished!');
    };

    const handleIncorrect = () => {
        console.log('incorrect guess at attempt ', currentAttempt);
        if (currentAttempt === TOTAL_ATTEMPTS) {
            console.log('Game over!');
            return;
        }
        setCurrentAttempt(currentAttempt + 1);
    };

    return (
        <section className="grid h-full w-full place-items-center p-4">
            <div className="flex h-full w-full max-w-2xl flex-col items-center justify-start gap-4 py-4">
                <div className="text-lg font-medium">Guess the word!</div>
                <Clue attempt={currentAttempt} />
                {[...Array(TOTAL_ATTEMPTS)].map((_, index) => (
                    <GuessAttempt
                        key={index}
                        showInput={index <= currentAttempt - 1}
                        onCorrect={handleCorrect}
                        onIncorrect={handleIncorrect}
                    />
                ))}
            </div>
        </section>
    );
}
