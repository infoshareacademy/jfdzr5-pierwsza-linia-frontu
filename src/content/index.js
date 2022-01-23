import {Routes, Route} from 'react-router-dom';
import {Home} from './home';
import {Signup} from './signup';


export const Content = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        
    </Routes>
);
