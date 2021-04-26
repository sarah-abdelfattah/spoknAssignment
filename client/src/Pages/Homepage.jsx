import React from "react";
import Post from "../Components/Post";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { InputLabel, Input, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
export class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
  }

  state = {
    data: [],
    contentToDisplay: [],
    page: 1,

    newTitle: "",
    newBody: "",
    tempId: "",

    viewAdd: false,
    viewModal: false,
  };

  handleDelete = (id) => {
    var removeIndex = this.state.data.map((item) => item.id).indexOf(id);
    ~removeIndex && this.state.data.splice(removeIndex, 1);

    this.setState({ data: this.state.data });
    this.handlePagination(this.state.page);
  };

  handleEdit = (id) => {
    this.setState({ viewModal: true, tempId: id });
    const foundPost = this.state.data.find((post) => post.id === id);
    this.setState({ newTitle: foundPost.title, newBody: foundPost.body });
  };

  handleEditBtn = (id) => {
    this.setState({ viewModal: true });
    const foundPost = this.state.data.find((post) => post.id === id);
    this.setState({ newTitle: foundPost.title, newBody: foundPost.body });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitAdd = (e) => {
    let newPost = {
      userId: Math.floor(Math.random() * 10 + 1),
      id: parseInt(this.state.data.length) + 1,
      title: this.state.newTitle,
      body: this.state.newBody,
    };
    let data = this.state.data;
    data.unshift(newPost);

    this.setState({ data: [] });

    this.setState({ data });
    this.handlePagination(this.state.page);
    this.setState({ viewAdd: false });
  };

  handleSubmitEdit = () => {
    let data = this.state.data;

    const index = data.findIndex((post) => post.id === this.state.tempId);

    data[index].title = this.state.newTitle;
    data[index].body = this.state.newBody;

    this.setState({ data: [] });

    this.setState({ data });
    this.handlePagination(this.state.page);
    this.setState({ viewModal: false });
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
    data = data.reverse();

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

        <div className="controls">
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
          <button
            className="addBtn"
            onClick={() => this.setState({ viewAdd: true })}
          >
            Add a new post
          </button>
        </div>

        {this.state.viewAdd ? (
          <div className="newPost">
            <h4>Add a new Post</h4>
            <br />
            <TextField
              label="Title"
              fullWidth="true"
              variant="outlined"
              name="newTitle"
              value={this.state.newTitle}
              onChange={this.handleChange}
              aria-describedby="my-helper-text"
            />

            <TextField
              label="Body"
              fullWidth="true"
              multiline="true"
              name="newBody"
              value={this.state.newBody}
              onChange={this.handleChange}
              aria-describedby="my-helper-text"
              variant="outlined"
            />

            <Button className="btn" onClick={this.handleSubmitAdd}>
              ADD POST
            </Button>
          </div>
        ) : null}

        <div className="outer-container">
          <h4>Posts</h4>

          {this.state.contentToDisplay.map((post) => (
            <Post
              title={post.title}
              body={post.body}
              key={post.id}
              handleDelete={() => this.handleDelete(post.id)}
              handleEdit={() => this.handleEdit(post.id)}
            ></Post>
          ))}
        </div>

        {this.state.viewModal ? (
          <div className="edit-modal">
            <div className="edit-modal-container">
              <h4>Edit Post</h4>
              <br />
              <TextField
                label="Title"
                fullWidth="true"
                variant="outlined"
                name="newTitle"
                value={this.state.newTitle}
                onChange={this.handleChange}
                aria-describedby="my-helper-text"
              />

              <TextField
                label="Body"
                fullWidth="true"
                multiline="true"
                name="newBody"
                value={this.state.newBody}
                onChange={this.handleChange}
                aria-describedby="my-helper-text"
                variant="outlined"
              />

              <Button className="btn" onClick={this.handleSubmitEdit}>
                EDIT POST
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Homepage;
