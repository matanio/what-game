import Logo from './Logo.tsx';
import React from 'react';

interface StartScreenProps {
    onStart: React.MouseEventHandler<HTMLButtonElement>;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <section className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 p-4">
                <Logo className="h-12 w-12 text-slate-900" />
                <h1 className="text-6xl font-extrabold text-slate-900">
                    What?
                </h1>
                <p className="text-2xl">A game of deduction.</p>
                <button
                    onClick={onStart}
                    className="mt-8 rounded-md bg-slate-900 px-10 py-2 text-xl text-white transition-colors hover:bg-slate-600"
                >
                    Start
                </button>
                {/* WordToday's date */}
                <div className="font-medium">March 31, 2024</div>
            </div>
        </section>
    );
}
