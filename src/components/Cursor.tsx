import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    let animId: number;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    function loop() {
      if (!hover && cursor) {
        const dx = mousePos.x - cursorPos.x;
        const dy = mousePos.y - cursorPos.y;
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          const delay = 6;
          cursorPos.x += dx / delay;
          cursorPos.y += dy / delay;
          gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
        }
      }
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    const mouseOverHandlers: Array<{ el: HTMLElement; over: (e: MouseEvent) => void; out: () => void }> = [];

    interactiveElements.forEach((item) => {
      const element = item as HTMLElement;
      const overHandler = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const outHandler = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", overHandler);
      element.addEventListener("mouseout", outHandler);
      mouseOverHandlers.push({ el: element, over: overHandler, out: outHandler });
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", handleMouseMove);
      mouseOverHandlers.forEach(({ el, over, out }) => {
        el.removeEventListener("mouseover", over);
        el.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
