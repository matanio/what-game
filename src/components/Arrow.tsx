interface ArrowProps {
    direction: 'left' | 'right';
}

/**
 * Arrow / Chevron icon
 *
 * @param direction
 * @constructor
 */
const Arrow = ({ direction }: ArrowProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                    direction === 'left'
                        ? 'M15.75 19.5 8.25 12l7.5-7.5'
                        : 'm8.25 4.5 7.5 7.5-7.5 7.5'
                }
            />
        </svg>
    );
};

export default Arrow;
