import axios from 'axios';
import { removeEmptyStrings } from '../../utils';
import { hubspotMeetingProperties } from '../../utils/constants';

const defaultSortOption = [
    {
        'propertyName': 'hs_meeting_end_time',
        'direction': 'DESCENDING'
    },
]

export const getMeetings = (limit, next, sorts = defaultSortOption, filters) =>
    new Promise((resolve, reject) => {
        const data = {
            limit,
            after: next ? String(next) : '',
            sorts,
            properties: hubspotMeetingProperties
        }
        
        if (filters) {
            data.filterGroups = [{ filters }]
        }
        
        axios.post(`${process.env.REACT_APP_HUBSPOT_BASE_URL}/meetings`, removeEmptyStrings(data))
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });

export const deleteMeetings = (payload) =>
    new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_HUBSPOT_BASE_URL}/meetings/archive`, payload)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });

export const updateMeeting = (meetingId, payload) =>
    new Promise((resolve, reject) => {
        axios.patch(`${process.env.REACT_APP_HUBSPOT_BASE_URL}/meetings/${meetingId}`, { properties: payload })
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
