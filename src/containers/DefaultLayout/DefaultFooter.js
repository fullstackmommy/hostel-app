import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const {children} = this.props;

    return (
      <React.Fragment>
        <span>Hostel App</span>
        <span className="ml-auto">Powered by
          <a href="https://coreui.io/react">CoreUI for React</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
