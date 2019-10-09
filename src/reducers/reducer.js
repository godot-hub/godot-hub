import GODOT_HUB_TYPE from '../types/GODOT_HUB_TYPE';

const reducer = (state, action) => {
    switch(action.type) {
        case GODOT_HUB_TYPE:
            return {
                ...state,
                project: action.payload.action
            }
        default:
            return state;
    }
};

export default reducer;