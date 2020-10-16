import React from 'react'
import styled from 'styled-components';
import { CgPokemon } from 'react-icons/cg'
const Container = styled.nav`
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0px 25px;
    background-color: whitesmoke;
    color: white;
`;

export const Navbar = () => {
    return (
        <Container>
            <CgPokemon size="2em"/>
        </Container>
    )
}
