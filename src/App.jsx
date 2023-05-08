import { Route, Routes } from 'react-router-dom';
import Test from './pages/Test';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route path='/' element={<Landing />} />
    </Routes>
  );
}

export default App;
