import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'antd'

const AppPageHeader = (props) => {
  const { extras, title, children } = props
  return (
        <div className="site-page-header-ghost-wrapper" style={{ marginBottom: 10 }}>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                extra={extras}>
                {children}
            </PageHeader>
        </div>
  )
}
export default AppPageHeader

AppPageHeader.propTypes = {
  extras: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node
}
