import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import { Task, AddTaskForm, host } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty }) => {
	const editTitle = () => {
		Swal.fire({
			title: 'Введите название списка',
			input: 'text',
			inputValue: list.name,
			showCancelButton: true,
			cancelButtonText: 'Отмена',
			confirmButtonColor: '#42B883',
			cancelButtonColor: '#C9D1D3',
			inputValidator: (value) => {
				if (!value) {
					return 'Поле не может быть пустым';
				}
			}
		}).then(({ value }) => {
			if (value) {
				onEditTitle(list.id, value);
				axios.patch(`http://${ host.ip }:${ host.port }/lists/${ list.id }`, {
					name: value
				}).then(() => {
					console.debug(`Заголовок текущего списка изменён на ${ value }`);
				}).catch(error => {
					Swal.fire({
						icon: 'error',
						title: 'Не удалось обновить название списка'
					}).then(() => {
						console.error('Не удалось обновить название списка');
						console.error(`Ошибка: ${ error }`);
					});
				});
			}
		});
	};

	return (
		<div className='tasks'>
			<Link to={ `/lists/${ list.id }` }>
				<div className='tasks__header'>
					<h2 className='tasks__header__title' style={ { color: list.color.hex } }>
						{ list.name }
					</h2>
					<FontAwesomeIcon className='tasks__header__list-name-edit-button'
					                 icon='pen'
					                 onClick={ editTitle }/>
				</div>
			</Link>

			<div className='tasks__items'>
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
				{ !withoutEmpty && list.tasks && !list.tasks.length && (
					<h2 className='no-tasks'>Задачи отсутствуют</h2>
				) }
			</div>
		</div>
	);
};

export default Tasks;
