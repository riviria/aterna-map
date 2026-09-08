const STORAGE_KEY = "aterna-map-state";
const STORAGE_VERSION = 1;

export type SavedMapState = {
  version: number;
  zoomRatio: number;
  centerX: number;
  centerY: number;
};

export type SavedDetailState = {
  locationId: string;
  tabId?: string;
  imageIndex?: number;
};

function canUseSessionStorage() {
  return typeof window !== "undefined" && "sessionStorage" in window;
}

export function readSavedMapState(): SavedMapState | null {
  if (!canUseSessionStorage()) return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SavedMapState>;

    if (
      parsed.version !== STORAGE_VERSION ||
      typeof parsed.zoomRatio !== "number" ||
      typeof parsed.centerX !== "number" ||
      typeof parsed.centerY !== "number"
    ) {
      return null;
    }

    return {
      version: STORAGE_VERSION,
      zoomRatio: parsed.zoomRatio,
      centerX: parsed.centerX,
      centerY: parsed.centerY,
    };
  } catch {
    return null;
  }
}

export function saveMapState(state: Omit<SavedMapState, "version">) {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, ...state })
    );
  } catch {
    // Session storage can be unavailable in privacy-restricted browsers.
  }
}

export function clearSavedMapState() {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

const DETAIL_STORAGE_KEY = "aterna-detail-state";

export function readSavedDetailState(): SavedDetailState | null {
  if (!canUseSessionStorage()) return null;

  try {
    const raw = window.sessionStorage.getItem(DETAIL_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SavedDetailState>;

    if (typeof parsed.locationId !== "string" || !parsed.locationId) return null;

    return {
      locationId: parsed.locationId,
      tabId: typeof parsed.tabId === "string" ? parsed.tabId : undefined,
      imageIndex: typeof parsed.imageIndex === "number" ? parsed.imageIndex : undefined,
    };
  } catch {
    return null;
  }
}

export function saveDetailState(state: SavedDetailState) {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.setItem(DETAIL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures.
  }
}

export function clearSavedDetailState() {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.removeItem(DETAIL_STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}
