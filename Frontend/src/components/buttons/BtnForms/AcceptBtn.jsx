import './AcceptBtn.css';

export const AcceptBtn = ({ onClick, btnSvg, textAcceptBtn }) => {
  return (
        <button type="button" className="button__accept" onClick={onClick}>
            <span className="button__text">{textAcceptBtn}</span>
            <span className="button__icon">{btnSvg}</span>
        </button>
  )
}
