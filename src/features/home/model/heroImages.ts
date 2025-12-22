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
      side: "",
      full: "-top-[5%] left-[20%]",
      z: "z-1",
    },
    size: {
      side: "w-[5rem] aspect-[3/4]",
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
      side: "",
      full: "-left-[7%] sm:left-0 md:-left-[4%] lg:left-[10%] top-[30%]",
      z: "z-5",
    },
    size: {
      side: "",
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
      side: "",
      full: "left-[20%] bottom-[5%] lg:bottom-[10%]",
      z: "z-4",
    },
    size: {
      side: "",
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
      side: "",
      full: "top-[1%] right-[28%]",
      z: "z-2",
    },
    size: {
      side: "",
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
      side: "",
      full: "lg:right-[8%] -right-0 top-[20%]",
      z: "z-1",
    },
    size: {
      side: "",
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
      side: "",
      full: "lg:bottom-[5%] bottom-[1%] right-[10%]",
      z: "",
    },
    size: {
      side: "",
      full: "w-[7rem] sm:w-[10rem] lg:w-[14rem] aspect-[16/19]",
    },
    hasButton: false,
    buttonPosition: "",
  },
];
