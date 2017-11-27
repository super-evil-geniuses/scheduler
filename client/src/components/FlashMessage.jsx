import React from 'react';

const FlashMessage = (props) => (
  <div className={`container ${props.type}-flash-message`}>
  {props.message.toUpperCase()}
  </div>
	)


export default FlashMessage;