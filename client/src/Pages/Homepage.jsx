import React from "react";
import Post from "../Components/Post";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
export class Homepage extends React.Component {
  state = {
    data: [],
    contentToDisplay: [],
    page: 1,
  };

  handlePagination = async (number) => {
    let page = parseInt(number);

    let contentToDisplay = [];
    for (
      let i = (page - 1) * 20;
      i < page * 20 && i < this.state.data.length;
      i++
    ) {
      await contentToDisplay.push(this.state.data[i]);
    }

    this.setState({ contentToDisplay: [] });
    this.setState({ contentToDisplay, page });
  };

  async componentDidMount() {
    let data = (await axios.get("https://jsonplaceholder.typicode.com/posts"))
      .data;

    let min = Math.min(20, data.length);
    let contentToDisplay = [];
    for (let i = 0; i < min; i++) {
      contentToDisplay.push(data[i]);
    }

    this.setState({ data: data, contentToDisplay: contentToDisplay });
  }

  render() {
    return (
      <div className="homepage-container">
        <h1>What does it say?</h1>

        <Pagination
          className="pagination"
          count={Math.ceil(this.state.data.length / 20)}
          shape="rounded"
          hideNextButton="true"
          hidePrevButton="true"
          onClick={(event) => {
            this.handlePagination(event.target.textContent);
          }}
        />

        <div className="outer-container">
          {this.state.contentToDisplay.map((post) => (
            <Post title={post.id} body={post.body}></Post>
          ))}
        </div>
      </div>
    );
  }
}

export default Homepage;
