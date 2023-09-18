import { createContext, useContext, useEffect, useState } from "react";

const WEB_CLIENT_SETTING_LOCALSTORAGE_KEY = "client-app-settings";

const initialSettings = {
  volume: 75,
  muted: false,
  showLPQuestionPrompt: true,
  showSportRadarWidget: true,
  notifyBySound: true,
  notifyByVibration: true,
};

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem(WEB_CLIENT_SETTING_LOCALSTORAGE_KEY);

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

export const storeSettings = (settings) => {
  window.localStorage.setItem(WEB_CLIENT_SETTING_LOCALSTORAGE_KEY, JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {
    //
  },
});

export const SettingsProvider = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);