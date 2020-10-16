import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { TeamPortrait } from '../../components/team_portrait/index';
import { ManageTeam } from '../../components/create_team/index';
import Axios from 'axios'

export const Container = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Team = () => {

    const [data, setData] = useState([])
    const [dataTeam, setDataTeam] = useState({})
    const [dataPokemons, setDataPokemons] = useState([])
    const [dataTrainer, setDataTrainer] = useState({})

    const location = useLocation()

    const addToTeam = (name, type, front_sprite) => setDataPokemons([...dataPokemons, { name, type, front_sprite }]) 
    const removeToTeam = (name) => setDataPokemons(dataPokemons.filter(el => el.name !== name)) 

    const requestSearchPokemon = (pokemon) => {
        Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
            .then(res => 
                setData([...data, { name: res.data.name, front_sprite: res.data.sprites.front_default, type: res.data.types[0].type.name }])
            )
            .catch(err => console.log('Erro!'))
    } 

    const submit = () => {
        Axios.put('http://localhost:3000/api/v1/teams/' + dataTeam.id, {
            trainer_id: dataTrainer.id,
            pokemons: [...dataPokemons]
        })
            .then(res => alert('Equipe atualizada com sucesso!'))
            .catch(err => console.log('Erro!: ', err))
    }

    useEffect(() => {
        setDataTeam(location.state.data_team)
        setDataPokemons(location.state.data_pokemons)
        setDataTrainer(location.state.data_trainer)
    }, [])

    return (
        <Container>
            <ManageTeam
                trainer_name={dataTrainer.name}
                trainer_image={dataTrainer.image}
                data={data}
                team={dataPokemons}
                remove={removeToTeam}
                add={addToTeam}
                searchPokemon={requestSearchPokemon}
                submit={submit}
            />
        </Container>
    )
}