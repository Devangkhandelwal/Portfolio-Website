import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import DSA from "./DSA";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import setSplitText from "./utils/splitText";
import { getInitialTier, measureTier, QualityTier } from "../utils/quality";
import { useLoading } from "../context/LoadingProvider";
import { setProgress } from "./Loading";
import { setAllTimeline } from "./utils/GsapScroll";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  // Fixed for the session: swapping the hero out mid-scroll would be worse
  // than the lag it saves. A downgrade found while running is remembered for
  // the next visit instead.
  const [tier] = useState<QualityTier>(() => getInitialTier());
  const [canvasTier, setCanvasTier] = useState<QualityTier>(tier);
  const { setLoading } = useLoading();

  const show3D = tier === "high";

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler, { passive: true });
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("low-power", !show3D);
    return () => document.body.classList.remove("low-power");
  }, [show3D]);

  useEffect(() => {
    return measureTier(() => setCanvasTier("low"));
  }, []);

  // The character normally drives the loading progress and builds the scroll
  // timelines once its model is ready. Without it, nothing would ever reach
  // 100% and the loader would never hand over to the page.
  useEffect(() => {
    if (show3D) return;
    const progress = setProgress(setLoading);
    progress.loaded();
    setAllTimeline();
    return () => progress.clear();
  }, [show3D, setLoading]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && show3D && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && show3D && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <DSA />
            <Work />
            {isDesktopView && <TechStack quality={canvasTier} />}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
