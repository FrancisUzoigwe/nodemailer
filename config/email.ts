import { google } from "googleapis";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
const google_id =
  "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";

const google_secret = "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";

const google_refresh =
  "1//04Tz6MUlHfPXsCgYIARAAGAQSNwF-L9IrI_Bm_YjJXVFYfdGzRJj3TTvewcmqxuV__3TtQ1_oXUyrjPnMOCvd2GQ_zM4lkQf8Ixg";

const google_url = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(google_id, google_secret, google_url);
oAuth.setCredentials({ access_token: google_refresh });

export const verifyAccount = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kossyuzoigwe@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refresh,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user?._id, userToken: user?.token }, "code");

    const readFile = path.join(__dirname, "./verify.ejs");

    const readData = ejs.renderFile(readFile, {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      token: user?.token,
      url: `http://localhost:2345/api/${token}/verify`,
    });

    const mailer = {
      from: "SwiftCart <kossyuzoigwe@gmail.com>",
      to: user?.email,
      subject: "Account Verification",
      readData,
    };

    await transport.sendMail(mailer).then(() => {
      console.log("Sent!!");
    });
  } catch (error: any) {
    console.log("This is the error:",error?.message);
  }
};
