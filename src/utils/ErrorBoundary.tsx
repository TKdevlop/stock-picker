import { Button, Row, Typography } from "antd";
import { Component } from "react";

class ErrorBoundary extends Component<{ children?: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    //Log error
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Row
          justify="center"
          style={{ flexDirection: "column", marginTop: 50 }}
        >
          <Typography.Title level={4}>Something went wrong</Typography.Title>

          <Button onClick={this.reloadPage} type="primary">
            Reload
          </Button>
        </Row>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
