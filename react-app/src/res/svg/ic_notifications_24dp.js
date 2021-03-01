import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NotificationsIcon(props) {
  return (
    <Svg viewBox="0 0 24 24"  {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 18H4a1 1 0 01-.493-1.87A3 3 0 005 13.935V11l.001-.047A8 8 0 019.07 4.356a3 3 0 015.86 0A8 8 0 0119 11v2.935a3 3 0 001.493 2.195A1 1 0 0120 18h-4a4 4 0 11-8 0zm3.293-13.707A1 1 0 0113 5a1 1 0 00.572.904A6 6 0 0117 11.024V14c0 .04.002.08.007.12A5 5 0 0017.63 16H6.37a5 5 0 00.623-1.88A1 1 0 007 14v-2.976a6 6 0 013.409-5.111.992.992 0 00.436-.378c.103-.164.158-.355.155-.55a1 1 0 01.293-.692zM14 18a2 2 0 01-4 0h4z"
        fill={props.color}
      />
    </Svg>
  )
}

export default NotificationsIcon
