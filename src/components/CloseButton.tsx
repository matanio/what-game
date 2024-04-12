import { MouseEventHandler } from 'react';

interface CloseButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * A reusable close button with an X icon.
 *
 * @param onClick
 * @constructor
 */
export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            className="grid place-items-center p-1 text-slate-900"
            onClick={onClick}
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
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
}
