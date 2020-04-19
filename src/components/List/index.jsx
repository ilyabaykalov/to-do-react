import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Badge from '../Badge';

import './List.scss';

library.add(fas);

const List = ({ items, isRemovable, onClick }) => {
	return <ul className='list' onClick={ onClick }>
		{ items.map((item, index) =>
			<li key={ index }
			    className={ classNames({ active: item.active }) }>
				{ item.icon ?
					<FontAwesomeIcon className={ 'icon' }
					                 icon={ item.icon.name }
					                 color={ item.icon.color }/> :
					<Badge color={ item.color }/>
				}
				<span>{ item.name }</span>
				{ isRemovable && <FontAwesomeIcon className={ 'list__remove-button' }
				                                  icon={ 'times' }
				                                  color={ '#E3E7E7' }/>
				}
			</li>
		) }
	</ul>;
};

export default List;
