import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100vw;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
    color: white;
`;

export const Header = () => {
    return (
        <Container>
            Crie sua equipe!
            <Link to="/start">
                <button>Começar</button>
            </Link>
        </Container>
    )
}
