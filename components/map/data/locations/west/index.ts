import { arcadia } from "./arcadia/location";
import { arcadiaDetails } from "./arcadia/details";
import { leichstburg } from "./leichstburg/location";
import { leichstburgDetails } from "./leichstburg/details";
import { viremont } from "./viremont/location";
import { viremontDetails } from "./viremont/details";
import { mountArgon } from "./mount-argon/location";
import { mountArgonDetails } from "./mount-argon/details";
import { louranchstein } from "./louranchstein/location";
import { louranchsteinDetails } from "./louranchstein/details";
import { evermist } from "./evermist/location";
import { evermistDetails } from "./evermist/details";
import { svens } from "./svens/location";
import { svensDetails } from "./svens/details";
import { roehn } from "./roehn/location";
import { roehnDetails } from "./roehn/details";
import { landOfDruid } from "./landofdruid/location";
import { landOfDruidDetails } from "./landofdruid/details";
import { oldSanctum } from "./oldsanctum/location";
import { oldSanctumDetails } from "./oldsanctum/details";
import { northland } from "./northland/location";
import { northlandDetails } from "./northland/details";
import { elinor } from "./elinor/location";
import { elinorDetails } from "./elinor/details";
import { weidenMarsh } from "./weidenmarsh/location";
import { weidenMarshDetails } from "./weidenmarsh/details";
import { ashenVale } from "./ashenvale/location";
import { ashenValeDetails } from "./ashenvale/details";
import { grassland } from "./grassland/location";
import { grasslandDetails } from "./grassland/details";
import { salvatino } from "./salvatino/location";
import { salvatinoDetails } from "./salvatino/details";
import { willowind } from "./willowind/location";
import { willowindDetails } from "./willowind/details";
import { pilgrimHill } from "./pilgrimhill/location";
import { pilgrimHillDetails } from "./pilgrimhill/details";
import { canary } from "./canary/location";
import { canaryDetails } from "./canary/details";
import { albatross } from "./albatross/location";
import { albatrossDetails } from "./albatross/details";
import { eldonia } from "./eldonia/location";
import { eldoniaDetails } from "./eldonia/details";

export const westLocations = [
  arcadia,
  leichstburg,
  viremont,
  mountArgon,
  louranchstein,
  evermist,
  svens,
  roehn,
  landOfDruid,
  oldSanctum,
  northland,
  elinor,
  weidenMarsh,
  ashenVale,
  grassland,
  salvatino,
  willowind,
  pilgrimHill,
  canary,
  albatross,
  eldonia,
];

export const westLocationDetails = {
  [arcadia.id]: arcadiaDetails,
  [leichstburg.id]: leichstburgDetails,
  [viremont.id]: viremontDetails,
  [mountArgon.id]: mountArgonDetails,
  [louranchstein.id]: louranchsteinDetails,
  [evermist.id]: evermistDetails,
  [svens.id]: svensDetails,
  [roehn.id]: roehnDetails,
  [landOfDruid.id]: landOfDruidDetails,
  [oldSanctum.id]: oldSanctumDetails,
  [northland.id]: northlandDetails,
  [elinor.id]: elinorDetails,
  [weidenMarsh.id]: weidenMarshDetails,
  [ashenVale.id]: ashenValeDetails,
  [grassland.id]: grasslandDetails,
  [salvatino.id]: salvatinoDetails,
  [willowind.id]: willowindDetails,
  [pilgrimHill.id]: pilgrimHillDetails,
  [canary.id]: canaryDetails,
  [albatross.id]: albatrossDetails,
  [eldonia.id]: eldoniaDetails,
};
