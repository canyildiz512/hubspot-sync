import { render, screen } from '@testing-library/react';
import App from './App';
import {HSMeetingContextProvider} from "./contexts/HSMeetingContext";

test('renders app', () => {
  render(
      <HSMeetingContextProvider>
        <App />
      </HSMeetingContextProvider>
  );

  expect(screen.getByText('Meetings')).toBeInTheDocument();
  expect(screen.getByTestId('filter-controls')).toBeInTheDocument();
  expect(screen.getByTestId('meeting-table')).toBeInTheDocument();
  expect(screen.getByTestId('footer-controls')).toBeInTheDocument();
});
