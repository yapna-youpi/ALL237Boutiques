import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

function TooltipItem({target, placement,toggle, children}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <span>
      <Tooltip
        placement={placement}
        isOpen={tooltipOpen}
        target={target}
        toggle={toggle}
      >
        {children}
      </Tooltip>
    </span>
  );
}

export default TooltipItem
