import React from 'react';
import classNames from 'classnames';

import { Badge } from '../../components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './List.scss';
import axios from 'axios';

library.add(fas);

const List = ({ items, isRemovable, onSelect, onRemove }) => {

	const selectList = (id) => {
		onSelect(id);
	};

	const removeList = (id) => {
		axios.delete(`http://localhost:3001/lists/${ id }`).then(() => {
			onRemove(id);
		});
	};

	return <ul className='list'>
		{ items.map((item, index) =>
			<li key={ index }
			    className={ classNames({ active: item.active }) }
			    onClick={ () => selectList(item.id) }>
				{ item.icon ?
					<FontAwesomeIcon className={ 'icon' }
					                 icon={ item.icon.name }
					                 color={ item.icon.color }/> :
					<Badge color={ item.color }/>
				}
				<span>{ item.name }</span>
				{
					isRemovable &&
					<FontAwesomeIcon className={ 'list__remove-button' }
					                 icon={ 'times' }
					                 color={ 'transparent' }
					                 onClick={ () => removeList(item.id) }/>
				}
			</li>
		) }
	</ul>;
};

export default List;
