import React from 'react';
import List from './components/List';

const App = () => {
	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={ [{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи',
					active: true
				}] }/>
				<List items={ [{
					color: 'green',
					name: 'Покупки'
				}, {
					color: 'purple',
					name: 'Фронтенд'
				}, {
					color: 'pink',
					name: 'Домашка'
				}] }/>
			</div>
			<div className='todo__tasks'>

			</div>
		</div>
	);
}

export default App;
