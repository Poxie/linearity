import { Input } from "@/components/input"
import { fireEvent, render, screen } from "@testing-library/react";

const DEFAULT_PLACEHOLDER = 'Input placeholder';
const DEFAULT_WRITING = 'This is my input';
const DEFAULT_CLASS = 'my-input';
const DEFUALT_CONTAINER_CLASS = 'my-input-container';

describe('Input', () => {
    it('should render an editable input element', () => {
        render(<Input />);
        
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: DEFAULT_WRITING } });
        expect(input).toHaveValue(DEFAULT_WRITING);
    })
    it('should render an input with a placeholder', () => {
        render(<Input placeholder={DEFAULT_PLACEHOLDER} />)
        expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', DEFAULT_PLACEHOLDER);
    })
    it('should render input with default set value', () => {
        render(<Input defaultValue={DEFAULT_WRITING} />);
        expect(screen.getByRole('textbox')).toHaveValue(DEFAULT_WRITING);
    })
    it('should render an input with an icon label', () => {
        render(<Input name="search" icon={<span />} />);

        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'search');
        
        const label = screen.getByTestId('input-icon');
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('for', 'search');
    })
    it('should focus input on creation', () => {
        render(<Input focusOnMount />);
        expect(screen.getByRole('textbox')).toHaveFocus();
    })
    it('should render input with password type', () => {
        render(<Input type="password" placeholder="password" />);
        expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password');
    })
    it('should render input and container with custom class', () => {
        const { container } = render(<Input inputClassName={DEFAULT_CLASS} containerClassName={DEFUALT_CONTAINER_CLASS} />);

        expect(screen.getByRole('textbox')).toHaveClass(DEFAULT_CLASS);
        expect(container.firstChild).toHaveClass(DEFUALT_CONTAINER_CLASS);
    })
    it('should run the onChange function prop on user typing', () => {
        const mockCallback = jest.fn(text => text);
        render(<Input onChange={mockCallback} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: DEFAULT_WRITING } });

        expect(mockCallback).toBeCalled();
        expect(mockCallback).toReturnWith(DEFAULT_WRITING);
    })
    it('should run the onBlur and onFocus props on blur and focus', () => {
        const mockFocus = jest.fn();
        const mockBlur = jest.fn();

        render(<Input onFocus={mockFocus} onBlur={mockBlur} />);
        const input = screen.getByRole('textbox');
        
        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(mockFocus).toHaveBeenCalled();
        expect(mockBlur).toHaveBeenCalled();
    })
})