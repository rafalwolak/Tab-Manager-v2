import React from 'react'
import { inject, observer } from 'mobx-react'
import Column from 'components/Column'
import Scrollbars from 'libs/Scrollbars'
import ReactResizeDetector from 'react-resize-detector'

const View = props => {
  const { style } = props
  return (
    <div
      {...props}
      className='scrollbar'
      style={{
        ...style,
        display: 'flex',
        overflow: 'auto',
        marginRight: 0,
        marginBottom: 0
      }}
    />
  )
}

@inject('windowStore')
@observer
class Columns extends React.Component {
  scrollbars = React.createRef()

  getScrollbars = () => this.scrollbars.current

  onResize = () => {
    const { height } = this.getScrollbars().getBoundingClientRect()
    this.props.windowStore.updateHeight(height)
  }

  renderEmptyTrack = props => (
    <div {...props} style={{ ...props.style, display: 'none' }} />
  )

  render () {
    const {
      windowStore: { columns }
    } = this.props
    const width = 100 / Math.min(4, columns.length) + '%'
    const list = columns.map((column, i) => (
      <Column
        key={i}
        left={i === 0}
        right={i + 1 === columns.length}
        column={column}
        width={width}
        getScrollbars={this.getScrollbars}
        dragPreview={() => this.dragPreview}
      />
    ))
    return (
      <Scrollbars
        renderView={View}
        renderTrackHorizontal={this.renderEmptyTrack}
        renderTrackVertical={this.renderEmptyTrack}
        ref={this.scrollbars}
        style={{
          display: 'flex',
          flex: '1 1 auto',
          height: 'fit-content'
        }}
      >
        {list}
        <ReactResizeDetector
          handleHeight
          refreshMode='throttle'
          refreshRate={300}
          onResize={this.onResize}
        />
      </Scrollbars>
    )
  }
}

export default Columns
