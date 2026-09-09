import { arcadia } from "./arcadia/location";
import { arcadiaDetails } from "./arcadia/details";
import { leichstburg } from "./leichstburg/location";
import { leichstburgDetails } from "./leichstburg/details";
import { mountArgon } from "./mount-argon/location";
import { mountArgonDetails } from "./mount-argon/details";
import { viremont } from "./viremont/location";
import { viremontDetails } from "./viremont/details";

export const westLocations = [
  arcadia,
  leichstburg,
  viremont,
  mountArgon,
];

export const westLocationDetails = {
  [arcadia.id]: arcadiaDetails,
  [leichstburg.id]: leichstburgDetails,
  [viremont.id]: viremontDetails,
  [mountArgon.id]: mountArgonDetails,
};
