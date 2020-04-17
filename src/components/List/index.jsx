import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './List.scss';


library.add(fas);

const List = ({ items }) => {
	return <ul className='list'>
		{ items.map((item, i) =>
			<li className={ item.active ? 'active' : '' } key={ i }>
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
