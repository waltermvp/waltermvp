const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    prescript: "Hi, my name is,",
    postscript:
      "I'm a software engineer with a focus on detail, design and execution. I currently lead the mobile team @ Obviohealth, where we are revolutionizing the way clinical trials are run.",
    readyForLaunch: "I build digital experiences for mobile and web.",
    name: "Walter Vargas-Pena",
    exciting: "I build digital experiences for mobile and web.",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
