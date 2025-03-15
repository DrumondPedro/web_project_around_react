import { useContext, useEffect, useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import client from '../../utils/api';

import { PopupContext } from '../../contexts/PopupContext';

function App() {
  const { handleClosePopup } = useContext(PopupContext);

  const [cards, setCards] = useState([]);

  function handleGalerryPopupSubimit(newCardData) {
    client
      .addNewCard(newCardData, '/cards')
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => {
        handleClosePopup();

        console.log(`${err} - Erro no POST /cards`);
      });
  }

  function handleCardDelete(selectedCardId) {
    client
      .deleteCard(selectedCardId, '/cards')
      .then(() => {
        setCards(cards.filter((card) => card._id !== selectedCardId));
        handleClosePopup();
      })
      .catch((err) => {
        handleClosePopup();

        console.log(`${err} - Erro no DELETE /cards`);
      });
  }

  function handleCardLike(id, path, executor) {
    client
      .like(id, path)
      .then((res) => {
        executor(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDisike(id, path, executor) {
    client
      .dislike(id, path)
      .then((res) => {
        executor(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    client
      .getInitialCards('/cards')
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Erro no GET /cards');
        setCards([]);
      });
  }, []);

  return (
    <>
      <div className='body'>
        <div className='page'>
          <Header />
          <Main
            // popup={popup}
            // onOpenPopup={handleOpenPopup}
            // onClosePopup={handleClosePopup}
            cards={cards}
            onAddPlaceSubmit={handleGalerryPopupSubimit}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDisike}
          ></Main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
