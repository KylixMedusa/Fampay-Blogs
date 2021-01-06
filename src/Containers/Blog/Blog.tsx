import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser, { Options } from "react-html-parser";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Card from "../../Components/Card/Card";
import CircularProgressBar from "../../Components/CircularProgressBar/CircularProgressBar";
import { BlogCard } from "../../Interfaces";
import "./Blog.scss";
import defaultIcon from '../../static/default-avatar-logo.jpg';
import moment from "moment";

const json = require("./testBlog.json");

const Blog: React.FC<RouteComponentProps> = (props) => {
  //TODO:to take main blog json and recommended blogs from the backend 
  const mainBlog = json;
  const blogs: BlogCard[] = [
    {
      blog_id: "123456",
      author: "TopLeap",
      author_icon:
        "https://fampay.in/blog/content/images/size/w100/2020/11/logo.png",
      img:
        "https://fampay.in/blog/content/images/size/w600/2020/12/Tiara--Blog-3.png",
      title:
        "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
      tag: "Technology",
      createdAt: new Date(`2020-12-27T20:13:56.676+00:00`),
      timeRead: "3 mins read",
    },
    {
      blog_id: "123457",
      author: "TopLeap",
      author_icon:
        "https://fampay.in/blog/content/images/size/w100/2020/11/logo.png",
      img:
        "https://fampay.in/blog/content/images/size/w600/2020/12/Tiara--Blog-3.png",
      title:
        "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
      tag: "Technology",
      createdAt: new Date(`2020-12-27T20:13:56.676+00:00`),
      timeRead: "3 mins read",
    },
    {
      blog_id: "123458",
      author: "TopLeap",
      author_icon:
        "https://fampay.in/blog/content/images/size/w100/2020/11/logo.png",
      img:
        "https://fampay.in/blog/content/images/size/w600/2020/12/Tiara--Blog-3.png",
      title:
        "FamPay’s guide to digital payments for teens: Important Dos and Don'ts",
      tag: "Technology",
      createdAt: new Date(`2020-12-27T20:13:56.676+00:00`),
      timeRead: "3 mins read",
    },
  ];
  const scrollMeasurer = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  function scrollCheckHandler() {
    var maxScrollLength = 0;
    if (scrollMeasurer.current) {
      maxScrollLength = scrollMeasurer.current.getBoundingClientRect().height;
      let top = scrollMeasurer.current.offsetTop;
      let maxPercent = ((window.pageYOffset - top) / maxScrollLength) * 100;
      if (maxPercent >= 100) maxPercent = 100;
      setPercent(maxPercent);
    }
  }
  useEffect(() => {
    scrollCheckHandler();
    window.addEventListener("scroll", scrollCheckHandler);
    window.addEventListener("resize", scrollCheckHandler);
    return () => {
      window.removeEventListener("scroll", scrollCheckHandler);
      window.removeEventListener("resize", scrollCheckHandler);
    };
  }, []);
  useEffect(()=>{
    window.scrollTo({top:0});
  },[])
  const options: Options = {
    transform: (node, index) => {
      if (node.type === "tag" && node.name === "img") {
        return (
          <Zoom key={index}>
            <img src={node.attribs?.src ?? ""} alt={node.attribs?.alt} />
          </Zoom>
        );
      }
    },
  };
  return (
    <div className="blog-section">
      <header>
        <button
          className="page-button"
          title="Dashboard"
          onClick={() => props.history.push(`/u`)}
        >
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330 180"
              width="24"
              height="24"
            >
              <path d="M330,90a15,15,0,0,0-15-15H51.21l49.4-49.39A15,15,0,0,0,79.39,4.39l-75,75a15,15,0,0,0,0,21.22l75,75a15,15,0,1,0,21.22-21.22L51.21,105H315A15,15,0,0,0,330,90Z" />
            </svg>
          </i>
        </button>
      </header>
      <div className="main-picture-container">
        <div
          className="main-picture"
          style={{
            backgroundImage:
              `url(${mainBlog.img})`,
          }}
        ></div>
        <img
          src={mainBlog.img}
          alt=""
        />
      </div>
      <div className="blog-content" ref={scrollMeasurer}>
        <div className="title-section">
          <h1>{mainBlog.title}
          </h1>
          <div>
            <span>{mainBlog.tag}</span>
            <span>•</span>
            <span>{moment(mainBlog.createdAt).format('MMM D, YYYY')}</span>
          </div>
        </div>
        <div className="blog">
          <div className="sidebar-container">
            <div className="sidebar-wrapper">
              <button className="page-button">
                <i className="fa fa-linkedin"></i>
              </button>
              <button className="page-button">
                <i className="fa fa-twitter"></i>
              </button>
              <button className="page-button">
                <i className="fa fa-facebook"></i>
              </button>
              <button className="page-button">
                <i className="fa fa-whatsapp"></i>
              </button>
              <button className="page-button">
                <CircularProgressBar percent={percent} />
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 180 330"
                    width="24"
                    height="24"
                  >
                    <path d="M105,315V51.21l49.39,49.4a15,15,0,0,0,21.22-21.22l-75-75a15,15,0,0,0-21.22,0l-75,75a15,15,0,0,0,21.22,21.22L75,51.21V315a15,15,0,0,0,30,0Z" />
                  </svg>
                </i>
              </button>
            </div>
          </div>
          {ReactHtmlParser(mainBlog.html, options)}
        </div>
      </div>
      <div className="newsletter-container">
        <div className="newsletter-wrapper">
          <div>
            <h4>Subscribe to our newsletter</h4>
            <p>Get the latest posts delivered right to your inbox.</p>
          </div>
          <div>
            <form data-members-form="subscribe" id="newsletter-form">
              <div>
                <fieldset>
                  <label htmlFor="newsletter_input">Your email address</label>
                  <input
                    data-members-email=""
                    id="newsletter-input"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                </fieldset>
                <button id="newsletter_button" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="author-section">
        <div
          className="author-image"
          style={{
            backgroundImage:
              `url(${mainBlog.author_icon?mainBlog.author_icon:defaultIcon})`,
          }}
        ></div>
        <div className="author-links">
          <p>{mainBlog.author}</p>
          <p>
            <span className="fa fa-globe"></span>
            <span className="fa fa-facebook"></span>
            <span className="fa fa-twitter"></span>
          </p>
        </div>
      </div>
      <hr />
      <section className="blog-card-container">
        <h3>Recommended for you</h3>
        <div className="blog-card-wrapper">
          {blogs && blogs.length >= 1
            ? blogs.map((blog) => <Card {...blog} key={blog.blog_id}></Card>)
            : null}
        </div>
      </section>
    </div>
  );
};

export default withRouter(Blog);
