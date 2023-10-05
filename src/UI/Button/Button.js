import "./Button.css";
import { ButtonTypes } from "./ButtonTypes";

function Button(props) {
  const { type, btnText, disabled, onClick } = props;

  const getButtonClass = () => {
    switch (type) {
      case ButtonTypes.PRIMARY:
        return "primaryBtn button";

      case ButtonTypes.Modal:
        return "modalBtn button";

      case ButtonTypes.SECONDARY:
        return "secondaryBtn";

      case ButtonTypes.TERTIARY:
        return "tertiaryBtn";

      case ButtonTypes.FOLLOW:
        return "followBtn";

      case ButtonTypes.POST:
        return "postBtn";

      case ButtonTypes.DISABLED:
        return "disabled";

      default:
        return "primaryBtn";
    }
  };

  return (
    <button
      disabled={disabled}
      type={type === ButtonTypes.DISABLED ? "button" : "submit"}
      onClick={onClick}
      className={getButtonClass()}
    >
      {btnText}
    </button>
  );
}

export default Button;
