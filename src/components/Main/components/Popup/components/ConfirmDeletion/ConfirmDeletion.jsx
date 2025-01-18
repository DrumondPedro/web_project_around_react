function ConfirmDeletion({ onConfirm, isExcluding }) {
  return (
    <button onClick={onConfirm} type='submit' className='form__submit-button '>
      {`${isExcluding ? 'Excluindo...' : `Sim`}`}
    </button>
  );
}

export default ConfirmDeletion;
