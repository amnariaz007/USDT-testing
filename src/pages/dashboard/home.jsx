import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";

export function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);
  const videos = [
    "https://www.youtube.com/watch?v=P2izCyFt_d0",
    "https://www.youtube.com/watch?v=6ImFBrRuGG0",
    "https://www.youtube.com/watch?v=a1U4lOKn0Wc",
    "https://www.youtube.com/watch?v=7WP3LxiKVW0",
  ];

  useEffect(() => {
    if (playerRef.current && playerRef.current.getInternalPlayer()) {
      playerRef.current.seekTo(0);
      playerRef.current.getInternalPlayer().playVideo();
    }
  }, [currentVideoIndex]);

  const handleVideoEnded = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            // footer={
            //   <Typography className="font-normal text-blue-gray-600">
            //     <strong className={footer.color}>{footer.value}</strong>
            //     &nbsp;{footer.label}
            //   </Typography>
            // }
          />
        ))}
      </div>

      {/* Video Player Section */}
      <div className="mb-12">
        <Card>
          <CardHeader color="blue" className="relative h-[500px]">
            <ReactPlayer
              ref={playerRef}
              url={videos[currentVideoIndex]}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              preload="auto"
              muted={true}
              onEnded={handleVideoEnded}
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Project Overview
            </Typography>
            <Typography>
                Here is a detailed overview of our recent projects. The videos
                provide in-depth insights and walkthroughs.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
