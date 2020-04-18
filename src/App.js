import React from 'react';
import List from './components/List';
import AddListButton from './components/AddListButton';

import database from './assets/database.json'

const App = () => {
	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи'
				}] }/>
				<List items={ [
					{
						color: 'green',
						name: 'Покупки'
					}, {
						color: 'purple',
						name: 'Фронтенд',
						active: true
					}, {
						color: 'pink',
						name: 'Домашка'
					}
				] } isRemovable/>
				<AddListButton colors={database.colors}/>
			</div>
			<div className='todo__tasks'>

			</div>
		</div>
	);
};

export default App;
