/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	SOURCE_EMAIL
Amplify Params - DO NOT EDIT */
const sourceEmail = process.env.SOURCE_EMAIL
var aws = require("aws-sdk")
var ses = new aws.SES({ region: "us-east-1" })

exports.handler = async (event) => {
  //eslint-disable-line
  for (var i = 0; i < event.Records.length; i++) {
    const record = event.Records[i]

    if (record.eventName === "INSERT") {
      const newUser = aws.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
      console.log("123", newUser)

      const params = {
        Destination: {
          ToAddresses: [newUser.email],
        },
        Source: sourceEmail,
        Message: {
          Subject: { Data: "Thanks for Subscribing" },
          Body: {
            Text: { Data: `Welcome ${newUser.first}. ` },
          },
        },
      }

      const result = await ses.sendEmail(params).promise()
      console.log("result is", result)
    }
  }

  return Promise.resolve("Successfully processed DynamoDB record")
}
