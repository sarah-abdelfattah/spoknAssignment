import React from "react";
import Post from "../Components/Post";
import axios from "axios";

export class Homepage extends React.Component {
  state = {
    data: [],
  };

  //   handleChange = async (e) => {
  //     await this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   handleSubmit = async () => {
  //     const body = {
  //       startDate: `${this.state.startDate}`,
  //       endDate: `${this.state.endDate}`,
  //       percentage: `${this.state.percentage}`,
  //     };

  //   };

  async componentDidMount() {
    let data = (await axios.get("https://jsonplaceholder.typicode.com/posts"))
      .data;

    this.setState({ data });
  }

  render() {
    return (
      <div className="homepage-container">
        <h1>What does it say?</h1>
        <div className="outer-container">
          {this.state.data.length > 0 &&
            this.state.data.map((post) => (
              <Post title={post.title} body={post.body}></Post>
            ))}

          {/* <Post title="title" body="defghjgfds" user="Sarah" />
          <Post title="title" body="defghjgfds" user="Sarah" />
          <Post title="title" body="defghjgfds" user="Sarah" />
          <Post title="title" body="defghjgfds" user="Sarah" /> */}
        </div>
      </div>
    );
  }
}

export default Homepage;
