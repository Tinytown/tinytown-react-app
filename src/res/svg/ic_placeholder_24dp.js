import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function PlaceholderIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={5} stroke={props.color} strokeWidth={2} />
    </Svg>
  )
}

export default PlaceholderIcon