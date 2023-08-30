import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {FiMoon, FiSun} from "react-icons/fi";
import { BiSearchAlt, BiUserCircle} from "react-icons/bi"

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const isDarkMode = user.themeMode === "dark";
    const themeColors = user.themeColors;
    const navigate = useNavigate();

    function handleClickAuthorization() {
        navigate(LOGIN_ROUTE);
    }

    function handleClickRegistration() {
        navigate(REGISTRATION_ROUTE);
    }

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <Container>
                <NavLink style={{color: themeColors.text}} to={MAIN_ROUTE}>REVIEWS STORE</NavLink>
                <Form className="d-flex">
                    <Form.Control
                        data-bs-theme={user.themeMode}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button
                        variant={user.themeMode}
                    >
                        <BiSearchAlt/>
                    </Button>
                </Form>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <NavDropdown
                            data-bs-theme={user.themeMode}
                            style={{color: themeColors.text}}
                            title={
                            <BiUserCircle
                                style={{color: themeColors.text, fontSize: '2rem'}}
                            />
                        }
                        >
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Add new review</NavDropdown.Item>
                            <NavDropdown.Item>Some text</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item
                                onClick={() => logOut()}
                            >Sign out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={user.themeMode}
                            className={"m-lg-1"}
                            onClick={handleClickAuthorization}
                        >
                            Authorization
                        </Button>
                        <Button
                            variant={user.themeMode}
                            className={"m-lg-1"}
                            onClick={handleClickRegistration}
                        >
                            Registration
                        </Button>
                    </Nav>
                }
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={isDarkMode ?
                        <FiMoon
                            style={{color: themeColors.text}}
                            onClick={() => user.setThemeMode()}
                        />
                        :
                        <FiSun
                            style={{color: themeColors.text}}
                            onClick={() => user.setThemeMode()}
                        />
                        }
                    onClick={() => user.setThemeMode()}
                />
            </Container>
        </Navbar>
    )
});

export default NavBar;