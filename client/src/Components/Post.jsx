import React from "react";
import img from "../Assets/Images/stars.jpeg";

export class Post extends React.Component {
  state = {
    id: this.props.id,
    img: this.props.img,
    user: this.props.user,
    title: this.props.title,
    body: this.props.body,
  };

  render() {
    return (
      <div className="post-container">
        <img src={img} alt="stars"></img>
        <div className="info">
          <h4>{this.state.title}</h4>
          {/* <h6>{this.state.user}</h6> */}
          <p>{this.state.body}</p>
        </div>
      </div>
    );
  }
}

export default Post;
