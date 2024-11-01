
import React from 'react';
import './ImageItem.css';

function ImageItem({ id, url }) {
    return (
        <img alt='heroImage' className='image' src={url} />
    );
}

export default ImageItem;