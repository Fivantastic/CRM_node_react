import "./BtnLogout.css";

export default function LogoutButton() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="logoutIcon" // Clase para identificar el SVG
    >
      <path
        className="arrow" // Clase para identificar la flecha
        d="M15 3H7a2 2 0 00-2 2v14a2 2 0 002 2h8M19 12l-4-4m4 4l-4 4m4-4H9"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
