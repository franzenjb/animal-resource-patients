// Maine statute summaries transcribed from the binder's legal section.
// Reference only — the authoritative text is at legislature.maine.gov.

export const STATUTE_SOURCE =
  "https://legislature.maine.gov/statutes/17/title17ch42sec0.html";

export type StatuteSection = { id: string; heading: string; body: string };

export const STATUTE_TITLE =
  "Maine Revised Statutes — Title 17 (Crimes), Chapter 42 (Animal Welfare), Subchapter 2: Possession of Animals";

export const STATUTE_SECTIONS: StatuteSection[] = [
  {
    id: "1021",
    heading: "§1021. Possession of animals",
    body: "A state veterinarian, humane agent, sheriff, deputy sheriff, constable, police officer, animal control officer, or person authorized to make arrests may apply to the District Court or the Superior Court for authorization to take possession of an animal that has been abandoned or cruelly treated, and to turn the animal over to the applicant or another suitable person. This includes authorization to take possession of any maimed, disabled, diseased, dehydrated, malnourished or injured animal, and — where appropriate — to have an animal disposed of humanely.",
  },
  {
    id: "1021-2",
    heading: "Notice to owner",
    body: "If the owner is known, a copy of the application must be served on the owner with an order of court to appear and state why the animal should not be taken and turned over to the applicant or other suitable person, or disposed of humanely. If the owner cannot be found by reasonable diligence, notice is published and the application and order are filed with the court.",
  },
  {
    id: "1021-3",
    heading: "Full hearing",
    body: "A full hearing must be held within 30 days of the application for authorization. The court requires proper care and nourishment and advances the matter on the docket. The court may order the animal taken and disposed of, returned to the owner under conditions, or held pending the hearing, and determines responsibility for costs.",
  },
  {
    id: "1021-3A",
    heading: "§1021(3-A). Emergency euthanasia",
    body: "If an animal in the possession of a humane agent, police officer, animal control officer, or person authorized to make arrests is so severely injured, diseased or suffering that it would be more humane to euthanize it, the animal may be humanely euthanized. Documentation and, where required, a veterinarian's confirmation support the decision.",
  },
  {
    id: "1021-4",
    heading: "§1021(4). Ex parte order",
    body: "The court may issue an ex parte order on findings that the animal faces a reasonable likelihood of death or injury — for example where it has been injured, overworked, tormented, tortured, abandoned, poisoned, or cruelly treated, or where humane clean conditions will substantially improve a weakened animal's condition. The order may direct seizure and care pending a hearing.",
  },
  {
    id: "1021-5",
    heading: "§1021(5). Seizure for observation and examination",
    body: "A humane agent, state veterinarian, or authorized person may seize an animal for observation and examination when there is reasonable cause to believe it is necessary, applying to the District Court or Superior Court. Within a set period the matter is brought before the court, and the animal is sheltered, examined, and cared for pending findings.",
  },
  {
    id: "1021-5A",
    heading: "§1021(5-A). Seizure / shelter / notice procedure",
    body: "After a seizure, the seizing officer notes the place and time, gives reasonable notice, takes the animal to a shelter, contacts the owner where known, and records the animal's condition. Procedures address notice to the owner, advancing the hearing, and the disposition of the animal.",
  },
  {
    id: "1021-5B",
    heading: "§1021(5-B). Temporary possession ban",
    body: "An owner or keeper of an animal lawfully seized or impounded under this section (or §1034) may be prohibited from possessing or acquiring an animal. Violating the prohibition after notice is a civil violation, with a fine of not more than $200 per violation for each day of violation.",
  },
  {
    id: "1021-6",
    heading: "§1021(6). Attachment and enforcement of liens",
    body: "Reasonable expenses of taking possession — transportation, shelter, veterinary care, and disposition — create a lien on the animal. The lien is enforced in the manner provided in Title 10, Chapter 42. The defendant may appeal; appeal provisions address security to satisfy the lien and continued care of the animal while expenses are determined.",
  },
];
