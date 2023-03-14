import React from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { ButtonGroup, Editable, EditableInput, Flex, IconButton, Input, useEditableControls } from '@chakra-ui/react';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditableControls = ({ onSubmit }) => {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
    } = useEditableControls();

    return isEditing && (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps({ onClick: onSubmit })} />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
    );
};

export const UpdateControls = ({ isEditing, onCancel, onSubmit }) => {
    return isEditing && (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton icon={<CheckIcon />} onClick={onSubmit} />
            <IconButton icon={<CloseIcon />} onClick={onCancel} />
        </ButtonGroup>
    );
};

export const CustomEditableInput = ({ defaultText, type = EditableInput, name, onChange, onSubmit }) => {
    const [value, setValue] = React.useState(defaultText);

    const handleChange = (val) => {
        setValue(val);
        onChange({ name, type: 'quillText', value: val });
    };

    return (
        <Editable
            defaultValue={defaultText}
            isPreviewFocusable={false}
        >
            {
                type === 'date' ?
                    <Flex flexDirection="column" alignItems="start">
                        <Input name={name} type="datetime-local" defaultValue={moment(defaultText).toISOString().slice(0, 16)} onChange={onChange} />
                    </Flex>
                    :
                    type === 'textarea' ?
                        <Flex flexDirection="column" alignItems="start">
                            <ReactQuill theme="snow" value={value} onChange={handleChange} />
                        </Flex>
                        :
                        <Flex flexDirection="column" alignItems="start">
                            <Input name={name} type="text" defaultValue={defaultText} onChange={onChange} />
                        </Flex>
            }
            <EditableControls submit={onSubmit} />
        </Editable>
    );
};
