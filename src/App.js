import React, { useEffect } from 'react';
import {
  Container,
  Heading,
} from '@chakra-ui/react';
import './App.css';
import { DeleteConfirmationModal } from './components/DeleteModal';
import { useHSMeetingContext } from './contexts/HSMeetingContext';
import FilterControls from './components/FilterControls';
import FooterControls from './components/FooterControls';
import MeetingTable from './components/Table';

function App() {
  const {
    filteredData,
    nextPage,
    previousPage,
    loadPageData,
    getOwnersList,
    limit,
    isModalOpen,
    isLoading,
    handleClickDelete,
    next,
    before,
    toggleModal
  } = useHSMeetingContext();

  useEffect(() => {
    loadPageData();
    getOwnersList();
  }, [limit, next, before])

  return (
    <Container minW="100%" backgroundColor="#f5f5f5" height="100vh">
      <Heading>Meetings</Heading>
      <FilterControls onLoadData={loadPageData} />
      <MeetingTable loading={isLoading} />
      <FooterControls
        data={filteredData}
        onClickPrevious={previousPage}
        onClickNext={nextPage}
      />
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onOpen={toggleModal}
        onClose={toggleModal}
        onDelete={handleClickDelete}
      />
    </Container>
  );
}

export default App;
