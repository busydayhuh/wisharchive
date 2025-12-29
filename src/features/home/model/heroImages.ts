import calendar from "@/shared/assets/images/calendar.jpg";
import cat from "@/shared/assets/images/cat.jpg";
import cream from "@/shared/assets/images/cream.jpg";
import coffee from "@/shared/assets/images/drink.jpg";
import mat from "@/shared/assets/images/mat.jpg";
import shoes from "@/shared/assets/images/sneakers.jpg";

export type HeroImageType = {
  name: string;
  src: string;
  blur: boolean;
  position: {
    side: string;
    full: string;
    z: string;
  };
  size: {
    side: string;
    full: string;
  };
  hasButton: boolean;
  buttonPosition: string;
};

export const IMAGES: HeroImageType[] = [
  {
    name: "mat",
    src: mat,
    blur: true,
    position: {
      side: "top-[10%] left-1/2",
      full: "-top-[5%] left-[20%] z-1",
      z: " ",
    },
    size: {
      side: "w-[10rem] aspect-[3/4]",
      full: "w-[5rem] sm:w-[7rem] lg:w-[10rem] aspect-[3/4]",
    },
    hasButton: false,
    buttonPosition: "",
  },
  {
    name: "shoes",
    src: shoes,
    blur: false,
    position: {
      side: "top-1/5 left-[15%] z-5",
      full: "-left-[7%] sm:left-0 md:-left-[4%] lg:left-[10%] top-[30%] z-5",
      z: "",
    },
    size: {
      side: "w-[13rem] aspect-[16/19]",
      full: "w-[7rem] sm:w-[10rem] lg:w-[13rem] aspect-[16/19]",
    },
    hasButton: true,
    buttonPosition: "sm:left-3 left-1/2 -bottom-4",
  },
  {
    name: "calendar",
    src: calendar,
    blur: false,
    position: {
      side: "z-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
      full: "left-[20%] bottom-[5%] lg:bottom-[10%] z-4",
      z: "",
    },
    size: {
      side: "w-[10rem] aspect-square",
      full: "w-[5rem] sm:w-[7rem] lg:w-[10rem] aspect-square",
    },
    hasButton: false,
    buttonPosition: "",
  },
  {
    name: "cat",
    src: cat,
    blur: false,
    position: {
      side: "z-0 bottom-1/3 right-[10%]",
      full: "top-[1%] right-[28%] z-2",
      z: "",
    },
    size: {
      side: "w-[12rem] aspect-square",
      full: "w-[5rem] sm:w-[7rem] lg:w-[10rem] aspect-square",
    },
    hasButton: true,
    buttonPosition: "right-2 -bottom-3",
  },
  {
    name: "cream",
    src: cream,
    blur: false,
    position: {
      side: "z-5 top-[55%] left-[22%]",
      full: "lg:right-[8%] -right-0 top-[20%] z-1",
      z: "",
    },
    size: {
      side: "w-[7rem] aspect-square",
      full: "w-[8rem] sm:w-[12rem] lg:w-[15rem] aspect-[5/4]",
    },
    hasButton: false,
    buttonPosition: "",
  },
  {
    name: "coffee",
    src: coffee,
    blur: true,
    position: {
      side: "z-5 left-[45%] bottom-[10%]",
      full: "lg:bottom-[5%] bottom-[1%] right-[10%]",
      z: "",
    },
    size: {
      side: "w-[12rem] aspect-[16/19]",
      full: "w-[7rem] sm:w-[10rem] lg:w-[14rem] aspect-[16/19]",
    },
    hasButton: false,
    buttonPosition: "",
  },
];
