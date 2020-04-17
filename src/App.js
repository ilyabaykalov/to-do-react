import React from 'react';
import List from './components/List/List';

function App() {
	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List items={[{
					icon: { name: 'list', color: '#7C7C7C' },
					name: 'Все задачи'
				}]}/>
			</div>
			<div className='todo__tasks'>

			</div>
		</div>
	);
}

export default App;
