import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native"
import { Text } from "../components"
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated"
import { AntDesign } from "@expo/vector-icons"

const welcomeLogo = require("../../assets/images/logo.svg")
const welcomeFace = require("../../assets/images/welcome-face.png")

export const WelcomeScreen: FC<AppStackScreenProps<"Welcome">> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const rotation = useSharedValue(0)
  const [string, setString] = useState("iOS")

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${rotation.value}deg` }],
    }
  })

  function animateIt(params: string) {
    var toString = null
    switch (params) {
      case "iOS":
        toString = "android"
        break
      case "android":
        toString = "web"
        break
      case "web":
        toString = "iOS"
        break

      default:
        break
    }

    rotation.value = withDelay(
      3333,
      withRepeat(
        withTiming(360, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        }),
        1,
        true,
        (finished) => {
          // console.log("finished: ", finished, toString)
          if (finished) {
            setString(toString)
            rotation.value = 0
            animateIt(toString)
          }
        },
      ),
    )
  }
  useEffect(() => {
    animateIt(string)
  }, [])

  return (
    <View style={$container}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://www.linkedin.com/in/waltermvp")
        }}
        style={{
          alignSelf: "flex-end",
          margin: spacing.large,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text>LinkedIn</Text>

        <AntDesign name="linkedin-square" size={24} color={colors.palette.primary} />
      </TouchableOpacity>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text tx="welcomeScreen.prescript" size="md" />

        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.name"
          preset="heading"
        />
        <View style={{ flexDirection: "row" }}>
          <Text tx="welcomeScreen.exciting" size="lg" preset="subheading" />
          <Animated.View style={[animatedStyles]}>
            <Text preset={"subheading"} size="lg">
              {" " + string}
            </Text>
          </Animated.View>
          <Text preset="subheading" size="lg" text="."></Text>
        </View>
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text
          tx="welcomeScreen.postscript"
          size="md"
          style={{ color: colors.palette.neutral100 }}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.primary,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 150,
  marginBottom: spacing.huge,
  marginTop: -spacing.massive * 2,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.small,
  color: colors.palette.primary,
}
