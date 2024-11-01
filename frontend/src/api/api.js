import axios from 'axios';

export const getHeroes = async () => {
    return await axios.get('http://localhost:5050/api/superheroes');
}

export const createHero = async (superhero) => {
    return await axios.post('http://localhost:5050/api/superheroes', superhero, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteHero = async (id) => {
    return await axios.delete(`http://localhost:5050/api/superhero/${id}`);
}

export const getHero = async (id) => {
    return await axios.get(`http://localhost:5050/api/superhero/${id}`);
}

export const editHero = async (id, superhero) => {
    return await axios.put(`http://localhost:5050/api/superhero/${id}`, superhero, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}