import { useEffect, useState } from 'react';

interface ClueProps {
    attempt: number;
    clueText: string;
}

export default function Clue({ attempt, clueText }: ClueProps) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(!clueText ? `No clue available for attempt ${attempt}` : null);
    }, [attempt, clueText]);

    return (
        <div className="w-full self-start bg-slate-900 p-4 shadow">
            {error && <span className="font-bold text-red-400">{error}</span>}
            {!error && (
                <div className="text-white">
                    <span className="font-bold">Clue #{attempt}: </span>
                    {clueText}.
                </div>
            )}
        </div>
    );
}
