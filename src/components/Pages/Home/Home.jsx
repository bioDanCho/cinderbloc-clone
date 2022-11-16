import React, { useState, useEffect } from 'react';
import { getHeight, getWidth } from '../../../utils/functions';
import { mediaData } from '../../../assets/data/mediaData';
import './Home.scss';
import NavModal from '../../NavModal/NavModal';

const Home = () => {
    const [isAnimDone, setIsAnimDone] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: getWidth(),
        height: getHeight(),
    });
    const [imagePosition, setImagePosition] = useState({
        x: 0,
        y: 0,
    });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAnimDone(true);
        }, 4500);
    }, []);

    const handleMouseMove = (e) => {
        let posX = e.clientX;
        let posY = e.clientY;

        if (
            Math.abs(imagePosition.x - posX) > 80 ||
            Math.abs(imagePosition.y - posY) > 80
        ) {
            setImagePosition({
                x: posX,
                y: posY,
            });

            setCurrentImageIndex((prevState) => {
                return (prevState + 1) % mediaData.length;
            });
        }

        setDimensions({
            width: Math.abs(getWidth() - posX * 2), // x2 to account for left and right resizing
            height: Math.abs(getHeight() - posY * 2), // x2 to account for top and bottom resizing
        });
    };

    const renderSquare = (fromNumber) => {
        let nextNumber = fromNumber - 1;
        if (nextNumber > 0) {
            return (
                <div
                    className={`Home_squares ${
                        (!isAnimDone || isNavOpen) && 'Home_hide'
                    }`}
                    style={{
                        width: `${
                            dimensions.width -
                            dimensions.width * 0.05 * (20 - fromNumber)
                        }px`,
                        height: `${
                            dimensions.height -
                            dimensions.height * 0.05 * (20 - fromNumber)
                        }px`,
                        border: `${
                            fromNumber === 20 ? 'none' : '1px solid #000'
                        }`,
                        '--opacity': `${1 - 0.01 * (20 - fromNumber)}`,
                    }}
                >
                    {renderSquare(nextNumber)}
                </div>
            );
        }
    };

    return (
        <div
            className='Home_wrapper'
            onMouseMove={(e) => handleMouseMove(e)}
            onClick={() => setIsNavOpen(true)}
        >
            <div
                className={`Home_ciderblocTextWrapper ${
                    (isAnimDone || isNavOpen) && 'Home_hide'
                }`}
            >
                <div className='Home_block_section'>
                    <div className='Home_block'>.</div>
                    <div className='Home_text'>CINDER</div>
                </div>
                <div className='Home_block_section'>
                    <div className='Home_block'>.</div>
                    <div className='Home_text'>BLOC</div>
                    <div className='Home_line'></div>
                </div>
            </div>
            {renderSquare(20)}

            {isAnimDone &&
                imagePosition.x !== 0 &&
                imagePosition.y !== 0 &&
                mediaData.map((media, idx) => {
                    return (
                        <div
                            key={idx}
                            className={`Home_image ${media.orientation} ${
                                currentImageIndex === idx && 'Home_showImage'
                            } ${isNavOpen && 'Home_hide'}`}
                            style={{
                                top: `${imagePosition.y}px`,
                                left: `${imagePosition.x}px`,
                                '--imageUrl': `url(${media.imgUrl})`,
                            }}
                        >
                            {idx === 6 && (
                                <video loop muted autoPlay>
                                    <source
                                        src={media.imgUrl}
                                        type='video/webm'
                                    />
                                </video>
                            )}
                        </div>
                    );
                })}
            {isNavOpen && (
                <NavModal onCloseClick={() => window.location.reload()} />
            )}
        </div>
    );
};

export default Home;
