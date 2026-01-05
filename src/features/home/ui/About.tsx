import BookD from "@/shared/assets/images/book-dark.png";
import BookL from "@/shared/assets/images/book.png";
import CollaborateD from "@/shared/assets/images/collaborate-dark.png";
import WindowD from "@/shared/assets/images/collaborate-window-dark.png";
import WindowL from "@/shared/assets/images/collaborate-window.png";
import CollaborateL from "@/shared/assets/images/collaborate.png";
import CreateD from "@/shared/assets/images/create-dark.png";
import CreateL from "@/shared/assets/images/create.png";
import PrivacyD from "@/shared/assets/images/privacy-dark.png";
import PrivacyL from "@/shared/assets/images/privacy.png";

import { useTheme } from "@/shared/store/theme/useTheme";
import { cn } from "@/shared/utils/css";
import { motion } from "motion/react";

const IMAGES = [
  {
    name: "create",
    light: CreateL,
    dark: CreateD,
    header: "Создавай желания",
    text: <>Записывай идеи или собирай желания в&nbsp;удобные&nbsp;списки</>,
    inverted: false,
    size: "w-[min(100%,100rem)]",
  },
  {
    name: "collaborate",
    light: CollaborateL,
    dark: CollaborateD,
    header: "Приглашай близких",
    text: <>Приглашай редакторов и наполняй вишлист вместе с&nbsp;друзьями</>,
    inverted: true,
    size: "w-[min(100%,60rem)]",
  },
  {
    name: "book",
    light: BookL,
    dark: BookD,
    header: "Бронируй желания",
    text: <>Друзья бронируют подарки — никаких одинаковых&nbsp;сюрпризов</>,
    inverted: false,
    size: "w-[min(100%,42rem)] 2xl:w-[48rem]",
  },
  {
    name: "privacy",
    light: PrivacyL,
    dark: PrivacyD,
    header: "Выбирай, чем делиться",
    text: (
      <>
        Делись желаниями только с выбранными друзьями или оставь
        полностью&nbsp;приватными
      </>
    ),
    inverted: true,
    size: "w-[min(100%,48rem)] 2xl:w-[52rem]",
  },
];

export function About() {
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-10 md:space-y-12 lg:space-y-20 2xl:space-y-30 mx-2 2xl:mx-30 xl:mx-16">
      {IMAGES.map((image) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={cn(
              "items-center gap-10 grid lg:grid-cols-[1fr_2fr]",
              image.inverted && "lg:grid-cols-[1.5fr_1fr]"
            )}
            key={image.name}
          >
            <div
              className={cn(
                "space-y-4 xl:space-y-10",
                image.inverted && "row-start-1 lg:col-start-2"
              )}
            >
              <p className="font-grandis 2xl:text-[64px] xl:text-[56px] text-3xl md:text-4xl leading-none">
                {image.header}
              </p>
              <p className="font-grandis text-sm md:text-base xl:text-xl">
                {image.text}
              </p>
            </div>
            <div
              className={cn(
                "relative grid",
                !image.inverted && "justify-self-end"
              )}
            >
              <img
                src={colorScheme === "dark" ? image.dark : image.light}
                alt={image.header}
                className={cn(
                  "rounded-xl object-cover overflow-clip transition-all duration-200",
                  !image.inverted && "justify-self-end",
                  image.size
                )}
              />
              {image.name === "collaborate" && (
                <img
                  src={colorScheme === "dark" ? WindowD : WindowL}
                  alt="Коллаборация"
                  className={cn(
                    "top-0 right-[5%] absolute shadow-sm rounded-xl w-[35%] object-cover"
                  )}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
