import './CanceledButtonStyle.css';

export const CanceledButton = () => {
    return (
        <button className="button-cancel">
            <span className="X"></span>
            <span className="Y"></span>
            <div className="Cancelar">Close</div>
        </button>
    )
}