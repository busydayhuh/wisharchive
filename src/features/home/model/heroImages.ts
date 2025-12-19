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
      full: "top-[2%] left-[28%]",
      z: "z-1",
    },
    size: {
      side: "w-[5rem] aspect-[3/4]",
      full: "w-[10rem] aspect-[3/4]",
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
      full: "left-[21%] top-[30%]",
      z: "z-5",
    },
    size: {
      side: "",
      full: "w-[13rem] aspect-[16/19]",
    },
    hasButton: true,
    buttonPosition: "left-3 -bottom-4",
  },
  {
    name: "calendar",
    src: calendar,
    blur: false,
    position: {
      side: "",
      full: "w-[10rem] aspect-square",
      z: "",
    },
    size: {
      side: "",
      full: "",
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
      full: "",
      z: "",
    },
    size: {
      side: "",
      full: "w-[10rem] aspect-square",
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
      full: "",
      z: "",
    },
    size: {
      side: "",
      full: "w-[17rem] aspect-[5/4]",
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
      full: "",
      z: "",
    },
    size: {
      side: "",
      full: "w-[15rem] aspect-square",
    },
    hasButton: false,
    buttonPosition: "",
  },
];
