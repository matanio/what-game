export default function Game() {
    return (
        <div className="flex h-full w-full flex-col items-center">
            {/* Clue */}
            <div>
                <h2>Clue</h2>
                <p>What is the capital of France?</p>
            </div>
            {/* Input Answer */}
            <div>
                <input className="border-2 border-red-300" type="text" />
                <button>Submit</button>
            </div>
        </div>
    );
}
