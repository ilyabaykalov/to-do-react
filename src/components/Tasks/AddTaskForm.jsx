import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
		const obj = {
			listId: list.id,
			text: inputValue,
			completed: false
		};
		setIsLoading(true);
		axios
			.post('http://192.168.0.41:3001/tasks', obj)
			.then(({ data }) => {
				onAddTask(list.id, data);
				toggleFormVisible();
			})
			.catch(() => {
				alert('Ошибка при добавлении задачи!');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className='tasks__form'>
			{ !visibleForm ? (
				<div onClick={ toggleFormVisible } className='tasks__form-new'>
					<FontAwesomeIcon icon={ 'times-circle' }
					                 color={ '#7F7E7E' }/>
					<span>Новая задача</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<input
						value={ inputValue }
						className='field'
						type='text'
						placeholder='Текст задачи'
						onChange={ e => setInputValue(e.target.value) }/>
					<button disabled={ isLoading } onClick={ addTask } className='button'>
						{ isLoading ? 'Добавление...' : 'Добавить задачу' }
					</button>
					<button onClick={ toggleFormVisible } className='button button--grey'>
						Отмена
					</button>
				</div>
			) }
		</div>
	);
};

export default AddTaskForm;
