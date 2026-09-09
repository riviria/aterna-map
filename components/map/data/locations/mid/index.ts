import { largos } from "./largos/location";
import { largosDetails } from "./largos/details";
import { midlands } from "./midlands/locations";
import { midlandsDetails } from "./midlands/details";

export const midLocations = [largos, midlands];

export const midLocationDetails = {
  [largos.id]: largosDetails,
  [midlands.id]: midlandsDetails,
};
