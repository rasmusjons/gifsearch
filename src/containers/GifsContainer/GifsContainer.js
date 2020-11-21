import React, { Component } from "react";
import { connect } from "react-redux";
import Gif from "../../components/Gif/Gif";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonBlock from "../../components/UI/Button/ButtonBlock";
import { fetchGifsThunk } from "../../store/thunks/gifThunks";
import * as actions from "../../store/actions/gifActions";
import debounceAction from "debounce-action";

class GifsContainer extends Component {
  state = {
    offset: 0,
  };
  fetchMoreGifs = () => {
    let offset = this.state.offset + 25;

    this.setState({ offset }, () => {
      this.props.fetchData(
        this.props.currentSearch,
        this.state.offset.toString(),
        true
      );
    });
  };

  render() {
    const { data } = this.props;
    let noGifsToLoad =
      this.props.totalCount <= this.state.offset ? true : false;

    let gifs1 = null;
    let gifs2 = null;
    let gifs3 = null;

    if (data.length !== 0) {
      const oneThird = Math.ceil(data.length / 3);

      gifs1 = data
        .slice(0, oneThird)
        .map((url, index) => (
          <Gif key={index} src={url} className="pt-1 pb-1" />
        ));
      gifs2 = data
        .slice(oneThird, 2 * oneThird)
        .map((url, index) => (
          <Gif key={index} src={url} className="pt-1 pb-1" />
        ));
      gifs3 = data
        .slice(2 * oneThird, 3 * oneThird)
        .map((url, index) => (
          <Gif key={index} src={url} className="pt-1 pb-1" />
        ));
    }

    let noResults = null;
    if (
      data.length === 0 &&
      !this.props.loading &&
      this.props.currentSearch.length !== 0
    ) {
      noResults = <h5> No gifs was found. Try different search word</h5>;
    }

    return (
      <div>
        <Row className="justify-content-md-center mt-5">{noResults}</Row>
        {this.props.loading && this.props.getMore === false ? (
          <Row className="justify-content-md-center mt-5">
            <Spinner animation="grow" variant="primary" />
          </Row>
        ) : (
          <div className="mb-4">
            <Row>
              <Col md={4} xs={6} className="d-flex flex-column p-1">
                {gifs1}
              </Col>
              <Col md={4} xs={6} className="d-flex flex-column p-1">
                {gifs2}
              </Col>
              <Col md={4} className="flex-column p-1 d-none d-sm-flex">
                {gifs3}
              </Col>
            </Row>
            <hr></hr>
            {data.length !== 0 ? (
              <ButtonBlock
                size={"lg"}
                clicked={this.fetchMoreGifs}
                disabled={noGifsToLoad}
              >
                {noGifsToLoad ? "End of the line :(" : "Load more gifs..."}
              </ButtonBlock>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.gifs.data,
  loading: state.gifs.isFetching,
  currentSearch: state.gifs.currentSearch,
  getMore: state.gifs.getMore,
  totalCount: state.gifs.pagination.total_count,
});

const fetchDataDebounced = debounceAction(fetchGifsThunk, 400);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (input, offset, getmore) =>
      dispatch(fetchDataDebounced(input, offset, getmore)),
    setGetMore: (boolean) => dispatch({ type: actions.SET_GET_MORE, boolean }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GifsContainer);
