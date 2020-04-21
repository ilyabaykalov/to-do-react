import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddListButton, Tasks } from './components';

function App() {
	const [lists, updateLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null);

	useEffect(() => {
		axios
			.get('http://192.168.0.41:3001/lists?_expand=color&_embed=tasks')
			.then(({ data }) => updateLists(data));

		axios
			.get('http://192.168.0.41:3001/colors')
			.then(({ data }) => setColors(data));
	}, []);

	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onAddTask = (listId, taskObj) => {
		updateLists(lists.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, taskObj];
			}
			return item;
		}));
	};

	const onEditListTitle = (id, title) => {
		updateLists(lists.map(item => {
			if (item.id === id) {
				item.name = title;
			}
			return item;
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
						onRemove={ id => updateLists(lists.filter(item => item.id !== id)) }
						onClickItem={ item => setActiveItem(item) }
						activeItem={ activeItem }
						isRemovable/>
				) : (
					'Загрузка...'
				) }
				<AddListButton colors={ colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>
				{ lists && activeItem && (
					<Tasks
						list={ activeItem }
						onAddTask={ onAddTask }
						onEditTitle={ onEditListTitle }/>
				) }
			</div>
		</div>
	);
}

export default App;
