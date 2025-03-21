import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';

function App() {
  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
