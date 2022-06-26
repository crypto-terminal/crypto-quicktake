export const getAllPairsFromChrome = async () => {
  const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
  return result.apiKeySecretPairs || [];
};

export const setAllPairsToChrome = async (pairs) => {
  await chrome.storage.sync.set({
    apiKeySecretPairs: pairs
  });
};

export const getTmpPairSync = (cb) => {
  chrome.storage.sync.get(["tmp_addapikey_pair"], (result) => {
    cb(result.tmp_addapikey_pair || {});
  });
};

export const setTmpPairSync = (pair) => {
  chrome.storage.sync.set({ tmp_addapikey_pair: pair }, () => {
    console.log("DO NOT FORGET TO DELETE TMP VALUE AFTER SUBMIT"); // eslint-disable-line
  });
};

export const removeTmpPair = async () => {
  await chrome.storage.sync.remove(["tmp_addapikey_pair"]);
};

export const onClearAllPairs = async () => {
  await chrome.storage.sync.clear();
};