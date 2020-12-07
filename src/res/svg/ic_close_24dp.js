import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseIcon(props) {
  return (
    <Svg viewBox="0 0 24 24"  {...props}>
      <Path
        d="M13.41 12l6.3-6.29a1.004 1.004 0 10-1.42-1.42L12 10.59l-6.29-6.3a1.004 1.004 0 00-1.42 1.42l6.3 6.29-6.3 6.29a1 1 0 00.325 1.639 1 1 0 001.095-.219l6.29-6.3 6.29 6.3a1.002 1.002 0 001.639-.325 1 1 0 00-.219-1.095L13.41 12z"
        fill={props.color}
      />
    </Svg>
  )
}

export default CloseIcon
