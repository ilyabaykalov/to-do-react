import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Badge } from '../../components';

import './List.scss';

library.add(fas);

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
	const removeList = id => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			axios.delete('http://192.168.0.41:3001/lists/' + id).then(() => {
				onRemove(id);
			}).then(() => {
				console.debug(`Список '${ activeItem.name }' успешно удален`);
			}).catch(() => {
				console.error('Не удалось удалить список');
				alert('Не удалось удалить список');
			});
		}
	};

	return (
		<ul className='list' onClick={ onClick }>
			{ items.map((item, index) => (
				<li key={ index }
				    className={ classNames(item.className, {
					    active: item.active
						    ? item.active
						    : activeItem && activeItem.id === item.id
				    }) }
				    onClick={ onClickItem ? () => onClickItem(item) : null }>
					{ item.icon ?
						<FontAwesomeIcon className={ 'icon' }
						                 icon={ item.icon }/> :
						<Badge color={ item.color.name }/>
					}
					<span>
						{ item.name }
						{ item.tasks && ` (${ item.tasks.filter(task => task.completed).length }/${ item.tasks.length })` }
					</span>
					{ isRemovable && (
						<FontAwesomeIcon className={ 'list__remove-button' }
						                 icon={ 'times' }
						                 color={ 'transparent' }
						                 onClick={ () => removeList(item.id) }/>
					) }
				</li>
			)) }
		</ul>
	);
};

export default List;
