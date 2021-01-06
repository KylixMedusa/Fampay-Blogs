import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { BlogCard } from "../../Interfaces";
import "./Tag.scss";

const Tag: React.FC<any> = (props) => {
  //TODO: To get the current tag details and blogs from backend 
  const currentTag = {
    name:"Technology",
    desc:"Introducing Payments and Finance for teens and families, explore Unread archives to start early!"
  }
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
    {
      blog_id: "123459",
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

  useEffect(()=>{
    window.scrollTo({top:0});
  },[])

  return (
    <div className="tag">
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
      <section className="top">
        <div className="background-picture"></div>
        <div className="content">
          <h1>{currentTag.name}</h1>
          <p>{currentTag.desc}</p>
        </div>
      </section>
      <section className="blog-card-container">
        <div className="blog-card-wrapper">
          {blogs && blogs.length >= 1
            ? blogs.map((blog) => <Card {...blog} key={blog.blog_id}></Card>)
            : null}
        </div>
      </section>
    </div>
  );
};

export default withRouter(Tag);
