import { AddCustomerSvg } from "../../assets/icons/AddButtons.jsx"

export const StyleButtonCreate = ({StyleButton, onClick}) => {
  return (
    <button id={StyleButton.idBtn || ''} className='mainCreateBtn' onClick={onClick}>
        <AddCustomerSvg color={'#000'} size={'28px'}  title={StyleButton.altImgBtn || 'Icono'} />
      </button>
  )
}
