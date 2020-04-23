import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { List, AddListButton, Tasks } from './components';

library.add(fas);

function App() {
	const [lists, updateLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null);
	let history = useHistory();

	useEffect(() => {
		axios.get('http://192.168.0.41:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
			updateLists(data);
		}).then(() => {
			console.debug(`Списки задач успешно получены с сервера`);
		}).catch(() => {
			console.error('Не удалось получить списки задач с сервера');
			alert('Не удалось получить списки задач с сервера');
		});

		axios.get('http://192.168.0.41:3001/colors').then(({ data }) => {
			setColors(data);
		}).then(() => {
			console.debug(`Палитра цветов успешно получены с сервера`);
		}).catch(() => {
			console.error('Не удалось получить палитру цветов с сервера');
			alert('Не удалось получить палитру цветов с сервера');
		});
	}, []);

	useEffect(() => {
		const listId = history.location.pathname.split('lists/')[1];
		if (lists) {
			const list = lists.find(list => list.id === Number(listId));
			setActiveItem(list);
		}
	}, [lists, history.location.pathname]);

	/* list events */
	const onAddList = obj => {
		const newList = [...lists, obj];
		updateLists(newList);
	};

	/* task events */
	const onAddTask = (listId, taskObj) => {
		const newList = lists.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, taskObj];
			}
			return item;
		});
		updateLists(newList);
	};

	const onEditTask = (listId, taskObj) => {
		const newTaskText = window.prompt('Текст задачи', taskObj.text);

		if (!newTaskText) return;

		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskObj.id) {
						task.text = newTaskText;
					}
					return task;
				});
			}
			return list;
		});
		updateLists(newList);
		axios.patch('http://192.168.0.41:3001/tasks/' + taskObj.id, {
			text: newTaskText
		}).catch(() => {
			alert('Не удалось обновить задачу');
		});
	};

	const onRemoveTask = (listId, taskId) => {
		if (window.confirm('Вы действительно хотите удалить задачу?')) {
			const newList = lists.map(item => {
				if (item.id === listId) {
					item.tasks = item.tasks.filter(task => task.id !== taskId);
				}
				return item;
			});
			updateLists(newList);
			axios.delete('http://192.168.0.41:3001/tasks/' + taskId).catch(() => {
				alert('Не удалось удалить задачу');
			});
		}
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
		axios.patch('http://192.168.0.41:3001/tasks/' + taskId, {
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
				}] }
				/>
				{ lists ? (
					<List items={ lists }
					      onRemove={ id => {
						      const newLists = lists.filter(item => item.id !== id);
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
