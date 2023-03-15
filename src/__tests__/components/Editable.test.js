import { render, screen } from '@testing-library/react';

import { CustomEditableInput } from '../../components/Editable';

describe('renders editable input', () => {
    let props = {};

    it('render without crashing', () => {
        const view = render(<CustomEditableInput />)
        expect(view).toBeDefined();
    })

    it('should render editable date input', () => {
        props = { type: 'date' }

        render(<CustomEditableInput {...props} />)

        expect(screen.getByTestId('editable-date-input')).toBeInTheDocument();
    })

    it('should render editable input', () => {
        props = { type: 'input' }

        render(<CustomEditableInput {...props} />)

        expect(screen.getByTestId('editable-input')).toBeInTheDocument();
    })

    it('should render editable textarea', () => {
        props = { type: 'textarea', defaultText: "default-text", onChange: jest.fn() }

        render(<CustomEditableInput {...props} />)

        expect(screen.getByTestId('editable-textarea')).toBeInTheDocument();
        expect(screen.getByText(props.defaultText)).toBeInTheDocument();
    })
});
