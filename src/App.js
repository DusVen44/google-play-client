import React, { Component } from 'react';
import './App.css';
import PlayApp from './PlayApp/PlayApp';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: "",
      genre: "",
      error: null
    }
  }

  setSort(sort) {
    this.setState({
      sort
    })
  }

  setGenres(genre) {
    this.setState({
      genre
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genre) {
      params.push(`genres=${this.state.genre}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data
        })
      })
      .then(console.log(this.state.apps))
      .catch(err => {
        this.setState({
          error: 'Sorry, could not load apps at this time.'
        });
      })
  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <PlayApp {...app} key={i} />
    })
    return (
      <div>

        <h1>Google Play Apps</h1>

        <form onSubmit={e => this.handleSubmit(e)}>

          <label htmlFor="sort">Sort By: </label>
          <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
            <option value="">None</option>
            <option value="app">App Name</option>
            <option value="rating">Rating</option>
          </select>

          <label htmlFor="genres">Genre: </label>
          <select id="genres" name="genres" onChange={e => this.setGenres(e.target.value)}>
            <option value="">None</option>
            <option value="Action">Action</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Strategy">Strategy</option>
            <option value="Casual">Casual</option>
            <option value="Arcade">Arcade</option>
            <option value="Card">Card</option>
          </select>

          <button type="submit">Search</button>

        </form>

        <div>{this.state.error}</div>

        {apps}

      </div>
    )
  }
}
