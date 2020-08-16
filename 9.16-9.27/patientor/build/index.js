"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("semantic-ui-css/semantic.min.css");
const App_1 = __importDefault(require("./App"));
const state_1 = require("./state");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
react_dom_1.default.render(<state_1.StateProvider reducer={state_1.reducer}>
    <App_1.default />
  </state_1.StateProvider>, document.getElementById('root'));
