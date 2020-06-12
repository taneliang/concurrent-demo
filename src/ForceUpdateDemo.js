import React from "react";

export class ForceUpdateDemo extends React.PureComponent {
  state = {
    count: 0,
  };

  makeForceUpdateTrigger = (shouldSetState, shouldForceUpdate) => () => {
    if (shouldSetState) {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    }
    if (shouldForceUpdate) {
      this.forceUpdate();
    }
  };

  render() {
    return (
      <>
        <h1>Force Update Demo</h1>
        <p>
          A class component that calls forceUpdate. The only way to force a
          component to update.
        </p>
        <pre>this.state = {JSON.stringify(this.state)}</pre>
        <button onClick={this.makeForceUpdateTrigger(true, false)}>
          setState only
        </button>
        <button onClick={this.makeForceUpdateTrigger(true, true)}>
          setState and forceUpdate
        </button>
        <button onClick={this.makeForceUpdateTrigger(false, true)}>
          forceUpdate only
        </button>
      </>
    );
  }
}
