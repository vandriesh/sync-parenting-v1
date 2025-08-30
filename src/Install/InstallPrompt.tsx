"use client";
import { useEffect, useState } from "react";
import { Share, Plus, MonitorDown } from "lucide-react";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isDesktop = !/iPhone|iPad|iPod|Android/i.test(ua);
    const isChrome = /Chrome/i.test(ua);

    console.log({ isSafari, isDesktop, ios, ua, isChrome });

    setIsBrowser(isChrome);
    setIsSafari(isSafari);
    setIsIOS(ios);
    setIsDesktop(isDesktop);
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  function skipPrompt() {
    setIsStandalone(true);
  }

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="fixed bottom-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl  border-gray-200 dark:border-gray-700 p-6 sm:p-2 max-w-sm mx-4 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        {isIOS ? (
          <InstallPromptIOS />
        ) : isBrowser && isDesktop ? (
          <InstallChrome />
        ) : isSafari ? (
          <NoBrowserSupport />
        ) : null}

        {(isIOS || isBrowser) && (
          <div className="mt-4 text-center">
            <button
              onClick={skipPrompt}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
            >
              Maybe later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InstallPromptIOS() {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        To install this app on your iOS device, tap the share button
        <Share className="inline-block mx-1 text-blue-500 w-4 h-4" />
        and then "Add to Home Screen"
        <Plus className="inline-flex  mx-1 bg-gray-500 text-white rounded-md p-0.5 " />
        .
      </p>
    </div>
  );
}

function InstallChrome() {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="text-md  text-gray-600 dark:text-white">
        To install the app on your Desktop, tap the download icon
        <MonitorDown className="inline-block mx-1 text-gray-800 w-6 h-6" />
        from the right side in the address bar, then select "Install"
      </div>
    </div>
  );
}

function NoBrowserSupport() {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="text-md  text-gray-600 dark:text-white">
        Use Chrome like browser to install the app.
      </div>
    </div>
  );
}

export default InstallPrompt;
