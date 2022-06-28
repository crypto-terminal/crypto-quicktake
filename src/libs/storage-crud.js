export const getAllPairsFromChromeAsync = async () => {
  const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
  return result.apiKeySecretPairs || [];
};

export const setAllPairsToChromeAsync = async (pairs) => {
  await chrome.storage.sync.set({
    apiKeySecretPairs: pairs
  });
};

export const getTmpPairSync = (cb) => {
  if (typeof cb !== "function") throw new Error("callback must be a function");
  chrome.storage.sync.get(["tmp_addapikey_pair"], (result) => {
    cb(result.tmp_addapikey_pair || {});
  });
};

export const setTmpPairSync = (pair) => {
  if (pair === undefined) throw new Error("a key secret pair is missing");
  chrome.storage.sync.set({ tmp_addapikey_pair: pair }, () => {
    console.log("DO NOT FORGET TO DELETE TMP VALUE AFTER SUBMIT"); // eslint-disable-line
  });
};

export const removeTmpPair = async () => {
  await chrome.storage.sync.remove(["tmp_addapikey_pair"]);
};

export const clearAllPairs = async () => {
  await chrome.storage.sync.clear();
};

export const removeOnePairFromChromeAsync = async (key) => {
  let pairs = await getAllPairsFromChromeAsync();
  const index = pairs.findIndex((pair) => pair.apiKey === key);
  if (index > -1) {
    // in-place, please do not code like this: pairs = pairs.splice(index, 1);
    pairs.splice(index, 1);
    await setAllPairsToChromeAsync(pairs);
  }
};

export const setApiKeyAsMainAsync = async (key) => {
  let pairs = await getAllPairsFromChromeAsync();
  const index = pairs.findIndex((pair) => pair.apiKey === key);
  if (index > -1) {
    // in-place, please do not code like this: pairs = pairs.splice(index, 1);
    const pair = pairs[index];
    pairs.splice(index, 1);
    pairs.unshift(pair);
    await setAllPairsToChromeAsync(pairs);
  }
};