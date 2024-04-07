export default function LoadingScreen() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                <div className="absolute h-full animate-extendWidth bg-slate-900"></div>
            </div>
        </div>
    );
}
