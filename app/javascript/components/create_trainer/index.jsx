import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
    position: relative;
    padding: 15px;
    width: 400px;
    background-color: gray;
    margin-left: 400px;
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 400px;
        min-height: 300px;
        background: url(${require('../../assets/trainer.png')});
        background-size: cover;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || 'column'};
    margin: ${props => props.margin || '10px 0px'};
`

const InputText = styled.input`

`

const InputSubmit = styled.input`
    
`

const Label = styled.label`

`

const CreateTrainer = ({ name, age, gender, image, change, submit, changeFiles }) => {
    return (
        <Form onSubmit={submit}>
                
            <h1>Crie seu treinador</h1>
            <p>Antes de montar sua equipe, crie um treinador pokemon.</p>

            <InputContainer>
                <Label htmlFor="name">Nome:</Label>
                <InputText 
                    id="name" 
                    type="text" 
                    placeholder="Nome" 
                    name="name" 
                    value={name} 
                    onChange={change} 
                    required
                />
            </InputContainer>

            <InputContainer>
                <Label htmlFor="age">Idade:</Label>
                <input 
                    id="age" 
                    name="age" 
                    type="number" 
                    value={age}
                    placeholder="Idade" 
                    onChange={change} 
                    required
                />
            </InputContainer>


            <InputContainer>
                <Label htmlFor="image">Imagem:</Label>
                <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/png, image/jpeg" 
                    onChange={changeFiles}
                />
            </InputContainer>

            <InputContainer>
                <InputContainer direction="row" margin="5px 0px">
                    <input 
                        id="gender-male" 
                        type="radio" 
                        name="gender" 
                        value="Male" 
                        checked={gender === 'Male'}
                        onChange={change}
                    />
                    <Label htmlFor="gender-male">Masculino</Label>
                </InputContainer>
                <InputContainer direction="row" margin="5px 0px">
                    <input 
                        id="gender-female" 
                        type="radio" 
                        name="gender" 
                        value="Female" 
                        checked={gender === 'Female'}
                        onChange={change}
                    />
                    <Label htmlFor="gender-female">Feminino</Label>
                </InputContainer>
            </InputContainer>
            
            <InputSubmit type="submit" value="Continuar"/>
        </Form>
    )
}

export default CreateTrainer
