import './Dashboard.css';

function MainPage() {
    return (
        <div className="dashboard">
            <main>
                <div className="dashboard-tiles">
                    <div className="dashboard-tiles-item">
                        <h2>Zadania</h2>
                        <hr />
                        <p>53</p>
                    </div>
                    <div className="dashboard-tiles-item">
                        <h2>Wydarzenia</h2>
                        <hr />
                        <p>25</p>
                    </div>
                    <div className="dashboard-tiles-item">
                        <h2>Użytkownicy</h2>
                        <hr />
                        <p>22</p>
                    </div>
                    <div className="dashboard-tiles-item">
                        <h2>Wyświetlenia</h2>
                        <hr />
                        <p>1523</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
