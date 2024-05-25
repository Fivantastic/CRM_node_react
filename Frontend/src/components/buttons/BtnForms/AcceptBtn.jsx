import { EditButtonSvg } from '../EditButton.jsx';
import './AcceptBtn.css';
import './UpdateBtn.css';

export const AcceptBtn = ({ disabled, StyleAcceptBtn, onClick, buttonText }) => {
  const { action } = StyleAcceptBtn;
  return (
    <>
      {action === 'update' ? (
        <button
          type="button"
          id={StyleAcceptBtn.idAcceptBtn}
          className="button__acceptUpdate"
          onClick={onClick}
          disabled={disabled}
        >
          <span className="button__textUpdate">{buttonText}</span>
          <span className="button__iconUpdate">
            <EditButtonSvg />
          </span>
        </button>
      ) : (
        <button
          type="button"
          id={StyleAcceptBtn.idAcceptBtn}
          className="button__accept"
          onClick={onClick}
          disabled={disabled}
        >
          <span className="button__text">{buttonText}</span>
          <span className="button__icon">
            <img src={StyleAcceptBtn.btnSvg} alt={StyleAcceptBtn.altAcceptBtn} />
          </span>
        </button>
      )}
    </>
  );
};
