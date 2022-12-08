import * as dbConf from "./db.conf";
import * as mailerConf from "./mailer.conf";

export default {
  isDev: false,
  jwtConstants: {
    secret: "SECRET_KEY"
  },
  db: {
    ...dbConf
  },
  mailer: {
    ...mailerConf
  },
  emailCode: {
    max: 999999,
    min: 111111
  },
  devPort: 8080,
  prodPort: 8082
};
