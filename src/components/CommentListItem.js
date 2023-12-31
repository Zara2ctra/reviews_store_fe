import React from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import {BiUserCircle} from "react-icons/bi";
import {format} from 'date-fns';
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useTranslation} from "react-i18next";

const CommentListItem = ({comment, handler, navigateUserPage, isAuth, isAdmin, user, themeColors}) => {
    const {t} = useTranslation();

    const isYourComment = comment.userId === user.id;

    const formatDate = (diffInMinutes, date) => {
        if (diffInMinutes < 1) {
            return t('less than a minute ago');
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} ${t('minutes ago')}`;
        } else if (diffInMinutes < 600) {
            return `${Math.floor(diffInMinutes / 60)} ${t('hours ago')}`;
        } else {
            return format(date, 'dd.MM.yyyy HH:mm');
        }
    }

    const getFormatDate = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return formatDate(diffInMinutes, date)
    };

    return (
        <ListGroup.Item
            style={{padding: 0, background: themeColors.background, border: "none", width: "100%",}}
            className={"d-flex"}
        >
            <Card
                style={{
                    color: themeColors.text,
                    backgroundColor: themeColors.background,
                    textAlign: "left",
                    width: "100%",
                }}
            >
                <Card.Header className={"d-flex justify-content-between g-3"}>
                    <Container style={{display: "flex", gap: "0.5rem"}}>
                        <BiUserCircle
                            style={{color: themeColors.text, fontSize: '2rem', cursor: isAuth ? "pointer" : ""}}
                            onClick={isAuth ?
                                () => navigateUserPage(comment.user.id)
                                :
                                () => isAuth}
                        />
                        {comment.user.name}
                    </Container>
                    {isYourComment || isAdmin ?
                        <Container
                            style={{fontSize: "0.8rem", display: "flex", justifyContent: "end", gap: "1rem"}}
                        >
                            {getFormatDate(new Date(comment.createdAt))}
                            <AiOutlineCloseCircle
                                style={{color: themeColors.text, fontSize: '1.5rem', cursor: "pointer"}}
                                onClick={() => handler(comment.id)}
                            />
                        </Container>
                        :
                        <Container
                            style={{fontSize: "0.8rem", display: "flex", justifyContent: "end"}}
                        >
                            {getFormatDate(new Date(comment.createdAt))}
                        </Container>
                    }
                </Card.Header>
                <Card.Title style={{padding: "10px 10px 10px 28px"}}>
                    {comment.comment_text}
                </Card.Title>
            </Card>
        </ListGroup.Item>
    )
};

export default CommentListItem;