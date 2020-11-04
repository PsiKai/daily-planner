import {
    GET_LIST,
    SET_ITEM,
    // SET_STYLE
} from "./types";
//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_LIST:
            return {
                ...state,
                list: action.payload.list,
                items: action.payload.items,
                date: action.payload.list
            }
        case SET_ITEM:
            return {
                ...state,
                items: action.payload.items,
                list: action.payload.list,
                date: action.payload.list
            }
        // case SET_STYLE:
        //     return {
        //         ...state,
        //         items: state.items.map((item, index) => {
        //             if (index === action.payload.id) {
        //                 return {...item, style: action.payload.style}
        //             } else {
        //                 return item
        //             }
        //         })
        //     }
        default:
            return state;
    }
};