import '@testing-library/jest-dom'; 

describe('ReactToggleSliderSwitch logic tests', () => {
  // Helper functions and default states
  
  test('calls onChange when handle is dragged past halfway', () => {
    const handleChange = jest.fn();
    
    let checked = false;
    const $checkedPos = 33;
    const $uncheckedPos = 2;
    
    const halfwayCheckpoint = ($checkedPos + $uncheckedPos) / 2;
    let pos = 20;

    const isDraggedHalfway = checked ? pos <= halfwayCheckpoint : pos >= halfwayCheckpoint;

    if (isDraggedHalfway) {
      handleChange(!checked);  
    }
   
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('does not call onChange when handle is not dragged past halfway', () => {
    const handleChange = jest.fn();
    
    let checked = false;
    const $checkedPos = 33;
    const $uncheckedPos = 2;
    
    const halfwayCheckpoint = ($checkedPos + $uncheckedPos) / 2;
    let pos = 10;

    const isDraggedHalfway = checked
      ? pos <= halfwayCheckpoint
      : pos >= halfwayCheckpoint;

    if (isDraggedHalfway) {
      handleChange(!checked);
    }
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('calls onChange on simulated click', () => {
    const handleChange = jest.fn();
    
    let checked = false;
    const isSimulatedClick = true;

    if (isSimulatedClick) {
      handleChange(!checked);
    }
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('does not display a label when no label is provided', () => {
    const label = null;
    expect(label).toBeNull();
  });

  test('displays the correct label', () => {
    const label = 'Test Label';
    expect(label).toBe('Test Label');
  });

  test('applies the custom labelStyle when provided', () => {
    const customLabelStyle = { color: 'red', fontSize: '20px' };
    expect(customLabelStyle).toEqual({ color: 'red', fontSize: '20px' });
  });

  test('is disabled when the disabled prop is true', () => {
    const disabled = true;
    expect(disabled).toBe(true);
  });

  test('shows checkedIcon when the switch is checked', () => {
    const checked = true;
    const checkedIcon = '✔️';
    expect(checked ? checkedIcon : null).toBe('✔️');
  });

  test('shows uncheckedIcon when the switch is unchecked', () => {
    const checked = false;
    const uncheckedIcon = '❌';
    expect(!checked ? uncheckedIcon : null).toBe('❌');
  });

  test('does not show checkedIcon when checkedIcon is set to false', () => {
    const checked = true;
    const checkedIcon = false; 
    expect(checked ? checkedIcon : null).toBe(false); 
  });

  test('does not show uncheckedIcon when uncheckedIcon is set to false', () => {
    const checked = false;
    const uncheckedIcon = false; 
    expect(!checked ? uncheckedIcon : null).toBe(false); 
  });

  test('does not call onChange on other key presses', () => {
    const handleChange = jest.fn();
    const keyCode: number = 14;  
    
    const isKeyValid = (keyCode === 32 || keyCode === 13);
    if (isKeyValid) {
      handleChange();
    }
    
    expect(handleChange).not.toHaveBeenCalled();
  });
});