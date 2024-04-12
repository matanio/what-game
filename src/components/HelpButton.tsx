import { MouseEventHandler } from 'react';

interface HelpButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A reusable help button with a question mark icon.
 *
 * @param onClick
 * @constructor
 */
export default function HelpButton({ onClick }: HelpButtonProps) {
    return (
        <button
            onClick={onClick}
            className="group grid place-items-center rounded p-0.5 text-slate-900"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
            </svg>
        </button>
    );
}
