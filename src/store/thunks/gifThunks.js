import * as gifs from "../actions/gifActions";
import { APIROUTE } from "../../consts/apiRoutes";
import axios from "axios";

export const fetchGifsThunk = (search, offset, getmore) => (dispatch) => {
  dispatch(gifs.fetchGifs());
  axios
    .get(APIROUTE + `&q=${search}` + `&offset=${offset}`)
    .then((response) => {
      const gifUrls = response.data.data
        .map((image) => image.images)
        .map((image) => image.downsized.url);
      const pagination = response.data.pagination;
      return { gifUrls, pagination };
    })
    .then((res) => {
      const { gifUrls, pagination } = res;
      //Load more...
      if (getmore) {
        dispatch(
          gifs.addGifsSuccess({
            gifUrls,
            searchKey: search,
            pagination,
          })
        );
        return;
      }
      //New Search
      else {
        dispatch(
          gifs.fetchGifsSuccess({
            gifUrls,
            searchKey: search,
            pagination,
          })
        );
      }
    })
    .catch((response) => dispatch(gifs.fetchGifsError(response)));
};
