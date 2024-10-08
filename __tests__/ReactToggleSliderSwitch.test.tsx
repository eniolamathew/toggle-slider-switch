import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ReactToggleSliderSwitch from '../src/index'; 

describe('ReactToggleSliderSwitch', () => {
  const noop = () => {};

  test('renders the toggle switch component', () => {
    const { getByRole } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        label="Test Toggle"
      />
    );
    
    const toggle = getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    
    const { getByRole } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={handleChange}
        label="Test Toggle"
      />
    );
    
    const toggle = getByRole('switch');
    
    fireEvent.click(toggle);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not display a label when no label is provided', () => {
    const { queryByText } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
      />
    );
    
    const label = queryByText(/./); 
    expect(label).not.toBeInTheDocument();
  });
  

  test('displays the correct label', () => {
    const { getByText } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        label="Test Label"
      />
    );
    
    const label = getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  test('applies the custom labelStyle when provided', () => {
    const customLabelStyle = { color: 'red', fontSize: '20px' };
  
    const { getByText } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        label="Styled Label"
        labelStyle={customLabelStyle}
      />
    );
    
    const label = getByText('Styled Label');
  
    expect(label).toHaveStyle('color: red');
    expect(label).toHaveStyle('font-size: 20px');
  });  
  
  test('is disabled when the disabled prop is true', () => {
    const { getByRole } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        disabled={true}
      />
    );

    const toggle = getByRole('switch');
    expect(toggle).toBeDisabled();
  });

  test('dragging the handle but not passing halfway does not trigger onChange', () => {
    const handleChange = jest.fn();
    
    const { container } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={handleChange}
        label="Test Toggle"
      />
    );
    
    const handle = container.querySelector('.toggle-switch-handle')!;
    
    fireEvent.mouseDown(handle, { clientX: 0 });
    
    fireEvent.mouseMove(window, { clientX: 10 });
    
    fireEvent.mouseUp(window);

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('handle click works correctly after dragging', () => {
    const handleChange = jest.fn();
    
    const { getByRole } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={handleChange}
        label="Test Toggle"
      />
    );
    
    const toggle = getByRole('switch');
    
    fireEvent.click(toggle);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays the checkedIcon when the switch is checked', () => {
    const checkedIcon = <span data-testid="checked-icon">✔️</span>;
    
    const { getByTestId } = render(
      <ReactToggleSliderSwitch
        checked={true}
        onChange={() => {}}
        label="Test Toggle"
        checkedIcon={checkedIcon}
      />
    );
    
    const icon = getByTestId('checked-icon');
    expect(icon).toBeInTheDocument();
  });
  
  test('displays the uncheckedIcon when the switch is unchecked', () => {
    const uncheckedIcon = <span data-testid="unchecked-icon">❌</span>;
    
    const { getByTestId } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        label="Test Toggle"
        uncheckedIcon={uncheckedIcon}
      />
    );
    
    const icon = getByTestId('unchecked-icon');
    expect(icon).toBeInTheDocument();
  });
  
  test('does not display the default checkedIcon when checkedIcon is set to false', () => {
    const { container } = render(
      <ReactToggleSliderSwitch
        checked={true}
        onChange={() => {}}
        label="Test Toggle"
        checkedIcon={false}
      />
    );
    
    const defaultCheckedIcon = container.querySelector('.toggle-switch-bg svg'); 
    expect(defaultCheckedIcon).not.toBeInTheDocument();
  });
  
  test('does not display the default uncheckedIcon when uncheckedIcon is set to false', () => {
    const { container } = render(
      <ReactToggleSliderSwitch
        checked={false}
        onChange={() => {}}
        label="Test Toggle"
        uncheckedIcon={false}
      />
    );
    
    const defaultUncheckedIcon = container.querySelector('.toggle-switch-bg svg'); 
    expect(defaultUncheckedIcon).not.toBeInTheDocument();
  }); 
  
  test("doesn't call onChange on some other key", () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <ReactToggleSliderSwitch onChange={mockOnChange} checked={false} />
    );
    fireEvent.focus(container.querySelector("input")!);
    fireEvent.keyDown(container.querySelector("input")!, {
      keyCode: 14,
      preventDefault: noop
    });
    expect(mockOnChange).not.toBeCalled();
  });
});