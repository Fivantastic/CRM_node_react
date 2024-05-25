import './CancelBtn.css';

export const CancelBtn = () => {
  return (
    <button type="button" className="button__cancel">
        <span className="button__text__cancel">Cancelar</span>
        <span className="button__icon__cancel"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></span>
    </button>
  )
}