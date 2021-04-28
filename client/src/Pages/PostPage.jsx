import React from "react";
import axios from "axios";
import Comment from "../Components/Comment";
import img from "../Assets/Images/stars.jpeg";

export class PostPage extends React.Component {
  state = {
    postTitle: "",
    postBody: "",
    comments: [],
  };

  async componentDidMount() {
    const postId = parseInt(document.location.pathname.split("/")[1]);
    let postInfo = (
      await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    ).data;

    this.setState({ postTitle: postInfo.title, postBody: postInfo.body });

    // let commentsCount = Math.floor(Math.random() * 100 + 1);

    // for (let i = 0; i < commentsCount; i++) {
    //   let randComment = Math.floor(Math.random() * 100 + 1);
    //   //   let newComment = (
    //   //     await axios.get(`https://jsonplaceholder.typicode.com/comments/${postId}`)
    //   //   ).data;
    //   //   comments.push();
    // }

    let comments = (
      await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${postId}/comments`
      )
    ).data;
    this.setState({ comments: comments });
  }

  render() {
    return (
      <div className="post-details-container">
        <div className="post-info">
          <img src={img} alt="stars"></img>
          <div className="info">
            <h5>{this.state.postTitle}</h5>
            <p>{this.state.postBody}</p>
          </div>
        </div>
        <div className="comments">
          {this.state.comments.map((comment) => (
            <Comment
              name={comment.name}
              email={comment.email}
              body={comment.body}
              key={comment.id}
            ></Comment>
          ))}
        </div>
      </div>
    );
  }
}

export default PostPage;
