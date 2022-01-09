import './MainPage.css';
import { FaMoneyCheckAlt, FaPaste, FaBell, FaChartPie } from 'react-icons/fa';

function MainPage() {
    return (
        <div className="mainpage">
            <main>
                <div className="mainpage-tiles">
                    <div className="mainpage-tiles-item">
                        <FaPaste className='mainpage-icon' />
                        <h2>Lista zadań</h2>
                        <hr />
                        <p>Przeglądaj zadania do wykonania, dodaj nowe lub edytuj już istniejące.</p>
                    </div>
                    <div className="mainpage-tiles-item">
                        <FaMoneyCheckAlt className='mainpage-icon' />
                        <h2>Budżet domowy</h2>
                        <hr />
                        <p>Zarządzaj domowym budżetem, wprowadź wpływy i wydatki, analizuj strukturę wydatków.</p>
                    </div>
                    <div className="mainpage-tiles-item">
                        <FaBell className='mainpage-icon' />
                        <h2>Wydarzenia</h2>
                        <hr />
                        <p>Dodaj daty, rocznice i terminy, o których już nigdy nie zapomnisz.</p>
                    </div>
                    <div className="mainpage-tiles-item">
                        <FaChartPie className='mainpage-icon' />
                        <h2>Dashboard</h2>
                        <hr />
                        <p>Sprawdź dane i zasoby aplikacji.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainPage;
