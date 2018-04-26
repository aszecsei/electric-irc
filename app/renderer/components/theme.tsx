import * as React from 'react'
import { Map } from 'immutable'
import { setStyleProperty, removeStyleProperty, getRoot } from '../utilities'

interface IThemeProps {
  properties: Map<string, string>
}

export class Theme extends React.Component<IThemeProps, any> {
  componentDidMount() {
    const { properties } = this.props
    properties.forEach((value, key) => {
      setStyleProperty(this.getContainer(), key, value)
    })
  }

  componentWillReceiveProps(nextProps: IThemeProps) {
    const { properties } = this.props
    if (nextProps.properties !== properties) {
      this.handleNewProperties(nextProps.properties, properties)
    }
  }

  componentWillUnmount() {
    const { properties } = this.props
    properties.forEach((value, key) => {
      removeStyleProperty(this.getContainer(), key)
    })
  }

  getContainer = () => {
    // TODO: Abstract this so that we can have non-global settings
    // See: https://github.com/danbahrami/react-custom-properties/blob/master/src/components/custom-properties.js
    return getRoot()
  }

  handleNewProperties = (
    next: Map<string, string>,
    previous: Map<string, string>
  ) => {
    const removed = previous.filter((value, key) => !next.has(key))
    next.forEach((value, key) => {
      setStyleProperty(this.getContainer(), key, value)
    })
    removed.forEach((value, key) => {
      removeStyleProperty(this.getContainer(), key)
    })
  }

  render() {
    // TODO: Abstract this so that we can have non-global settings
    // See: https://github.com/danbahrami/react-custom-properties/blob/master/src/components/custom-properties.js
    return this.props.children
  }
}
