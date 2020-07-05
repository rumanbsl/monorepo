import React from "react";

export default class Message extends React.Component {
  state: any;
  constructor() {
    super()
    this.state = {
      showPara: false
    }
  }
  render() {
    return (<React.Fragment>
      <a href="#" onClick={() => { this.setState({ showPara: !showPara }) }}>Want to buy a new car?</a>
      {this.state.showPara && <p>Call +11 22 33 44 now!</p>}
    </React.Fragment>);
  }
}

document.body.innerHTML = "<div id='root'> </div>";

const rootElement = document.getElementById("root");
ReactDOM.render(<Message />, rootElement);
