import React from "react";
import "../../style/Home.css";
import Events from "./Events";
import Explore from "./Explore";
import Info from "./Info";
import LastSection from "./LastSection";
// import { Info } from 'lucide-react'
export default function Home() {
  return (
    <div className="homePage">
      <Events />
      <Explore />
      <Info />
      <LastSection />
    </div>
  );
}
