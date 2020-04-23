import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Route, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { List, AddListButton, Tasks, host } from './components';

library.add(fas);

function App() {
	const [lists, updateLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null);
	let history = useHistory();

	useEffect(() => {
		axios.get(`http://${ host.ip }:${ host.port }/lists?_expand=color&_embed=tasks`).then(({ data }) => {
			updateLists(data);
		}).then(() => {
			console.debug(`Списки задач успешно получены с сервера`);
		}).catch(error => {
			console.error('Не удалось получить списки задач с сервера');
			console.error(`Ошибка: ${ error }`);
			alert('Не удалось получить списки задач с сервера');
		});

		axios.get(`http://${ host.ip }:${ host.port }/colors`).then(({ data }) => {
			setColors(data);
		}).then(() => {
			console.debug(`Палитра цветов успешно получены с сервера`);
		}).catch(() => {
			console.error('Не удалось получить палитру цветов с сервера');
			alert('Не удалось получить палитру цветов с сервера');
		});
	}, []);

	useEffect(() => {
		const listId = Number(history.location.pathname.replace('/lists/', ''));
		if (lists) {
			const list = lists.find(list => list.id === listId);
			setActiveItem(list);
		}
	}, [lists, history.location.pathname]);

	/* list events */
	const onAddList = list => {
		const newList = [...lists, list];
		updateLists(newList);
	};

	/* task events */
	const onAddTask = (listId, newTask) => {
		const newList = lists.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, newTask];
			}
			return item;
		});
		updateLists(newList);
	};

	const onEditTask = (listId, updTask) => {
		const newTaskText = window.prompt('Текст задачи', updTask.text);

		if (!newTaskText) return;

		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === updTask.id) {
						task.text = newTaskText;
					}
					return task;
				});
			}
			return list;
		});
		updateLists(newList);
		axios.patch(`http://${ host.ip }:${ host.port }/tasks/${ updTask.id }`, {
			text: newTaskText
		}).catch(() => {
			alert('Не удалось обновить задачу');
		});
	};

	const onRemoveTask = (listId, taskId) => {
		Swal.fire({
			title: `Вы уверены что хотите удалить задачу\n"${ activeItem.tasks.find(task => task.id === taskId).text }"?`,
			text: 'Вы не сможете отменить это действие!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#42B883',
			cancelButtonColor: '#C9D1D3',
			confirmButtonText: 'Да, удалить!',
			cancelButtonText: 'Отмена'
		}).then((result) => {
			if (result.value) {
				const newList = lists.map(item => {
					if (item.id === listId) {
						item.tasks = item.tasks.filter(task => task.id !== taskId);
					}
					return item;
				});
				updateLists(newList);
				axios.delete(`http://${ host.ip }:${ host.port }/tasks/${ taskId }`).catch(error => {
					alert('Не удалось удалить задачу');
					console.error('Не удалось удалить задачу');
					console.error(`Ошибка: ${ error }`);
				});
			}
		});
	};

	const onCompleteTask = (listId, taskId, completed) => {
		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskId) {
						task.completed = completed;
					}
					return task;
				});
			}
			return list;
		});
		updateLists(newList);
		axios.patch(`http://${ host.ip }:${ host.port }/tasks/${ taskId }`, {
			completed
		}).catch(error => {
			console.error('Не удалось обновить задачу');
			console.error(`Ошибка: ${ error }`);
			alert('Не удалось обновить задачу');
		});
	};

	const onEditListTitle = (id, title) => {
		const newList = lists.map(item => {
			if (item.id === id) {
				item.name = title;
			}
			return item;
		});
		updateLists(newList);
	};

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List onClickItem={ () => {
					history.push(`/`);
				} } items={ [{
					active: history.location.pathname === '/',
					icon: 'list',
					name: 'Все задачи'
				}] }/>
				{ lists ? (
					<List items={ lists }
					      onRemove={ id => {
						      const newLists = lists.filter(item => item.id !== id);
						      setActiveItem(lists.find(item => item.id === id));
						      updateLists(newLists);
					      } }
					      onClickItem={ list => {
						      history.push(`/lists/${ list.id }`);
					      } }
					      activeItem={ activeItem }
					      isRemovable/>
				) : (
					<div className='loading'>
						<FontAwesomeIcon className={ 'icon fa-spin' }
						                 icon='spinner'/>
						<p>Загрузка...</p>
					</div>
				) }
				<AddListButton colors={ colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>
				<Route exact path='/'>
					{ lists && lists.map(list => (
						<Tasks key={ list.id }
						       list={ list }
						       onAddTask={ onAddTask }
						       onEditTitle={ onEditListTitle }
						       onRemoveTask={ onRemoveTask }
						       onEditTask={ onEditTask }
						       onCompleteTask={ onCompleteTask }
						       withoutEmpty/>
					)) }
				</Route>
				<Route path='/lists/:id'>
					{ lists && activeItem && (
						<Tasks
							list={ activeItem }
							onAddTask={ onAddTask }
							onEditTitle={ onEditListTitle }
							onRemoveTask={ onRemoveTask }
							onEditTask={ onEditTask }
							onCompleteTask={ onCompleteTask }/>
					) }
				</Route>
			</div>
		</div>
	);
}

export default App;
