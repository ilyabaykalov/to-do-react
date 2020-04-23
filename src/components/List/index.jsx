import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Badge, host } from '../../components';

import './List.scss';

library.add(fas);

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
	const removeList = item => {
		const taskName = item.name;
		Swal.fire({
			title: `Вы уверены что хотите удалить список "${ taskName }"?`,
			text: 'Вы не сможете отменить это действие!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#42B883',
			cancelButtonColor: '#C9D1D3',
			confirmButtonText: 'Да, удалить!',
			cancelButtonText: 'Отмена'
		}).then((result) => {
			if (result.value) {
				axios.delete(`http://${ host.ip }:${ host.port }/lists/${ item.id }`).then(() => {
					onRemove(item.id);
				}).catch(error => {
					console.error('Не удалось удалить список');
					console.error(`Ошибка: ${ error }`);
					alert('Не удалось удалить список');
				});
				Swal.fire(
					'Удалено!',
					'Список успешно удален.',
					'success'
				).then(() => {
					console.debug(`Список '${ taskName }' успешно удален`);
				});
			}
		});
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
						                 onClick={ () => removeList(item) }/>
					) }
				</li>
			)) }
		</ul>
	);
};

export default List;
