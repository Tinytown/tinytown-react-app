import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OverflowiOSIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M17 12a2 2 0 104 0 2 2 0 00-4 0zM7 12a2 2 0 10-4 0 2 2 0 004 0zm7 0a2 2 0 10-4 0 2 2 0 004 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default OverflowiOSIcon 
