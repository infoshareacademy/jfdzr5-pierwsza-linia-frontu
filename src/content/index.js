import {Routes, Route} from 'react-router-dom';
import {Home} from './home';

export const Content = () => (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
);
