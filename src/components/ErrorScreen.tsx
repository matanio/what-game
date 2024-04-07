import React, { useEffect, useState } from 'react';
import { NotFoundError } from '../lib/game.ts';

interface ErrorScreenProps {
    error: Error;
}

const notFoundErrorUI = (
    <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl font-extrabold text-slate-900">
            404 Not Found
        </h1>
        <p className="text-center text-slate-600">
            Hmm. It doesn't look like today's word has been set 😅
            <br />
            Apologies — please check back later!
        </p>
        <hr />
        <p>
            Want to submit a word? Get in touch on{' '}
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
    </div>
);

const defaultErrorUI = (
    <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-4xl font-extrabold text-slate-900">
            Uh oh... <br /> Something went wrong.
        </h1>
        <p className="text-slate-600">Please refresh the page to try again.</p>
    </div>
);

export default function ErrorScreen({ error }: ErrorScreenProps) {
    const [info, setInfo] = useState<React.JSX.Element | null>();

    useEffect(() => {
        switch (true) {
            case error instanceof NotFoundError:
                setInfo(notFoundErrorUI);
                break;
            default:
                setInfo(defaultErrorUI);
        }
    }, [error]);

    return (
        <div className="flex h-full w-full items-center justify-center">
            {info}
        </div>
    );
}
