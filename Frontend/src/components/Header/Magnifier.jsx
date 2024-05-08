import './Magnifier.css';

export const Magnifier = () => {
    return (
        <div className="container-lupa">
            <input type="text" name="text" className="input-lupa" required="" placeholder="Buscar..." />
            <div className="icon-lupa">
                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                    <title>Buscar</title>
                    <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"></path>
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
                </svg>
            </div>
        </div>
    )
}