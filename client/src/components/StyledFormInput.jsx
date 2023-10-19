// Form Input Components used in the project

export default function StyledFormInput({
  onChange,
  type,
  name,
  placeholder,
  required,
  id,
  minLength,
  maxLength,
  halfWidthStyle,
  fullWidthStyle,
  value,
}) {
  let inputStyle = "";

  if (halfWidthStyle) {
    inputStyle =
      "mb-5 w-1/2 rounded-lg px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-darkgray transition-all duration-500 ease-in-out";
  } else if (fullWidthStyle) {
    inputStyle =
      "mb-5 w-full rounded-lg px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-darkgray transition-all duration-500 ease-in-out";
  }

  return (
    <input
      className={inputStyle}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      id={id}
      minLength={minLength}
      maxLength={maxLength}
      value={value}
    />
  );
}
