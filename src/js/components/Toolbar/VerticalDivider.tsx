import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: `0 ${theme.spacing.unit}px`,
    backgroundColor: theme.palette.divider,
    height: '100%',
    width: 1
  }
}))

export default () => {
  const { root } = useStyles()
  return <div className={root} />
}
