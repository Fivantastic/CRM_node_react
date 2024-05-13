import { NavLink } from "react-router-dom";
import './NotFound404.css'

export const NotFoundPage = () => {
  return (
    <section className="error-section-404">
      <div className="error-container-404">
            <h1 className="error-title-404">404</h1>
            <p className="error-text-404">Oops! Hubo un error al encontrar la página <span className="animate-blink-404"><li className="error-link-404"><NavLink to="/">Vuelve al home ¡AQUI!</NavLink></li></span></p>
      </div>
    </section>
  )
}