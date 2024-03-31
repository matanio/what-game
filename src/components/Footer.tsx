import Container from './Container.tsx';

export default function Footer() {
    return (
        <footer className=" bg-slate-300 py-8">
            <Container>
                <div className="flex justify-center">
                    <p className="text-sm">
                        🚀 by{' '}
                        <a
                            target="_blank"
                            className="font-bold text-slate-700 underline-offset-4 hover:underline"
                            href="https://github.com/matanio"
                        >
                            @matanio
                        </a>
                        .
                    </p>
                </div>
            </Container>
        </footer>
    );
}
