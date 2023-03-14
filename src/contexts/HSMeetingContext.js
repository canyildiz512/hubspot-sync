import React, { useState, useContext, useEffect } from 'react';
import {
    useToast
} from '@chakra-ui/react';
import moment from 'moment';
import '../App.css';
import { deleteMeetings, getMeetings, updateMeeting } from '../services/api/meetings';
import { parseFilterParams, parseMeetings } from '../utils';
import { getOwners } from '../services/api/owners';

const HSMeetingContext = React.createContext();

export const HSMeetingContextProvider = ({ children }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [selected, setSelected] = useState({});
    const [limit, setLimit] = useState(5);
    const [meta, setMeta] = useState();
    const [next, setNext] = useState();
    const [cursorHistory, setCursorHistory] = useState([0]);
    const [pageControl, setPageControl] = useState(0);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [filterObject, setFilterObject] = useState();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [start, setStart] = useState(1);
    const [isModalOpen, setIsModalopen] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [editableInputText, setEditableInputText] = useState();
    const [selectedSortParams, setSelectedSortParams] = useState('Name A-Z');
    const [owners, setOwners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showIndex, setShowIndex] = useState({});
    const [isInitial, setIsInitial] = useState(true);
    const toast = useToast();

    const toggleModal = () => {
        setIsModalopen(!isModalOpen);
    };
    
    const getAllMeetings = (limit, next, sort, filters) => {
        if (filters === undefined && filterObject) {
            filters = parseFilterParams(filterObject).filter(f => f.value).filter(f => f.propertyName !== 'hubspot_owner_id');
        }

        if (sort === undefined && selectedSortParams) {
            sort = getSortParam(selectedSortParams);
        }

        return getMeetings(limit, next, sort, filters);
    }

    const handleSubmitFilter = () => {
        const filters = parseFilterParams(filterObject).filter(f => f.value).filter(f => f.propertyName !== 'hubspot_owner_id');

        setIsLoading(true);
        setIsPopoverOpen(false);
  
        getAllMeetings(limit, next, undefined, filters)
            .then(async (res) => {
                setFilteredData(await parseMeetings(res.data.results));
                setTotal(res.data.total);
                setMeta(res.data.paging);
                setStart(1);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const resetFilter = (e) => {
        e?.preventDefault();
        setIsLoading(true);
        setIsPopoverOpen(false)

        getAllMeetings(limit, next, undefined, null)
            .then(async (res) => {
                if (res?.data?.paging) {
                    setMeta(res.data.paging);
                    setCursorHistory(hist => ([...new Set([...hist, res.data.paging.next.after])]));
                    setFilterObject({ hs_meeting_title: '' });
                }

                setTotal(res.data.total);
                setStart(1);
                setFilteredData(await parseMeetings(res.data.results));
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const handleChangeFilterInput = (e) => {
        setFilterObject({ ...filterObject, [e.target.name]: e.target.value });
    };

    const handleChangeDateInput = (value) => {
        setFilterObject({ 
            ...filterObject,
            hs_meeting_start_time: value.startDate,
            hs_meeting_end_time: value.endDate
        });
    };

    const handleChangeTextInput = (e, id) => {
        if (e?.target?.name === 'hs_meeting_start_time') {
            setEditableInputText({ ...editableInputText, [id]: { ...editableInputText?.[id], [e.target.name]: moment(e.target.value).toISOString() } });
        } else if (e?.type === 'quillText') {
            setEditableInputText({ ...editableInputText, [id]: { ...editableInputText?.[id], [e.name]: e.value } });
        } else {
            setEditableInputText({ ...editableInputText, [id]: { ...editableInputText?.[id], [e.target.name]: e.target.value } });
        }
    };

    const handleCheckAll = () => {
        const selectedArray = Object.values(selected);

        if (selectedArray.length > 0 && selectedArray.every((val) => val === true)) {
            filteredData.forEach(data => {
                setSelected((selected) => ({
                    ...selected,
                    [data.id]: false
                }));
            });
        } else {
            filteredData.forEach(data => {
                setSelected((selected) => ({
                    ...selected,
                    [data.id]: true
                }));
            });
        }
    };

    const handleCheck = (id, checked) => {
        setIsEditClicked(false);
        setSelectedId(id);
        setSelected({
            ...selected,
            [id]: checked,
        });
    };

    const handleClickDelete = () => {
        const batchSelect = Object.entries(selected)
            .filter(d => {
                return d[1] === true;
            })
            .map(d => ({ id: d[0] }));
        const payload = {
            inputs: batchSelect
        };

        if (batchSelect.length > 0) {
            setIsLoading(true);

            deleteMeetings(payload)
                .then(() => {
                    setStart(1);
                    setTimeout(() => loadPageData(), 3000);
                    toggleModal();
                })
                .catch(error => {
                    setIsLoading(false);
                    toast({
                        title: 'Error',
                        description: error?.response?.data?.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
        }
    };

    const handleClickUpdate = (id) => {
        if (selectedId) {
            updateMeeting(id, editableInputText[id])
                .then(() => {
                    loadPageData(
                        [
                            {
                                'propertyName': 'hs_meeting_end_time',
                                'direction': 'DESCENDING'
                            }
                        ],
                        false
                    );
                    setSelected({ ...selected, [id]: false });
                })
                .catch(error => {
                    setIsLoading(false);
                    toast({
                        title: 'Error',
                        description: error?.response?.data?.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
        }
    };

    const previousPage = () => {
        let cursor = cursorHistory[cursorHistory.indexOf(meta?.next?.after) - 1] || meta?.next?.after || null;

        setSelected({});
        setIsLoading(true);

        if (cursor) {
            setPageControl(pg => (pg - 1));

            getAllMeetings(limit, (Number(cursor) - limit) > 0 ? String(Number(cursor) - limit) : '')
                .then(async (res) => {
                    if (res?.data?.paging) {
                        setMeta(res.data.paging);
                        setCursorHistory(hist => ([...new Set([...hist, res?.data.paging.next.after])]));
                    }
                    setStart(s => s - res.data.results.length > 0 ? s - res.data.results.length : s);
                    setFilteredData(await parseMeetings(res.data.results));
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    toast({
                        title: 'Error',
                        description: error?.response?.data?.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
        } else{
            loadPageData()
        }
    };

    const nextPage = () => {
        let cursor = meta?.next?.after || cursorHistory[cursorHistory.indexOf(meta?.next?.after) - 1] || '';

        setSelected({});
        setIsLoading(true);

        if (cursor) {
            setPageControl(pg => (pg + 1));

            getAllMeetings(limit, Number(cursor))
                .then(async (res) => {
                    setStart(start + filteredData.length <= total ? start + filteredData.length : start);
                    setMeta(res.data.paging);
                    setFilteredData(await parseMeetings(res.data.results));
                    setCursorHistory(hist => ([...new Set([...hist, res?.data?.paging?.next?.after])]));
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    toast({
                        title: 'Error',
                        description: error?.response?.data?.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                });
        } else {
            setIsLoading(false);
        }
    };

    const getSortParam = (param) => {
        let sortParam = [];

        switch (param) {
            case 'Recent':
                sortParam = [
                    {
                        'propertyName': 'hs_meeting_end_time',
                        'direction': 'DESCENDING'
                    }
                ];
                break;
            case 'Oldest':
                sortParam = [
                    {
                        'propertyName': 'hs_meeting_end_time',
                        'direction': 'ASCENDING'
                    }
                ];
                break;
            case 'Name A-Z':
                sortParam = [
                    {
                        'propertyName': 'hs_meeting_title',
                        'direction': 'ASCENDING'
                    }
                ];
                break;
            case 'Name Z-A':
                sortParam = [
                    {
                        'propertyName': 'hs_meeting_title',
                        'direction': 'DESCENDING'
                    }
                ];
                break;
            case 'Account A-Z':
                sortParam = [
                    {
                        'propertyName': 'hubspot_owner_id',
                        'direction': 'ASCENDING'
                    }
                ];
                break;
            case 'Account Z-A':
                sortParam = [
                    {
                        'propertyName': 'hubspot_owner_id',
                        'direction': 'DESCENDING'
                    }
                ];
                break;
            default:
                break;
        }

        return sortParam;
    }

    const handleSort = (param) => {
        const sortParam = getSortParam(param);

        setSelectedSortParams(param);

        loadPageData(sortParam);
    };

    const loadPageData = (
        sort = [
            {
                'propertyName': 'hs_meeting_end_time',
                'direction': 'DESCENDING'
            }
        ],
        reload = true
    ) => {
        if (reload) {
            setIsLoading(true);
        }

        getAllMeetings(limit, next, sort)
            .then(async (res) => {
                setMeta(res?.data?.paging);

                if (res?.data?.paging) {
                    setCursorHistory(hist => ([...new Set([...hist, res.data.paging.next.after])]));
                }

                setTotal(res.data.total);
                setFilteredData(await parseMeetings(res.data.results));
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const getOwnersList = () => {
        getOwners()
            .then(res => {
                if (res?.data?.results?.length > 0) {
                    const parsedOwners = res?.data?.results.map((d) => ({ label: `${d.firstName} ${d.lastName}`, value: d.id }));
                    setOwners(parsedOwners);
                }
            })
            .catch(error => {
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: error?.response?.data?.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const hasMoreContent = (text) => {
        if (!text) return false;

        let newValue = text.replace(/<\/ul>/g, '').trim();

        return (newValue.split(/<\/li>|<\/p>/g).length - 1) > 3;
    }

    useEffect(() => {
        if (!isInitial) {
            setCursorHistory([0]);
            setStart(1);
        }
        setIsInitial(false);
    }, [limit])

    return (
        <HSMeetingContext.Provider
            value={{
                handleSubmitFilter,
                resetFilter,
                handleChangeDateInput,
                handleChangeFilterInput,
                handleChangeTextInput,
                handleCheckAll,
                handleCheck,
                handleClickDelete,
                handleClickUpdate,
                previousPage,
                nextPage,
                handleSort,
                loadPageData,
                getOwnersList,
                hasMoreContent,
                toggleModal,
                filteredData,
                setFilteredData,
                selected,
                setSelected,
                limit,
                setLimit,
                meta,
                setMeta,
                isEditClicked,
                setIsEditClicked,
                filterObject,
                setFilterObject,
                isPopoverOpen,
                setIsPopoverOpen,
                total,
                setTotal,
                start,
                setStart,
                isModalOpen,
                setIsModalopen,
                selectedId,
                setSelectedId,
                editableInputText,
                setEditableInputText,
                selectedSortParams,
                setSelectedSortParams,
                owners,
                setOwners,
                isLoading,
                setIsLoading,
                showIndex,
                setShowIndex
            }}
        >
            {children}
        </HSMeetingContext.Provider>
    );
};

export const useHSMeetingContext = () => {
    return useContext(HSMeetingContext);
};
