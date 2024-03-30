import Container from './components/Container.tsx';
import Header from './components/Header.tsx';

function App() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                <Container>
                    {/* Main Space */}
                    <main className="grow">
                        <div className="flex h-full items-center justify-center">
                            <h1 className="text-4xl font-bold">Hello World!</h1>
                        </div>
                    </main>

                    {/*<div className="justify-self-end">*/}
                    {/*    <MarketingFooter />*/}
                    {/*</div>*/}
                </Container>
            </div>
        </>
    );
}

export default App;
