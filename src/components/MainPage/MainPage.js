function mainPage(props) {
    return (
        <div className="App">
            <main>
                <div className="App-tiles">
                    <div className="App-tiles-item">
                        <p className="icon-paste"></p>
                        <h2>Lista zadań</h2>
                        <hr />
                        <p>Przeglądaj zadania do wykonania, dodaj nowe lub edytuj już istniejące.</p>
                    </div>
                    <div className="App-tiles-item">
                        <p className="icon-money"></p>
                        <h2>Budżet domowy</h2>
                        <hr />
                        <p>Zarządzaj domowym budżetem, wprowadź wpływy i wydatki, analizuj strukturę wydatków.</p>
                    </div>
                    <div className="App-tiles-item">
                        <p className="icon-bell-alt"></p>
                        <h2>Wydarzenia</h2>
                        <hr />
                        <p>Dodaj daty, rocznice i terminy, o których już nigdy nie zapomnisz.</p>
                    </div>
                    <div className="App-tiles-item">
                        <p className="icon-chart-pie"></p>
                        <h2>Dashboard</h2>
                        <hr />
                        <p>Sprawdź dane i zasoby aplikacji.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default mainPage;
