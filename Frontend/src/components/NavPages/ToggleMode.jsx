import './toggleMode.css';

export const ToggleMode = () => {
    return (
        <div className="checkbox-wrapper-35">
            <input value="private" name="mode" id="mode" type="checkbox" className="mode"/>
            <label className="modeLabel" htmlFor="mode">
                <span className="switch-x-text">Modo </span>

                <span className="switch-x-toggletext">
                <span className="switch-x-unchecked"><span className="switch-x-hiddenlabel">Unchecked: </span>Lista</span>
                <span className="switch-x-checked"><span className="switch-x-hiddenlabel">Checked: </span>Ventana</span>
                </span>
            </label>
        </div>
    )
}