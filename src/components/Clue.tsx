import { getClue, NotFoundError } from '../lib/game.ts';
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
            if (error instanceof NotFoundError) {
                // TODO: handle error
                setError('No data available for today...');
                return;
            }
            setError((error as Error).message);
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
