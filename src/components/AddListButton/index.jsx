import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import List from '../List';
import Badge from '../Badge';

import './AddListButton.scss';

library.add(fas);

const AddListButton = ({ colors, onAdd }) => {
	const [isVisiblePopup, setVisibilityPopup] = useState(false);
	const [selectedColor, selectColor] = useState(colors[0].id);
	const [listNameInputValue, setListNameInputValue] = useState('');

	const onClose = () => {
		setListNameInputValue('');
		setVisibilityPopup(false);
		selectColor(colors[0].id);
	};

	const addList = () => {
		if (!listNameInputValue) {
			alert('Введите название списка');
			return;
		}
		onAdd({
			id: Math.round(Math.random() * 100) + 10,
			name: listNameInputValue,
			colorId: selectedColor
		});
		onClose();
	};

	return (
		<div className='add-list'>
			<List onSelect={ () => setVisibilityPopup(true) }
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
					                 onClick={ onClose }/>
					<input className='field' autoFocus
					       type='text'
					       placeholder='Название списка'
					       value={ listNameInputValue }
					       onChange={ event => setListNameInputValue(event.target.value) }/>
					<div className='add-list__popup__colors'>
						{ colors.map(color => (
							<Badge key={ color.id }
							       className={ selectedColor === color.id && 'active' }
							       color={ color.name }
							       onClick={ () => selectColor(color.id) }
							/>
						)) }
					</div>
					<button className='button' onClick={ addList }>Добавить</button>
				</div>)
			}
		</div>
	);
};

export default AddListButton;
