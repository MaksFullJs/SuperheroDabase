import React from 'react';
import './SuperheroEdition.css';
import { editHero, getHero } from '../../api/api';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function SuperheroEdition() {

    const { id } = useParams();

    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState([]);
    const [superhero, setSuperhero] = useState({});
    const [images, setImages] = useState([]);
    const [formValues, setFormValues] = useState({
        nickname: '',
        realName: '',
        originDescription: '',
        superpowers: '',
        catchPhrase: '',
        images: []
    });

    useEffect(() => {

        const getHeroData = async (id) => {
            try {
                const response = await getHero(id);
                const data = response.data;
                setSuperhero(data);
                setImages(data.Images);
                setFormValues({
                    nickname: data.nickname || '',
                    realName: data.realName || '',
                    originDescription: data.originDescription || '',
                    superpowers: data.superpowers || '',
                    catchPhrase: data.catchPhrase || '',
                    images: data.Images || []
                });
            } catch (err) {
                console.log(err);
            }
        };
        getHeroData(id);
    }, [id]);

    const handleCheckboxChange = (url) => {
        setSelectedImages((prevSelected) => {
            if (prevSelected.includes(url)) {
                return prevSelected.filter((imageUrl) => imageUrl !== url);
            } else {
                return [...prevSelected, url];
            }
        });
    };

    const handleImageChange = (e) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            images: [...e.target.files]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in formValues) {
            if (key === 'images') {
                formValues.images.forEach((image) => {
                    formData.append('images', image);
                });
            } else {
                formData.append(key, formValues[key]);
            }
        }
        formData.append('imagesToRemove', JSON.stringify(selectedImages));

        try {
            const newHero = await editHero(id, formData);
        } catch (error) {
            console.error('Error editing superhero:', error);
        }
        navigate('/');
    };

    return (
        <div className='edition__page'>
            <div className='edition__form'>
                <h1>Superhero Edition</h1>
                <form>
                    <div>
                        <h4>Select images to delete:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {images.map((image, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <img src={image.url} alt="Superhero" width="100" />
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedImages.includes(image.url)}
                                            onChange={() => handleCheckboxChange(image.url)}
                                        />
                                        Delete
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='input__block'>
                        <div className='input__field'>
                            <label htmlFor="nickname">Nickname:</label>
                            <input value={formValues.nickname} onChange={handleInputChange} name='nickname' type='text' required></input>
                        </div>
                        <div className='input__field'>
                            <label htmlFor="realName">Real Name:</label>
                            <input value={formValues.realName} onChange={handleInputChange} name='realName' type='text' ></input>
                        </div>
                        <div>
                            <label htmlFor="superpowers">Superpowers:</label>
                            <textarea value={formValues.superpowers} onChange={handleInputChange} name='superpowers' />
                        </div>
                        <div className='input__field'>
                            <label htmlFor="catchPhrase">Catch Phrase:</label>
                            <input value={formValues.catchPhrase} onChange={handleInputChange} name='catchPhrase' type='text'></input>
                        </div>
                        <div>
                            <label htmlFor="originDescription">Origin Description:</label>
                            <textarea value={formValues.originDescription} onChange={handleInputChange} name='originDescription' />
                        </div>
                        <div>
                            <label>New Images:</label>
                            <input type="file" name="images" onChange={handleImageChange} accept="image/*" multiple />
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit} className='input__btn'>Edit</button>
            </div>
        </div>
    )
}

export default SuperheroEdition;