import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, AddListButton, Tasks } from './components';


const App = () => {
	const [lists, updateLists] = useState(null);
	const [colors, setColor] = useState(null);
	// const [taskList, updateTaskList] = useState(database.tasks);
	const [selectedListId, setListId] = useState(2);

	useEffect(() => {
		axios.get('http://localhost:3001/lists?_expand=color').then(({ data }) => {
			updateLists(data);
		});
		axios.get('http://localhost:3001/colors').then(({ data }) => {
			setColor(data);
		});
	}, []);

	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onRemoveList = (id) => {
		updateLists(lists.filter(list => list.id !== id));
	};

	const onSelectListId = (id) => {
		setListId(id);
	};

	// const onRemoveTask = (id) => {
	// 	updateTaskList(taskList.filter(task => task.id !== id));
	// };
	//
	// const onCompletedTask = (id) => {
	// 	updateTaskList(taskList.map(task => {
	// 		if (task.id === id) {
	// 			task['completed'] = !task['completed'];
	// 		}
	// 		return task;
	// 	}));
	// };

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи'
				}] }/>
				{ lists &&colors&& <List items={
					lists.map(list => {
						list.color = colors.find(color => color.id === list['colorId']).name;
						// list.active = list.id === selectedListId;
						return list;
					}) }
				        onSelect={ onSelectListId }
				        onRemove={ onRemoveList }
				        isRemovable/> }
				<AddListButton colors={ colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>
				{/*<Tasks listName={ lists.find(list => list.id === selectedListId).name }*/ }
				{/*       tasks={ taskList.filter(task => task['listId'] === selectedListId) }*/ }
				{/*       onRemove={ onRemoveTask }*/ }
				{/*       onCompletedTask={ onCompletedTask }/>*/ }
				<Tasks/>
			</div>
		</div>
	);
};

export default App;
