import { GameResult, TOTAL_ATTEMPTS } from '../lib/game.ts';
import React from 'react';

// A visual representation of the score

export function ScoreGrid({ wasSolved, numberOfAttempts }: GameResult) {
    let gridItems: React.JSX.Element[];
    if (!wasSolved) {
        gridItems = Array.from({ length: TOTAL_ATTEMPTS + 1 }, (_, index) => {
            if (index === TOTAL_ATTEMPTS) {
                return (
                    <div key={index} className="text-6xl">
                        💩
                    </div>
                );
            }
            return (
                <div
                    key={index}
                    className="h-16 w-full rounded-xl bg-slate-200"
                ></div>
            );
        });
    } else {
        gridItems = Array.from({ length: numberOfAttempts }, (_, index) => {
            if (index === numberOfAttempts - 1) {
                return (
                    <div
                        key={index}
                        className="h-16 w-full rounded-xl bg-green-500"
                    ></div>
                );
            }
            return (
                <div
                    key={index}
                    className="h-16 w-full rounded-xl bg-slate-200"
                ></div>
            );
        });
    }
    return (
        <div className="flex w-full flex-col items-center gap-2">
            {gridItems}
        </div>
    );
}
