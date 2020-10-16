import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import CreateTrainer from '../../components/create_trainer';
import { ManageTeam } from '../../components/create_team/index';
import { IoMdArrowBack } from 'react-icons/io'
import Axios from 'axios';

const Container = styled.div` 
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: center;
    align-items: center;
`;


export const Start = () => {

    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState(localStorage.getItem('trainer') || {
        name: '',
        age: 18,
        gender: 'Male',
        file: ''
    })

    const [data, setData] = useState([])
    const [team, setTeam] = useState([])

    const addToTeam = (name, type, front_sprite) => setTeam([...team, { name, type, front_sprite }]) 
    const removeToTeam = (name) => setTeam(team.filter(el => el.name !== name)) 

    const requestSearchPokemon = (pokemon) => {
        Axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
            .then(res => 
                setData([...data, { name: res.data.name, front_sprite: res.data.sprites.front_default, type: res.data.types[0].type.name }])
            )
            .catch(err => console.log('Erro!'))
    } 

    const handleSubmitNewTrainer = (e) => {
        e.preventDefault();
        const { name, age, gender, file } = inputs
        Axios.post('http://localhost:3000/api/v1/trainers/', {
            name,
            age,
            gender,
            file
        })
            .then(res => {
                setLocalstorageJsonData('trainer', { ...res.data.data.attributes, id: res.data.data.id })    
                setStep(2)
            })
            .catch(err => console.log('Erro!: ', err))
       
    }

    const handleNewTeam = (e) => {
        Axios.post('http://localhost:3000/api/v1/teams', {
            trainer_id: JSON.parse(localStorage.getItem('trainer')).id,
            pokemons: team
        })
            .then(res => alert('Equipe criada com sucesso!'))
            .catch(err => console.log('erro>>: ', err))
    
    }

    const setLocalstorageJsonData = (key, val) => localStorage.setItem(key, JSON.stringify(val))


    
    useEffect(() => {
        if (data.length > 0) {
            setLocalstorageJsonData('data', data)
        }
    }, [data])

    useEffect(() => {
        if (team.length > 0) {
            setLocalstorageJsonData('team', team)
        }
    }, [team])

    useEffect(() => {
        if (step > 1) {
            localStorage.setItem('step', step)
        }
    }, [step])

    useEffect(() => {
        if (localStorage.getItem('step')) {
            setStep(parseInt(localStorage.getItem('step')))
        }

        if (localStorage.getItem('trainer')) {
            setInputs(JSON.parse(localStorage.getItem('trainer')))
        }

        if (localStorage.getItem('data') !== null && localStorage.getItem('data') !== "" && localStorage.getItem('data') !== undefined) {
            setData(JSON.parse(localStorage.getItem('data')))
        }
        
        if (localStorage.getItem('team') !== null && localStorage.getItem('team') !== "" && localStorage.getItem('team') !== undefined) {
            setTeam(JSON.parse(localStorage.getItem('team')))
        }
    }, [])

    return (
        <Container>
            {step === 1 &&
                <CreateTrainer 
                    name={inputs.name}
                    age={inputs.age}
                    gender={inputs.gender}
                    image={inputs.image}
                    change={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                    changeFile={e => setInputs({ ...inputs, [e.target.name]: e.target.files })}
                    submit={handleSubmitNewTrainer}
                />
            }

            {step === 2 &&
                <>
                    <IoMdArrowBack 
                        style={{ position: 'absolute', bottom: '0', left: '0', margin: '40px', cursor: 'pointer' }}
                        size="2em"
                        onClick={() => setStep(1)}
                    />

                    <ManageTeam
                        trainer_name={inputs.name}
                        trainer_image={inputs.image}
                        team={team}
                        data={data}
                        searchPokemon={requestSearchPokemon}
                        add={addToTeam}
                        remove={removeToTeam}
                        submit={handleNewTeam}
                    />
                    

                </>
            }
        </Container>
    )
}
