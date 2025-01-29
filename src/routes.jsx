import {
  ChatBubbleBottomCenterIcon,
  
  } from "@heroicons/react/24/solid";
  import { USDT, BNB } from "@/pages/dashboard";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <ChatBubbleBottomCenterIcon {...icon} />,
          name: "USDT",
          path: "/USDT",
          element: <USDT />,
        },

        {
          icon: <ChatBubbleBottomCenterIcon {...icon} />,
          name: "BNB",
          path: "/BNB",
          element: <BNB />,
        },
      ],
    },
  ];
  
  export default routes;
  