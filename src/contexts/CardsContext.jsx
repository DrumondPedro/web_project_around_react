import { createContext, useEffect, useState } from 'react';

import client from '../utils/api';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);

  async function handleCardCreation(newCardData) {
    try {
      const newCard = await client.addNewCard(newCardData, '/cards');
      setCards([newCard, ...cards]);
    } catch (err) {
      console.log(`${err} - Erro no POST /cards`);
    }
  }

  async function handleCardDelete(selectedCardId) {
    try {
      await client.deleteCard(selectedCardId, '/cards');
      setCards(cards.filter((card) => card._id !== selectedCardId));
    } catch (err) {
      console.log(`${err} - Erro no DELETE /cards`);
    }
  }

  async function handleCardLike(id, path, executor) {
    try {
      const cardLiked = await client.like(id, path);
      executor(cardLiked);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCardDisike(id, path, executor) {
    try {
      const cardDesliked = await client.dislike(id, path);
      executor(cardDesliked);
    } catch (err) {
      console.log(err);
    }
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
    <CardsContext.Provider
      value={{
        cards,
        handleCardCreation,
        handleCardDelete,
        handleCardLike,
        handleCardDisike,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
