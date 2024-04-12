import Logo from './Logo.tsx';

export default function Header() {
    return (
        <header className="grid place-content-center py-3 shadow">
            <div className="flex flex-row items-center justify-center gap-2">
                <div className="grid place-items-center">
                    <Logo className="text-slate-900" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">What?</h1>
            </div>
        </header>
    );
}
