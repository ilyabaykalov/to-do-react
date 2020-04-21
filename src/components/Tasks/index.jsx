import React from 'react';
// import axios from 'axios';

import { AddTaskForm } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';
import axios from 'axios';

library.add(fas);

const Tasks = ({ list, onAddTask, onRemoveTask /*, onEditTitle*/ }) => {

	// const editTitle = () => {
	// 	const newTitle = window.prompt('Название списка', list.name);
	// 	if (newTitle) {
	// 		onEditTitle(list.id, newTitle);
	// 		axios
	// 			.patch('http://192.168.0.41:3001/lists/' + list.id, {
	// 				name: newTitle
	// 			})
	// 			.catch(() => {
	// 				alert('Не удалось обновить название списка');
	// 			});
	// 	}
	// };

	const removeTask = (listId, taskId) => {
		axios.delete(`http://192.168.0.41:3001/tasks/${ taskId }`).then(() => {
			onRemoveTask(listId, taskId);
		});
	};

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
					<div key={ task.id } className='tasks__items-row'>
						<div className='checkbox'>
							<input id={ `task-${ task.id }` } type='checkbox'/>
							<label htmlFor={ `task-${ task.id }` }>
								<FontAwesomeIcon className='tasks__items-row__complete-button'
								                 icon='check'
								                 color='#FFFFFF'/>
							</label>
						</div>
						<p>{ task.text }</p>
						<FontAwesomeIcon className={ 'item__remove-button' }
						                 icon={ 'times' }
						                 color={ 'transparent' }
						                 onClick={ () => removeTask(list.id, task.id) }/>
					</div>
				)) }
				<AddTaskForm list={ list } onAddTask={ onAddTask }/>
			</div>
		</div>
	);
};

export default Tasks;
