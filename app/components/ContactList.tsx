import * as React from "react"
import { Linking, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import { ListItem } from "./ListItem"
import { canOpenURL } from "expo-linking"
import { Button } from "./Button"
import vCard from "vcards-js"

export interface ContactListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  items?: ContactItem[]
}

type ContactItem = {
  title: string
  subTitle: string
  value: string
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  color: string
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    title: "WhatsApp",
    subTitle: "(305)713-6249",
    value: "https://wa.me/13057136249?text=I'm%20interested%20in%20your%20bartending%20services.",
    icon: "whatsapp",
    color: "#25D366",
  },
  {
    title: "Instagram",
    subTitle: "@reign_catering_miami",
    value: "https://www.instagram.com/reign_catering_miami",
    icon: "instagram",
    color: "#C13584",
  },
]

/**
 * Reusable contact list component
 */
export const ContactList = observer(function ContactList(props: ContactListProps) {
  const { style, items = CONTACT_ITEMS } = props
  const $styles = [$container, style]

  const downloadTxtFile = (vcfText) => {
    const element = document.createElement("a")
    const file = new Blob([vcfText], { type: "text/plain;charset=utf-8" })
    element.href = URL.createObjectURL(file)
    element.download = "ReignCatering.vcf"
    document.body.appendChild(element)
    element.click()
  }

  function shareVCard(): string {
    var contact = vCard()

    //set basic properties shown before
    contact.firstName = "Angelica"
    // contact.middleName = "J"
    contact.lastName = "Gianos"
    contact.organization = "ACME Corporation"

    //link to image
    // contact.photo.attachFromUrl(
    //   "https://avatars2.githubusercontent.com/u/5659221?v=3&s=460",
    //   "JPEG",
    // )

    //or embed image
    // contact.photo.attachFromUrl("/path/to/file.jpeg")

    contact.workPhone = "305-713-6249"
    // contact.birthday = new Date("01-01-1985")
    contact.title = "Mixologist"
    // contact.url = "https://github.com/enesser"
    contact.workUrl = "https://reigncateringmiami.com"
    // contact.note = "Notes on Eric"

    //set other vitals
    // contact.nickname = "Scarface"
    // contact.namePrefix = "Mr."
    // contact.nameSuffix = "JR"
    // contact.gender = "M"
    // contact.anniversary = new Date("01-01-2004")
    contact.role = "Mixologist"

    //set other phone numbers
    // contact.homePhone = "312-555-1313"
    contact.cellPhone = "305-713-6249"
    // contact.pagerPhone = "312-555-1515"

    // set fax/ facsimile numbers
    // contact.homeFax = "312-555-1616"
    // contact.workFax = "312-555-1717"

    // set email addresses
    contact.email = "angelica@reigncateringmiami.com"
    contact.workEmail = "angelica@reigncateringmiami.com"
    //set logo of organization or personal logo (also supports embedding, see above)
    // contact.logo.attachFromUrl("https://avatars2.githubusercontent.com/u/5659221?v=3&s=460", "JPEG")

    //set URL where the vCard can be found
    // contact.source = "http://mywebpage/myvcard.vcf"

    //set address information
    // contact.homeAddress.label = "Home Address"
    // contact.homeAddress.street = "123 Main Street"
    // contact.homeAddress.city = "Chicago"
    // contact.homeAddress.stateProvince = "IL"
    // contact.homeAddress.postalCode = "12345"
    // contact.homeAddress.countryRegion = "United States of America"

    // contact.workAddress.label = "Work Address"
    // contact.workAddress.street = "123 Corporate Loop\nSuite 500"
    // contact.workAddress.city = "Los Angeles"
    // contact.workAddress.stateProvince = "CA"
    // contact.workAddress.postalCode = "54321"
    // contact.workAddress.countryRegion = "United States of America"

    //set social media URLs
    contact.socialUrls["whatsapp"] = "https://wa.me/13057136249"
    contact.socialUrls["instagram"] = "https://www.instagram.com/reign_catering_miami"

    // contact.socialUrls["facebook"] = "https://..."
    // contact.socialUrls["linkedIn"] = "https://..."
    // contact.socialUrls["twitter"] = "https://..."
    // contact.socialUrls["flickr"] = "https://..."
    // contact.socialUrls["custom"] = "https://..."

    //you can also embed photos from files instead of attaching via URL
    // contact.photo.embedFromFile("photo.jpg")
    // contact.logo.embedFromFile("logo.jpg")

    contact.version = "3.0" //can also support 2.1 and 4.0, certain versions only support certain fields

    //save to file
    // const documentPath = RNFS.DocumentDirectoryPath
    // contact.saveToFile(`${documentPath}/eric-nesser.vcf`)

    //get as formatted string
    // console.log(contact.getFormattedString(), "formatted string")
    return contact.getFormattedString()
  }

  return (
    <View style={$styles}>
      <Button
        style={$contactStyle}
        text="Save Contact"
        onPress={() => {
          const cardValue = shareVCard()
          downloadTxtFile(cardValue)
        }}
        RightAccessory={() => (
          <MaterialCommunityIcons
            name="download"
            size={LOGO_SIZE_SMALL}
            color={colors.palette.primary}
          />
        )}
      />
      {items.map((item, index) => {
        return (
          <ListItem
            key={index}
            containerStyle={$itemStyle}
            text={item.title}
            subTitle={item.subTitle}
            textStyle={$itemTextStyle}
            RightComponent={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={LOGO_SIZE_SMALL}
                  color={item.color}
                />
                <SimpleLineIcons
                  style={{ fontWeight: "600" }}
                  name={"arrow-right"}
                  size={LOGO_SIZE_SMALL / 2}
                  color={item.color}
                />
              </View>
            }
            onPress={() => {
              canOpenURL(item.value).then((supported) => {
                if (supported) {
                  Linking.openURL(item.value)
                } else {
                  console.log("Don't know how to open URI: " + item.value)
                }
              })
            }}
            // style={$welcomeFace}
            // size={LOGO_SIZE}
          ></ListItem>
        )
      })}
    </View>
  )
})

const LOGO_SIZE_SMALL = 150 / 3

const $container: ViewStyle = {
  justifyContent: "center",
  width: "90%",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
const $itemStyle: ViewStyle = {
  marginVertical: spacing.small,
  padding: spacing.extraSmall,
  paddingLeft: spacing.small,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 13,
}
const $contactStyle: ViewStyle = {
  justifyContent: "space-between",
  backgroundColor: colors.palette.neutral200,
  width: "75%",
  alignSelf: "center",
}

const $itemTextStyle: TextStyle = {
  color: colors.palette.neutral900,
  fontSize: 28,
  fontWeight: "bold",
}
