import {fireEvent, render, screen} from '@testing-library/react';

import { DeleteConfirmationModal } from "../../components/DeleteModal";

describe('renders delete confirmation modal', () => {
    let props = {};

    it('render without crashing', () => {
        const view = render(<DeleteConfirmationModal />)
        expect(view).toBeDefined();
    })

    it('should render heading text when isOpen prop is true', () => {
        props = { isOpen: true }

        render(<DeleteConfirmationModal {...props} />)

        const heading = screen.getByText("Are you sure you want to delete this meeting schedule?");
        expect(heading).toBeInTheDocument();
    })


    it('should not render text when isOpen prop is false', () => {
        props = { isOpen: false }

        render(<DeleteConfirmationModal {...props} />);
        const heading = screen.queryByText("Are you sure you want to delete this meeting schedule?");
        expect(heading).not.toBeInTheDocument();
    })

    it('should call onDelete func when confirm button clicked', () => {
        props = {
            isOpen: true,
            onDelete: jest.fn()
        }

        render(<DeleteConfirmationModal {...props} />);

        const confirmButton = screen.getByTestId('delete-confirm-button');
        fireEvent.click(confirmButton);

        expect(props.onDelete).toHaveBeenCalled();
    })
});
