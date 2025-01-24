import {
  UsersIcon,
  BuildingLibraryIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Farmer",
    link: "/dashboard/Farmer"
  },
  {
    color: "gray",
    icon: BuildingLibraryIcon,
    title: "Crop Insurance",
    link: "/dashboard/cropInsurance"
  },
  {
    color: "gray",
    icon: PaperAirplaneIcon,
    title: "Weather Provider",
    link: "/dashboard/Weather-provider"
  },
  {
    color: "gray",
    icon: CurrencyDollarIcon,
    title: "Payout",
    link: "/dashboard/payout"
  },
  {
    color: "gray",
    icon: ChatBubbleBottomCenterIcon,
    title: "Feedback",
    link: "/dashboard/feedback"
  },
];

export default statisticsCardsData;
