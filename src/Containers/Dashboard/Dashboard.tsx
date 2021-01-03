import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { BlogCard } from "../../Interfaces";
import "./Dashboard.scss";

const Dashboard: React.FC<any> = (props) => {
  //TODO:to get the blogs from the backend paginated
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

  const currentPage: number = parseInt(props.match.params.no) || 1;
  const totalPages = 6;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="dashboard">
      <section className="top">
        <div className="background-picture"></div>
        <div className="content">
          <h1>UnRead by FamPay</h1>
          <p>FamPay's blog page of unread, raw and inspiring stories</p>
          <form className="form">
            <input
              type="email"
              className="form__field"
              placeholder="Your E-Mail Address"
              required
              name="email"
              id="mail"
            />
            <button type="submit" className="btn btn--primary btn--inside">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <section className="blog-card-container">
        <div className="blog-card-wrapper">
          {blogs && blogs.length >= 1
            ? blogs.map((blog) => <Card {...blog} key={blog.blog_id}></Card>)
            : null}
        </div>
      </section>
      <div className="pageholder">
        {currentPage > 1 ? (
          <button
            className="page-button"
            title="Previous Page"
            onClick={() => props.history.push(`/page/${currentPage - 1}`)}
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
        ) : null}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <button
            className="page-button"
            title="Next Page"
            onClick={() => props.history.push(`/page/${currentPage + 1}`)}
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
                width="24"
                height="24"
              >
                <path d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255  s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0  c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z" />
              </svg>
            </i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
