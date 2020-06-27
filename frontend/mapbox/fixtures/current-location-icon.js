import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M19 9h-1.07A8 8 0 0011 2.07V1a1 1 0 00-2 0v1.07A8 8 0 002.07 9H1a1 1 0 000 2h1.07A8 8 0 009 17.93V19a1 1 0 102 0v-1.07A8 8 0 0017.93 11H19a1 1 0 000-2zm-9 7a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"
        fill="#16E07D"
      />
    </Svg>
  )
}

export default SvgComponent
