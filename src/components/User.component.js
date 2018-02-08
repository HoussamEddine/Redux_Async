import React from "react";
import Proptypes from 'prop-types';
import glamorous from "glamorous";


const Container = glamorous.div({
  marginTop: "50px",
  textAlign: "center"
})
const Avatar = glamorous.div({
  height: "35vh",
  width: "20vw",

});
const H2 = glamorous.h2({
  fontSize: "1.2em"
})
const BigText = glamorous.h1({
  fontSize: "4rem",
  color: "#adaaaa"
});
const Img = glamorous.img({
  height: "100%",
  width: "100%",
  borderRadius: "50%"
})
class User extends React.Component {
  render() {

    const UserSection = this.props.dataReady ? (
      <Container>
        <Avatar>
          <Img src={this.props.url} alt={this.props.alt} />
        </Avatar>
        <H2>Followers: {this.props.followers} </H2>
        <H2>Following: {this.props.following}</H2>
        <H2>Public Repos: {this.props.publicRepos}</H2>
        <H2> Company: {this.props.company}</H2>
      </Container>) :
      (<Container >
        <BigText>{this.props.text} </BigText>
      </Container>);
    return (
      UserSection
    );
  }
}
User.propTypes = {
  url: Proptypes.string,
  alt: Proptypes.string,
  followers: Proptypes.number,
  following: Proptypes.number,
  publicRepos: Proptypes.number,
  company: Proptypes.string,
  dataReady: Proptypes.bool,
  text: Proptypes.string
}
export default User;