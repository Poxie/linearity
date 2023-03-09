import Button from '@/components/button';
import { render, screen, fireEvent } from '@testing-library/react';

const DEFAULT_BUTTON_TEXT = 'my button';
const DEFAULT_BUTTON_HREF = '/my-link';
const DEFAULT_CLASS_NAME = 'my-button';
const DEFAULT_BACKGROUND = 'red';

describe('Button', () => {
    it('should render a button with text', () => {
        render(<Button>{DEFAULT_BUTTON_TEXT}</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(DEFAULT_BUTTON_TEXT);
    })
    it('should render a clickable button', () => {
        const mockCallback = jest.fn();
        render(<Button onClick={mockCallback} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockCallback.call.length).toBe(1);
    })
    it('should render a button with custom style', () => {
        render(<Button style={{ backgroundColor: DEFAULT_BACKGROUND }} />);

        const button = screen.getByRole('button');
        expect(button).toHaveStyle(`background-color: ${DEFAULT_BACKGROUND};`);
    })
    it('should render a disabled button', () => {
        render(<Button disabled />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    })
    it('should render a button with link href', () => {
        render(<Button href={DEFAULT_BUTTON_HREF} />);

        const button = screen.getByRole('link');
        expect(button).toHaveAttribute('href', DEFAULT_BUTTON_HREF);
    })
    it('should render a button with link opening in new tab', () => {
        render(<Button href={DEFAULT_BUTTON_HREF} target="_blank" />);

        const button = screen.getByRole('link');
        expect(button).toHaveAttribute('href', DEFAULT_BUTTON_HREF);
        expect(button).toHaveAttribute('target', '_blank');
    })
    it('should render a button with custom class', () => {
        render(<Button className={DEFAULT_CLASS_NAME} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(DEFAULT_CLASS_NAME)
    })
    it('should render a disabled button with text, link href, custom class and style', () => {
        render(
            <Button 
                href={DEFAULT_BUTTON_HREF}
                className={DEFAULT_CLASS_NAME}
                style={{ backgroundColor: DEFAULT_BACKGROUND }}
                disabled
            >
                {DEFAULT_BUTTON_TEXT}
            </Button>
        )

        const button = screen.getByRole('link');
        expect(button).toHaveTextContent(DEFAULT_BUTTON_TEXT);
        expect(button).toHaveAttribute('href', DEFAULT_BUTTON_HREF);
        expect(button).toHaveClass(DEFAULT_CLASS_NAME);
        expect(button).toHaveStyle(`background-color: ${DEFAULT_BACKGROUND};`);
    })
})