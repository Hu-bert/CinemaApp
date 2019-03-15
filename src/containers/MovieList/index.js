import React, { Component } from "react";
import styled from "styled-components";

import MovieItem from "../../components/MovieItem/";
import Loading from "../../components/Loading";
import * as moviesApi from "../../helpers/movieApi";

const Header = styled.h1`
  color: gray;
  text-align: center;
  margin-bottom: 25px;
`;
const CheckBoxs = styled.div`
  height: 55px;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
  white-space: nowrap;
`;
const Label = styled.label`
  width: 100%;
`;

class MovieList extends Component {
  componentDidMount = async () => {
    const movies = await moviesApi.getAll();
    const categories = await moviesApi.getCategories();
    const formats = await moviesApi.getFormats();
    this.setState({ movies, categories, formats, filteredMovies: movies });
  };

  static defaultProps = {
    movies: null,
    title: "Cinema repertoire"
  };

  state = {
    movies: this.props.movies,
    categories: [],
    formats: [],
    filteredMovies: null,
    searchText: "",
    categoriesChecked: [],
    formatsChecked: []
  };

  categoriesCheckedEvent(event) {
    let checkedArray = this.state.categoriesChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      this.setState({
        categoriesChecked: checkedArray
      });
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);

      this.setState({
        categoriesChecked: checkedArray
      });
    }
    this.setState({
      filteredMovies: this.getFilteredMovies(
        this.state.searchText,
        this.state.categoriesChecked,
        this.state.formatsChecked
      )
    });
  }

  formatsCheckedEvent(event) {
    let checkedArray = this.state.formatsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      this.setState({
        formatsChecked: checkedArray
      });
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);

      this.setState({
        formatsChecked: checkedArray
      });
    }
    this.setState({
      filteredMovies: this.getFilteredMovies(
        this.state.searchText,
        this.state.categoriesChecked,
        this.state.formatsChecked
      )
    });
  }

  filterMovies(e) {
    const text = e.currentTarget.value;
    const filteredMovies = this.getFilteredMovies(
      text,
      this.state.categoriesChecked,
      this.state.formatsChecked
    );
    this.setState({
      filteredMovies,
      searchText: text
    });
  }

  getFilteredMovies(text, categoriesChecked, formatsChecked) {
    return this.state.movies
      .filter(
        movie =>
          !categoriesChecked.some(
            categorie => !movie.categories.includes(categorie)
          )
      )
      .filter(
        movie =>
          !formatsChecked.some(format =>
            movie.showings.map(showing => !showing.movieFormat.includes(format))
          )
      )
      .filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));
  }

  render() {
    const { title } = this.props;
    const { movies, filteredMovies, categories, formats } = this.state;

    let categoriesCheckboxes = categories.map((categorie, i) => (
      <div>
        <CheckBox
          value={categorie}
          id={"categorie_" + i}
          onChange={this.categoriesCheckedEvent.bind(this)}
        />
        <Label htmlFor={"categorie_" + i}>{categorie}</Label>
      </div>
    ));

    let formatsCheckboxes = formats.map((format, i) => (
      <div>
        <CheckBox
          value={format}
          id={"format" + i}
          onChange={this.formatsCheckedEvent.bind(this)}
        />
        <Label htmlFor={"format" + i}>{format}</Label>
      </div>
    ));

    return (
      <div key={this.props.key}>
        <Header>{title}</Header>

        <div className="row">
          <div className="col-12 mb-3">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <input
                          onInput={this.filterMovies.bind(this)}
                          className="form-control"
                          placeholder="Search movie"
                        />
                      </div>
                      <div className="col-4">
                        <CheckBoxs>
                          Category:
                          {categoriesCheckboxes}
                        </CheckBoxs>
                      </div>
                      <div className="col-4">
                        <CheckBoxs>
                          Format:
                          {formatsCheckboxes}
                        </CheckBoxs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {movies ? (
            <MovieFilteredList movieList={filteredMovies} />
          ) : (
            <Loading text={"cinema repertoir"} />
          )}
        </div>
      </div>
    );
  }
}

class CheckBox extends React.Component {
  render() {
    return (
      <input
        type="checkbox"
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

const MovieFilteredList = ({ movieList }) => {
  if (movieList.length > 0) {
    return movieList.map(movie => {
      const id = movie.id;
      const title = movie.title;
      const categories = movie.categories;
      const duration = movie.duration;
      const ageLimit = movie.ageLimit;
      let formatstab = [];
      for (var i = 0, len = movie.showings.length; i < len; ++i) {
        formatstab.push(movie.showings[i].movieFormat);
      }
      const formats = formatstab;
      return (
        <MovieItem
          key={id}
          id={id}
          title={title}
          categories={categories}
          duration={duration}
          ageLimit={ageLimit}
          formats={formats}
        />
      );
    });
  }

  return (
    <div className="col-12 text-center">
      <h6>No results!</h6>
    </div>
  );
};

export default MovieList;
