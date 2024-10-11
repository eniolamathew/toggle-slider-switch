import * as React from "react";

export interface ReactToggleSliderSwitchProps {
  /**
   * The checked state of the switch. If true, the switch is set to checked. If false, it is not checked.
   */
  checked: boolean;

  /**
   * Invoked when the user clicks or drags the switch.
   *
   * **checked** describes the presumed future state of the checked prop.
   *
   * **event** is a native MouseEvent when the handle is clicked or dragged, and a SyntheticEvent at all other times.
   *
   *  **id** is the ID prop of the switch.
   *
   * @param {boolean} checked
   * @param {Event} event
   * @param {string} [id]
   */
  onChange: (checked: boolean, event: Event, id?: string) => void;

  /**
   * When true, the switch will no longer be interactive and its colors will be greyed out.
   */
  disabled?: boolean;

  /**
   * The color of the switch when it is **not** checked. Accepts 3 or 6 digit hex colors, e.g., #888, #45abcd.
   *
   * Defaults to '#d1d5db'.
   */
  offColor?: string;

  /**
   * The color of the switch when it is checked. Accepts 3 or 6 digit hex colors, e.g., #080, #45abcd.
   *
   * Defaults to '#22c55e'.
   */
  onColor?: string;

  /**
   * The color of the handle of the switch when **not** checked. Accepts 3 or 6 digit hex colors, e.g., #fff, #45abcd.
   *
   * Defaults to '#fff'.
   */
  offHandleColor?: string;

  /**
   * The color of the handle of the switch when checked. Accepts 3 or 6 digit hex colors, e.g., #fff, #45abcd.
   *
   * Defaults to '#fff'.
   */
  onHandleColor?: string;

  /**
   * This specifies if the handle should have an outline or not.
   *
   * Defaults to undefined.
   */
  outline?: boolean;

  /**
   * The width of the handle, measured in pixels.
   *
   * Defaults to 35 pixels.
   */
  handleWidth?: number;

  /**
   * The label of the toggle switch.
   *
   * Defaults to undefined.
   */
  label?: string;

  /**
   * The position of the label if label is not undefined. Accepts "before" or "after".
   *
   * Defaults to 'after'.
   */
  labelPosition?: "before" | "after";

  /**
   * Custom styles for the label. Accepts any valid CSS properties as an object.
   * This can be used to style the label text, such as font size, color, etc.
   *
   * Defaults to undefined.
   */
  labelStyle?: React.CSSProperties;

  /**
   * The diameter of the handle, measured in pixels. By default, it will be slightly smaller than the height of the switch.
   *
   * Defaults to undefined.
   */
  handleDiameter?: number;

  /**
   * Icon to display on the handle while the switch is unchecked.
   *
   * Defaults to undefined.
   */
  uncheckedHandleIcon?: JSX.Element;

  /**
   * Icon to display on the handle while the switch is checked.
   *
   * Defaults to undefined.
   */
  checkedHandleIcon?: JSX.Element;

  /**
   * An icon that will be shown on the switch when it is **not** checked. Set to false to show no icon.
   *
   * Defaults to an unchecked icon.
   */
  uncheckedIcon?: boolean | JSX.Element;

  /**
   * An icon that will be shown on the switch when it is checked. Set to false to show no icon.
   *
   * Defaults to a checked icon.
   */
  checkedIcon?: boolean | JSX.Element;

  /**
   * The box-shadow of the handle of the switch.
   *
   * Defaults to undefined.
   */
  boxShadow?: string | null;

  /**
   * The box-shadow of the handle of the switch when it is active or focused. **Do not set this to null as it is important for accessibility.**
   *
   * Defaults to '0px 0px 2px 2px #3bf'.
   */
  activeBoxShadow?: string;

  /**
   * The height of the background of the switch, measured in pixels.
   *
   * Defaults to 28 pixels.
   */
  height?: number;

  /**
   * The width of the background of the switch, measured in pixels.
   *
   * Defaults to 70 pixels.
   */
  width?: number;

  /**
   * Border radius of the switch _and_ the handle.
   *
   * Defaults to undefined.
   */
  borderRadius?: number;

  /**
   * The className of the outer shell of the switch.
   *
   * Defaults to undefined.
   */
  className?: string;

  /**
   * The ID of the embedded checkbox.
   *
   * Defaults to undefined.
   */
  id?: string;

  /**
   * Custom className for the switch background, allowing developers to easily apply custom styles.
   *
   * Defaults to '' (empty string).
   */
  switchBgClassName?: string;

  /**
   * Custom className for the switch handle, allowing developers to easily apply custom styles.
   *
   * Defaults to '' (empty string).
   */
  switchHandleClassName?: string;

  /**
   * Custom className for the checked icon, allowing developers to apply custom styles.
   *
   * Defaults to '' (empty string).
   */
  checkedIconClassName?: string;

  /**
   * Custom className for the unchecked icon, allowing developers to apply custom styles.
   *
   * Defaults to '' (empty string).
   */
  uncheckedIconClassName?: string;

  /**
   * Custom styles for the checked icon.
   *
   * Defaults to undefined.
   */
  checkedIconStyle?: React.CSSProperties;

  /**
   * Custom styles for the unchecked icon.
   *
   * Defaults to undefined.
   */
  uncheckedIconStyle?: React.CSSProperties;
}

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

type htmlInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type excludedHTMLInputProps =
  | "onFocus"
  | "onBlur"
  | "onKeyUp"
  | "onChange"
  | "ref"
  | keyof ReactToggleSliderSwitchProps;

type allowedHTMLinputProps = Omit<htmlInputProps, excludedHTMLInputProps>;

declare const ReactToggleSliderSwitch: React.FC<  ReactToggleSliderSwitchProps & allowedHTMLinputProps>;

export default ReactToggleSliderSwitch;