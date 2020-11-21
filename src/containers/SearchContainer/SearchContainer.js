import React, { Component } from "react";
import Search from "../../components/Search/Search";
import { fetchGifsThunk } from "../../store/thunks/gifThunks";
import { connect } from "react-redux";
import * as actions from "../../store/actions/gifActions";
import debounceAction from "debounce-action";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as helper from "../../helpers/helpers";

class SearchContainer extends Component {
  state = {
    input: "",
  };

  componentDidMount() {
    this.props.setGetMore(false);
    this.props.fetchData(
      helper.getRandomLetter() + helper.getRandomLetter(),
      0,
      false
    );
    this.props.setGetMore(true);
  }

  fetchData = () => {
    if (this.state.input in this.props.indexedData) {
      this.props.getIndexedData(this.state.input);
      return;
    }
    this.props.setGetMore(false);
    this.props.fetchData(this.state.input, 0, false);
  };

  onInputChange = (event) => {
    let input = event.target.value;
    this.setState({ input }, () => {
      this.fetchData();
    });
  };

  render() {
    return (
      <Row className="justify-content-md-center mt-5">
        <Col md={8} sm={12}>
          <Search
            inputChange={this.onInputChange}
            input={this.state.input}
          ></Search>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  indexedData: state.gifs.indexedData,
});

const fetchDataDebounced = debounceAction(fetchGifsThunk, 300);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (input, offset, getMore) =>
      dispatch(fetchDataDebounced(input, offset, getMore)),
    getIndexedData: (search) =>
      dispatch({ type: actions.GET_LOCAL_DATA, search }),
    setGetMore: (boolean) => dispatch({ type: actions.SET_GET_MORE, boolean }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
