import React from 'react';
import './GalleryHeader.scss';

const GalleryHeader = ({ title, onNavButtonClick, currentImage }) => {
    return (
        <div
            className='GalleryHeader_wrapper'
            style={{
                '--color': `${currentImage > 1 ? '#FFF' : '#000'}`,
            }}
        >
            <div className='GalleryHeader_title'>{title}</div>
            <button onClick={onNavButtonClick}>
                <span className='GalleryHeader_topLine'></span>
                <span className='GalleryHeader_space'></span>
                <span className='GalleryHeader_botLine'></span>
            </button>
        </div>
    );
};

export default GalleryHeader;
