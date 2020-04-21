import React from 'react';

import { Task, AddTaskForm } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = ({ list, onAddTask, onUpdateTask, /*, onEditTitle,*/onRemoveTask }) => {

	// const editTitle = () => {
	// 	const newTitle = window.prompt('Название списка', list.name);
	// 	if (newTitle) {
	// 		onEditTitle(list.id, newTitle);
	// 		axios
	// 			.patch('http://192.168.0.41:3001/lists/' + list.id, {
	// 				name: newTitle
	// 			})
	// 			.catch(() => {
	// 				console.error('Не удалось обновить название списка');
	// 				alert('Не удалось обновить название списка');
	// 			});
	// 	}
	// };

	return (
		<div className='tasks'>
			<div className='tasks__header'>
				<h2 className='tasks__header__title'>{ list.name }</h2>
				<FontAwesomeIcon className='tasks__header__list-name-edit-button'
				                 icon='pen'
				                 color='transparent'/>
			</div>

			{ !list.tasks.length && <h2 className='no-tasks'>Задачи отсутствуют</h2> }
			<div className='tasks__items'>
				{ list.tasks.map(task => (
					<Task key={ task.id }
					      list={ list }
					      task={ task }
					      onRemoveTask={ onRemoveTask }
					      onUpdateTask={ onUpdateTask }/>
				)) }
				<AddTaskForm list={ list } onAddTask={ onAddTask }/>
			</div>
		</div>
	);
};

export default Tasks;
