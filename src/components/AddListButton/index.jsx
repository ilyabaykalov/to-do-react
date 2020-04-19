import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import List from '../List';
import Badge from '../Badge';

import './AddListButton.scss';

library.add(fas);

const AddListButton = ({ colors }) => {
	const [isVisiblePopup, setVisibilityPopup] = useState(true);
	const [selectedColor, selectColor] = useState(colors[0].id);

	return (
		<div className='add-list'>
			<List onClick={ () => setVisibilityPopup(true) }
			      items={ [
				      {
					      className: 'add-list__button',
					      icon: { name: 'plus', color: '#7C7C7C' },
					      name: 'Добавить список'
				      }
			      ] }/>
			{ isVisiblePopup && (
				<div className='add-list__popup'>
					<FontAwesomeIcon className={ 'add-list__popup__close-button' }
					                 icon={ 'times-circle' }
					                 color={ '#7F7E7E' }
					                 onClick={ () => setVisibilityPopup(false) }/>
					<input className='field'
					       type='text'
					       placeholder='Название списка'/>
					<div className='add-list__popup__colors'>
						{ colors.map(color => (
							<Badge key={ color.id }
							       className={ selectedColor === color.id && 'active' }
							       color={ color.name }
							       onClick={ () => selectColor(color.id) }
							/>
						)) }
					</div>
					<button className='button'>Добавить</button>
				</div>)
			}
		</div>
	);
};

export default AddListButton;
