import {fireEvent, render, screen} from '@testing-library/react';

import FilterControls from '../../components/FilterControls';
import TestProvider from "../../components/TestProvider";

describe('renders filter controls', () => {
    it('render without crashing', () => {
        const view = render(
            <TestProvider>
                <FilterControls />
            </TestProvider>
        )
        expect(view).toBeDefined();
    })

    it('render filter menu', () => {
        render(
            <TestProvider>
                <FilterControls />
            </TestProvider>
        )

        const filterMenuButton = screen.getByTestId('filter-menu-button');
        expect(filterMenuButton).toBeInTheDocument();

        fireEvent.click(filterMenuButton);

        const filterMenu = screen.getByTestId('filter-menu');
        expect(filterMenu).toBeInTheDocument();

        expect(screen.getByTestId('filter-meeting-title-input')).toBeInTheDocument();
        expect(screen.getByTestId('filter-owner-select')).toBeInTheDocument();

        expect(screen.getByTestId('filter-apply-button')).toBeInTheDocument();
        expect(screen.getByTestId('filter-reset-button')).toBeInTheDocument();
    })

    it('render action menu', () => {
        render(
            <TestProvider>
                <FilterControls />
            </TestProvider>
        )

        const actionsMenuButton = screen.getByTestId('actions-menu-button');
        expect(actionsMenuButton).toBeInTheDocument();

        fireEvent.click(actionsMenuButton);

        expect(screen.getByTestId('actions-save-menu-item')).toBeInTheDocument();
        expect(screen.getByTestId('actions-delete-menu-item')).toBeInTheDocument();
    })

    it('render sort menu', () => {
        render(
            <TestProvider>
                <FilterControls />
            </TestProvider>
        )

        const sortMenuButton = screen.getByTestId('sort-menu-button');
        expect(sortMenuButton).toBeInTheDocument();

        fireEvent.click(sortMenuButton);

        expect(screen.getByTestId('sort-menu-list')).toBeInTheDocument();
    })

    it('render date popover', () => {
        render(
            <TestProvider>
                <FilterControls />
            </TestProvider>
        )

        const datePopover = screen.getByTestId('date-popover');
        expect(datePopover).toBeInTheDocument();
    })
});
