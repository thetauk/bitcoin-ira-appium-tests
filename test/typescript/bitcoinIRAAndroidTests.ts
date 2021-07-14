import {
    TestDetails,
    setUp,
    tearDown,
    initTest,
    findElement,
    clickElement,
    setValueOfElement,
} from "./testBase";
import {androidCapabilities} from "./projectCapabilities";
import AndroidBitcoinIRA from "./viewObjects/androidBitcoinIRA";
// import Tauk from "@tauk.com/tauk";

describe("Bitcoin IRA Android App", function () {
    this.timeout(500000);
    const appPackage = "com.bitcoinira";
    const testDetails: TestDetails = initTest();
    // const tauk: Tauk = new Tauk("5WOnv-3zkqQRQYiOckRaqp6xg", "Z4TtU8pSs");
    const preLaunch = (testDetails: TestDetails) => {
        testDetails.caps = androidCapabilities();

        // APK will be installed from dropbox
        testDetails.caps["app"] =
            "https://www.dropbox.com/s/v9pqke1xoz5dgk4/bitcoin-ira.apk?dl=1";
        testDetails.caps["fullReset"] = true;

        // APK will not be reinstalled
        // testDetails.caps["appPackage"] = appPackage;
        // testDetails.caps["appActivity"] = ".MainActivity";
        // testDetails.caps["noReset"] = true;
    };


    const login = async (username: string, password: string) => {
        console.log("Clicking on the [Get Started] Button");
        await findElement(
            testDetails.driver,
            AndroidBitcoinIRA.WelcomePage.getStartedButton,
            200000
        );

        await clickElement(
            testDetails.driver,
            AndroidBitcoinIRA.WelcomePage.getStartedButton,
            200000
        );

        console.log("Clicking on the [LOGIN] Button");
        await clickElement(
            testDetails.driver,
            AndroidBitcoinIRA.HomePage.loginButton,
            200000
        );

        console.log("Sending Keys to the [Email] Field");
        await setValueOfElement(
            testDetails.driver,
            AndroidBitcoinIRA.LoginEmailPage.emailField,
            200000,
            username
        );

        console.log("Clicking on the [Continue] Button");
        await clickElement(
            testDetails.driver,
            AndroidBitcoinIRA.LoginEmailPage.continueButton,
            200000
        );

        console.log("Sending Keys to the [Password] Field");
        await setValueOfElement(
            testDetails.driver,
            AndroidBitcoinIRA.LoginPasswordPage.passwordField,
            200000,
            password
        );

        console.log("Clicking on the [Login] Button");
        await clickElement(
            testDetails.driver,
            AndroidBitcoinIRA.LoginPasswordPage.loginButton,
            200000
        );
    };

    beforeEach(async () => {
        await setUp(testDetails, preLaunch);
        // tauk.setDriver(testDetails.driver);
        await login("taukautomation@gmail.com", "tauk.com");
    });

    afterEach(async () => {
        // await tauk.upload();
        await tearDown(testDetails);
    });

    it("Should Login Properly with pre-existing credentials", async function () {
        // await tauk.observe(`${this.test?.title}`, async () => {
        console.log("Waiting for the [Bitcoin IRA Home] Page to be logged in");
        await findElement(
            testDetails.driver,
            AndroidBitcoinIRA.HomePage.yourProgressFragment
        );
        // });
    });
});
