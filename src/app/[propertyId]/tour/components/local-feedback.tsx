import Image from "next/image";

import CarNeededIcon from "@/assets/icons/car-needed.svg";
import CommunityEventsIcon from "@/assets/icons/community-events.svg";
import DogFriendlyIcon from "@/assets/icons/dog-friendly.svg";
import EasyParkingIcon from "@/assets/icons/easy-parking.svg";
import FriendlyNeighbors from "@/assets/icons/friendly-neighbors.svg";
import HolidaySpiritIcon from "@/assets/icons/holiday-spirit.svg";
import KidsPlayOutsideIcon from "@/assets/icons/kids-play-outside.svg";
import LongTermResidentsIcon from "@/assets/icons/long-term-residents.svg";
import QuietIcon from "@/assets/icons/quiet.svg";
import SafeAfterDarkIcon from "@/assets/icons/safe-after-dark.svg";
import WalkableGroceries from "@/assets/icons/walkable-groceries.svg";
import WalkableRestaurantsIcon from "@/assets/icons/walkable-restaurants.svg";
import WellLitStreets from "@/assets/icons/well-lit-streets.svg";
import WildlifeIcon from "@/assets/icons/wildlife.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "@/components/ui/typography";
import { TruliaStatIdentifier } from "@/enums/app.enum";
import { cn } from "@/lib/utils";
import { LocalStats } from "@/types/properties.type";

const localFeedbackMap = {
  [TruliaStatIdentifier.DogFriendly]: {
    label: "Dog Friendly",
    icon: DogFriendlyIcon,
  },
  [TruliaStatIdentifier.WalkableToRestaurants]: {
    label: "Walkable restaurants",
    icon: WalkableRestaurantsIcon,
  },
  [TruliaStatIdentifier.PeopleWouldWalkAloneAtNight]: {
    label: "Safe after dark",
    icon: SafeAfterDarkIcon,
  },
  [TruliaStatIdentifier.EasyParking]: {
    label: "Easy parking",
    icon: EasyParkingIcon,
  },
  [TruliaStatIdentifier.Quiet]: {
    label: "Quiet",
    icon: QuietIcon,
  },
  [TruliaStatIdentifier.NeedACar]: {
    label: "Car needed",
    icon: CarNeededIcon,
  },
  [TruliaStatIdentifier.KidsPlayOutside]: {
    label: "Kids play outside",
    icon: KidsPlayOutsideIcon,
  },
  [TruliaStatIdentifier.LongTermResidents]: {
    label: "Long term residents",
    icon: LongTermResidentsIcon,
  },
  [TruliaStatIdentifier.HolidaySpirit]: {
    label: "Holiday spirit",
    icon: HolidaySpiritIcon,
  },
  [TruliaStatIdentifier.FriendlyNeighbors]: {
    label: "Friendly neighbors",
    icon: FriendlyNeighbors,
  },
  [TruliaStatIdentifier.WellLitStreets]: {
    label: "Well lit streets",
    icon: WellLitStreets,
  },
  [TruliaStatIdentifier.WalkableToGroceries]: {
    label: "Walkable groceries",
    icon: WalkableGroceries,
  },
  [TruliaStatIdentifier.Wildlife]: {
    label: "Wildlife",
    icon: WildlifeIcon,
  },
  [TruliaStatIdentifier.CommunityEvents]: {
    label: "Community events",
    icon: CommunityEventsIcon,
  },
};

type LocalFeedbackProps = {
  localStats: LocalStats;
};

export default function LocalFeedback({ localStats }: LocalFeedbackProps) {
  return (
    <ScrollArea className="h-64 overflow-auto">
      <div className="grid grid-cols-2 items-center gap-2">
        {localStats.stats.map((stat) => {
          const feedback = localFeedbackMap[stat.identifier as keyof typeof localFeedbackMap];
          if (!feedback) {
            return null;
          }

          return (
            <div key={stat.identifier} className="flex justify-between rounded-lg bg-white p-2">
              <div className="flex flex-col justify-between">
                <Image className="mr-2 h-4 w-4" src={feedback.icon} alt={feedback.label} />
                <Typography variant="body">{feedback.label}</Typography>
              </div>

              <div className="flex size-6 items-center justify-center rounded-xl bg-slate-50 px-5 py-1">
                <Typography
                  variant="detailMedium"
                  className={cn({
                    "text-green-600": stat.score >= 63,
                    "text-yellow-600": stat.score > 33 && stat.score < 63,
                    "text-red-600": stat.score <= 33,
                  })}
                >
                  {stat.score}%
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
