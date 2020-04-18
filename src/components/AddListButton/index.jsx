import React, { useState } from 'react';

import List from '../List';
import Badge from '../Badge';

import './AddListButton.scss';

const AddListButton = ({ colors }) => {
	const [isVisiblePopup, setVisibilityPopup] = useState(true);

	return (
		<div className='add-list'>
			<List onClick={ () => setVisibilityPopup(true) }
			      items={ [
				      {
					      className: 'add-list__button',
					      icon: { name: 'plus', color: '#7C7C7C' },
					      name: 'Добавить список'
				      }
			      ] }/>
			{ isVisiblePopup && (
				<div className='add-list__popup'>
					<input className='field' type='text' placeholder='Название списка'/>
					<ul className='colors'>
						{ colors.map(color => <li><Badge color={ color.name }/></li>) }
					</ul>
					<button className='button'>Добавить</button>
				</div>)
			}
		</div>
	);
};

export default AddListButton;
