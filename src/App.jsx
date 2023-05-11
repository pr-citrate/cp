import { Route, Routes } from 'react-router-dom';
import Test from './pages/Test';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  );
}

export default App;
