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
      "bg-black hover:opacity-80 tracking-widest text-white py-2 px-6 rounded-tr-3xl rounded-bl-3xl rounded-tl rounded-br uppercase w-max transition-all duration-300 ease-in-out";
  } else if (secondaryColor) {
    buttonStyle =
      "bg-gold hover:bg-white text-black py-3 px-6 tracking-widest rounded-tr-3xl rounded-bl-3xl rounded-tl rounded-br uppercase w-max transition-all duration-300 ease-in-out";
  } else if (outlined) {
    buttonStyle =
      "bg-transparent tracking-widest mb-5 hover:border-darkgray hover:underline text-black py-2 px-3 md:px-4 rounded-tr-3xl rounded-bl-3xl rounded-tl rounded-br uppercase w-max border-2 border-black text-sm md:text-md transition-all duration-300 ease-in-out";
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
