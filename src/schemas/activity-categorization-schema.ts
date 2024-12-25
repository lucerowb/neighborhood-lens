import { AgeRangeEnum, StageOfLifeEnum } from "@/enums/app.enum";

const activityCategorizationSchema = {
  [AgeRangeEnum.EIGHTEEN_TO_THIRTY]: {
    lifeStages: [StageOfLifeEnum.SINGLE_AND_EXPLORING_OPTIONS, StageOfLifeEnum.MARRIED_OR_PARTNERED],
    timeSlots: {
      morning: {
        activities: [
          {
            category: "Gym and Studio",
            categoryId: "18021",
            subcategories: [
              { name: "Dance Studio", id: "18025" },
              { name: "Yoga Studio", id: "18028" },
            ],
          },
          {
            category: "Cafe, Coffee, and Tea House",
            categoryId: "13032",
            subcategories: [
              { name: "Coffee Shop", id: "13035" },
              { name: "Café", id: "13034" },
            ],
          },
          { category: "Hiking Trail", categoryId: "16019" },
          { category: "Park", categoryId: "16032" },
        ],
        genderPreferences: "all",
      },
      lateMorning: {
        activities: [
          { category: "Museum", categoryId: "10027" },
          { category: "Art Gallery", categoryId: "10004" },
          { category: "Botanical Garden", categoryId: "16005" },
          { category: "Shopping Mall", categoryId: "17114" },
          { category: "Boutique", categoryId: "17020" },
        ],
        genderPreferences: "all",
      },
      noon: {
        activities: [
          {
            category: "Restaurant",
            categoryId: "13065",
            subcategories: [
              { name: "Bistro", id: "13027" },
              { name: "Pizzeria", id: "13064" },
            ],
          },
          { category: "Food Court", categoryId: "13052" },
          { category: "Food Truck", categoryId: "13054" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      afternoon: {
        activities: [
          { category: "Movie Theater", categoryId: "10024" },
          { category: "Amusement Park", categoryId: "10001" },
          { category: "Zoo", categoryId: "10056" },
          { category: "Aquarium", categoryId: "10002" },
          { category: "Park", categoryId: "16032", subcategories: [{ name: "Playground", id: "16037" }] },
        ],
        genderPreferences: "all",
      },
      night: {
        activities: [
          {
            category: "Bar",
            categoryId: "13003",
            subcategories: [
              { name: "Sports Bar", id: "13022" },
              { name: "Pub", id: "13018" },
              { name: "Rooftop Bar", id: "13019" },
              { name: "Wine Bar", id: "13025" },
            ],
          },
          { category: "Night Club", categoryId: "10032" },
          { category: "Restaurant", categoryId: "13065" },
          { category: "Movie Theater", categoryId: "10024" },
        ],
        genderPreferences: "all",
      },
    },
  },

  [AgeRangeEnum.THIRTY_ONE_TO_FORTY]: {
    lifeStages: [StageOfLifeEnum.MARRIED_OR_PARTNERED, StageOfLifeEnum.MARRIED_WITH_KIDS],
    timeSlots: {
      morning: {
        activities: [
          { category: "Gym and Studio", categoryId: "18021", subcategories: [{ name: "Yoga Studio", id: "18028" }] },
          { category: "Park", categoryId: "16032" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      lateMorning: {
        activities: [
          { category: "Museum", categoryId: "10027" },
          { category: "Community Center", categoryId: "12004" },
          { category: "Shopping Mall", categoryId: "17114" },
        ],
        genderPreferences: "all",
      },
      noon: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
          { category: "Food Court", categoryId: "13052" },
        ],
        genderPreferences: "all",
      },
      afternoon: {
        activities: [
          { category: "Park", categoryId: "16032", subcategories: [{ name: "Playground", id: "16037" }] },
          { category: "Zoo", categoryId: "10056" },
          { category: "Aquarium", categoryId: "10002" },
          { category: "Library", categoryId: "12080" },
        ],
        genderPreferences: "all",
      },
      night: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          {
            category: "Bar",
            categoryId: "13003",
            subcategories: [
              { name: "Wine Bar", id: "13025" },
              { name: "Pub", id: "13018" },
            ],
          },
          { category: "Movie Theater", categoryId: "10024" },
        ],
        genderPreferences: "all",
      },
    },
  },

  [AgeRangeEnum.FORTY_ONE_TO_FIFTY]: {
    lifeStages: [StageOfLifeEnum.MARRIED_WITH_KIDS, StageOfLifeEnum.MARRIED_OR_PARTNERED],
    timeSlots: {
      morning: {
        activities: [
          { category: "Gym and Studio", categoryId: "18021", subcategories: [{ name: "Yoga Studio", id: "18028" }] },
          { category: "Park", categoryId: "16032" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      lateMorning: {
        activities: [
          { category: "Art Gallery", categoryId: "10004" },
          { category: "Museum", categoryId: "10027" },
          { category: "Botanical Garden", categoryId: "16005" },
        ],
        genderPreferences: "all",
      },
      noon: {
        activities: [
          { category: "Restaurant", categoryId: "13065", subcategories: [{ name: "Bistro", id: "13027" }] },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      afternoon: {
        activities: [
          { category: "Library", categoryId: "12080" },
          { category: "Shopping Mall", categoryId: "17114" },
          { category: "Park", categoryId: "16032" },
        ],
        genderPreferences: "all",
      },
      night: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Bar", categoryId: "13003", subcategories: [{ name: "Wine Bar", id: "13025" }] },
          { category: "Movie Theater", categoryId: "10024" },
        ],
        genderPreferences: "all",
      },
    },
  },

  [AgeRangeEnum.FIFTY_ONE_TO_SIXTY]: {
    lifeStages: [StageOfLifeEnum.MARRIED_WITH_KIDS, StageOfLifeEnum.MARRIED_OR_PARTNERED],
    timeSlots: {
      morning: {
        activities: [
          { category: "Park", categoryId: "16032" },
          { category: "Hiking Trail", categoryId: "16019" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      lateMorning: {
        activities: [
          { category: "Museum", categoryId: "10027" },
          { category: "Art Gallery", categoryId: "10004" },
          { category: "Community Center", categoryId: "12004" },
        ],
        genderPreferences: "all",
      },
      noon: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      afternoon: {
        activities: [
          { category: "Library", categoryId: "12080" },
          { category: "Park", categoryId: "16032" },
          { category: "Botanical Garden", categoryId: "16005" },
        ],
        genderPreferences: "all",
      },
      night: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Movie Theater", categoryId: "10024" },
          { category: "Bar", categoryId: "13003", subcategories: [{ name: "Wine Bar", id: "13025" }] },
        ],
        genderPreferences: "all",
      },
    },
  },

  [AgeRangeEnum.SIXTY_PLUS]: {
    lifeStages: [StageOfLifeEnum.RETIRED_AND_ENJOYING_LIFE],
    timeSlots: {
      morning: {
        activities: [
          { category: "Park", categoryId: "16032" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
          { category: "Community Center", categoryId: "12004" },
        ],
        genderPreferences: "all",
      },
      lateMorning: {
        activities: [
          { category: "Museum", categoryId: "10027" },
          { category: "Library", categoryId: "12080" },
          { category: "Community Center", categoryId: "12004" },
        ],
        genderPreferences: "all",
      },
      noon: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Cafe, Coffee, and Tea House", categoryId: "13032" },
        ],
        genderPreferences: "all",
      },
      afternoon: {
        activities: [
          { category: "Park", categoryId: "16032" },
          { category: "Library", categoryId: "12080" },
          { category: "Botanical Garden", categoryId: "16005" },
        ],
        genderPreferences: "all",
      },
      night: {
        activities: [
          { category: "Restaurant", categoryId: "13065" },
          { category: "Movie Theater", categoryId: "10024" },
          { category: "Community Center", categoryId: "12004" },
        ],
        genderPreferences: "all",
      },
    },
  },
};

export default activityCategorizationSchema;
