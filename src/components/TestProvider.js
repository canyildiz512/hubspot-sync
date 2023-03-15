import React from 'react';

import {HSMeetingContextProvider} from "../contexts/HSMeetingContext";

const TestProvider = ({ children }) => {
    return (
        <HSMeetingContextProvider>
            {children}
        </HSMeetingContextProvider>
    )
}

export default TestProvider;
