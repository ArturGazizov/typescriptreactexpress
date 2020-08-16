"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const initialState = {
    patients: {}
};
exports.StateContext = react_1.createContext([
    initialState,
    () => initialState
]);
exports.StateProvider = ({ reducer, children }) => {
    const [state, dispatch] = react_1.useReducer(reducer, initialState);
    return (<exports.StateContext.Provider value={[state, dispatch]}>
      {children}
    </exports.StateContext.Provider>);
};
exports.useStateValue = () => react_1.useContext(exports.StateContext);
