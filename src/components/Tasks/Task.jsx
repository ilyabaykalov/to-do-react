import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Task = ({ id, text, completed, list, onRemove, onEdit, onComplete }) => {
	const [classNames, setClassNames] = useState(completed ? 'completed' : '');

	const onChangeCheckbox = e => {
		onComplete(list.id, id, e.target.checked);
		setClassNames(e.target.checked ? 'completed' : '');
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
					                 icon='check'/>
				</label>
			</div>
			<p className={ classNames }>{ text }</p>
			<div className='tasks__items-row-actions'>
				<div onClick={ () => onEdit(list.id, { id, text }) }>
					<FontAwesomeIcon className={ 'tasks__items-row-actions__edit-button' }
					                 icon={ 'pen' }/>
				</div>
				<div onClick={ () => onRemove(list.id, id) }>
					<FontAwesomeIcon className={ 'tasks__items-row-actions__remove-button' }
					                 icon={ 'times' }/>
				</div>
			</div>
		</div>
	);
};

export default Task;
