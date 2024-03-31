import { getClue } from '../lib/game.ts';
import { useEffect, useState } from 'react';

interface ClueProps {
    attempt: number;
}

export default function Clue({ attempt }: ClueProps) {
    const [clue, setClue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const newClue = getClue(attempt);
            setClue(newClue);
            setError(null);
        } catch (error) {
            setError(`Hmm. Looks like there aren't any clues for this one.`);
        }
    }, [attempt]);

    return (
        <div className="w-full self-start bg-slate-900 p-4 shadow">
            {error && <span className="font-bold text-red-400">{error}</span>}
            {!error && (
                <div className="text-white">
                    <span className="font-bold">Clue #{attempt}: </span> {clue}.
                </div>
            )}
        </div>
    );
}
