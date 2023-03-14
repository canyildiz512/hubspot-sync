import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Heading,
    Flex,
} from '@chakra-ui/react';

export const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent textAlign="center">
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading size="md">Are you sure you want to delete this meeting schedule?</Heading>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent="center" width="100%">
                            <Button colorScheme="red" mr={3} onClick={onDelete}>
                                Confirm
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
