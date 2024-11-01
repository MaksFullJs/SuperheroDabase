import Header from '../../components/Header/Header';
import './SuperheroPage.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getHero } from '../../api/api';
import ImageItem from '../../components/ImageItem/ImageItem';

function SuperheroPage() {

    const { id } = useParams();

    const [superhero, setSuperhero] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {

        const getHeroData = async (id) => {
            try {
                const response = await getHero(id);
                console.log(response.data.Images);
                setImages(response.data.Images);
                console.log(response.data);
                setSuperhero(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getHeroData(id);
    }, [id]);

    return (
        <>
            <Header></Header>
            <section className='hero__section'>
                <div className='container'>
                    <div className='hero__title-block block'>
                        <h1 className='hero__nickname'>Nickname: {superhero.nickname}</h1>
                    </div>
                    <div className='hero__images-block'>
                        <h3>Pictures:</h3>
                        <div className='hero__images'>
                            {images.map(({ id, url }) => (
                                <ImageItem
                                    id={id}
                                    url={url}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='hero__name-block block'>
                        <h3 className='hero__name'>Real name: {superhero.realName}</h3>
                    </div>
                    <div className='hero__name-block block'>
                        <h5 className='hero__desc'>Description:</h5>
                        <p className='hero__text'>{superhero.originDescription}</p>
                    </div>
                    <div className='hero__name-block block'>
                        <h5 className='hero__desc'>Superpowers:</h5>
                        <p className='hero__text'>{superhero.superpowers}</p>
                    </div>
                    <div className='hero__name-block block'>
                        <h5 className='hero__desc'>Catch phrase:</h5>
                        <p className='hero__text'>{superhero.catchPhrase}</p>
                    </div>

                </div>
            </section>
        </>

    )
}

export default SuperheroPage;