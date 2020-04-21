import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const AddTaskForm = ({ list, onAddTask }) => {
	const [visibleForm, setFormVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const toggleFormVisible = () => {
		setFormVisible(!visibleForm);
		setInputValue('');
	};

	const addTask = () => {
		setIsLoading(true);
		axios.post('http://192.168.0.41:3001/tasks', {
			listId: list.id,
			text: inputValue,
			completed: false
		}).then(({ data }) => {
			onAddTask(list.id, data);
			toggleFormVisible();
		}).then(()=>{
			console.debug(`Задача '${inputValue}' успешно добавлена`);
		}).catch(() => {
			console.error('Ошибка при добавлении задачи!');
			alert('Ошибка при добавлении задачи!');
		}).finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className='tasks__form'>
			{ !visibleForm ? (
				<div onClick={ toggleFormVisible } className='tasks__add-new'>
					<FontAwesomeIcon icon={ 'plus' }
					                 color={ '#7F7E7E' }/>
					<span>Новая задача</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<input className='field' autoFocus
					       value={ inputValue }
					       type='text'
					       placeholder='Текст задачи'
					       onChange={ e => setInputValue(e.target.value) }/>
					<div className='buttons'>
						<button disabled={ isLoading } onClick={ addTask } className='button add-button'>
							{ isLoading ? 'Добавление...' : 'Добавить задачу' }
						</button>
						<button onClick={ toggleFormVisible } className='button cancel-button'>
							Отмена
						</button>
					</div>
				</div>
			) }
		</div>
	);
};

export default AddTaskForm;
