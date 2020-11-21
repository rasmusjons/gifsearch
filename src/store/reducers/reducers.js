import { combineReducers } from "redux";
import gifReducers from "./gif/gifReducers";

const rootReducer = combineReducers({
  gifs: gifReducers,
});

export default rootReducer;
