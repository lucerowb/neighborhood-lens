import AfternoonIcon from "@/assets/icons/afternoon.svg";
import EveningIcon from "@/assets/icons/evening.svg";
import LateMorningIcon from "@/assets/icons/late-morning.svg";
import MorningIcon from "@/assets/icons/morning.svg";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";

export const ageRangeLabelMap = {
  [AgeRangeEnum.EIGHTEEN_TO_THIRTY]: "18-30 yo",
  [AgeRangeEnum.THIRTY_ONE_TO_FORTY]: "31-40 yo",
  [AgeRangeEnum.FORTY_ONE_TO_FIFTY]: "41-50 yo",
  [AgeRangeEnum.FIFTY_ONE_TO_SIXTY]: "51-60 yo",
  [AgeRangeEnum.SIXTY_PLUS]: "60+ yo",
};

export const genderLabelMap = {
  [GenderEnum.MALE]: "Male",
  [GenderEnum.FEMALE]: "Female",
};

export const stageOfLifeLabelMap = {
  [StageOfLifeEnum.SINGLE_AND_EXPLORING_OPTIONS]: "Single and exploring options",
  [StageOfLifeEnum.MARRIED_OR_PARTNERED]: "Married or partnered",
  [StageOfLifeEnum.MARRIED_WITH_KIDS]: "Married with kids",
  [StageOfLifeEnum.RETIRED_AND_ENJOYING_LIFE]: "Retired and enjoying life",
};

export const timeSlotConfigMap = {
  [TimeSlots.MORNING]: {
    lightPreset: "dawn",
    icon: MorningIcon,
  },
  [TimeSlots.LATE_MORNING]: {
    lightPreset: "day",
    icon: LateMorningIcon,
  },
  [TimeSlots.AFTERNOON]: {
    lightPreset: "day",
    icon: AfternoonIcon,
  },
  [TimeSlots.EVENING]: {
    lightPreset: "dusk",
    icon: EveningIcon,
  },
};

export const categoryReplyMap = {
  [CategoryEnum.AMUSEMENT_PARK]: {
    reply:
      "Meow! Amusement parks are a blast! There's nothing like the thrill of a roller coaster and the joy of carnival games!",
    catImageNumber: 7,
  },
  [CategoryEnum.ART_GALLERY]: {
    reply: "Purr! Art galleries are so inspiring! Each piece tells a unique story and sparks creativity.",
    catImageNumber: 7,
  },
  [CategoryEnum.MOVIE_THEATER]: {
    reply: "Meow! I love watching movies on the big screen! It's the perfect way to escape reality for a while.",
    catImageNumber: 7,
  },
  [CategoryEnum.MUSEUM]: {
    reply: "Purr! Museums are treasure troves of knowledge and history. There's always something new to learn!",
    catImageNumber: 7,
  },
  [CategoryEnum.WATER_PARK]: {
    reply: "Meow! Water parks are so refreshing! Splashing around in the water is the best way to beat the heat.",
    catImageNumber: 7,
  },
  [CategoryEnum.ZOO]: {
    reply: "Purr! Zoos are full of fascinating animals from all over the world. It's like going on a mini safari!",
    catImageNumber: 7,
  },
  [CategoryEnum.HEALTH_AND_BEAUTY_SERVICE_MALE]: {
    reply: "Meow! Time for some grooming! A little pampering goes a long way in making you feel your best.",
    catImageNumber: 7,
  },
  [CategoryEnum.HEALTH_AND_BEAUTY_SERVICE_FEMALE]: {
    reply: "Purr! Time for some pampering! Treat yourself to a relaxing spa day and feel rejuvenated.",
    catImageNumber: 7,
  },
  [CategoryEnum.BAKERY]: {
    reply: "Meow! Bakeries smell so good! Freshly baked bread and pastries are simply irresistible.",
    catImageNumber: 7,
  },
  [CategoryEnum.CAFE]: {
    reply:
      "Purr! Cafes are great for a quick break and a delicious cup of coffee. Perfect for catching up with friends!",
    catImageNumber: 7,
  },
  [CategoryEnum.RESTAURANTS]: {
    reply: "Meow! Restaurants have the most delicious food! Exploring different cuisines is always an adventure.",
    catImageNumber: 7,
  },
  [CategoryEnum.PARK]: {
    reply: "Purr! Parks are great for a leisurely walk or a picnic. It's the perfect place to relax and enjoy nature.",
    catImageNumber: 7,
  },
  [CategoryEnum.SCHOOL_COLLEGES]: {
    reply:
      "Meow! Education is important! Schools and colleges are where you build your future and make lifelong friends.",
    catImageNumber: 7,
  },
  [CategoryEnum.GROCERY_STORE]: {
    reply:
      "Purr! Grocery stores have everything you need! It's always fun to discover new ingredients for your recipes.",
    catImageNumber: 7,
  },
  [CategoryEnum.GYM_STUDIO]: {
    reply: "Meow! Time to get fit! Gym studios are perfect for working out and staying healthy.",
    catImageNumber: 7,
  },
  [CategoryEnum.SHOPPING_MALL]: {
    reply: "Purr! Shopping malls have everything you could ever want! It's a one-stop shop for all your needs.",
    catImageNumber: 7,
  },
  [CategoryEnum.YOGA]: {
    reply: "Meow! Yoga is great for relaxation and mindfulness. It's the perfect way to find your inner peace.",
    catImageNumber: 7,
  },
  [CategoryEnum.HIKING_TRAIL]: {
    reply:
      "Purr! Hiking trails are great for adventure and exploring the great outdoors. It's a wonderful way to connect with nature.",
    catImageNumber: 7,
  },
  [CategoryEnum.CLUBS]: {
    reply:
      "Meow! Clubs are great for nightlife and dancing the night away. It's the perfect place to let loose and have fun!",
    catImageNumber: 7,
  },
  [CategoryEnum.BREAKFAST_SPOT]: {
    reply:
      "Purr! Breakfast spots are the best way to start the day! A hearty breakfast sets the tone for a great day ahead.",
    catImageNumber: 7,
  },
  [CategoryEnum.NIGHT_MARKET]: {
    reply:
      "Meow! Night markets are so lively and full of energy! It's a great place to find unique items and delicious street food.",
    catImageNumber: 7,
  },
  [CategoryEnum.LANDMARK_AND_OUTDOORS]: {
    reply: "Purr! Landmarks are full of history and stories. Exploring them is like taking a step back in time.",
    catImageNumber: 7,
  },
  [CategoryEnum.BAR]: {
    reply:
      "Meow! Bars are great for socializing and enjoying a drink with friends. It's the perfect place to unwind after a long day.",
    catImageNumber: 7,
  },
};
