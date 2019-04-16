import React from 'react';
import { Detector } from 'react-detect-offline';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { socketConnectionStatus } = state;
  return { socketConnectionStatus };
};

@connect(mapStateToProps)
class NetworkStatusMessage extends React.Component {
  render() {
    const { socketConnectionStatus } = this.props;
    return (
      <Detector
        render={({ online }) => (
          <div className={online && socketConnectionStatus === 'connected' ? 'text-success' : 'text-danger'}>
            {online && socketConnectionStatus === 'connected' ? 'Connected' : 'Trying to connect...'}
          </div>
        )}
      />
    );
  }
}

export default NetworkStatusMessage;
