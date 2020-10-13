import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MegaphoneIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19.991 2.002a1 1 0 00-1 1v.637a9.036 9.036 0 01-7 3.363h-6a3.003 3.003 0 00-3 3v2a3.003 3.003 0 003 3h.484l-2.403 5.606a1 1 0 00.92 1.394h4a1 1 0 00.918-.606l2.724-6.356a9.03 9.03 0 016.357 3.325v.637a1 1 0 102 0v-16a1 1 0 00-1-1zm-14 11a1 1 0 01-1-1v-2a1 1 0 011-1h1v4h-1zm2.341 7H6.508l2.142-5h1.825l-2.143 5zm10.66-4.478a11.053 11.053 0 00-7-2.522h-3v-4h3a11.053 11.053 0 007-2.522v9.044z"
        fill={props.color}
      />
    </Svg>
  )
}

export default MegaphoneIcon
