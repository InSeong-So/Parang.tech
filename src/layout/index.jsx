import React from 'react'
import * as Sentry from '@sentry/browser'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

export class Layout extends React.Component {
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <React.Fragment>
        <Top title={title} location={location} rootPath={rootPath} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(31),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <ThemeSwitch />
          <Header title={title} location={location} rootPath={rootPath} />
          {children}
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}