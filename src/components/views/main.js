import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as uiActionCreators from '../../store/ui';
import * as RSSParser from 'rss-parser';
import '../../styles/style.css';
import { type } from 'os';
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
            <a href="https://github.com/AlexGarciaMartin/RSSReaderReact-Redux" className="reset-a"><i class="fab fa-github iconClass" style={{ float: 'right' }}></i></a>
            <h2>Lector de RSS</h2>
            <h3>Añade una URL de Feed:</h3>
            <input className="css-input"
              type="text"
              placeholder="ex: https://www.eldiario.es/rss/"
              value={this.state.rssPages}
              onChange={this.onChangeText}
              required
            />
            <div>{this.state.rssPages.length > 0 &&
              <span className="button"
                type="button"
                onClick={() => this.addToRSS()}>
                +
              </span>
            }
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
    let source;
    let feed = parser.parseURL(CORS_PROXY + this.state.rssPages, (err, feed) => {
      let news = document.querySelector('.news');
      if(feed !== undefined)
        feed.items.map((entry) => {
          console.log(entry)
          if (entry.enclosure != undefined) {
            source = entry.enclosure.url
          } else {
            source = ""
          };
          this.setState({ newsPanelNumber: this.state.newsPanel.push(<React.Fragment><div><h4>{entry.title}</h4><img src={source}></img></div><div><a href={entry.link}>{entry.link}</a></div></React.Fragment>) })
        })
    })
    this.createRssFavourites();
    return feed;
  }

  createRssFavourites = () => {
    let ele = <button data-input="#id-favourites" className="delete" onClick={(e) => this.deleteRssFavourites(e)}>Eliminar canal</button>
    let favouriteRSS = <li id="id-favourites" ><a>{this.state.rssPages}</a>{ele}</li>;
    this.state.favourites.push(<div>{favouriteRSS}</div>);
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