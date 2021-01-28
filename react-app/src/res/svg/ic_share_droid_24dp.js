import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareDroidIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M18 14a4 4 0 00-3.08 1.48l-5.1-2.35a3.64 3.64 0 000-2.26l5.1-2.35a4 4 0 10-.85-1.81L8.79 9.14a4 4 0 100 5.72l5.28 2.43A4.166 4.166 0 0014 18a4 4 0 104-4zm0-10a2 2 0 110 4 2 2 0 010-4zM6 14a2 2 0 110-4 2 2 0 010 4zm12 6a2 2 0 110-4 2 2 0 010 4z"
        fill={props.color}
      />
    </Svg>
  )
}

export default ShareDroidIcon 
