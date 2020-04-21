import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddListButton, Tasks } from './components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App() {
	const [lists, updateLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		axios.get('http://192.168.0.41:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
			updateLists(data);
			setActiveItem(data[0]);
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

	/* list events */
	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onRemoveList = (id) => {
		updateLists(lists.filter(list => list.id !== id));
		setActiveItem(null);
	};

	const onSelectList = (item) => {
		setActiveItem(item);
	};

	const onEditListTitle = (id, title) => {
		updateLists(lists.map(item => {
			if (item.id === id) {
				item.name = title;
			}
			return item;
		}));
	};

	/* task events */
	const onAddTask = (listId, newTask) => {
		updateLists(lists.map(list => {
			if (list.id === listId) {
				list.tasks = [...list.tasks, newTask];
			}
			return list;
		}));
	};

	const onRemoveTask = (listId, taskId) => {
		updateLists(lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.filter(task => task.id !== taskId);
			}
			return list;
		}));
	};

	const onUpdateTask = (listId, updTask) => {
		updateLists(lists.map(list => {
			if (list.id === listId) {
				[...list.tasks].map(task => {
					if (task.id === updTask.id) {
						return updTask;
					}
					return task;
				});
			}
			return list;
		}));
	};

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи',
				}] }/>
				{ lists ? (
					<List items={ lists }
					      onRemove={ onRemoveList }
					      onClickItem={ onSelectList }
					      activeItem={ activeItem }
					      isRemovable/>
				) : (
					<div className='loading'>
						<FontAwesomeIcon className={ 'icon fa-spin' }
						                 icon='spinner'
						                 color='#7F7F7F'/>
						<p>Загрузка...</p>
					</div>
				) }
				<AddListButton colors={ colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>
				{ lists && activeItem && (
					<Tasks
						list={ activeItem }
						onAddTask={ onAddTask }
						onUpdateTask={ onUpdateTask }
						onEditTitle={ onEditListTitle }
						onRemoveTask={ onRemoveTask }/>
				) }
			</div>
		</div>
	);
}

export default App;
