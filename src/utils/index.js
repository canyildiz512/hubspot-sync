import moment from 'moment';
import { getOwner } from '../services/api/owners';

export const parseMeetings = async (response = []) => {
    let owners = [];

    if (response.length > 0) {
        let ownerIds = response.map(res => res?.properties?.hubspot_owner_id);
        let uniqueIds = [...new Set(ownerIds)];

        owners = await Promise.all(uniqueIds.map(async (id) => {
            const resp = await getOwner(id);

            return { name: resp.data.firstName, id };
        }));
    };

    return response.map((res) => {
        let properties = res?.properties;

        return {
            id: res?.id,
            name: properties?.hs_meeting_title,
            time: properties?.hs_meeting_start_time,
            account: owners?.find((owner) => owner.id === properties?.hubspot_owner_id)?.name || properties?.hubspot_owner_id,
            next: properties?.hs_meeting_body
        };
    });
};

export const parseFilterParams = (obj, operator = 'CONTAINS_TOKEN') => {
    return Object.keys(obj).map((key) => {
        let value = obj[key];
        let opr = operator;

        if (key === 'hs_meeting_start_time') {
            value = moment.utc(value).valueOf();
            opr = 'GT';
        } else if (key === 'hs_meeting_end_time') {
            value = moment.utc(value).valueOf();
            opr = 'LT';
        } else if (key === 'hubspot_owner_id') {
            opr = 'EQ';
        }

        return {
            propertyName: key,
            operator: opr,
            value
        };
    });
}

export const removeEmptyStrings = (obj) => {
    for (var prop in obj) {
        if (typeof obj[prop] === 'string' && obj[prop].length === 0) {
            delete obj[prop];
        }
    }
    
    return obj;
}