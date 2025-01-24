import {
  ChatBubbleBottomCenterIcon,
  
  } from "@heroicons/react/24/solid";
  import { USDT } from "@/pages/dashboard";
  
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
      ],
    },
  ];
  
  export default routes;
  