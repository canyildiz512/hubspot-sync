import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Checkbox,
  Link, Spinner
} from '@chakra-ui/react';
import moment from 'moment';
import '../App.css';
import { CustomEditableInput, UpdateControls } from './Editable';
import { useHSMeetingContext } from '../contexts/HSMeetingContext';

const MeetingTable = (props) => {
  const { loading } = props;
  
  const {
    filteredData,
    selected,
    setSelected,
    isEditClicked,
    editableInputText,
    showIndex,
    setShowIndex,
    handleChangeTextInput,
    handleCheckAll,
    handleCheck,
    handleClickUpdate,
    hasMoreContent
  } = useHSMeetingContext();
  
  return (
    <Table data-testid="meeting-table" colorScheme="gray" background="#fff">
      <Thead>
        <Tr>
          <Th>
            <Checkbox
              isChecked={Object.values(selected).length === filteredData.length ?
                Object.values(selected).every((val) => val === true)
                : false}
              onChange={handleCheckAll}
            />
          </Th>
          <Th>Name</Th>
          <Th>Time</Th>
          <Th>Account</Th>
          <Th>Next Steps</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredData.length > 0 && !loading ?
          filteredData.map((d) => (
            <Tr key={d.id}>
              <Td width="5px"><Checkbox isChecked={selected[d.id] || false} onChange={(e) => handleCheck(d.id, e.target.checked)} /></Td>
              <Td>{selected[d.id] && isEditClicked ?
                <CustomEditableInput defaultText={d.name} name="hs_meeting_title" onChange={(e) => handleChangeTextInput(e, d.id)} />
                :
                <Link href="" target="_blank" textDecorationLine="none" textColor="blue.400">{editableInputText?.name || d.name}</Link>}
              </Td>
              <Td>
                {selected[d.id] && isEditClicked ?
                  <CustomEditableInput defaultText={d.time} type="date" name="hs_meeting_start_time" onChange={(e) => handleChangeTextInput(e, d.id)} />
                  :
                  moment(editableInputText?.time || d.time).format('MMMM Do, YYYY h:mm a')}
              </Td>
              <Td>{d.account}</Td>
              <Td>
                {
                  selected[d.id] && isEditClicked ?
                    <CustomEditableInput defaultText={d.next} type="textarea" name="hs_meeting_body" onChange={(e) => handleChangeTextInput(e, d.id)} />
                    :
                    <Flex flexDirection="column">
                      <Text className={showIndex[d.id] ? '' : 'truncate-list'} dangerouslySetInnerHTML={{ __html: editableInputText?.next || d.next }}></Text>
                      {
                        hasMoreContent(d.next) &&
                        <Text width="100px" cursor="pointer" pt="3" pr="2" pb="1" fontWeight="bold" background="#fff" onClick={() => setShowIndex({ [d.id]: !showIndex[d.id] })}>
                          {
                            !showIndex[d.id] ?
                              'Show all'
                              :
                              'Show less'
                          }
                        </Text>
                      }
                    </Flex>
                }
              </Td>
              <Td>
                <UpdateControls onSubmit={() => handleClickUpdate(d.id)} isEditing={selected[d.id] && isEditClicked} onCancel={() => setSelected({ [d.id]: false })} />
              </Td>
            </Tr>
          ))
          :
          <Tr>
            <Td colSpan={5}>
              <Flex justifyContent="center" alignItems="center" minH="200px">
                { loading ? <Spinner data-testid="loading-spinner" size="xl" color="blue.500" /> : <Text>No result found</Text> }
              </Flex>
            </Td>
          </Tr>
        }
      </Tbody>
    </Table>
  );
};

export default MeetingTable;
