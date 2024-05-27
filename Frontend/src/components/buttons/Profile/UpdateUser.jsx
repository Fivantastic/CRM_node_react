import './UpdateUser.css'

export const UpdateUser = ({StyleButton, onClick}) => {
    const {imgProfile, altImgProfile, textProfile, classProfileText} = StyleButton
  return (
    <button id='updateUserProfile' className="updateUserBtnProfile" onClick={onClick}>
        <img id='imgUpdateUserProfile' className="imgUpdateUserProfile" src={imgProfile} alt={altImgProfile} />
        <p id='textUpdateUserProfile' className={classProfileText}>{textProfile}</p>
    </button>
  )
}
