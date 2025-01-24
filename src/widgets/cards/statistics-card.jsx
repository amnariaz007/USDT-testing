import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function StatisticsCard({ color, icon, title, link, value }) {
  return (
    <Link to={link}>
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader
          variant="gradient"
          color={color}
          floated={false}
          shadow={false}
          className="absolute grid h-12 w-12 place-items-center"
        >
          {icon}
        </CardHeader>
        <CardBody className="p-8 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {title}
          </Typography>
          <Typography variant="h5" color="blue-gray">
            {value}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
};

StatisticsCard.displayName = "StatisticsCard";

export default StatisticsCard;
