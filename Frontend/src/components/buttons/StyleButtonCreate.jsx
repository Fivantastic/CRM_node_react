export const StyleButtonCreate = ({StyleButton, onClick}) => {
  return (
    <button id={StyleButton.idBtn || ''} className='mainCreateBtn' onClick={onClick}>
        <img id={StyleButton.idImgBtn || ''} src={StyleButton.srcImgBtn} alt={StyleButton.altImgBtn} />
      </button>
  )
}
