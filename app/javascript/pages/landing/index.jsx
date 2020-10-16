import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/navbar';
import { Header } from '../../components/header';
import { TeamPortrait } from '../../components/team_portrait/index';
import { PortraitsLayout } from '../../components/portraits_layout';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import { TrainerPortrait } from '../../components/trainer_portrait';

const ContainerRadios = styled.div` 
    width: 300px;
    display: flex;
    margin: 15px 0px 0px 122px;

`;

const Input = styled.input`
    border: none;

`

const Label = styled.label`
    padding: 5px;
    background-color: gray;
    border: 1px solid gray;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    & > * {
        color: white;
    }
`

export const Landing = () => {
    const [contentType, setContentType] = useState('teams')

    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(false);


    const history = useHistory()

    const request = (type) => 
        Axios.get('http://localhost:3000/api/v1/' + type)
            .then(res => {
                console.log(res)  
                setFeed(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log('Erro! ', err)
                setLoading(false)
            })

    const handleContentType = (e) => setContentType(e.target.value)

    const findTrainer = (team, trainers) => {
        console.log(team)
        console.log(trainers)
        const result = trainers.filter(el => el.id === team.relationships.trainer.data.id)
        return result[0].attributes
    }

    useEffect(() => {
        console.log(contentType)
        setLoading(true)
        request(contentType)
    }, [contentType])

    return (
        <>
            <Header/>

            <ContainerRadios>
                <Label htmlFor="content-type-teams">
                    <Input 
                        id="content-type-teams" 
                        type="radio" 
                        name="content" 
                        value="teams" 
                        checked={contentType === 'teams'}
                        onChange={handleContentType}
                    />
                    <span>Equipes</span>
                </Label>
                <Label htmlFor="content-type-trainers">
                    <Input 
                        id="content-type-trainers" 
                        type="radio" 
                        name="content" 
                        value="trainers" 
                        checked={contentType === 'trainers'}
                        onChange={handleContentType}
                    />
                    <span>Treinadores</span>
                </Label>
            </ContainerRadios>

            {contentType === 'teams' && 
                <PortraitsLayout>
                    {!loading && feed.data && feed.data.length > 0 && feed.data[0].type === 'team' && feed.data.map((el, i) =>
                        <TeamPortrait
                            trainer_name={findTrainer(el, feed.included).name}
                            onClickComp={() => {
                                const data_trainer = findTrainer(el, feed.included)
                                return history.push('/team/' + el.id, { data_team: { ...el.attributes, id: el.id }, data_pokemons: el.attributes.pokemons, data_trainer  })}
                            } 
                            pokemons={el.attributes.pokemons}
                        />
                    )}
                </PortraitsLayout>
            }

            {contentType === 'trainers' && 
                <PortraitsLayout>
                    {!loading && feed.data && feed.data.length > 0 && feed.data[0].type === 'trainer' && feed.data.map((el, i) =>
                        <TrainerPortrait
                            name={el.attributes.name}
                            image={el.attributes.image}
                        />
                    )}
                </PortraitsLayout>
            }
        </>
    )
}
