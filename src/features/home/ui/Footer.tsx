import { Policy } from "./Policy";

export function Footer() {
  return (
    <footer className="z-300 flex flex-wrap justify-center md:justify-between gap-2 mt-10 md:mt-15 lg:mt-25 2xl:mt-30 px-2 md:px-5 py-4 w-full font-grandis text-muted-foreground text-xs">
      <p>
        <a
          href="https://github.com/busydayhuh/wisharchive"
          target="_blank"
          className="hover:underline"
        >
          GitHub
        </a>
      </p>
      <Policy
        text="Политика конфиденциальности"
        className="justify-self-center hover:underline"
      />
      <p>
        Для связи:{" "}
        <a href="mailto:valeria.busyday@yandex.ru" className="hover:underline">
          valeria.busyday@yandex.ru
        </a>
      </p>
    </footer>
  );
}
