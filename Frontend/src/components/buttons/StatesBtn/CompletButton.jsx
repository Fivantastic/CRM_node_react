import './CompletButton.css';

export const CompletButton = ({ onClick }) => {
    return (
        <button id="completBtn" className="completBtn" onClick={onClick}>
            <img id="iconComplet" className="iconComplet" src="/changeStat.svg" alt="Boton de ver mas" />
        </button>
    )

}