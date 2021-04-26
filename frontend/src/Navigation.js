import React, { useState } from 'react';
import logo from './images/logo.png';

import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { SubmitWeeklyAssessment } from './weekly-assessment/SubmitWeeklyAssessment';
import { ViewWeeklyAssessments } from './weekly-assessment/ViewWeeklyAssessments';
import { Home } from './Home';
import { About } from './About';
import { Login } from './common/Login';
import { Resources } from './resources/Resources';
import { Apps } from './resources/Apps';
import { useAuthState } from './Context';


export function Navigation() {
    const {user, token} = useAuthState();
    return (
      <>
        <Router>
            <Navbar collapseOnSelect expand='lg'>
                    <Navbar.Brand href="/"><img src={logo} alt="SJC" style={{width:100, height:100}} /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            {(token == null || token == "")
                                ? ''
                                : <Nav.Link as={Link} to="/submit-weekly-assessment">Submit Weekly Assessment</Nav.Link>}
                            {(token == null || token == "")
                                ? ''
                                : <Nav.Link as={Link} to="/view-weekly-assessments">View Weekly Assessments</Nav.Link>}
                            <Nav.Link as={Link} to="/">Add Goal</Nav.Link>
                            <Nav.Link as={Link} to="/">View Goals</Nav.Link>
                            <NavDropdown title="Learning Center">
                                <NavDropdown.Item as={Link} to="/resources">Resources</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/apps">Apps</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Login />
            </Navbar>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/resources' component={Resources} />
                <Route exact path='/apps' component={Apps} />
                <Route exact path='/submit-weekly-assessment' component={SubmitWeeklyAssessment} />
                <Route exact path='/view-weekly-assessments' component={ViewWeeklyAssessments} />
            </Switch>
        </Router>

      </>
    );
}
