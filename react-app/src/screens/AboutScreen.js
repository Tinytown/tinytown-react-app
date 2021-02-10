import React, { useState } from 'react';
import { Text } from 'react-native';
import { Dialog } from 'library/components';
import { COLORS, TYPOGRAPHY, normalizeStyles } from 'res';

const NewShoutScreen = ({ navigation }) => {
  const [openDialog, setOpenDialog] = useState(true);

  return (
    <Dialog openDialog={openDialog} setOpenDialog={setOpenDialog} onClose={() => navigation.goBack()} >
      <Text>About Dialog</Text>
      <Text>About Dialog</Text>
      <Text>About Dialog</Text>
      <Text>About Dialog</Text>
      <Text>About Dialog</Text>
    </Dialog>
  );
};

const styles = normalizeStyles({
});

export default NewShoutScreen;
