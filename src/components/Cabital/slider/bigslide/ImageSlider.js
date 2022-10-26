import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { GrNext, GrPrevious } from 'react-icons/gr';


import './slide.css'

const ImageSlider = ({ slides, start }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;

	const nextSlide = () => {

		// setCurrent(current === length - 1 ? 0 : current + 1 );
		if ( current === length - 1) {
			return false
		} else  setCurrent(current + 1);
	};

	const prevSlide = () => {
		if ( current === 0) {
			return false
		} else  setCurrent(current - 1);
		// setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}



	return (<>
		<div className='slider'>
			<div className='dividant'>
				<i className='colou left-arrow '><GrPrevious onClick={() => prevSlide()} size={45} /></i> 
				<i className='right-arrow'><GrNext onClick={() => nextSlide()} size={45} /></i> 
			</div>
			{SliderData.map((slide, index) => {
				return (
					<div
						className={index === current ? 'slide active' : 'slide'}
						key={index}>
						{index === current && (
							<>
								<h2 className='slidetitle'>{slide.title}</h2>
								<img src={slide.image} alt='travel image' className='imageslide' />
								<p className='slidetext'>
									{slide.description}
								</p>
							</>
						)}
					</div>
				);
			})}
		</div>
		<button className='skip2' onClick={start}> Go to Cabital </button>
	</>
	);
};

export default ImageSlider;