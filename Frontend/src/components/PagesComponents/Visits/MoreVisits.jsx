import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";

export const MoreVisits = ({ visit }) => {

    const fechaNormal = getNormalizedDate(visit.visit_date);

    const moreInfoFields = [
        { name: 'ref_CT', label: 'Ref', value: visit.ref_VT },
        { name: 'Nombre', label: 'Nombre', value: visit.customer_name },
        {
          name: 'Fecha de la visita',
          label: 'Fecha de la visita',
          value: fechaNormal.toLocaleDateString(),
        },
    
        { name: 'Observacines', label: 'Observacines', value: visit.observations },
        {
          label: 'Valoración de la visita',
          value: visit.rating_visit,
        },
        { name: 'Comentarios', label: 'Comentarios', value: visit.rating_comment },

        { name: 'Estado', label: 'Estado', value: visit.visit_status },
      ];
    return (
        <MoreInfo fields={moreInfoFields} modalIds={[]}/>
    )
}
