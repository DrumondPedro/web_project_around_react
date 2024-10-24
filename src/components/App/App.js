import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

function App() {
  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main>
            {/* {[1, 2, 3, 4, 5].map((num, i) => (
              <li key={i} style={{ color: 'white', height: 200, width: 200 }}>
                <p>{`Olá numero ${num}`}</p>
              </li>
            ))} */}
          </Main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
