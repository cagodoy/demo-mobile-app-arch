import { AsyncStorage } from 'react-native';
import { fromJS } from 'immutable';

function toJSSnapshot(state) {
  const obj = {};

  for (const key in state) {
    if (!state.hasOwnProperty(key)) {
      continue;
    }

    obj[key] = key === 'nav' ? state[key] : state[key].toJS();
  }

  return obj;
}

function fromJSSnapshot(state) {
  const obj = {};

  for (const key in state) {
    if (!state.hasOwnProperty(key)) {
      continue;
    }
    obj[key] = key === 'nav' ? state[key] : fromJS(state[key]);
  }

  return obj;
}

const STATE_STORAGE_KEY = 'TenpoChallenge:0.0.1';

export async function resetSnapshot() {
  const state = await rehydrate();
  if (state) {
    return fromJSSnapshot(state);
  }

  return null;
}

export async function saveSnapshot(state) {
  await persist(toJSSnapshot(state));
}

export async function clearSnapshot() {
  await clear();
}

/**
 * Saves provided state object to async storage
 *
 * @returns {Promise}
 */
async function persist(state) {
  try {
    await AsyncStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error persisting application state', e);
  }
}

/**
 * Reads state object from async storage
 *
 * @returns {Promise}
 */
async function rehydrate() {
  try {
    const state = await AsyncStorage.getItem(STATE_STORAGE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (e) {
    console.error('Error reading persisted application state', e);
    return null;
  }
}

async function clear() {
  try {
    await AsyncStorage.removeItem(STATE_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing peristed application state', e);
  }
}
