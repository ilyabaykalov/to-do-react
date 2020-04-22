import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Task, AddTaskForm } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty }) => {
	const editTitle = () => {
		const newTitle = window.prompt('Название списка', list.name);
		if (newTitle) {
			onEditTitle(list.id, newTitle);
			axios.patch('http://192.168.0.41:3001/lists/' + list.id, {
				name: newTitle
			}).then(() => {
				console.debug(`Заголовок текущего списка изменён на ${ newTitle }`);
			}).catch(() => {
				console.error('Не удалось обновить название списка');
				alert('Не удалось обновить название списка');
			});
		}
	};

	return (
		<div className='tasks'>
			<Link to={ `/lists/${ list.id }` }>
				<h2 className='tasks__title' style={ { color: list.color.hex } }>
					{ list.name }
					<FontAwesomeIcon icon='pen' onClick={ editTitle }/>
				</h2>
			</Link>

			<div className='tasks__items'>
				{ !withoutEmpty && list.tasks && !list.tasks.length && (
					<h2>Задачи отсутствуют</h2>
				) }
				{ list.tasks &&
				list.tasks.map(task => (
					<Task
						key={ task.id }
						list={ list }
						onEdit={ onEditTask }
						onRemove={ onRemoveTask }
						onComplete={ onCompleteTask }
						{ ...task }/>
				)) }
				<AddTaskForm key={ list.id } list={ list } onAddTask={ onAddTask }/>
			</div>
		</div>
	);
};

export default Tasks;
