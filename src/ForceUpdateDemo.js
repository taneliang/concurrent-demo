import React from "react";

function DoubleCascader() {
  const [didMount, setDidMount] = React.useState(false);
  React.useLayoutEffect(() => setDidMount(true), [setDidMount]);
  return <div>DoubleCascader did mount: {didMount}</div>;
}

export class ForceUpdateDemo extends React.PureComponent {
  state = {
    count: 0,
    didMount: false,
  };

  componentDidMount() {
    // A cascading class component state update
    this.setState({ didMount: true });
  }

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
          component to update. Also creates 2 nested cascading updates.
        </p>
        <DoubleCascader />
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
