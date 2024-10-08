import React, { useState, useEffect, useRef, useCallback, CSSProperties, ReactElement, ChangeEvent, 
  MouseEvent as ReactMouseEvent, 
  TouchEvent as ReactTouchEvent } from "react";
import getBackgroundColor from "./getBackgroundColor";
import PropTypes from "prop-types";
import { checkedIcon as defaultCheckedIcon, uncheckedIcon as defaultUncheckedIcon } from "./icons";
import hexColorPropType from "./hexColorPropType";

interface ReactToggleSliderSwitchProps {
  checked: boolean;
  onChange: (checked: boolean, event: Event, id?: string) => void;
  disabled?: boolean;
  offColor?: string;
  onColor?: string;
  offHandleColor?: string;
  onHandleColor?: string;
  handleDiameter?: number;
  handleWidth?: number;
  label?: string;
  labelPosition?: "before" | "after";
  uncheckedIcon?: boolean | ReactElement;
  checkedIcon?: boolean | ReactElement;
  boxShadow?: string | null;
  borderRadius?: number;
  activeBoxShadow?: string;
  uncheckedHandleIcon?: ReactElement;
  checkedHandleIcon?: ReactElement;
  labelStyle?: React.CSSProperties; 
  height?: number;
  width?: number;
  id?: string;
  className?: string;
  switchBgClassName?: string; 
  switchHandleClassName?: string; 
  checkedIconClassName?: string; 
  uncheckedIconClassName?: string;
  checkedIconStyle?: CSSProperties;
  uncheckedIconStyle?: CSSProperties; 
}

const ReactToggleSliderSwitch: React.FC<ReactToggleSliderSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  offColor = "#d1d5db",
  onColor = "#22c55e",
  offHandleColor = "#fff",
  onHandleColor = "#fff",
  handleDiameter,
  uncheckedIcon,
  checkedIcon,
  handleWidth = 35,
  labelPosition= 'after',
  label,
  labelStyle,
  checkedHandleIcon,
  uncheckedHandleIcon,
  boxShadow = undefined,
  activeBoxShadow = "0 0 2px 2px #3bf",
  height = 28,
  width = 70,
  borderRadius,
  id,
  className,
  switchBgClassName = '',
  switchHandleClassName = '',
  checkedIconClassName = '',
  uncheckedIconClassName = '',
  checkedIconStyle,
  uncheckedIconStyle,
  ...rest
}) => {
  // Derived positions
  const $handleWidth = Math.max(Math.min(handleWidth, 35), height - 4);
  const $handleDiameter = handleDiameter || height - 4;
  const $checkedPos = Math.max(width - $handleWidth - 2);
  const $uncheckedPos = 2;

  // State
  const [pos, setPos] = useState<number>(checked ? $checkedPos : $uncheckedPos);
  const [startX, setStartX] = useState<number | undefined>(undefined);
  const [hasOutline, setHasOutline] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartingTime, setDragStartingTime] = useState<number | undefined>(undefined);

  // Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMountedRef = useRef<boolean>(false);
  const lastDragAtRef = useRef<number>(0);
  const lastKeyUpAtRef = useRef<number>(0);


  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false };
  }, []);

  useEffect(() => {
    const newPos = checked ? $checkedPos : $uncheckedPos;
    setPos(newPos);
  }, [checked, $checkedPos, $uncheckedPos]);

  const onDragStart = useCallback((clientX: number) => {
    inputRef.current?.focus();
    setStartX(clientX);
    setHasOutline(true);
    setDragStartingTime(Date.now());
  }, []);

  const onDrag = useCallback(
    (clientX: number) => {
      if (startX === undefined) return;
      const mousePos = (checked ? $checkedPos : $uncheckedPos) + clientX - startX;

      if (!isDragging && clientX !== startX) { setIsDragging(true) }

      const newPos = Math.min($checkedPos, Math.max($uncheckedPos, mousePos));

      if (newPos !== pos) { setPos(newPos) }
    },
    [checked, $checkedPos, $uncheckedPos, isDragging, pos, startX]
  );

  const onDragStop = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const halfwayCheckpoint = ($checkedPos + $uncheckedPos) / 2;
  
      const prevPos = checked ? $checkedPos : $uncheckedPos;
      setPos(prevPos);
  
      const isDraggedHalfway = (checked && pos <= halfwayCheckpoint) || (!checked && pos >= halfwayCheckpoint);
  
      if (isDraggedHalfway) {
        onChange(!checked, event, id);
      }
  
      setIsDragging(false);
      setHasOutline(false);
      lastDragAtRef.current = Date.now();
    },
    [checked, $checkedPos, $uncheckedPos, isDragging, pos, onChange, id]
  );  

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      onDrag(event.clientX);
    },
    [onDrag]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      onDragStop(event);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    },
    [onDragStop, handleMouseMove]
  );

  const handleMouseDown = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault();
      if (typeof event.button === "number" && event.button !== 0) {
        return;
      }

      onDragStart(event.clientX);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [onDragStart, handleMouseMove, handleMouseUp]
  );

  const handleTouchStart = useCallback(
    (event: ReactTouchEvent) => { onDragStart(event.touches[0].clientX) }, [onDragStart]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => { onDrag(event.touches[0].clientX) }, [onDrag]
  );

  const handleTouchEnd = useCallback((event: ReactTouchEvent) => {
      event.preventDefault();
      onDragStop(event as unknown as MouseEvent | TouchEvent);
    }, [onDragStop]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (Date.now() - lastDragAtRef.current > 50) {
        onChange(!checked, event as unknown as MouseEvent | TouchEvent, id);
        if (Date.now() - lastKeyUpAtRef.current > 50) {
          setHasOutline(false);
        }
      }
    },
    [checked, onChange, id]
  );

  const handleKeyUp = useCallback(() => {
    lastKeyUpAtRef.current = Date.now();
  }, []);

  const handleSetHasOutline = useCallback(() => {
    setHasOutline(true);
  }, []);

  const handleUnsetHasOutline = useCallback(() => {
    setHasOutline(false);
  }, []);

  const handleClick = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault();
      inputRef.current?.focus();
      onChange(!checked, event as unknown as MouseEvent | TouchEvent, id);
      setHasOutline(false);
    },
    [checked, onChange, id]
  );

  // Styles
  const rootStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    opacity: disabled ? 0.5 : 1,
    direction: "ltr",
    borderRadius: height / 2,
    transition: "opacity 0.25s",
    touchAction: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    userSelect: "none",
  };

  const backgroundStyle: CSSProperties = {
    height,
    width,
    margin: Math.max(0, ($handleDiameter - height) / 2),
    position: "relative",
    background: getBackgroundColor(
      pos,
      $checkedPos,
      $uncheckedPos,
      offColor,
      onColor
    ),
    borderRadius: typeof borderRadius === "number" ? borderRadius : height / 2,
    cursor: disabled ? "default" : "pointer",
    transition: isDragging ? undefined : "background 0.25s",
  };

  const defaultCheckedIconStyle: CSSProperties = {
    height,
    width: Math.min( width / 2 , width - ($handleDiameter + height) / 2 + 1 ),
    position: "relative",
    opacity: (pos - $uncheckedPos) / ($checkedPos - $uncheckedPos),
    pointerEvents: "none",
    transition: isDragging ? undefined : "opacity 0.25s",
  };

  const defaultUncheckedIconStyle: CSSProperties = {
    height,
    width: Math.min( width / 2 , width - ($handleDiameter + height) / 2 + 1 ),
    position: "absolute",
    opacity: 1 - (pos - $uncheckedPos) / ($checkedPos - $uncheckedPos),
    right: 0,
    top: 0,
    pointerEvents: "none",
    transition: isDragging ? undefined : "opacity 0.25s",
  };

  const handleStyle: CSSProperties = {
    height: $handleDiameter,
    width: $handleWidth,
    position: "absolute",
    transform: `translateX(${pos}px)`,
    background: getBackgroundColor( pos, $checkedPos, $uncheckedPos, offHandleColor, onHandleColor ),
    borderRadius: borderRadius ?? (height - 4) / 2,
    top: Math.max(0, (height - $handleDiameter) / 2),
    outline: 0,
    border: 0,
    boxShadow: hasOutline ? activeBoxShadow : boxShadow || undefined,
    transition: isDragging ? undefined : "background-color 0.25s, transform 0.25s, box-shadow 0.15s",
    cursor: disabled ? "default" : "pointer",
  };

  const uncheckedHandleIconStyle: CSSProperties = {
    height: $handleDiameter,
    width: $handleDiameter,
    opacity: Math.max((1 - (pos - $uncheckedPos) / ($checkedPos - $uncheckedPos) - 0.5) * 2 , 0),
    position: "absolute",
    left: 0,
    top: 0,
    pointerEvents: "none",
    transition: isDragging ? undefined : "opacity 0.25s",
  };

  const checkedHandleIconStyle: CSSProperties = {
    height: $handleDiameter,
    width: $handleDiameter,
    opacity: Math.max(((pos - $uncheckedPos) / ($checkedPos - $uncheckedPos) - 0.5) * 2 , 0),
    position: "absolute",
    left: 0,
    top: 0,
    pointerEvents: "none",
    transition: isDragging ? undefined : "opacity 0.25s",
  };

  const inputStyle: CSSProperties = {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: 1,
  };

  const mergedCheckedIconStyle = {
    ...defaultCheckedIconStyle,
    ...checkedIconStyle,
  };

  const mergedUncheckedIconStyle = {
    ...defaultUncheckedIconStyle,
    ...uncheckedIconStyle,
  };

  return (
    <div className={className} style={rootStyle}>
      {labelPosition === "before" && label && (
        <span style={{ marginRight: "10px", ...labelStyle }}> {label} </span>
      )}
      <div
        className={`toggle-switch-bg ${switchBgClassName}`}
        style={backgroundStyle}
        onClick={disabled ? undefined : handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        { checked && checkedIcon && <div className={checkedIconClassName} style={mergedCheckedIconStyle}>{ typeof(checkedIcon) === "boolean" ? defaultCheckedIcon : checkedIcon }</div> }
        { !checked && uncheckedIcon && <div className={uncheckedIconClassName} style={mergedUncheckedIconStyle}>{ typeof(uncheckedIcon) === "boolean" ? defaultUncheckedIcon : uncheckedIcon }</div> }
      </div>
      <div
        className={`toggle-switch-handle ${switchHandleClassName}`}
        style={handleStyle}
        onClick={(e) => e.preventDefault()}
        onMouseDown={disabled ? undefined : handleMouseDown}
        onTouchStart={disabled ? undefined : handleTouchStart}
        onTouchMove={disabled ? undefined : handleTouchMove}
        onTouchEnd={disabled ? undefined : handleTouchEnd}
        onTouchCancel={disabled ? undefined : handleUnsetHasOutline}
      >
        {uncheckedHandleIcon && ( <div style={uncheckedHandleIconStyle}>{uncheckedHandleIcon}</div> )}
        {checkedHandleIcon && ( <div style={checkedHandleIconStyle}>{checkedHandleIcon}</div> )}
      </div>
      <input
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        style={inputStyle}
        {...rest}
        ref={inputRef}
        onFocus={handleSetHasOutline}
        onBlur={handleUnsetHasOutline}
        onKeyUp={handleKeyUp}
        onChange={handleInputChange}
      />
      {labelPosition === "after" && label && (
        <span style={{ marginLeft: "10px", ...labelStyle }}> {label} </span>
      )}
    </div>
  );
};

ReactToggleSliderSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  offColor: hexColorPropType,
  onColor: hexColorPropType,
  offHandleColor: hexColorPropType,
  onHandleColor: hexColorPropType,
  handleDiameter: PropTypes.number,
  handleWidth: PropTypes.number,
  uncheckedIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  checkedIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(["before", "after"]),
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.number,
  activeBoxShadow: PropTypes.string,
  uncheckedHandleIcon: PropTypes.element,
  checkedHandleIcon: PropTypes.element,
  height: PropTypes.number,
  width: PropTypes.number,
  id: PropTypes.string,
  className: PropTypes.string,
  switchBgClassName: PropTypes.string,
  switchHandleClassName: PropTypes.string,
  checkedIconClassName: PropTypes.string,
  uncheckedIconClassName: PropTypes.string,
  checkedIconStyle: PropTypes.object,
  uncheckedIconStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default ReactToggleSliderSwitch;