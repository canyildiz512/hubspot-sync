import { fireEvent, render, screen } from '@testing-library/react';
import moment from "moment";

import { DatePopover } from "../../components/DatePopOver";
import { DateRangePicker } from 'react-date-range';

import TestProvider from "../../components/TestProvider";

describe('renders date pop over', () => {
    let props = {};
    const flushPromises = () => new Promise(resolve => setTimeout(resolve))

    it('render without crashing', () => {
        const view = render(
            <TestProvider>
                <DatePopover />
            </TestProvider>)
        expect(view).toBeDefined();
    })

    it('should render date range text', () => {
        render(
            <TestProvider>
                <DatePopover />
            </TestProvider>
        )

        const today = new Date();
        const dateText = `${moment(today).format('DD, MMM YYYY')} - ${moment(today).format('DD, MMM YYYY')}`
        expect(screen.getByText(dateText)).toBeInTheDocument();
    })

    it('should render date range picker', async () => {
        render(
            <TestProvider>
                <DatePopover />
            </TestProvider>
        )

        const datePopoverButton = screen.getByTestId('date-popover-button');
        expect(datePopoverButton).toBeInTheDocument();

        fireEvent.click(datePopoverButton);

        await flushPromises();

        expect(DateRangePicker).toBeTruthy();
    })

    it('should call submit func when click submit button', async () => {
        props = {
            onSubmit: jest.fn()
        }

        render(
            <TestProvider>
                <DatePopover {...props} />
            </TestProvider>
        )

        const datePopoverButton = screen.getByTestId('date-popover-button');
        expect(datePopoverButton).toBeInTheDocument();

        fireEvent.click(datePopoverButton);

        await flushPromises();

        const filterButton = screen.getByTestId('date-filter-apply-button');
        fireEvent.click(filterButton);

        expect(props.onSubmit).toHaveBeenCalled();
    })
});
