import './CancelButton.css';

export const CancelButton = ({ onClick }) => {
    return (
        <button id="cancelBtn" className="cancelBtn" onClick={onClick}>
            <img id="iconCancel" className="iconCancel" src="/cancel.svg" alt="Boton de cancelar" />
        </button>
    )
}