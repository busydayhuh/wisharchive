import { cn } from "@/shared/lib/css";
import { useAppLocation } from "@/shared/lib/react/useAppLocation";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { ListPlus, Orbit, Plus, Stars } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useWishlistDialog, useWishPicker } from "../wishlist";

const fabVariants = {
  closed: { scale: 1 },
  open: {
    scale: 0.95,
    transition: { stiffness: 300, damping: 18 },
  },
};

const menuContainer = {
  closed: { opacity: 0, y: 10 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const menuItem = {
  closed: { opacity: 0, scale: 0.7, y: 6 },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      bounce: 0.45,
      stiffness: 300,
      damping: 14,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: 6,
    transition: { duration: 0.12 },
  },
};

export function CreateFAB() {
  const [open, setOpen] = useState(false);
  const { openDialog } = useWishlistDialog();
  const { openPicker } = useWishPicker();
  const navigate = useNavigate();
  const { page } = useAppLocation();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="right-3 md:right-[50%] bottom-8 z-20 fixed flex flex-col justify-center items-end md:items-center gap-3 md:translate-x-[50%]"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuContainer}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-end md:items-center gap-1.5"
          >
            <MenuButton
              icon={<Stars />}
              label="Новое желание"
              onClick={() => {
                navigate(ROUTES.ADD);
                setOpen(false);
              }}
            />

            {page.list ? (
              <MenuButton
                icon={<Orbit />}
                label="Из моих желаний"
                onClick={() => {
                  openPicker();
                  setOpen(false);
                }}
              />
            ) : (
              <MenuButton
                icon={<ListPlus />}
                label="Новый список"
                onClick={() => {
                  openDialog("create");
                  setOpen(false);
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Создать"
        onClick={() => setOpen((prev) => !prev)}
        variants={fabVariants}
        animate={open ? "open" : "closed"}
        whileTap={{ scale: 0.9 }}
        className="relative flex justify-center items-center"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 16 }}
          className="z-10 absolute stroke-[1.5px] text-background"
        >
          <Plus className="size-5" />
        </motion.div>

        <motion.div
          animate={{ scale: open ? 0.85 : 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className={cn(
            "flex justify-center items-center size-14 gradient-btn"
          )}
        >
          <motion.div
            animate={{ scale: open ? 1.05 : 1 }}
            className="blur-lg size-14 gradient-btn"
          />
        </motion.div>
      </motion.button>
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={menuItem}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <Button
        onClick={onClick}
        className="gap-2 bg-indigo-bg hover:bg-indigo-bg hover:shadow-indigo-bg/40 hover:shadow-lg has-[>svg]:pr-3.5 rounded-xl h-14 font-normal text-background hover:text-background"
      >
        {icon}
        {label}
      </Button>
    </motion.div>
  );
}
