import nodemailer from "nodemailer";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";

const google_id =
  "172413036255-qdhvp5rcl2ig1ibnb9jbmp49p6rksbjg.apps.googleusercontent.com";

const google_secret = "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";

const google_refresh =
  "1//04Tz6MUlHfPXsCgYIARAAGAQSNwF-L9IrI_Bm_YjJXVFYfdGzRJj3TTvewcmqxuV__3TtQ1_oXUyrjPnMOCvd2GQ_zM4lkQf8Ixg";

const google_url = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(google_id, google_secret, google_url);
oAuth.setCredentials({ access_token: google_refresh });

export const sendEmail = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport: any = nodemailer.createTransport({
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

    const token = jwt.sign({ id: user?._id, token: user?.token }, "code");

    const readFile: any = path.join(__dirname, "../views/index.ejs");
    const data: any = await ejs.renderFile(readFile, {
      name: user?.name,
      email: user?.email,
      token: user?.token,
      url: `http://localhost:3200/api/${token}/verify-account`,
    });

    const mailer: any = {
      from: "SwiftCart Team <kossyuzoigwe@gmail.com>",
      to: user?.email,
      subject: "Account Verification",
      html: data,
    };

    await transport.sendMail(mailer).then(() => {
      console.log("Sent to Agbawo");
    });
  } catch (error: any) {
    console.log(error?.message);
  }
};
