async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function showAlert(givenName) {
  alert(`Hello, ${givenName}`);
}

export function App() {
  const handleInjectFileClick = async () => {
    let tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"],
    });
  };

  const handleInjectFunctionClick = async () => {
    let tab = await getCurrentTab();

    let name = "World";
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showAlert,
      args: [name],
    });
  };
  return (
    <div>
      <button id="inject-file" onClick={handleInjectFileClick}>
        Inject file
      </button>
      <button id="inject-function" onClick={handleInjectFunctionClick}>
        Inject function
      </button>
    </div>
  );
}
