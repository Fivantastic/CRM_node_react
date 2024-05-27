import './UpdateUser.css'

export const UpdateUser = ({onClick, img , altImg, text}) => {
  return (
    <button id='updateUserProfile' className="updateUserBtnProfile" onClick={onClick}>
        <img id='imgUpdateUserProfile' className="imgUpdateUserProfile" src={img} alt={altImg} />
        <p id='textUpdateUserProfile' className="textUpdateUserProfile">{text}</p>
    </button>
  )
}
