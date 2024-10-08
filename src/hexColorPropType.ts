import { Validator } from "prop-types";

const hexColorPropType: Validator<string> = (
  props: Record<string, any>, 
  propName: string, 
  componentName: string
): Error | null => {
  const prop = props[propName];
  
  if (
    typeof prop !== "string" ||
    prop[0] !== "#" ||
    (prop.length !== 4 && prop.length !== 7)
  ) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. '${propName}' has to be either a 3-digit or 6-digit hex-color string. Valid examples: '#abc', '#123456'`
    );
  }
  
  return null;
};

export default hexColorPropType;
