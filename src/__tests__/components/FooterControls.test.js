import {fireEvent, render, screen} from '@testing-library/react';

import FooterControls from '../../components/FooterControls';
import TestProvider from "../../components/TestProvider";

describe('renders footer controls', () => {
    it('render without crashing', () => {
        const view = render(
            <TestProvider>
                <FooterControls />
            </TestProvider>
        )
        expect(view).toBeDefined();
    })

    it('render page information text', () => {
        render(
            <TestProvider>
                <FooterControls />
            </TestProvider>
        )

        expect(screen.getByTestId('pagination-text')).toBeInTheDocument();
    })

    it('render page size selection menu', () => {
        render(
            <TestProvider>
                <FooterControls />
            </TestProvider>
        )

        const pageSizeMenuButton = screen.getByTestId('page-size-menu-button');
        expect(pageSizeMenuButton).toBeInTheDocument();

        fireEvent.click(pageSizeMenuButton);

        const pageSizeMenu = screen.getByTestId('page-size-menu-list');
        expect(pageSizeMenu).toBeInTheDocument();
    })

    it('render prev and next buttons', () => {
        const props = {
            onClickPrevious: jest.fn(),
            onClickNext: jest.fn(),
        }
        render(
            <TestProvider>
                <FooterControls {...props} />
            </TestProvider>
        )

        const nextButton = screen.getByTestId('next-page-button');
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        const prevButton = screen.getByTestId('prev-page-button');
        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toBeDisabled();
    })
});
