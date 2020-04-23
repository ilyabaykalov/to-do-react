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
		Swal.fire({
			title: 'Введите текст задачи',
			input: 'text',
			inputValue: updTask.text,
			showCancelButton: true,
			cancelButtonText: 'Отмена',
			confirmButtonColor: '#42B883',
			cancelButtonColor: '#C9D1D3',
			inputValidator: (value) => {
				if (!value) {
					return 'Поле не может быть пустым';
				}
			}
		}).then(({ value, dismiss }) => {
			if (value) {
				return [lists.map(list => {
					if (list.id === listId) {
						list.tasks = list.tasks.map(task => {
							if (task.id === updTask.id) {
								task.text = value;
							}
							return task;
						});
					}
					return list;
				}), value];
			} else return [null, dismiss];
		}).then(([list, value]) => {
			if (list && value) {
				updateLists(list);
				axios.patch(`http://${ host.ip }:${ host.port }/tasks/${ updTask.id }`, {
					text: value
				}).catch(error => {
					Swal.fire({
						icon: 'error',
						title: 'Не удалось изменить текст задачи'
					}).then(() => {
						console.error('Не удалось изменить текст задачи');
						console.error(`Ошибка: ${ error }`);
					});
				});
			}
		});
	};

	const onRemoveTask = (listId, taskId) => {
		let taskName = '';
		lists.forEach(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskId) {
						taskName = task.text;
					}
					return task;
				});
			}
			return list;
		});
		Swal.fire({
			title: `Вы уверены что хотите удалить задачу\n"${ taskName }"?`,
			icon: 'question',
			confirmButtonColor: '#42B883',
			cancelButtonColor: '#C9D1D3',
			confirmButtonText: 'Да, удалить!',
			showCancelButton: true,
			cancelButtonText: 'Отмена'
		}).then(result => {
			if (result.value) {
				const newList = lists.map(item => {
					if (item.id === listId) {
						item.tasks = item.tasks.filter(task => task.id !== taskId);
					}
					return item;
				});
				updateLists(newList);
				axios.delete(`http://${ host.ip }:${ host.port }/tasks/${ taskId }`).then(() => {
					console.debug(`Задача '${ taskName }' успешно удалена`);
				}).catch(error => {
					Swal.fire({
						icon: 'error',
						title: 'Не удалось удалить список'
					}).then(() => {
						console.error('Не удалось удалить список');
						console.error(`Ошибка: ${ error }`);
					});
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
