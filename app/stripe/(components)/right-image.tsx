import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { GridBackground } from "@/components/grid-background";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function RightImage() {
  return (
    <div
      className="relative flex w-full flex-col items-center px-5 overflow-x-hidden"
      // style={{
      //   marginBottom: "calc(calc(calc(100vw - 0px)* 0.106)*-1)",
      // }}
    >
      {/* <div className="absolute inset-0 w-full h-full overflow-visible">
        <div
          className="relative h-full w-full top-0 left-0 overflow-hidden"
          style={{
            transformOrigin: "0 0",
            transform: "skewY(-6deg)",
            background: "#f6f9fc",
          }}
        ></div>
      </div> */}

      <GridBackground maxWidthClass="container" />

      <div className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative grid-cols-1 pb-24 pt-32 md:grid-cols-[max(50%,400px)_1fr] grid mx-auto">
        <div className="space-y-8 sm:px-4">
          <div className="flex h-6 w-fit items-center gap-2 whitespace-nowrap rounded-full bg-black/30 py-0.5 pl-3 pr-3 text-xs font-semibold text-white backdrop-blur">
            Preview
          </div>

          <span
            className={cn(
              "text-[min(88px,7vmax)] font-bold leading-[1.1] tracking-tighter text-[#2F2E31]",
              "isolate block mix-blend-color-burn"
            )}
          >
            Financial infrastructure to grow your revenue
          </span>

          <p className="text-base md:text-lg">
            Join the millions of companies that use Stripe to accept payments
            online and in person, embed financial services, power custom revenue
            models, and build a more profitable business.
          </p>

          <Button className="rounded-full">
            Request an invite <ArrowRightIcon />
          </Button>
        </div>

        <div className="absolute bottom-48 left-56 col-start-2 h-[580px] w-[920px] overflow-hidden rounded-2xl bg-white/30 shadow-2xl">
          <div className="ml-56 mt-16 size-full rounded-tl-lg bg-white" />
        </div>
        <div className="relative hidden h-full items-center justify-center md:flex">
          <Image
            src={"https://placehold.co/270x536"}
            alt="phone"
            width={270}
            height={536}
            className="relative object-contain"
            style={{
              filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.4))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
