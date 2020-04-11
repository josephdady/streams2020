import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Icon, Button } from "semantic-ui-react";

import GoogleAuth from "./GoogleAuth";

class Header extends React.Component {
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Menu.Item>
          <Button
            as={Link}
            to="/streams/new"
            content="Create Stream"
            color="green"
            icon="plus"
            labelPosition="right"
            floated="right"
            size="tiny"
          />
        </Menu.Item>
      );
    }
  }
  render() {
    return (
      <Menu>
        <Menu.Item className="header" as={Link} to="/">
          <Icon name="video" size="large" />
          Streamy
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          <Icon name="file video outline" size="large" />
          All Streams
        </Menu.Item>
        <Menu.Menu position="right">
          {this.renderCreate()}
          <Menu.Item>
            <GoogleAuth />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Header);
