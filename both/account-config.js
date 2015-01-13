AccountsTemplates.configure({
    // forbidClientAccountCreation: true,
    continuousValidation: true,
    enablePasswordChange: true,
    texts: {
        title: {
            changePwd: "Změna hesla",
            signIn: "Přihlášení"
        },
        info: {
            pwdChanged: "Heslo změněno."
        },
        errors: {
            pwdMismatch: "Hesla nejsou stejná."
        }
    }
});

T9n.setLanguage("cs");
