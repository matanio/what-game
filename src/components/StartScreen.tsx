export default function StartScreen() {
    return (
        <section className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 p-4">
                <h1 className="text-6xl font-extrabold">What?</h1>
                <p className="text-2xl">A game of deduction.</p>
                <button className="mt-8 rounded-md bg-slate-900 px-10 py-2 text-xl text-white">
                    Start
                </button>
                <div className="font-medium">March 31, 2024</div>
            </div>
        </section>
    );
}
