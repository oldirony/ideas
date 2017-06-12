import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import headerTab from '../header-tab/header-tab';
import header from '../header/header.scss';
import icon from 'styles/_icon.scss';
import button from 'styles/_button.scss';

const FilterTab = ({toggleCompletedIdeas, hideCompletedIdeas})=>{
    return (
        <div>
			<div>
				<button
					className={cl(header.button, button.withIcon)}
					onClick={toggleCompletedIdeas}>
					<svg className={icon.icon}>
						<use xlinkHref={hideCompletedIdeas? '#toggle-on' : '#toggle-off'}/>
					</svg>

					Hide completed
				</button>
			</div>
		</div>
    )
};

FilterTab.propTypes = {
	hideCompletedIdeas: PropTypes.bool,
	toggleCompletedIdeas: PropTypes.func
};

export default headerTab({
	icon: "dots",
	label: "Filters"
})(FilterTab);