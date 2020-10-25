import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CrosshairsIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21 11h-1.07A8 8 0 0013 4.07V3a1 1 0 00-2 0v1.07A8 8 0 004.07 11H3a1 1 0 000 2h1.07A8 8 0 0011 19.93V21a1 1 0 002 0v-1.07A8 8 0 0019.93 13H21a1 1 0 000-2zm-9 7a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z"
        fill={props.color}
      />
    </Svg>
  )
}

export default CrosshairsIcon 
