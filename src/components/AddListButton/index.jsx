import React, { useState } from 'react';

import List from '../List';
import Badge from '../Badge';

import './AddListButton.scss';

const AddListButton = ({ colors }) => {
	const [isVisiblePopup, setVisibilityPopup] = useState(true);
	const [selectedColor, selectColor] = useState(colors[0].id);

	console.log(selectedColor);
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
					<input className='field'
					       type='text'
					       placeholder='Название списка'/>
					<div className='add-list__popup-colors'>
						{ colors.map(color => (
							<Badge key={ color.id }
							       className={ selectedColor === color.id && 'active' }
							       color={ color.name }
							       onClick={ () => selectColor(color.id) }
							/>
						)) }
					</div>
					<button className='button'>Добавить</button>
				</div>)
			}
		</div>
	);
};

export default AddListButton;
