import React from 'react';
import classNames from 'classnames';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './List.scss';


library.add(fas);

const List = ({ items }) => {
	return <ul className='list'>
		{ items.map((item, index) =>
			<li key={ index } className={ classNames(item.className, { active: item.active }) }>
				{ item.icon ?
					<FontAwesomeIcon className={ 'icon' } icon={ item.icon.name } color={ item.icon.color }/> :
					<i className={ `badge badge--${ item.color }` }/>
				}
				<span>{ item.name }</span>
			</li>
		) }
	</ul>;
};

export default List;
