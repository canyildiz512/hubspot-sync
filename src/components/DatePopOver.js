import React, { useState, useRef } from 'react';
import { Button, Menu, MenuButton, Text, MenuList, MenuItem, Flex, useOutsideClick, Box } from '@chakra-ui/react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { useHSMeetingContext } from '../contexts/HSMeetingContext';

export const DatePopover = ({ onSubmit }) => {

    const {
        handleChangeDateInput
    } = useHSMeetingContext();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    useOutsideClick({
        ref: menuRef,
        handler: () => {
            setIsOpen(false);
        },
    });

    const handleChange = (item) => {
        setState([item.selection]);
        handleChangeDateInput(item.selection);
    };

    const handleSubmit = () => {
        setIsOpen(false);
        onSubmit();
    }

    return (
        <Box ref={menuRef} data-testid="date-popover">
            <Menu isOpen={isOpen} >
                <MenuButton data-testid="date-popover-button" as={Button} className="btn" onClick={() => setIsOpen(true)}>
                    <Flex alignItems="center" gap="10px">
                        <Text>{moment(state[0].startDate).format('DD, MMM YYYY')} - {moment(state[0].endDate).format('DD, MMM YYYY')}</Text>
                    </Flex>
                </MenuButton>
                {isOpen &&
                    <MenuList>
                        <MenuItem>
                            <Flex flexDirection="column" gap="10px">
                                <DateRangePicker
                                    data-testid="date-range-picker"
                                    onChange={handleChange}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={state}
                                    direction="horizontal"
                                />
                                <Button data-testid="date-filter-apply-button" onClick={handleSubmit}>Filter</Button>
                            </Flex>
                        </MenuItem>
                    </MenuList>
                }
            </Menu>
        </Box>
    );
};
