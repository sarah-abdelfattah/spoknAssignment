import React from "react";

export class Comment extends React.Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    email: this.props.email,
    body: this.props.body,
  };

  render() {
    return (
      <div className="comment-container">
        <h5>{this.state.name}</h5>
        <h6>{this.state.email}</h6>
        <p>{this.state.body}</p>
      </div>
    );
  }
}

export default Comment;
