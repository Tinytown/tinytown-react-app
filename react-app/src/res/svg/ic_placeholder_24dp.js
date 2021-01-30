import * as React from 'react'
import Svg, { Circle } from 'react-native-svg'

function PlaceholderIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Circle cx={12} cy={12} r={5} stroke={props.color} strokeWidth={2} />
    </Svg>
  )
}

export default PlaceholderIcon