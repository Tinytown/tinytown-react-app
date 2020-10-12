import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareiOSIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M9.71 6.71L11 5.41V17a1 1 0 002 0V5.41l1.29 1.3a1 1 0 001.639-.325 1 1 0 00-.219-1.095l-3-3a1 1 0 00-1.42 0l-3 3a1.004 1.004 0 001.42 1.42zM19 9h-2a1 1 0 100 2h2a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1v-7a1 1 0 011-1h2a1 1 0 000-2H5a3 3 0 00-3 3v7a3 3 0 003 3h14a3 3 0 003-3v-7a3 3 0 00-3-3z"
        fill={props.color}
      />
    </Svg>
  )
}

export default ShareiOSIcon 
