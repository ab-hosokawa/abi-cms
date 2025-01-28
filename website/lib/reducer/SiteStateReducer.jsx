export const siteStateReducerFunction = (state, action) => {
    switch (action.type) {
        case 'SET_SITE_STATE':
            return {
                ...state,
                ...action.payload,
            };
        case 'SET_GROUP_DATA':
            return {
                ...state,
                groupData: action.payload,
            };
        default:
            return state;
    }
}

export const siteInitialState = (data) =>{
    // console.log('siteStateInitialState:', data);
    if (!data) {
        return {};
    }
    return {
        ...data.contents,
    };
}
