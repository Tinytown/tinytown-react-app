import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OverflowDroidIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 7a2 2 0 100-4 2 2 0 000 4zm0 10a2 2 0 100 4 2 2 0 000-4zm0-7a2 2 0 100 4 2 2 0 000-4z"
        fill={props.color}
      />
    </Svg>
  )
}

export default OverflowDroidIcon 
