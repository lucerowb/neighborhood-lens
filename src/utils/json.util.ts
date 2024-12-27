export function parseJSONIfPossible(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (_e) {
    return jsonString;
  }
}
