import React from 'react';

const Controls = ({
  title,
  action,
  controls,
  active
}) => {
  return (
    <div className={`controls ${title}-controls`}>
      {title ?  <h2>{title}</h2> : null}
      <div className="controls-row">
        {_.map(controls, title => (
          <button
            key={title}
            className={active === title ? 'active' : ''}
            onClick={() => active !== title ? action(title) : false}>
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Controls;
