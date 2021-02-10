import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LabIcon(props) {
  return (
    <Svg viewBox="0 0 24 24"  {...props}>
      <Path
        d="M20.11 17.49L15 8.73V4h1a1 1 0 100-2H8a1 1 0 000 2h1v4.73l-5.11 8.76A3 3 0 006.48 22h11a3 3 0 002.59-4.51h.04zm-9.25-8A1 1 0 0011 9V4h2v5a1 1 0 00.14.5L14 11h-4l.86-1.51zm7.52 10a1 1 0 01-.86.5h-11a1 1 0 01-.86-1.5L8.83 13h6.35l3.2 5.5a1 1 0 010 1v-.01zM10 15a1 1 0 100 2 1 1 0 000-2zm4 1a1 1 0 100 2 1 1 0 000-2z"
        fill={props.color}
      />
    </Svg>
  )
}

export default LabIcon
