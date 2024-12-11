import { View, Text } from 'react-native'
import React from 'react'
import { Path, Svg } from 'react-native-svg'

const InfoCircleIcon = ({ height, fill, stroke, width }) => {

    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={width || "24"} height={height || "24"} viewBox="0 0 24 24" fill={fill || "white"}>
            <Path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke={stroke || "#1A1A1A"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default InfoCircleIcon