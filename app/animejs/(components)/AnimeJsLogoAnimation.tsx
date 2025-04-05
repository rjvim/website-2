"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline, stagger, svg, utils, eases } from "animejs";

import logoSvg from "./logo.svg"; // Assuming the SVG is in this location

const AnimeJsLogoAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for the SVG to be properly loaded in the DOM
    setTimeout(() => {
      const $dot1 = document.querySelector("#dot-1");
      if (!$dot1) return;

      // Create clones for onion effect
      const onions: HTMLElement[] = [];
      for (let i = 0; i < 4; i++) {
        const $clone = $dot1.cloneNode() as HTMLElement;
        $clone.id = "dot-1-" + i;
        utils.set($clone, { opacity: 0 });
        $dot1.parentNode?.appendChild($clone);
        onions.push($clone);
      }

      // Set initial styles
      utils.set(onions, {
        transformOrigin: "100% 50% 0px",
      });
      utils.set(
        ["#a-1", "#n-1", "#i-1", "#m-1", "#e-1", "#dot-1", "#line", "#line-0"],
        {
          transformOrigin: "50% 100% 0px",
        }
      );
      utils.set("#four", {
        transformOrigin: "50% 50% 0px",
      });
      utils.set("#dot-1", {
        translateY: 70,
        scaleY: 3.5,
      });
      utils.set(["#dot-1", "#line path", "#four", ...onions], {
        opacity: 0,
      });
      utils.set(["#line", "#line-0"], {
        opacity: 1,
      });

      // Define animation curves
      const splashCurve = eases.cubicBezier(0.225, 1, 0.915, 0.98);
      const sweechCurve = eases.outElastic(1.1, 0.9);

      // Create timeline animation
      const tl = createTimeline({});

      // FALL animation
      tl.label("FALL");
      tl.add("#line-0", {
        translateY: { to: [-280, 19], ease: "inQuart", duration: 320 },
        scaleY: {
          to: [3, 1.75],
          ease: "outElastic(1, 1.4)",
          duration: 300,
          delay: 320,
        },
        scaleX: {
          to: [0.8, 1],
          ease: "outElastic(1, 1.4)",
          duration: 650,
          delay: 320,
        },
        d: [
          {
            to: svg.morphTo("#line-0-1", 0),
            delay: 320,
            duration: 60,
            ease: "inQuad",
          },
          { to: svg.morphTo("#line-0-2", 0), duration: 80 },
          { to: svg.morphTo("#line-0-3", 0), duration: 90 },
          { to: svg.morphTo("#line-0-4", 0), duration: 90 },
          { to: svg.morphTo("#line-0-6", 0), duration: 140 },
        ],
        ease: "inOutQuad",
      })

        // WIGGLE animation
        .label("WIGGLE")
        .add("#line-0", {
          d: [
            { to: svg.morphTo("#line-1", 0), duration: 340, ease: "inOutQuad" },
            { to: svg.morphTo("#line-2", 0), duration: 260 },
            { to: svg.morphTo("#line-3", 0), duration: 180 },
            { to: svg.morphTo("#line-4", 0), duration: 180 },
            { to: svg.morphTo("#line-5", 0), duration: 340, ease: "outSine" },
          ],
          translateY: { to: 0, duration: 500 },
          scaleX: { to: 0.9, delay: 750, duration: 550, ease: "outQuad" },
          scaleY: 1,
          duration: 900,
        })

        // POP animation
        .label("POP")
        .set("#line", { opacity: 0 }, "POP")
        .set("#dot-1", { opacity: 1, transformOrigin: "50% 50% 0px" }, "POP")
        .add(
          ["#a-1", "#n-1", "#i-1", "#m-1", "#e-1"],
          {
            translateY: [
              { to: [35, -80], duration: 190, ease: splashCurve },
              { to: 4, duration: 120, delay: 20, ease: "inQuad" },
              { to: 0, duration: 120, ease: "outQuad" },
            ],
            scaleX: [
              { to: [0.25, 0.85], duration: 190, ease: "outQuad" },
              { to: 1.08, duration: 120, delay: 85, ease: "inOutSine" },
              { to: 1, duration: 260, delay: 25, ease: "outQuad" },
            ],
            scaleY: [
              { to: [0.4, 1.5], duration: 120, ease: "outSine" },
              { to: 0.6, duration: 120, delay: 180, ease: "inOutSine" },
              { to: 1.2, duration: 180, delay: 25, ease: "outQuad" },
              { to: 1, duration: 190, delay: 15, ease: "outQuad" },
            ],
            duration: 400,
            ease: "outSine",
          },
          stagger(80, { from: "center" })
        )
        .add(
          "#dot-1",
          {
            translateY: [
              { to: [30, -170], duration: 240, ease: splashCurve },
              { to: 35, duration: 180, delay: 120, ease: "inQuad" },
              { to: -50, duration: 250, ease: splashCurve },
              { to: 5, duration: 170, delay: 20, ease: "inQuad" },
              { to: 0, duration: 120, ease: "outQuad" },
            ],
            scaleX: { to: [1.1, 1], duration: 260, ease: "outQuad" },
            scaleY: { to: [4, 1], duration: 190, ease: "outQuad" },
            rotate: [
              { to: "+=.75turn", duration: 480, ease: "outSine" },
              { to: "+=.25turn", duration: 420, delay: 160, ease: "outSine" },
            ],
            ease: "outSine",
          },
          "POP"
        )
        .add(
          "#logo",
          {
            scale: [1.3, 1],
            translateY: [-23, 0],
            duration: 1000,
            ease: "outExpo",
          },
          "POP"
        )
        .add(
          "#i-1",
          {
            scaleY: [
              { to: 0.25, duration: 150, ease: "outExpo" },
              {
                to: 1,
                duration: 700,
                delay: 0,
                ease: "outElastic(2.11, 0.61)",
              },
            ],
            scaleX: [
              { to: 1.5, duration: 50, ease: "outSine" },
              {
                to: 1,
                duration: 900,
                delay: 0,
                ease: "outElastic(2.11, 0.61)",
              },
            ],
          },
          "<<+=380"
        )

        // SWEECH animation
        .label("SWEECH", "-=290")
        .add(
          "#dot-1",
          {
            ease: sweechCurve,
            duration: 900,
            points: svg.morphTo("#dot-2", 0),
          },
          "SWEECH"
        )
        .add(
          onions,
          {
            opacity: stagger([1, 0.4]),
            ease: sweechCurve,
            scaleX: [4, 1],
            duration: 900,
            points: svg.morphTo("#dot-2", 0),
            delay: stagger(18),
          },
          "SWEECH"
        );

      const sweechParams = {
        ease: sweechCurve,
        duration: 900,
      };

      tl.add(
        "#a-1",
        { d: svg.morphTo("#a-2", 0), ...sweechParams },
        "SWEECH+=00"
      )
        .add(
          "#n-1",
          { d: svg.morphTo("#n-2", 0), ...sweechParams },
          "SWEECH+=10"
        )
        .add(
          "#i-1",
          { points: svg.morphTo("#i-2", 0), ...sweechParams },
          "SWEECH+=20"
        )
        .add(
          "#m-1",
          { d: svg.morphTo("#m-2", 0), ...sweechParams },
          "SWEECH+=30"
        )
        .add(
          "#e-1",
          { d: svg.morphTo("#e-2", 0), ...sweechParams },
          "SWEECH+=40"
        )
        .add(
          svg.createDrawable(["#j-line", "#s-line"]),
          {
            opacity: [0.25, 1],
            draw: "0 1",
            duration: 620,
            ease: "outQuint",
            delay: stagger(40),
          },
          "SWEECH+=250"
        )

        // FOUR animation
        .label("FOUR", "<+=80")
        .add(
          "#four",
          {
            fill: { from: "#FFF", delay: 600, ease: "out(2)", duration: 900 },
            opacity: { to: [0, 1], duration: 350, ease: "out(1)" },
            scale: { to: [1.75, 1], duration: 1400, ease: "inOutExpo" },
          },
          "FOUR"
        )
        .add(
          "#blur feGaussianBlur",
          {
            stdDeviation: ["15,15", "0,0"],
            ease: "out(2)",
            duration: 1000,
          },
          "<<"
        )
        .set(["#j", "#s"], { opacity: 1 }, "<<")
        .set(["#j-line", "#s-line", ...onions], { opacity: 0 }, "<<")
        .add(
          ["#a-1", "#n-1", "#i-1", "#m-1", "#e-1", "#j", "#s", "#dot-1"],
          {
            translateX: "-=68",
            ease: "inOutQuint",
            duration: 1250,
            delay: stagger(14),
          },
          "<<"
        );

      // Text animation
      const chars =
        ' !#%&"()*+×,.:;-_=><?@[]^/{|}.-~—0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      function wrapInSpan(targetSelector: string) {
        const target = document.querySelector(targetSelector);
        if (!target) return;

        const text = target.textContent || "";
        let wrappedText = "";

        for (const char of text) {
          wrappedText += `<span>${char === " " ? "&nbsp;" : char}</span>`;
        }

        target.innerHTML = wrappedText;
      }

      wrapInSpan("#sub-text");

      tl.label("TEXT", "<-=600")
        .add(
          "#sub-text span",
          {
            opacity: [{ to: 0.9, duration: 200 }],
            textContent: {
              to: ($el: HTMLElement) => [
                0,
                chars.indexOf($el.textContent || ""),
              ],
              modifier: (v: number) => {
                const c = chars[utils.round(v, 0)];
                return c ? c : " ";
              },
            },
            duration: 800,
            ease: "inOutExpo",
            delay: stagger(30, { from: "center", ease: "inOut(2)" }),
          },
          "TEXT"
        )

        // OUTRO animation
        .label("OUTRO", "+=1000")
        .add(
          "#four",
          {
            translateX: "-=250",
            ease: "inOutExpo",
            duration: 750,
          },
          "OUTRO"
        )
        .add(
          ["#j", "#s", "#dot-1"],
          {
            opacity: 0,
            duration: 620,
            ease: "outQuint",
          },
          "OUTRO"
        )
        .add(
          ["#a-1", "#n-1", "#i-1", "#m-1", "#e-1"],
          {
            translateY: 80,
            duration: 300,
            ease: "outQuint",
            delay: stagger(30, { start: 300, from: "last" }),
          },
          "OUTRO"
        )
        .add(
          "#sub-text span",
          {
            textContent: {
              to: ($el: HTMLElement) => [
                chars.indexOf($el.textContent || ""),
                0,
              ],
              modifier: (v: number) => {
                const c = chars[utils.round(v, 0)];
                return c ? c : " ";
              },
            },
            duration: 800,
            ease: "inOutExpo",
            delay: stagger(30, {
              from: "center",
              reversed: true,
              ease: "inOut(2)",
            }),
          },
          "<<+=200"
        )
        .add(
          "#four",
          {
            opacity: { to: 0, duration: 650, ease: "out(1)" },
          },
          "<<+=750"
        )
        .add(
          "#blur feGaussianBlur",
          {
            stdDeviation: "15,15",
            ease: "out(2)",
            duration: 750,
          },
          "<<"
        )
        .init();
    }, 100); // Short delay to ensure DOM is ready

    // Cleanup function
    return () => {
      // We could remove SVG clones or perform other cleanup if needed
      const onions = document.querySelectorAll('[id^="dot-1-"]');
      onions.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full overflow-hidden bg-black"
    >
      <div
        id="animejs-v4-logo"
        className="relative flex flex-col items-center justify-center w-[640px] h-[360px] overflow-hidden"
      >
        <div
          id="sub-text"
          className="absolute z-10 bottom-[20%] left-0 right-0 text-center text-white font-mono text-lg tracking-wider leading-[26px] whitespace-pre"
        >
          AVAILABLE NOW AT ANIMEJS.COM
        </div>

        {/* Use dangerouslySetInnerHTML to insert the SVG */}
        <div
          className="relative overflow-visible top-[-15%] w-[72%] h-auto"
          dangerouslySetInnerHTML={{ __html: logoSvg }}
        />
      </div>
    </div>
  );
};

export default AnimeJsLogoAnimation;
