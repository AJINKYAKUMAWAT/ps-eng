import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoCircleIcon from '../components/icons/InfoCircleIcon'
import { typography } from '../theme/typography'
import CheckCircleIcon from '../components/icons/CheckIconCircle'

const Nudge = ({ toastOption }) => {
    console.log("toastOption",toastOption)
    return (
        <View style={styles.nudgeWrapper}>
            <View style={styles.nudgeContainer}>
                {toastOption?.data?.type === "success" && (
                    <CheckCircleIcon size={1} stroke={"#141414"}/>
                )}
                {toastOption.data?.type === 'warning' || toastOption?.data?.type === 'danger' || toastOption?.data?.type === 'error' && (
                    <InfoCircleIcon stroke={toastOption.data.type === "warning" ? "#141414" : "#F04302"} />
                )}
                <Text
                    style={
                        [toastOption?.data?.type === "success" ? styles.nudgeMessageNormal : styles.nudgeMessageError, { marginHorizontal: 10 }]
                    }
                >
                    {toastOption?.data?.message}
                </Text>
            </View>
        </View>
    )
}

export default Nudge

const styles = StyleSheet.create({
    nudgeWrapper: {
        marginHorizontal: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 2,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    nudgeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // gap: 10,
    },
    nudgeMessageNormal: {
        color: "#141414",
        fontSize: 14,
        fontFamily: typography.bold,
    },
    nudgeMessageError: {
        color: "#F04302",
        fontSize: 14,
        // fontWeight: "700",
        fontFamily: typography.bold
    }
})