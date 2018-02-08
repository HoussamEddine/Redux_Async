import React from "react";
import PropTypes from 'prop-types';
import glamorous from "glamorous";


const InputElem = glamorous.input({
  height: "25px",
  width: "40vw",
  border: "none",
  borderBottom: "1px solid #4da2c3",
  borderRight: "1px solid #4da2c3",
  borderRadius: "6px 0 6px 0",
  outline: "none",
  background: "#fff",
  margin: "0 140px",
  padding: "2.5%",
  fontSize: "1.3em",
  fontStyle: "oblique",
  color: "#654545",
  textAlign: "center"

});

class Input extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(e) {
    this.props.callbackParent(e.target.value);
    this.props.changeHandler();
  }
  render() {
    return (
      <div>
        <InputElem onChange={this.changeHandler} />
      </div>
    );
  }
}
Input.propTypes = {
  changeHandler: PropTypes.func,
  callbackParent: PropTypes.func
}
export default Input;

