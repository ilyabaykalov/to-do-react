import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = () => {
	return (
		<div className='tasks'>
			<div className='tasks__header'>
				<h2 className='tasks__header__title'>Фронтенд</h2>
				<FontAwesomeIcon className='tasks__header__list-name-edit-button'
				                 icon='pen'
				                 color='#E3E7E7'/>
			</div>
			<div className='tasks__items'>
				<div className='item'>
					<input id='check' type='checkbox'/>
					<label htmlFor='check'>
						<FontAwesomeIcon className='item__complete-button'
						                 icon='check'
						                 color='#FFFFFF'/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Tasks;
