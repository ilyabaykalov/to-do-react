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
		axios
			.get('http://192.168.0.41:3001/lists?_expand=color&_embed=tasks')
			.then(({ data }) => {
				updateLists(data);
				setActiveItem(data[0]);
			});

		axios
			.get('http://192.168.0.41:3001/colors')
			.then(({ data }) => setColors(data));
	}, []);

	/* list events */
	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onRemoveList = (id) => {
		updateLists(lists.filter(item => item.id !== id));
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

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи',
				}] }/>
				{ lists ? (
					<List
						items={ lists }
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
						onRemoveTask={ onRemoveTask }
						onEditTitle={ onEditListTitle }/>
				) }
			</div>
		</div>
	);
}

export default App;
