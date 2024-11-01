
import React from 'react';
import Header from '../../components/Header/Header';
import HeroItem from '../../components/HeroItem/HeroItem';
import './Home.css';
import { getHeroes } from '../../api/api';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteHero } from '../../api/api';

function Home() {

    const navigate = useNavigate();

    const MAX_NUMBER_OF_VIEW_MORE_HEROES = 5;
    const [heroes, setHeroes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {

        const getHeroesData = async () => {
            try {
                const response = await getHeroes();
                setHeroes(response.data);
                if (response.data.length > 10) {
                    setVisible(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getHeroesData();
    }, []);

    const showMoreItems = () => {
        const newCount = Math.min(visibleCount + MAX_NUMBER_OF_VIEW_MORE_HEROES, heroes.length);
        setVisibleCount(newCount);

        if (newCount >= heroes.length) {
            setVisible(false);
        }
    };

    const createSuperhero = () => {
        navigate('/create');
    }

    const deleteSuperhero = async (id) => {
        await deleteHero(id);
        setHeroes((prev) => prev.filter(hero => hero.id !== id));
    };

    return (
        <>
            <Header></Header>
            <button onClick={createSuperhero} className='home__create-btn'>Create Superhero</button>
            <section className='home__section'>
                <div className='container'>
                    <div className='home__block'>
                        {heroes.slice(0, visibleCount).map(({ id, nickname, Images }, idx) => (
                            <HeroItem
                                id={id}
                                nickname={nickname}
                                images={Images}
                                key={idx}
                                onDelete={deleteSuperhero}
                            />
                        ))}
                    </div>
                    {visible && (
                        <div className='home__block-with-btn'>
                            <button onClick={showMoreItems} className='home__btn'>View more</button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;
