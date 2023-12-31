import React from 'react';
import {Button, Form, Row, Toast} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useGoogleLogin} from "@react-oauth/google";
import {AiFillGithub, AiFillGoogleCircle} from "react-icons/ai";
import {useTranslation} from "react-i18next";

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

const AuthForm = ({isLogin, formData, handleChange, handleSubmit, themeColors, themeMode, showErr, setShowErr}) => {
    const {t} = useTranslation();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const loginToGithub = () => {
        localStorage.removeItem("token")
        localStorage.setItem("loginWith", "GitHub")
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`)
    }

    const loginToGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            localStorage.removeItem("token")
            localStorage.setItem("loginWith", "Google")
            localStorage.setItem("accessToken", tokenResponse.access_token)
            window.location.reload()
        },
        onError: errorResponse => {
            console.log(errorResponse)
        }
    })

    return (
        <Form className="d-flex flex-column" data-bs-theme={themeMode} onKeyPress={handleKeyPress}>
            <Form.Group controlId="formEmail">
                <Form.Control
                    className="mt-3"
                    placeholder={t("Enter your email address...")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Control
                    className="mt-3"
                    placeholder={t("Enter your password...")}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                />
            </Form.Group>
            {!isLogin && (
                <Form.Group controlId="formName">
                    <Form.Control
                        className="mt-3"
                        placeholder={t("Enter your name...")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
            )}
            <Row className="d-flex justify-content-between mt-3" style={{width: "100%"}}>
                <div>
                    {isLogin ? (
                        <>
                            {t("No account?")}{" "}
                            <NavLink to={REGISTRATION_ROUTE} style={{color: themeColors.text}}>
                                {t('Sign up')}
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {t("Got an account?")}{" "}
                            <NavLink to={LOGIN_ROUTE} style={{color: themeColors.text}}>
                                {t('Log in')}
                            </NavLink>
                        </>
                    )}
                </div>
                <div style={{display: "contents"}}>
                    <Toast onClose={() => setShowErr(false)} show={showErr} delay={2000} autohide bg={themeMode}>
                        <Toast.Header>
                            <strong className="me-auto">{formData.err}</strong>
                        </Toast.Header>
                    </Toast>
                    <Button
                        className="mt-3 ms-3"
                        onClick={handleSubmit}
                        variant={themeMode}
                    >
                        {isLogin ? t('Log in') : t('Sign up')}
                    </Button>
                    <Button
                        className="mt-3 ms-3 d-flex"
                        onClick={() => loginToGithub()}
                        variant={themeMode}
                    >
                        <AiFillGithub style={{fontSize: "2rem"}}/> GitHub
                    </Button>
                    <Button
                        className="mt-3 ms-3 d-flex"
                        onClick={() => loginToGoogle()}
                        variant={themeMode}
                    >
                        <AiFillGoogleCircle style={{fontSize: "2rem"}}/> Google
                    </Button>
                </div>
            </Row>
        </Form>
    );
};

export default AuthForm;