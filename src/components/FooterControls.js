import React from 'react';
import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import '../App.css';
import { useHSMeetingContext } from '../contexts/HSMeetingContext';


const FooterControls = ({ onClickPrevious, onClickNext }) => {
    const { limit, setLimit, meta, total, start } = useHSMeetingContext();

    return (
        <Flex data-testid="footer-controls" alignItems="center" justifyContent="space-between" mt="5">
            <Flex gap="10px" alignItems="center">
                <Text data-testid="pagination-text">Showing {start} to {meta?.next?.after || total} of {total} results</Text>
                <Menu>
                    <MenuButton data-testid="page-size-menu-button" as={Button} rightIcon={<ChevronDownIcon />} className="btn">
                        {limit}
                    </MenuButton>
                    <MenuList  data-testid="page-size-menu-list">
                        <MenuItem onClick={() => setLimit(5)}>5</MenuItem>
                        <MenuItem onClick={() => setLimit(10)}>10</MenuItem>
                        <MenuItem onClick={() => setLimit(20)}>20</MenuItem>
                        <MenuItem onClick={() => setLimit(50)}>50</MenuItem>
                        <MenuItem onClick={() => setLimit(100)}>100</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex gap="10px">
                <Button data-testid="prev-page-button" className="btn" isDisabled={start <= 1} onClick={start > 1 ? onClickPrevious : undefined}>Previous</Button>
                <Button data-testid="next-page-button" className="btn" isDisabled={limit >= total} onClick={limit < total ? onClickNext : undefined}>Next</Button>
            </Flex>
        </Flex>
    );
};

export default FooterControls;