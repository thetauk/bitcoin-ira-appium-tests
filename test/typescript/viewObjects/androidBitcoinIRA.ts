export default {
    WelcomePage: {
        getStartedButton: "android=new UiSelector().text(\"Get Started\")",
    },
    HomePage: {
        loginButton: "android=new UiSelector().text(\"Login\")",
        neverButton: "id:android:id/autofill_save_no",
        askMeLaterButton: "android=new UiSelector().text(\"ASK ME LATER\")",
        yourProgressFragment: "android=new UiSelector().text(\"YOUR PROGRESS\")",
    },
    LoginEmailPage: {
        emailField: "android.widget.EditText",
        continueButton: "android=new UiSelector().text(\"Continue\")",
    },
    LoginPasswordPage: {
        passwordField: "//android.widget.EditText[@password=\"true\"]",
        loginButton: "android=new UiSelector().className(\"android.widget.Button\").childSelector(new UiSelector().text(\"Login\"))",
    }
};
