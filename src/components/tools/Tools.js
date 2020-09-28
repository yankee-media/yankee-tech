import React from 'react';

// Tools
import ToolTile from './ToolTile';
import { toolList } from './tool_list';

// UI Components
import Grid from '@material-ui/core/Grid';


const Tools = props => {
  return (
    <div style={{ maxWidth: '1230px', margin: 'auto', padding: '0 15px' }}>
      <div style={{ marginTop: '25px' }}>
        <Grid container spacing={2}>
          {toolList.map((tool, index) => <ToolTile key={index} {...tool} />)}
        </Grid>
      </div>
    </div>
  )
}

export default Tools;