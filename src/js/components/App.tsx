import React, { useEffect, useRef, StrictMode } from 'react'
import { observer } from 'mobx-react'
import useSystemTheme from 'use-system-theme'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { darkTheme, lightTheme } from 'libs/themes'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Columns from 'components/Columns'
import Shortcut from 'components/Shortcut'
import Toolbar from 'components/Toolbar'
import Tools from 'components/Tools'
import SettingsDialog from 'components/Toolbar/SettingsDialog'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { useStore } from './StoreContext'
import DragLayer from './DragLayer'
import { ThemeContext } from './ThemeContext'

const App = observer(() => {
  const searchEl = useRef<HTMLInputElement>(null)
  const { windowStore, shortcutStore } = useStore()
  useEffect(() => {
    windowStore.didMount()
    shortcutStore.didMount(searchEl)
    return () => shortcutStore.willUnmount()
  }, [])
  return (
    <Paper
      style={{
        // backgroundColor: theme.app.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100vh'
      }}
    >
      <Tools inputRef={searchEl} />
      <Fade in>
        <Columns />
      </Fade>
      <Toolbar />
      <Shortcut />
      <SettingsDialog />
      <DragLayer />
    </Paper>
  )
})

export default observer(() => {
  const { userStore } = useStore()
  const systemTheme = useSystemTheme()
  const isDarkTheme =
    (userStore.useSystemTheme && systemTheme === 'dark') ||
    (!userStore.useSystemTheme && userStore.darkTheme)
  const theme = isDarkTheme ? darkTheme : lightTheme
  return (
    <StrictMode>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <DndProvider backend={HTML5Backend}>
          <ThemeContext.Provider value={isDarkTheme}>
            <App />
          </ThemeContext.Provider>
        </DndProvider>
      </MuiThemeProvider>
    </StrictMode>
  )
})
