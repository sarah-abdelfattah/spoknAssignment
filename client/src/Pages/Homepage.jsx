import React from "react";
import Post from "../Components/Post";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import SearchField from "react-search-field";
import { ToastContainer, toast } from "react-toastify";
export class Homepage extends React.Component {
  state = {
    data: [],
    contentToDisplay: [],
    page: 1,
    filteredData: [],

    newTitle: "",
    newBody: "",
    tempId: "",

    viewAdd: false,
    viewModal: false,
  };

  handleDelete = (id) => {
    /* get index of item to be removed
    then remove it from data array using splice
    update corresponding states and pagination */

    var removeIndex = this.state.data.map((item) => item.id).indexOf(id);
    ~removeIndex && this.state.data.splice(removeIndex, 1);

    this.setState({ data: this.state.data, filteredData: this.state.data });
    toast.success("Post deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    this.handlePagination(this.state.page);
  };

  handleEdit = (id) => {
    // get post to be updated and show modal where new data to be updated
    this.setState({ viewModal: true, tempId: id });
    const foundPost = this.state.data.find((post) => post.id === id);
    this.setState({ newTitle: foundPost.title, newBody: foundPost.body });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitAdd = (e) => {
    /* create a new post object .. with random userId and id of length+1
    add it to the front of the array using unshift
    update corresponding states and pagination */

    let newPost = {
      userId: Math.floor(Math.random() * 10 + 1),
      id: parseInt(this.state.data.length) + 1,
      title: this.state.newTitle,
      body: this.state.newBody,
    };

    let data = this.state.data;
    data.unshift(newPost);

    this.setState({ data: [] });
    this.setState({ data: data, filteredData: data });

    toast.success("Post added successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    this.setState({ viewAdd: false, newTitle: "", newBody: "" });
    this.handlePagination(this.state.page);
  };

  handleSubmitEdit = async () => {
    /* get index of item to be updated
    update that object with found index in the array
    update corresponding states and pagination */

    let data = this.state.data;

    const index = data.findIndex((post) => post.id === this.state.tempId);
    data[index].title = this.state.newTitle;
    data[index].body = this.state.newBody;

    await this.setState({ data: data, filteredData: data });

    toast.success("Post updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    this.handlePagination(this.state.page);
    this.setState({ viewModal: false, newTitle: "", newBody: "" });
  };

  handleView = (event, id) => {
    /* check if the click event was on a button (edit - delete), if not direct the page  */

    console.log(event.target.nodeName);
    if (event.target.nodeName !== "BUTTON")
      document.location.href = window.location.origin + `/${id}`;
  };

  handleSearchOnChange = async (searchText) => {
    /* check if search text is empty, hence view all
    else, filter the data array, where the body or title contains a substring of searchText
    update corresponding states and pagination */

    let filteredData;
    if (searchText === "") filteredData = this.state.data;
    else {
      filteredData = await this.state.data.filter(
        (post) =>
          post.title.includes(searchText) || post.body.includes(searchText)
      );
    }

    this.setState({ filteredData: [] });
    this.setState({ filteredData: filteredData });
    this.handlePagination(this.state.page);
  };

  handlePagination = async (number) => {
    let page = parseInt(number);

    let contentToDisplay = [];
    for (
      let i = (page - 1) * 20;
      i < page * 20 && i < this.state.filteredData.length;
      i++
    ) {
      contentToDisplay.push(this.state.filteredData[i]);
    }

    this.setState({ contentToDisplay: [] });
    this.setState({ contentToDisplay, page });
  };

  async componentDidMount() {
    /* get posts using API and axios
    reverse data array, where the most recent post to be shown at the top
    getting start index of item to be displayed 
    content to display on each page is 20 items, depending on current page number
        number of contents is either the last couple of items left (<20) or 20 items
    update corresponding states and pagination */

    let data = (await axios.get("https://jsonplaceholder.typicode.com/posts"))
      .data;
    data = data.reverse();

    let min = Math.min(20, data.length);
    let contentToDisplay = [];
    for (let i = 0; i < min; i++) {
      contentToDisplay.push(data[i]);
    }

    this.setState({
      data: data,
      filteredData: data,
      contentToDisplay: contentToDisplay,
    });
  }

  // control div --> Pagination - search box - add button
  // newPost div --> shown when add button is clicked and hence viewAdd state is changed to true
  //             --> It shows the inputs for a new post
  // outer-container div --> the post items --> the array of data items is mapped to Post items (Post is a separate component)
  // editPost div --> shown when edit button is clicked and hence viewModal state is changed to true
  //             --> It shows the inputs with post data and making it editable to update is
  render() {
    return (
      <div className="homepage-container">
        <h1>What does it say?</h1>

        <div className="controls">
          <Pagination
            className="pagination"
            count={Math.ceil(this.state.filteredData.length / 20)}
            shape="rounded"
            hideNextButton="true"
            hidePrevButton="true"
            onClick={(event) => {
              this.handlePagination(event.target.textContent);
            }}
          />

          <SearchField
            placeholder="Search..."
            onChange={(event) => this.handleSearchOnChange(event)}
            classNames="test-class"
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
              onClick={(event) => this.handleView(event, post.id)}
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

        <ToastContainer />
      </div>
    );
  }
}

export default Homepage;
