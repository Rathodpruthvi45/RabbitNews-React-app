import React, { Component } from 'react'

export default class NewsItem extends Component {
  

  render() {
    let { title, description, imageUrl, newsUrl,author,date,source } = this.props;
    return (
      <div>
        <div className="card mt-5">
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'88%',zIndex:1}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-muted">
                by {author} on {date}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
