import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Task = ({ id, text, completed, list, onRemove, onEdit, onComplete }) => {
	const onChangeCheckbox = e => {
		onComplete(list.id, id, e.target.checked);
	};

	return (
		<div key={ id } className='tasks__items-row'>
			<div className='checkbox'>
				<input id={ `task-${ id }` }
				       type='checkbox'
				       checked={ completed }
				       onChange={ onChangeCheckbox }/>
				<label htmlFor={ `task-${ id }` }>
					<FontAwesomeIcon className='tasks__items-row__complete-button'
					                 icon='check'
					                 color='#FFFFFF'/>
				</label>
			</div>
			<p>{ text }</p>
			<div className='tasks__items-row-actions'>
				<FontAwesomeIcon className={ 'item__remove-button' }
				                 icon={ 'pen' }
				                 onClick={ () => onEdit(list.id, { id, text }) }/>
				<FontAwesomeIcon className={ 'item__remove-button' }
				                 icon={ 'times' }
				                 onClick={ () => onRemove(list.id, id) }/>
			</div>
		</div>
	);
};

export default Task;
