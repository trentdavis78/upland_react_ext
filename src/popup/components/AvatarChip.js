import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

export default function AvatarChips({ username }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        avatar={<Avatar alt="WAX" src="assets/wax.svg" />}
        label={username}
        color="primary"
        sx={{ mt: 1, ml: 0, position: 'relative', right: '5px' }}
      />
    </Stack>
  )
}
