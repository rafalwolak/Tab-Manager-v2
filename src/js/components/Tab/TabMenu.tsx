import React, { useState } from 'react'
import { observer } from 'mobx-react'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Popover from '@material-ui/core/Popover'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { getNoun } from 'libs'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.tooltip + 1
  }
}))

const DIVIDER = { divider: true }

type Option = { divider?: boolean } & { disabled?: boolean } & {
  label?: string
} & { onClick?: () => void }

export default observer(props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles(props)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getOnClick = func => () => {
    handleClose()
    func()
  }
  const {
    remove,
    groupTab,
    sameDomainTabs,
    pinned,
    togglePin,
    urlCount,
    closeDuplicatedTab
  } = props.tab
  const options: Option[] = [
    {
      label: pinned ? 'Unpin Tab' : 'Pin Tab',
      onClick: togglePin
    },
    {
      label: 'Remove',
      onClick: remove
    }
  ]
  if (sameDomainTabs && sameDomainTabs.length > 1) {
    options.push(DIVIDER, {
      label: `Group ${sameDomainTabs.length} same domain tabs to this window`,
      onClick: groupTab
    })
  }
  if (urlCount > 1) {
    options.push(DIVIDER, {
      label: `Close other ${urlCount - 1} duplicated ${getNoun(
        'tab',
        urlCount - 1
      )}`,
      onClick: closeDuplicatedTab
    })
  }

  const content = options
    .map(({ onClick, ...option }) => ({
      ...option,
      onClick: getOnClick(onClick)
    }))
    .map(({ label, onClick, disabled = false, divider }, i) =>
      divider ? (
        <Divider key={i} />
      ) : (
        <MenuItem key={label} disabled={disabled} onClick={onClick}>
          {label}
        </MenuItem>
      )
    )
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
        className={classes.root}
        PaperProps={{
          style: {
            minWidth: 200
          }
        }}
      >
        {content}
      </Popover>
    </div>
  )
})
