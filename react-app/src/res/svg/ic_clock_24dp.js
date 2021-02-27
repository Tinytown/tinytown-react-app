import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ClockIcon(props) {
  return (
    <Svg viewBox="0 0 24 24"  {...props}>
      <Path
        d="M13 7a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 11.586V7z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12a8 8 0 1116 0 8 8 0 01-16 0z"
        fill={props.color}
      />
    </Svg>
  )
}

export default ClockIcon
