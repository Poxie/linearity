import { Dropdown } from "@/components/dropdown"
import { fireEvent, render, screen } from "@testing-library/react"

const ACTIVE_CLASS = 'selected';
const ITEMS = [
    { id: 0, text: 'test item' },
    { id: 1, text: 'test item 2' }
]

describe('Dropdown', () => {
    it('renders dropdown component', () => {
        render(<Dropdown items={ITEMS} onChange={() => {}} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
    it('opens dropdown on click', () => {
        render(<Dropdown items={ITEMS} onChange={() => {}} />);

        const dropdown = screen.getByRole('button');
        fireEvent.click(dropdown);

        expect(dropdown).toHaveClass(ACTIVE_CLASS);
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(ITEMS[0].text);
    })
    it('returns clicked dropdown item, sets item as active and closes dropdown', () => {
        const mockCallback = jest.fn(id => id);
        render(<Dropdown items={ITEMS} onChange={mockCallback} />);

        const dropdown = screen.getByRole('button');
        fireEvent.click(dropdown);

        fireEvent.click(screen.getAllByRole('listitem')[0].children[0]);
        expect(mockCallback).toBeCalled();
        expect(mockCallback).toReturnWith(ITEMS[0].id);
        expect(dropdown).toHaveTextContent(ITEMS[0].text);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    })
    it('renders dropdown with default value', () => {
        render(<Dropdown items={ITEMS} onChange={() => {}} defaultSelected={ITEMS[1].id} />);
        expect(screen.getByRole('button')).toHaveTextContent(ITEMS[1].text);
    })
    it('renders a working search input in the dropdown', () => {
        render(<Dropdown items={ITEMS} onChange={() => {}} allowSearch />);
        fireEvent.click(screen.getByRole('button'));

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        
        fireEvent.change(input, { target: { value: ITEMS[1].text } });
        expect(screen.getByRole('listitem')).toHaveTextContent(ITEMS[1].text);
    })
    it('renders the dropdown at different position', () => {
        const { container } = render(<Dropdown items={ITEMS} onChange={() => {}} resultsPosition={'right'} />);
        fireEvent.click(screen.getByRole('button'));

        expect(container.firstChild).toHaveClass('right');
    })
    it('closes dropdown on click outside', () => {
        render(<Dropdown items={ITEMS} onChange={() => {}} allowSearch />);
        fireEvent.click(screen.getByRole('button'));

        fireEvent.mouseDown(document.body);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    })
})