import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SignOutIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M12.59 13l-2.3 2.29a1.002 1.002 0 00.325 1.639 1 1 0 001.095-.219l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1.001 1.001 0 00-.21-.33l-4-4a1.003 1.003 0 10-1.42 1.42l2.3 2.29H3a1 1 0 000 2h9.59zM12 2a10 10 0 00-9 5.55 1.006 1.006 0 101.8.9A8 8 0 1112 20a7.93 7.93 0 01-7.16-4.45 1.006 1.006 0 00-1.8.9A10 10 0 1012 2z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SignOutIcon