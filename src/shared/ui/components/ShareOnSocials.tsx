import {
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import {} from "@radix-ui/react-dialog";
import { LucideLink, Share2 } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { copyLink } from "../../utils/copyLink";
import { Button } from "../kit/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../kit/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "../kit/popover";

export default function ShareOnSocials({ media }: { media?: string }) {
  const isMobile = useIsMobile();
  const url = window.location.href;

  const buttons = (
    <div className="flex justify-evenly items-start gap-1 w-full overflow-x-scroll shrink-0 no-scrollbar">
      <div className="flex flex-col items-center gap-0.5 max-w-12">
        <Button
          className="rounded-sm size-12 md:size-9"
          variant="secondary"
          onClick={() => copyLink(url)}
        >
          <LucideLink />
        </Button>
        {isMobile && <p className="text-[12px] text-center">Коп. ссылку</p>}
      </div>
      <TelegramShareButton
        url={url}
        className="flex flex-col items-center gap-0.5"
      >
        <TelegramIcon className="rounded-sm size-12 md:size-9" />
        {isMobile && <p className="text-[12px]">Telegram</p>}
      </TelegramShareButton>
      <WhatsappShareButton
        url={url}
        className="flex flex-col items-center gap-0.5"
      >
        <WhatsappIcon className="rounded-sm size-12 md:size-9" />
        {isMobile && <p className="text-[12px]">WhatsApp</p>}
      </WhatsappShareButton>
      {media && (
        <PinterestShareButton
          media={media}
          url={url}
          className="flex flex-col items-center gap-0.5"
        >
          <PinterestIcon className="rounded-sm size-12 md:size-9" />
          {isMobile && <p className="text-[12px]">Pinterest</p>}
        </PinterestShareButton>
      )}
      <ViberShareButton
        url={url}
        className="flex flex-col items-center gap-0.5"
      >
        <ViberIcon className="rounded-sm size-12 md:size-9" />
        {isMobile && <p className="text-[12px]">Viber</p>}
      </ViberShareButton>
      <TwitterShareButton
        url={url}
        className="flex flex-col items-center gap-0.5"
      >
        <XIcon className="rounded-sm size-12 md:size-9" />
        {isMobile && <p className="text-[12px]">X</p>}
      </TwitterShareButton>
    </div>
  );

  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" variant="secondary">
            <Share2 />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pb-6">
          <DrawerHeader>
            <DrawerTitle>Поделиться</DrawerTitle>
          </DrawerHeader>
          {buttons}
        </DrawerContent>
      </Drawer>
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p className="mb-2.5 font-semibold text-sm text-center">Поделиться</p>
        {buttons}
      </PopoverContent>
    </Popover>
  );
}
