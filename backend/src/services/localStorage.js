//3-2
import localQueue from "../data/localQueue.js";

export function saveLocal(data) {
  localQueue.push(...data);
  return localQueue;
}


export function getLocal() {
  return localQueue;
}

export function clearLocal() {
  localQueue.length = 0;
}