// Styled Button Component for use throughout the application


export default function StyledButton({
  onClick,
  disabled,
  submit,
  button,
  reset,
  displayText,
  primaryColor,
  secondaryColor,
}) {
  // Set the button style based on the props
  let buttonStyle = "";

  if (primaryColor) {
    buttonStyle = "bg-black hover:bg-darkgray text-white py-2 px-4 rounded";
  } else if (secondaryColor) {
    buttonStyle = "bg-gold hover:bg-white text-black py-2 px-4 rounded";
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
      {displayText}
    </button>
  );
}
