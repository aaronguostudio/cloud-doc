import { useEffect, useRef } from 'react'

const { remote } = window.require('electron')
const { Menu, MenuItem } = remote

const useContextMenu = (menus, targetSelector, deps) => {
  let clickedElement = useRef(null)

  useEffect(() => {
    const menu = new Menu()
    menus.forEach(item => menu.append(new MenuItem(item)))

    const handleContextMenu = e => {
      if (!document.querySelector(targetSelector).contains(e.target)) return
      clickedElement.current = e.target
      menu.popup({
        window: remote.getCurrentWindow()
      })
    }

    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [...deps, menus, targetSelector])

  return clickedElement
}

export default useContextMenu
