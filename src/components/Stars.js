import React from 'react';
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
import {Container} from "react-bootstrap";

const Stars = ({stars}) => {
    const ratingStar = Array.from({length: 5}, (elem, index) => {
        let number = index + 0.5;

        return <span key={index}>
            {
                stars >= index + 1
                    ? <FaStar/>
                    : stars >= number
                    ? <FaStarHalfAlt/>
                    : <AiOutlineStar/>
            }
        </span>


    });


    return <Container>
        {ratingStar}
        <p>{stars} average</p>
    </Container>
};

export default Stars;