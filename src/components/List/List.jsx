import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const List = ({ items }) => {
	return <ul className='todo__list'>
		{items.map((item, i) =>
			<li className='active' key={i}>
				<FontAwesomeIcon icon={item.icon.name} color={item.icon.color}/>
				<span>{item.name}</span>
			</li>
		)}
	</ul>;
};

export default List;
