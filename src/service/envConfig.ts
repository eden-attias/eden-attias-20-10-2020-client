/**
 * This class is made
 */

export default class EnvConfig {
    public static getAppEnv() {
        return process.env.APP_ENV;
    }

    public static getNodeEnv() {
        return process.env.NODE_ENV;
    }

    public static getApiUrlFromServer() {
        return process.env.REACT_APP_APP_API_URL_SERVER;
    }
}
