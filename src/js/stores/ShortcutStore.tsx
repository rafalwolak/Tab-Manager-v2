import { MutableRefObject } from 'react'
import { action, observable } from 'mobx'
import Mousetrap from 'mousetrap'
import { openInNewTab } from 'libs'
import Store from 'stores'

export const getDescription = (description) => {
  if (typeof description === 'string') {
    return description
  }
  if (typeof description === 'function') {
    return description()
  }
  return 'Unknow description'
}

const preventDefault = (event) => {
  if (event && event.preventDefault) {
    event.preventDefault()
  }
}

const hasFocusedElement = () => {
  const { activeElement } = document
  return activeElement instanceof HTMLElement && activeElement.tabIndex >= 0
}

export default class ShortcutStore {
  store: Store

  searchEl: MutableRefObject<HTMLInputElement>

  constructor (store) {
    this.store = store
  }

  @observable
  combo = null

  @observable
  toastOpen = false

  @observable
  dialogOpen = false

  closeHandle = null

  @observable
  inputShortcutSet = new Set([
    'escape',
    'enter',
    'ctrl+enter',
    'ctrl+h',
    'ctrl+l',
    'down',
    'ctrl+j',
    'up',
    'ctrl+k',
    'ctrl+/',
    'ctrl+p',
    'ctrl+s',
    'shift+ctrl+s',
    'ctrl+x',
    'ctrl+r',
    'ctrl+g',
    'ctrl+8',
    'ctrl+m',
    'ctrl+n',
    'ctrl+o',
    'shift+ctrl+g'
  ])

  @observable
  shortcuts = [
    [
      'ctrl+s',
      (event) => {
        preventDefault(event)
        this.store.arrangeStore.sortTabs()
      },
      'Sort tabs'
    ],
    [
      'shift+ctrl+s',
      (event) => {
        preventDefault(event)
        this.store.arrangeStore.groupTabs()
      },
      'Group and sort tabs'
    ],
    [
      ['d d'],
      () => {
        this.store.tabStore.remove()
      },
      'Close tab'
    ],
    [
      ['* c', 'ctrl+shift+c'],
      (event) => {
        preventDefault(event)
        this.store.windowStore.cleanDuplicatedTabs()
      },
      'Clean duplicated tabs'
    ],
    [
      ['enter', 'ctrl+enter'],
      () => {
        if (!hasFocusedElement()) {
          this.store.searchStore.enter()
        }
      },
      'Go to tab'
    ],
    [
      ['r', 'ctrl+r'],
      () => {
        this.store.tabStore.reload()
      },
      'Reload tab'
    ],
    [
      ['s'],
      () => {
        this.store.windowStore.syncAllWindows()
      },
      'Sync all windows'
    ],
    [
      ['p', 'ctrl+p'],
      (event) => {
        preventDefault(event)
        this.store.tabStore.togglePin()
      },
      'Toogle pin'
    ],
    [
      '/',
      (event) => {
        preventDefault(event)
        this.searchEl.current.focus()
      },
      'Search tab'
    ],
    [
      'escape',
      (event) => {
        if (!event) {
          return
        }
        if (this.dialogOpen) {
          event.preventDefault()
          return this.closeDialog()
        }
        const {
          searchStore: { clear, typing, query },
          userStore: { dialogOpen, closeDialog }
        } = this.store
        if (typing) {
          event.preventDefault()
          return this.searchEl.current.blur()
        }
        if (dialogOpen) {
          event.preventDefault()
          return closeDialog()
        }
        if (query) {
          event.preventDefault()
          clear()
        }
      },
      () => {
        if (this.store.searchStore.typing) {
          return 'Go to tab list'
        }
        if (this.dialogOpen) {
          return 'Escape'
        }
        if (this.store.userStore.dialogOpen) {
          return 'Dismiss settings dialog'
        }
        return 'Clear search text'
      }
    ],
    [
      ['h', 'left', 'ctrl+h'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.left()
      },
      'Left tab'
    ],
    [
      ['l', 'right', 'ctrl+l'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.right()
      },
      'Right tab'
    ],
    [
      ['j', 'down', 'ctrl+j'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.down()
      },
      'Next tab'
    ],
    [
      ['k', 'up', 'ctrl+k'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.up()
      },
      'Previous tab'
    ],
    [
      ['g g'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.firstTab()
      },
      'First tab'
    ],
    [
      ['shift+g', 'shift+ctrl+g'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.lastTab()
      },
      'Last tab'
    ],
    [
      ['ctrl+g'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.groupTab()
      },
      'Group same domain tabs to this window'
    ],
    [
      ['x', 'ctrl+x'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.select()
      },
      'Select tab'
    ],
    [
      ['space'],
      (event) => {
        if (!hasFocusedElement()) {
          preventDefault(event)
          this.store.searchStore.select()
        }
      },
      'Select tab'
    ],
    [
      ['shift+x'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.selectWindow()
      },
      'Toggle Select Window'
    ],
    [
      ['alt+d'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.closeWindow()
      },
      'Close window'
    ],
    [
      ['* m', 'ctrl+m'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.selectAll()
      },
      'Select all matched tab'
    ],
    [
      ['* u', 'i', 'ctrl+u'],
      (event) => {
        preventDefault(event)
        this.store.searchStore.invertSelect()
      },
      'Invert select tabs'
    ],
    [
      ['* a', 'ctrl+8'],
      (event) => {
        preventDefault(event)
        this.store.windowStore.selectAll()
      },
      'Select all tab'
    ],
    [
      ['* n', 'ctrl+n'],
      (event) => {
        preventDefault(event)
        this.store.tabStore.unselectAll()
      },
      'Unselect all tab'
    ],
    [
      ['ctrl+o'],
      (event) => {
        preventDefault(event)
        openInNewTab()
      },
      'Open this window in new tab'
    ],
    [
      ['shift+n'],
      (event) => {
        preventDefault(event)
        this.store.dragStore.dropToNewWindow()
      },
      'Open selected tab(s) in a new window'
    ],
    [
      ['ctrl+i'],
      (event) => {
        preventDefault(event)
        this.store.userStore.toggleDarkTheme()
      },
      'Toggle dark theme'
    ],
    [
      ['?', 'ctrl+/'],
      (event) => {
        preventDefault(event)
        this.openDialog()
      },
      'Open keyboard shortcut help'
    ],
    [
      'ctrl+,',
      (event) => {
        preventDefault(event)
        this.store.userStore.toggleDialog()
      },
      'Toggle Settings'
    ]
  ]

  @action
  stopCallback = (e, element, combo) => {
    if (this.dialogOpen) {
      return combo !== 'escape'
    }
    if (this.inputShortcutSet.has(combo)) {
      return false
    }
    const { contentEditable, tagName, type } = element
    if (contentEditable === 'true') {
      return true
    }
    if (type === 'checkbox') {
      return false
    }
    return ['INPUT', 'SELECT', 'TEXTAREA'].includes(tagName)
  }

  @action
  didMount = (searchEl) => {
    this.searchEl = searchEl
    Mousetrap.prototype.stopCallback = this.stopCallback
    this.resume()
  }

  @action
  willUnmount = () => Mousetrap.reset()

  @action
  resume = () => {
    this.shortcuts.map(([key, func, description]) =>
      Mousetrap.bind(key, (e, combo) => {
        this.combo = `${combo}: ${getDescription(description)}`
        this.openToast()
        func(e)
      })
    )
  }

  @action
  pause = this.willUnmount

  @action
  clearCombo = () => {
    this.combo = null
  }

  @action
  openToast = () => {
    if (!this.store.userStore.showShortcutHint) {
      return
    }
    if (this.closeHandle) {
      clearTimeout(this.closeHandle)
    }
    this.toastOpen = true
    this.closeHandle = setTimeout(this.closeToast, 512)
  }

  @action
  closeToast = () => {
    this.toastOpen = false
  }

  @action
  openDialog = () => {
    this.dialogOpen = true
  }

  @action
  closeDialog = () => {
    this.dialogOpen = false
  }
}
