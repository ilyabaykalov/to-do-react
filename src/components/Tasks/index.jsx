import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './Tasks.scss';

library.add(fas);

const Tasks = ({ listName, tasks, onRemove }) => {
	const onChecked = (id) => {
		alert(id);
	};

	const onRemoveTask = (id) => {
		onRemove(id);
	};

	return (
		<div className='tasks'>
			<div className='tasks__header'>
				<h2 className='tasks__header__title'>{ listName }</h2>
				<FontAwesomeIcon className='tasks__header__list-name-edit-button'
				                 icon='pen'
				                 color='#E3E7E7'/>
			</div>
			<div className='tasks__items'>
				{
					tasks.map(task => {
							return <div key={ task.id } className='item'>
								<div className='checkbox'>
									<input id='check'
									       type='checkbox'
									       defaultChecked={ task['completed'] }
									       onChange={ () => onChecked(task.id) }/>
									<label htmlFor='check'>
										<FontAwesomeIcon className='item__complete-button'
										                 icon='check'
										                 color='#FFFFFF'/>
									</label>
								</div>
								<p>{ task.text }</p>
								<FontAwesomeIcon className={ 'item__remove-button' }
								                 icon={ 'times' }
								                 color={ 'transparent' }
								                 onClick={ () => onRemoveTask(task.id) }/>
							</div>;
						}
					)
				}
			</div>
		</div>
	);
};

export default Tasks;
