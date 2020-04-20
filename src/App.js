import React, { useState } from 'react';
import List from './components/List';
import AddListButton from './components/AddListButton';
import Tasks from './components/Tasks';

import database from './assets/database.json';

const App = () => {
	const [lists, updateLists] = useState(database.lists);
	const [taskList, updateTaskList] = useState(database.tasks);
	const [selectedListId, setListId] = useState(2);

	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onRemoveList = (id) => {
		updateLists(lists.filter(list => list.id !== id));
	};

	const onSelectListId = (id) => {
		setListId(id);
	};

	const onRemoveTask = (id) => {
		updateTaskList(taskList.filter(task => task.id !== id));
	};

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи'
				}] }/>
				<List items={
					lists.map(list => {
						list.color = database.colors.find(color => color.id === list['colorId']).name;
						list.active = list.id === selectedListId;
						return list;
					}) }
				      onSelect={ onSelectListId }
				      onRemove={ onRemoveList }
				      isRemovable/>
				<AddListButton colors={ database.colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>
				<Tasks listName={ lists.find(list => list.id === selectedListId).name }
				       tasks={ taskList.filter(task => task['listId'] === selectedListId) }
				       onRemove={ onRemoveTask }/>
			</div>
		</div>
	);
};

export default App;
