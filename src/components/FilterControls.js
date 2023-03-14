import React from 'react';
import {
    Input,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Select
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BsFilter } from 'react-icons/bs';
import { TbSortDescending } from 'react-icons/tb';
import '../App.css';
import { DatePopover } from '../components/DatePopOver';
import { useHSMeetingContext } from '../contexts/HSMeetingContext';

const sortParams = [
    'Recent',
    'Oldest',
    'Name A-Z',
    'Name Z-A',
    'Account A-Z',
    'Account Z-A'
];

const FilterControls = () => {
    const {
        isPopoverOpen,
        setIsPopoverOpen,
        filterObject,
        handleChangeFilterInput,
        owners,
        handleSubmitFilter,
        resetFilter,
        selected,
        setIsEditClicked,
        isEditClicked,
        toggleModal,
        selectedSortParams,
        handleSort
    } = useHSMeetingContext();

    return (
        <Flex justifyContent="space-between" mt={4}>
            <Flex mb={4} gap="10px">
                <Popover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)}>
                    <PopoverTrigger >
                        <Button className="btn" onClick={() => setIsPopoverOpen(true)}>
                            <Flex alignItems="center" gap="10px">
                                <BsFilter /> <Text>Filter</Text>
                            </Flex>
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <Flex flexDirection="column" gap="10px">
                                    <Input name="hs_meeting_title" placeholder="name" value={filterObject?.hs_meeting_title} onChange={handleChangeFilterInput} />
                                    <Select name="hubspot_owner_id" placeholder="Select Account" onChange={handleChangeFilterInput}>
                                        {
                                            owners.map((owner, i) => <option key={i} value={owner?.value}>{owner?.label}</option>)
                                        }
                                    </Select>
                                    <Flex justifyContent="space-between" mt="3" pt="2" borderTop="1px solid #77777734">
                                        <Button onClick={handleSubmitFilter}>Apply Changes</Button>
                                        <Button onClick={resetFilter}>Reset</Button>
                                    </Flex>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} className="btn">
                        Actions
                    </MenuButton>
                    <MenuList>
                        <MenuItem isDisabled={Object.values(selected).filter(val => val === true).length === 0} onClick={() => setIsEditClicked(!isEditClicked)}>Edit</MenuItem>
                        <MenuItem isDisabled={Object.values(selected).filter(val => val === true).length === 0} onClick={toggleModal}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex mb={4} gap="10px">
                <Menu>
                    <MenuButton as={Button} className="btn">
                        <Flex alignItems="center" gap="10px">
                            <TbSortDescending /> <Text>Sort: {selectedSortParams}</Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        {
                            sortParams.map((param, i) => <MenuItem key={i} onClick={() => handleSort(param)}>Sort: {param}</MenuItem>)
                        }
                    </MenuList>
                </Menu>
                <DatePopover onSubmit={handleSubmitFilter} />
            </Flex>
        </Flex>
    );
};

export default FilterControls;
