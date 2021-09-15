import {
    clickElement,
    findElement,
    initTest,
    setUp,
    setValueOfElement,
    tearDown,
    TestDetails,
    waitForElementToDisappear,
} from "./testBase";
import { androidCapabilities } from "./projectCapabilities";
import AndroidBitcoinIRA from "./viewObjects/androidBitcoinIRA";
// import Tauk from "@tauk.com/tauk";

describe("Bitcoin IRA Android App", function () {
    this.timeout(500000);
    const appPackage = "com.bitcoinira";
    const testDetails: TestDetails = initTest();
    // const tauk: Tauk = new Tauk("your-api-token", "project-id");
    const preLaunch = (testDetails: TestDetails) => {
        testDetails.caps = androidCapabilities();

        // APK will be installed from dropbox
        testDetails.caps["app"] =
            "https://www.dropbox.com/s/gbze32vn39xtj0v/com.bitcoinira-1.3.8.apk?dl=1";
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

        await waitForElementToDisappear(
            testDetails.driver,
            AndroidBitcoinIRA.LoginPasswordPage.passwordField,
            100000
        );

        const neverButton = await findElement(
            testDetails.driver,
            AndroidBitcoinIRA.HomePage.neverButton,
            5000,
            true
        );

        if (neverButton) {
            console.log("Clicking on the [NEVER] Button");
            neverButton.click();
        }

        const askMeLaterButton = await findElement(
            testDetails.driver,
            AndroidBitcoinIRA.HomePage.askMeLaterButton,
            5000,
            true
        );

        if (askMeLaterButton) {
            console.log("Clicking on the [ASK ME LATER] Button");
            askMeLaterButton.click();
        }
    };

    beforeEach(async () => {
        await setUp(testDetails, preLaunch);
        // tauk.setDriver(testDetails.driver);

        // provide the account username and password
        await login("username", "password");
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
