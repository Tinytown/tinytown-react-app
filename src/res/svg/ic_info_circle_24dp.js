import * as React from "react"
import Svg, { Path } from "react-native-svg"

function InfoIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 10a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm0 1.5a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zM12 22a10 10 0 1110-10 10.011 10.011 0 01-10 10zm0-18a8 8 0 108 8 8.01 8.01 0 00-8-8z"
        fill={props.color}
      />
    </Svg>
  )
}

export default InfoIcon