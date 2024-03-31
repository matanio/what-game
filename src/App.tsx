import Header from './components/Header.tsx';
import StartScreen from './components/StartScreen.tsx';
import Footer from './components/Footer.tsx';

function App() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                {/* Main Space */}
                <main className="grow">
                    {/*<Game />*/}
                    <StartScreen />
                    {/*<Container>*/}
                    {/*</Container>*/}
                </main>

                <div className="justify-self-end">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;
