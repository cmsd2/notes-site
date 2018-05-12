import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { withAuth } from "../Auth";
import config from "../config";
import * as Api from "../Api";
import "./NewNote.css";

export default withAuth(class NewNote extends Component {
  constructor(props) {
    super(props);

    this.api = new Api.Notes(props.auth);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("please pick a smaller file");
      return;
    }

    this.setState({
      isLoading: true
    });

    try {
      await this.api.post({
        content: this.state.content
      });

      this.props.history.push("/");
    } catch (e) {
      alert(e);

      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="content">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl
              onChange={this.handleFileChange}
              type="file"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."
          />
        </form>
      </div>
    )
  }
})
