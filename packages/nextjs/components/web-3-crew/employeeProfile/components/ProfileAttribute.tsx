import React from "react";
import Subtitle from "~~/components/dash-wind/components/Typography/Subtitle";

interface props {
  labelTitle: string;
  value: string;
}

export default function ProfileAttribute({ labelTitle, value }: props) {
  return (
    <div>
      <span className={"label-text text-base-content"}>{labelTitle}</span>
      <Subtitle>{value}</Subtitle>
    </div>
  );
}
