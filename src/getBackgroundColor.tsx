// Convert shorthand hex color (#abc) to full hex color (#aabbcc)
function convertShorthandColor(color: string): string {
    if (color.length === 7) {
      return color;
    }
    let sixDigitColor = "#";
    for (let i = 1; i < 4; i += 1) {
      sixDigitColor += color[i] + color[i];
    }
    return sixDigitColor;
  }
  
  function createBackgroundColor(
    pos: number,
    checkedPos: number,
    uncheckedPos: number,
    offColor: string,
    onColor: string
  ): string {
    const relativePos = (pos - uncheckedPos) / (checkedPos - uncheckedPos);
    if (relativePos === 0) {
      return offColor;
    }
    if (relativePos === 1) {
      return onColor;
    }
  
    let newColor = "#";
    for (let i = 1; i < 6; i += 2) {
      const offComponent = parseInt(offColor.substr(i, 2), 16);
      const onComponent = parseInt(onColor.substr(i, 2), 16);
      const weightedValue = Math.round(
        (1 - relativePos) * offComponent + relativePos * onComponent
      );
      let newComponent = weightedValue.toString(16);
      if (newComponent.length === 1) {
        newComponent = `0${newComponent}`;
      }
      newColor += newComponent;
    }
    return newColor;
  }
  
  // Main function to get background color based on the position
  export default function getBackgroundColor(
    pos: number,
    checkedPos: number,
    uncheckedPos: number,
    offColor: string,
    onColor: string
  ): string {
    const sixDigitOffColor = convertShorthandColor(offColor);
    const sixDigitOnColor = convertShorthandColor(onColor);
    return createBackgroundColor(
      pos,
      checkedPos,
      uncheckedPos,
      sixDigitOffColor,
      sixDigitOnColor
    );
  }
  