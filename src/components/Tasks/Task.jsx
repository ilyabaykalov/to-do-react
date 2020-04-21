import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Task = ({ list, task, onRemoveTask, onUpdateTask }) => {

	const removeTask = (listId, taskId) => {
		axios.delete(`http://192.168.0.41:3001/tasks/${ taskId }`).then(() => {
			onRemoveTask(listId, taskId);
		}).then(() => {
			console.debug(`Задача '${ task.text }' успешно удалена из списка '${list.name}'`);
		}).catch(() => {
			console.error('Не удалось удалить задачу');
			alert('Не удалось удалить задачу');
		});
	};

	const updateTaskStatus = event => {
		task.completed = event.target.checked;

		axios.patch(`http://192.168.0.41:3001/tasks/${ task.id }`, {
			completed: task.completed
		}).then(() => {
			console.debug(`Задача '${ task.text }' успешно обновлена. Новый статус: ${ task.completed ? 'Выполнена':'Не выполнена'}`);
			onUpdateTask(list.id, task);
		}).catch(() => {
			console.error('Не удалось обновить статус задачи');
			alert('Не удалось обновить статус задачи');
		});
	};

	return (
		<div key={ task.id } className='tasks__items-row'>
			<div className='checkbox'>
				<input id={ `task-${ task.id }` } type='checkbox'
				       defaultChecked={ task.completed }
				       onChange={ updateTaskStatus }/>
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
	);
};

export default Task;
