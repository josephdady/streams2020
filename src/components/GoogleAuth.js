import React from "react";
import { connect } from "react-redux";
import { Dropdown, Icon, DropdownMenu, Button } from "semantic-ui-react";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "892599370955-a8unpatsd4307vk17f3ve8vrf2pr2q4j.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      return this.props.signIn({
        userId: this.auth.currentUser.get().getId(),
        userName: this.auth.currentUser.get().getBasicProfile().getName(),
      });
    } else {
      return this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  splitUserName() {
    return this.props.userName.split(" ", 1);
  }

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      const trigger = (
        <span>
          <Icon name="user" /> Hello, {this.splitUserName()}
        </span>
      );
      return (
        <Dropdown trigger={trigger} button>
          <DropdownMenu>
            <Dropdown.Item disabled={true}>
              <span>
                Signed in as <strong>{this.props.userName}</strong>
              </span>
            </Dropdown.Item>
            <Dropdown.Item onClick={this.onSignOutClick}>
              <Icon name="sign-out" />
              Sign Out
            </Dropdown.Item>
          </DropdownMenu>
        </Dropdown>
      );
    } else {
      return (
        <Button color="red" onClick={this.onSignInClick}>
          <Icon name="google" />
          Sign In
        </Button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userName: state.auth.userName };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
