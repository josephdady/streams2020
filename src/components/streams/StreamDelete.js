import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import { deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  handelDelete = () => {
    const { id } = this.props.stream;
    this.props.deleteStream(id);
    this.props.handleClose();
  };

  renderModal() {
    if (this.props.open) {
      return (
        <Modal
          dimmer="blurring"
          size="tiny"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <Header
            icon="trash alternate"
            content={`Delete ${this.props.stream.title}`}
          />
          <Modal.Content>
            <p>{`Are you sure you want to delete this stream?`}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.handleClose}>Cancel</Button>
            <Button onClick={this.handelDelete} negative>
              <Icon name="checkmark" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  }

  render() {
    return <div>{this.renderModal()}</div>;
  }
}

export default connect(null, {
  deleteStream,
})(StreamDelete);
