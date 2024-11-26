import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import client from '../../utils/api';

function App() {
  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main client={client}></Main>
          <Footer />
        </div>
        {/* <PopupWithForm
          // name={`confirmer`}
          onClose={closeAllPopups}
          title={`Tem certeza?`}
          buttonText={`Sim`}
          isOpen={isDeletePlacePopupOpen}
          isSaving={isSavingPopupData}
          isActive={true}
          handleApiRequest={handleDeleteCard}
        ></PopupWithForm> */}
      </div>
    </>
  );
}

export default App;
