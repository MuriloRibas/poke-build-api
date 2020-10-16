import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TeamPortrait } from '../team_portrait/index';
import { BsSearch } from 'react-icons/bs'
import Axios from 'axios';
import { Pokemon } from '../common/pokemon';

const Container = styled.div`
  
`;

const Input = styled.input`
    border:none;
`

const Label = styled.label`
    border: 1.5px solid gray;
    border-radius: 10px;
    padding: 15px;
    margin: 0px 16.5px;
    display: flex;
    align-items: center;
`

export const ManageTeam = ({ trainer_name, trainer_image, data, team, searchPokemon, add, remove, submit }) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (search.length > 0 && !data.some(e => e.name === search)) {
            searchPokemon(search)
        }
    }, [search])

    return (
        <Container>
            <TeamPortrait
                pokemons={team}
                trainer_name={trainer_name}
                trainer_image={trainer_image}
                onClickPokemon={(name) => remove(name)}
                isEditing
            />

            <Label>
                <BsSearch style={{ marginRight: '15px' }}/>                
                <Input 
                    type="text" 
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Exemplo: Pikachu"
                />
            </Label>

            <div>
                {
                    data
                        .filter(el => el.name === search)
                        .map((el2, i) => (
                            <Pokemon 
                                image={el2.front_sprite}
                                onClick={(e) => add(el2.name, el2.type, el2.front_sprite)}
                                add_animation
                                key={i}
                            >
                                {el2.name}
                            </Pokemon>
                        ))
                }
            </div>

            <button onClick={submit}>Pronto</button>
        </Container>
    )
}
