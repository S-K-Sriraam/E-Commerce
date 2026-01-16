import React, { Component } from 'react';

export default class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, linkUrl, author, date, source } = this.props;
    return (
      <div className="container mt-4">
        <div className="card">
          <img src={imageUrl} alt="not found" className="card-img-top" />

          <div className="card-body">
            <span
              className="badge rounded-pill bg-danger text-light"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "0px",
                top: "0px",
              }}
            >
              {source}
            </span>
            <h5 className="card-title text-success">
              {title ? title.slice(0, 50) + '...' : "No Title"}
            </h5>
            <p className="card-text">
              {description ? description.slice(0, 200) + '...' : "No description"}
            </p>
            <p>By: {author ? author : "Anonymous"}</p>
            <hr />
            <p>Published At: {new Date(date).toLocaleString()}</p>
            <a href={linkUrl} target="_blank" rel="noreferrer" className="btn btn-danger">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
