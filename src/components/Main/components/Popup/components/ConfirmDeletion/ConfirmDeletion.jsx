import { useContext } from 'react';
import LoadingContext from '../../../../../../contexts/LoadingContext';

function ConfirmDeletion({ onConfirm }) {
  const isExcluding = useContext(LoadingContext);

  return (
    <button
      type='submit'
      className={`form__submit-button ${
        isExcluding ? 'form__submit-button-inactive' : ''
      }`}
      onClick={onConfirm}
      disabled={isExcluding}
    >
      {`${isExcluding ? 'Excluindo...' : `Sim`}`}
    </button>
  );
}

export default ConfirmDeletion;
