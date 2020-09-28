import React from 'react';

// UI Components
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

// Util
import { MATERIAL_RED } from '../util/constants';

const GeneralPurposeDialog = ({ title, closeDialog, dialogOpen, component, maxWidth }) => {
  return (
    <Dialog fullWidth maxWidth={maxWidth} onClose={closeDialog} open={dialogOpen}>
      {title && <DialogTitle style={{color: MATERIAL_RED}} align='center'>{title}</DialogTitle>}
      <DialogContent>
        {component}
      </DialogContent>
    </Dialog>
  )
}

export default GeneralPurposeDialog;