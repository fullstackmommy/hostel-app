import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const {children} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{
          src: logo,
          width: 89,
          height: 25,
          alt: 'Logo'
        }}
          minimized={{
          src: sygnet,
          width: 30,
          height: 30,
          alt: 'Logo'
        }}/>
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/" className="nav-link">Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>Admin
            </DropdownToggle>
            <DropdownMenu right style={{
              right: 'auto'
            }}>

              <DropdownItem
                onClick={e => this
                .props
                .onLogout(e)}>
                <i className="fa fa-lock"></i>
                Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
