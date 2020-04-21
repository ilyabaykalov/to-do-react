import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Badge } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './AddListButton.scss';

library.add(fas);

const AddListButton = ({ colors, onAdd }) => {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, selectColor] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectColor(colors[0].id);
		}
	}, [colors]);

	const onClose = () => {
		setVisiblePopup(false);
		setInputValue('');
		selectColor(colors[0].id);
	};

	const addList = () => {
		if (!inputValue) {
			console.error('Отсутствует название списка');
			alert('Отсутствует название списка');
			return;
		}
		setIsLoading(true);
		axios.post('http://192.168.0.41:3001/lists', {
			name: inputValue.capitalize(),
			colorId: selectedColor
		}).then(({ data }) => {
			const color = colors.filter(c => c.id === selectedColor)[0].name;
			const tasks = [];
			const listObj = { ...data, color: { name: color }, tasks: tasks };
			onAdd(listObj);
			onClose();
		}).then(() => {
			console.debug(`Список задач '${inputValue}' успешно добавлен`);
		}).catch(() => {
			console.error('Ошибка при добавлении списка!');
			alert('Ошибка при добавлении списка!');
		}).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className='add-list'>
			<List
				onClick={ () => setVisiblePopup(true) }
				items={ [{
					className: 'add-list__button',
					icon: { name: 'plus', color: '#7C7C7C' },
					name: 'Добавить список'
				}] }/>
			{ visiblePopup && (
				<div className='add-list__popup'>
					<FontAwesomeIcon className={ 'add-list__popup__close-button' }
					                 icon={ 'times-circle' }
					                 color={ '#7F7E7E' }
					                 onClick={ onClose }/>
					<input className='field' autoFocus
					       type='text'
					       placeholder='Название списка'
					       value={ inputValue }
					       onChange={ event => setInputValue(event.target.value) }/>

					<div className='add-list__popup__colors'>
						{ colors.map(color => (
							<Badge key={ color.id }
							       className={ selectedColor === color.id && 'active' }
							       color={ color.name }
							       onClick={ () => selectColor(color.id) }
							/>
						)) }
					</div>
					<button onClick={ addList } className='button'>
						{ isLoading ? 'Добавление...' : 'Добавить' }
					</button>
				</div>
			) }
		</div>
	);
};

export default AddListButton;
