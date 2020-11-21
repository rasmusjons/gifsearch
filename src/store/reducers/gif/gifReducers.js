import * as actions from "../../actions/gifActions";

const initialState = {
  isFetching: false,
  currentSearch: "",
  data: [],
  indexedData: {},
  error: null,
  getMore: true,
  pagination: {},
};

const gifs = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_GET_MORE:
      return {
        ...state,
        getMore: action.boolean,
      };

    case actions.GET_LOCAL_DATA:
      let { search } = action;
      let currentData = { ...state.indexedData };
      return {
        ...state,
        data: currentData[search],
      };

    case actions.FETCH_GIFS:
      return {
        ...state,
        isFetching: true,
      };

    case actions.FETCH_GIFS_SUCCESS:
      let { searchKey, gifUrls, pagination, getMore } = action.payload;
      let indexedData = {};
      indexedData[searchKey] = gifUrls;

      return {
        ...state,
        data: gifUrls,
        getMore,
        currentSearch: searchKey,
        pagination,
        indexedData: { ...state.indexedData, ...indexedData },
        isFetching: false,
      };

    case actions.ADD_GIFS_SUCCESS:
      let {
        gifUrls: urlsToAdd,
        searchKey: searchkey,
        pagination: paginat,
      } = action.payload;
      let indexedDataToAdd = {};
      indexedDataToAdd[searchkey] = urlsToAdd;

      return {
        ...state,
        pagination: paginat,
        data: [...state.data, ...urlsToAdd],
        indexedData: { ...state.indexedData, ...indexedDataToAdd },
        isFetching: false,
      };

    case actions.FETCH_GIFS_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default gifs;
