// Styled Button Component for use throughout the application

export default function StyledButton({
  onClick,
  disabled,
  submit,
  button,
  reset,
  primaryColor,
  secondaryColor,
  outlined,
  children,
}) {
  // Set the button style based on the props
  let buttonStyle = "";

  if (primaryColor) {
    buttonStyle =
      "bg-black hover:bg-darkgray text-white py-2 px-4 rounded uppercase w-max";
  } else if (secondaryColor) {
    buttonStyle =
      "bg-gold hover:bg-white text-black py-2 px-4 rounded uppercase w-max";
  } else if (outlined) {
    buttonStyle =
      "bg-transparent mb-5 hover:border-darkgray hover:text-darkgray text-black py-2 px-3 md:px-4 rounded-2xl uppercase w-max border-2 border-black text-sm md:text-md";
  }

  // Set the button type based on the props
  let buttonType = "";

  if (submit) {
    buttonType = "submit";
  } else if (button) {
    buttonType = "button";
  } else if (reset) {
    buttonType = "reset";
  }

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type={buttonType}
    >
      {children}
    </button>
  );
}
