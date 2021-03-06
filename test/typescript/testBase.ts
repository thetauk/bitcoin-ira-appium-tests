import {Browser, Element, remote} from "webdriverio";

const MAX_ELEMENT_THRESHOLD = 60000;

type TestDetails = {
    driver: Browser<any> | null;
    sessionId: string;
    caps: any,
    webdriver_path: '/wd/hub';
    webdriver_port: 4723;
    test_start_time_ms: number;
    test_end_time_ms: number;
};

const initTest: () => TestDetails = () => {
    return {
        driver: null,
        sessionId: '',
        caps: {},
        webdriver_path: '/wd/hub',
        webdriver_port: 4723,
        test_start_time_ms: 0,
        test_end_time_ms: 0
    }
}

const setUp = async (testDetails: TestDetails, preLaunch: (testDetails: TestDetails) => void) => {
    preLaunch(testDetails);
    testDetails.driver = await remote({
        path: testDetails.webdriver_path,
        port: testDetails.webdriver_port,
        capabilities: testDetails.caps
    })
    testDetails.sessionId = testDetails.driver.sessionId;
    testDetails.test_start_time_ms = Date.now();
}

const tearDown = async (testDetails: TestDetails) => {
    await new Promise(res => setTimeout(res, 5 * 1000));
    console.log("Test Finished");
    testDetails.test_end_time_ms = Date.now();
    testDetails.driver.deleteSession();
}

// ------ Helper Methods -------

const findElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD, ignore_error = false) => {
    try {
        const el: Element<any> = await driver.$(elementLocator);
        await el.waitForExist({timeout: timeout});
        return el;
    } catch (e) {
        if (ignore_error) {
            console.log(e.message);
        } else {
            throw e;
        }
    }
}

const clickElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD) => {
    await new Promise((r) => setTimeout(r, 5 * 1000));
    const el: Element<any> = await findElement(driver, elementLocator, timeout);
    await el.click();
}

const setValueOfElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD, value: string = "") => {
    await new Promise((r) => setTimeout(r, 5 * 1000));
    const el: Element<any> = await findElement(driver, elementLocator, timeout);
    await el.click();
    await el.setValue(value);
}

const waitForElementToDisappear = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD) => {
    let timedOut = false;
    let elementDisappeared = false;
    setTimeout(() => {
        timedOut = true;
    }, timeout)
    while (!timedOut && !elementDisappeared) {
        let el = await findElement(driver, elementLocator, 0, true);
        if (!el) {
            elementDisappeared = true;
        }
    }
    return elementDisappeared && !timedOut;
}

export {TestDetails, setUp, tearDown, initTest, findElement, clickElement, setValueOfElement, waitForElementToDisappear};
