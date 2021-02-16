import * as React from "react"
import Svg, { Path } from "react-native-svg"

function OpenExternalIcon(props) {
  return (
    <Svg viewBox="0 0 24 24"  {...props}>
      <Path
        d="M17.586 5l-8.293 8.293a1 1 0 101.414 1.414L19 6.414V9a1 1 0 102 0V4.001l-.001-.049A.996.996 0 0020 3h-5a1 1 0 100 2h2.586z"
        fill={props.color}
      />
      <Path
        d="M3.879 6.879A3 3 0 016 6h5a1 1 0 110 2H6a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-5a1 1 0 112 0v5a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 01.879-2.121z"
        fill={props.color}
      />
    </Svg>
  )
}

export default OpenExternalIcon
