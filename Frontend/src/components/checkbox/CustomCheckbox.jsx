import './CustomCheckbox.css';

export function CustomCheckbox({ field, register }) {
  return (
    <div className="checkbox-wrapper">
      <input type="checkbox" className="check" id={field.idInput} {...register(field.name)} />
      <label htmlFor={field.idInput} className="label">
        <svg width="32" height="32" viewBox="0 0 95 95">
          <rect x="30" y="20" width="50" height="50" stroke="#13214E" fill="none"></rect>
          <g transform="translate(0,-952.36222)">
            <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="#13214E" strokeWidth="3" fill="none" className="path1"></path>
          </g>
        </svg>
        <span>{field.label}</span>
      </label>
    </div>
  );
}
