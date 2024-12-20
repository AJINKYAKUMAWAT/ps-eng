import { Fragment } from "react";
import { SafeAreaView, StatusBar } from "react-native";

export const CustomStatusBar = ({
    children,
    statusBgColor = '#fff',
    barStyle = 'dark-content',
    bgColor = '#fff',
  }) => {
    return (
      <Fragment>
        <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
        <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
          {children}
        </SafeAreaView>
      </Fragment>
    );
  };