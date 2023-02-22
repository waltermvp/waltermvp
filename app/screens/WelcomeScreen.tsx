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
import { Text, ContactList } from "../components"
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
import { useNavigation } from "@react-navigation/native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const welcomeLogo = require("../../assets/images/noun-drink.svg")
// const welcomeFace = require("../../assets/images/welcome-face.png")

export const WelcomeScreen: FC<AppStackScreenProps<"Welcome">> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const rotation = useSharedValue(0)
  const [string, setString] = useState("weddings")
  const navigation = useNavigation()
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${rotation.value}deg` }],
    }
  })

  function animateIt(params: string) {
    var toString = null
    switch (params) {
      case "weddings":
        toString = "birthdays"
        break
      case "birthdays":
        toString = "baptisms"
        break
      case "baptisms":
        toString = "weddings"
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

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           Linking.openURL("https://www.linkedin.com/in/waltermvp")
  //         }}
  //         style={$linkedIn}
  //       >
  //         <Text>LinkedIn</Text>

  //         <AntDesign name="linkedin-square" size={24} color={colors.palette.primary} />
  //       </TouchableOpacity>

  //       // <Button
  //       //   style={{ backgroundColor: color.primaryDarker }}
  //       //   onPress={() => {
  //       //     //TODO: pass variables via nested structure
  //       //     navigation.navigate("addDisplayModal") //, { orgID });
  //       //   }}
  //       //   text="+"
  //       // >
  //       //   <AddIcon size="6" style={{ color: "white" }} />
  //       // </Button>
  //     ),
  //   })
  // }, [navigation])

  return (
    <View style={$container}>
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
        {/* <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" /> */}
        <MaterialCommunityIcons
          style={$welcomeFace}
          name="party-popper"
          size={LOGO_SIZE}
          color={colors.palette.primary}
        />
      </View>
      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <ContactList />

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
  flexBasis: "45%",
  justifyContent: "flex-start",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "55%",
  backgroundColor: colors.palette.primary,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const LOGO_SIZE = 150
const $welcomeLogo: ImageStyle = {
  height: LOGO_SIZE,
  width: LOGO_SIZE,
  alignSelf: "flex-start",
  // marginBottom: spacing.huge,
  // marginTop: -spacing.massive * 2,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 225,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.small,
  color: colors.palette.primary,
}

const $linkedIn: TextStyle = {
  margin: spacing.large,
  flexDirection: "row",
}
