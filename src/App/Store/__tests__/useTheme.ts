import { renderHook } from '@testing-library/react-hooks'
import { useTheme } from '../useTheme'
import { themes } from '../../../themes'

const defaultTheme = themes.light

it(`returns the current theme and a method to set the theme by key`, async () => {
  const { result } = renderHook(() => useTheme())
  const [ theme, setThemeKey ] = result.current

  // confirm shape
  expect(theme).toBe(defaultTheme)
  expect(setThemeKey).toBeInstanceOf(Function)
})
