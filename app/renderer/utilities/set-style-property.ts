import { isValidProperty } from './'

const setStyleProperty = (
  element: HTMLElement,
  property: string,
  value: string
) => {
  if (isValidProperty(property)) {
    element.style.setProperty(property, value)
  }
}

export default setStyleProperty
