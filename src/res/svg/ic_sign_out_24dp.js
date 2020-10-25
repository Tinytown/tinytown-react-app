import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SignOutIcon(props) {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.879 3.879A3 3 0 015 3h7a3 3 0 013 3v2a1 1 0 11-2 0V6a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1h7a1 1 0 001-1v-2a1 1 0 112 0v2a3 3 0 01-3 3H5a3 3 0 01-3-3V6a3 3 0 01.879-2.121z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.293 8.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L18.586 13H7a1 1 0 110-2h11.586l-1.293-1.293a1 1 0 010-1.414z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SignOutIcon