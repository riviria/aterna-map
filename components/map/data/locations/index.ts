import type { LocationDetail, MapLocation } from "../types";
import { eastLocationDetails, eastLocations } from "./east";
import { midLocationDetails, midLocations } from "./mid";
import { westLocationDetails, westLocations } from "./west";

export const locations: MapLocation[] = [
  ...westLocations,
  ...midLocations,
  ...eastLocations,
];

export const locationDetails: Record<string, LocationDetail> = {
  ...westLocationDetails,
  ...midLocationDetails,
  ...eastLocationDetails,
};
