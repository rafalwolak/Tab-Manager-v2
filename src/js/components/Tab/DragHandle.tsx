import React from 'react'
import classNames from 'classnames'
import { useTheme } from 'components/ThemeContext'

export default () => {
  const isDarkTheme = useTheme()
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center w-8 h-8 p-4 m-2 rounded-full hover:shadow-xs focus:outline-none focus:shadow-outline',
        {
          'hover:bg-blue-200 active:bg-blue-300': !isDarkTheme,
          'hover:bg-gray-600 active:bg-gray-800': isDarkTheme
        }
      )}
    >
      ✥
    </button>
  )
}
