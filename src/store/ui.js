const addRSSType = "ADD_RSS";

const initialState = {

    rssPages: []
};

export const actionCreators = {
    addRss: (url) => ({ type: addRSSType, value: url }),
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case addRSSType:
            return{...state, rssPages: state.rssPages.concat(action.value) }
        default:
            return state;           
    }
};


