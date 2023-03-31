import "./Button.css";
import { ButtonTypes } from "./ButtonTypes";

function Button(props) {
  const { type, btnText, disabled, onClick } = props;

  const getButtonClass = () => {
    switch (type) {
      case ButtonTypes.PRIMARY:
        return "primaryBtn  button";

      case ButtonTypes.SECONDARY:
        return "secondaryBtn";

      case ButtonTypes.TERTIARY:
        return "tertiaryBtn";

      case ButtonTypes.POST:
        return "postBtn";

      case ButtonTypes.DISABLED:
        return "disabled";

      default:
        return "primaryBtn";
    }
  };

  return (
    <div
      disabled={disabled}
      onClick={onClick}
      className={`${getButtonClass()}`}
    >
      {btnText}
    </div>
  );
}

export default Button;
