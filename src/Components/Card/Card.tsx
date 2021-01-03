import React from "react";
import { BlogCard } from "../../Interfaces";
import "./Card.scss";
import moment from "moment";
import { RouteComponentProps, withRouter } from "react-router-dom";
import defaultIcon from '../../static/default-avatar-logo.jpg';

const Card: React.FC<BlogCard & RouteComponentProps> = (props) => {
  function format(val: Date) {
    return moment(val).fromNow();
  }
  return (
    <article className="blog-card" onClick={() => props.history.push(`/blog/${props.blog_id}`)}>
      <div
        className="card-picture"
        style={{ backgroundImage: `url(${props.img})` }}
      >
        <div
          className="author-icon"
          style={{ backgroundImage: `url(${props.author_icon?props.author_icon:defaultIcon})` }}
          title={props.author}
          onClick={(e) =>{ 
            e.preventDefault();
            e.stopPropagation();
            props.history.push(`/author/${props.author}`)}}
        ></div>
      </div>
      <div className="card-info">
        <small 
            className="card-tag"
            title={props.tag}
            onClick={(e) =>{ 
                e.preventDefault();
                e.stopPropagation();
                props.history.push(`/tag/${props.tag}`)}}
        >{props.tag}</small>
        <div>
          <h2 className="card-title" title={props.title}>
            {props.title}
          </h2>
        </div>
        <div className="card-timestamp">
          <span>{format(props.createdAt)}</span>
          <span>•</span>
          <span>{props.timeRead}</span>
        </div>
      </div>
    </article>
  );
};

export default withRouter(Card);
