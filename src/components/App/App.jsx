import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <ProtectedRoute publicRoute>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path='/signin'
              element={
                <ProtectedRoute publicRoute>
                  <Signin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
