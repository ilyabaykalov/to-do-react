import React, { useState } from 'react';
import List from './components/List';
import AddListButton from './components/AddListButton';

import database from './assets/database.json';

const App = () => {
	const [lists, updateLists] = useState(database.lists);

	const onAddList = (newList) => {
		updateLists([...lists, newList]);
	};

	const onRemoveList = (id) => {
		updateLists(lists.filter(list => list.id !== id));
	};
	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи'
				}] }/>
				<List items={
					lists.map(item => {
						item.color = database.colors.find(color => color.id === item['colorId']).name;
						return item;
					}) }
				      onRemove={ onRemoveList }
				      isRemovable/>
				<AddListButton colors={ database.colors }
				               onAdd={ onAddList }/>
			</div>
			<div className='todo__tasks'>

			</div>
		</div>
	);
};

export default App;
