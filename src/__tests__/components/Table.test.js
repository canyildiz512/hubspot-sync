import {render, screen} from '@testing-library/react';

import MeetingTable from "../../components/Table";
import TestProvider from "../../components/TestProvider";

describe('renders table', () => {
    it('render without crashing', () => {
        const view = render(
            <TestProvider>
                <MeetingTable />
            </TestProvider>
        )
        expect(view).toBeDefined();
    })

    it('render table head items correctly', () => {
        render(
            <TestProvider>
                <MeetingTable />
            </TestProvider>
        )

        expect(screen.getByTestId('meeting-table')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Time')).toBeInTheDocument();
        expect(screen.getByText('Account')).toBeInTheDocument();
        expect(screen.getByText('Next Steps')).toBeInTheDocument();
    })

    it('render loading spinner', () => {
        const props = {
            loading: true
        }

        render(
            <TestProvider>
                <MeetingTable {...props}/>
            </TestProvider>
        )

        expect(screen.getByTestId('meeting-table')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    })

    it('render empty value text', () => {
        render(
            <TestProvider>
                <MeetingTable />
            </TestProvider>
        )

        expect(screen.getByTestId('meeting-table')).toBeInTheDocument();
        expect(screen.getByText('No result found')).toBeInTheDocument();
    })
});
