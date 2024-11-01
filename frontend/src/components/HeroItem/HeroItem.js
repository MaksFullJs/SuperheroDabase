import React from 'react';
import { Card } from "antd";
import './HeroItem.css';
import { NavLink } from "react-router-dom";


function HeroItem({ id, nickname, images, onDelete }) {

    const deleteSuperhero = async (id) => {
        await onDelete(id);
    };

    return (
        <Card
            cover={
                <img className="hero__img" alt="card" src={images[images.length - 1].url} />
            }
            style={{ borderRadius: '15px', borderColor: 'blue'}}>

            <div className='hero__body'>
                <h1 className='hero__title'>{nickname}</h1>
                <div className='hero__btn-block'>
                    <NavLink to={`/hero/${id}`}>
                        <button className='hero__btn'>Info</button>
                    </NavLink>
                    <button onClick={() => deleteSuperhero(id)} className='hero__btn-delete'>Delete</button>
                    <NavLink to={`/edit/${id}`}>
                    <button className='hero__btn-delete'>Edit</button>
                    </NavLink>
                </div>
            </div>

        </Card>
    );
}

export default HeroItem;