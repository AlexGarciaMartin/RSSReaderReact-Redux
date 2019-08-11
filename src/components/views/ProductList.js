import React, { Component } from 'react';
import { Button, Glyphicon, FormControl, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as uiActionCreators from '../../store/ui';
import * as RSSParser from 'rss-parser';
import '../../styles/style.css';
let parser = new RSSParser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

class ProductList extends Component {
  constructor() {
    super();
    this.addToRSS = this.addToRSS.bind(this);

    this.state = {
      rssPages: [],
      newsPanel: [],
      favourites: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <header className="header">
          <a href="https://github.com/AlexGarciaMartin/RSSReaderReact-Redux"><i class="fab fa-github" style={{float: 'right'}}></i></a>
            <h2>Lector de RSS</h2>
            <h3>Añade una URL de Feed:</h3>
            <input className="css-input"
              type="text"
              placeholder="ex: http://estaticos.elmundo.es/elmundo/rss/espana.xml"
              value={this.state.rssPages}
              onChange={this.onChangeText} 
              required
              />
            <div>
              <span className="button"
                type="button"
                onClick={() => this.addToRSS()}>
                +
              </span>
              <div class="arrow bounce">
                <img width="40" height="40" alt="" 
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4=" />
              </div>
            </div>
          </header>
          <aside className="aside aside-1"><h2>Canales añadidos:</h2>
            <ul>
              {this.state.favourites}
            </ul>
          </aside>
          <article className="main">
            <h1>Noticias: </h1>
            <div id="news" className="news">
              {this.state.newsPanel}
            </div>
          </article>
        </div>
      </React.Fragment>
    );
  }

  addToRSS = () => {
    this.props.addRss(this.state.rssPages)
    let feed = parser.parseURL(CORS_PROXY + this.state.rssPages, (err, feed) => {
      let news = document.querySelector('.news');
      feed !== undefined ?
        feed.items.map((entry) => {
          console.log(entry)
          // console.log(this.state.newsPanel)
          this.setState({ newsPanelNumber: this.state.newsPanel.push(<div><h4>{entry.title}</h4><a href={entry.link}>{entry.link}</a></div>) })
        }) : ''
    })
    this.createRssFavourites();
    return feed;
  }

  createRssFavourites = () => {
    let favouriteRSS = <li id="id-favourites" >{this.state.rssPages} </li>
    let ele = <button data-input="#id-favourites" className="delete" onClick={(e) => this.deleteRssFavourites(e)}>Borrar item</button>
    this.state.favourites.push(favouriteRSS, ele);
  }

  deleteRssFavourites = (e) => {
    const favouriteItem = document.querySelector(e.target.getAttribute("data-input"));
    const deleteItem = document.querySelector(".delete");
    favouriteItem.parentNode.removeChild(favouriteItem);
    deleteItem.parentNode.removeChild(deleteItem);
  }

  onChangeText = event => {
    this.setState({ rssPages: event.target.value })
  }
}

export default connect(state => ({ ...state.uiState }),
  dispatch => bindActionCreators(({ ...uiActionCreators.actionCreators }), dispatch))(ProductList)