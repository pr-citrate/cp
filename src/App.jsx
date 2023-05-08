import { Route, Routes } from 'react-router-dom';
import Test from './pages/Test';
import Index from './pages/Index';

function App() {
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route path='/' element={<Index />} />
    </Routes>
  );
}

export default App;
