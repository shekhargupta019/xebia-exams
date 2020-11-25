import React from "react";
import axios from "axios";
import _ from "lodash";
import Planet from "./Planet";

class Search extends React.Component {
  state = { searchTerm: "", planetSelected: null, searchResults: [] };

  onSearchChange = (e) => {
    const searchTerm = e.target.value || "";
    this.setState({ searchTerm });
  };

  fetchResults = async () => {
    if (!this.state.searchTerm) return;
    const response = await axios.get(`/api/planets/${this.state.searchTerm}`);
    this.setState({
      searchResults: response.data.results,
      planetSelected: null,
    });
  };

  displaySelectedPanetDetails(planet) {
    this.setState({
      planetSelected: planet,
      searchResults: [],
    });
  }

  renderSearchResults() {
    if (!this.state.searchResults.length) return null;

    return (
      <>
        {this.state.searchResults.map((item) => {
          return (
            <div
              className="card bg-light text-dark"
              onClick={() => {
                this.displaySelectedPanetDetails(item);
              }}
              style={{ marginBottom: 10 }}
            >
              <div className="card-body">{item.name}</div>
            </div>
          );
        })}
      </>
    );
  }

  render() {
    return (
      <div>
        <h4 className="text-danger">Search Your Planet</h4>
        <div className="input-group">
          <input
            className="form-control mr-sm-2 rounded-lg"
            type="search"
            aria-label="Search"
            name="searchTerm"
            placeholder="Planet..."
            value={this.state.searchTerm}
            onChange={this.onSearchChange}
            style={{ width: 300 }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.fetchResults}
          >
            Search
          </button>
        </div>
        <br />
        {this.renderSearchResults()}
        {this.state.planetSelected && (
          <Planet planet={this.state.planetSelected} />
        )}
      </div>
    );
  }
}

export default Search;
