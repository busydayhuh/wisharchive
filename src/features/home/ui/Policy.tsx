import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/kit/dialog";

export function Policy({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className={className}>{text}</p>
      </DialogTrigger>
      <DialogContent className="z-1000 text-xs md:text-sm">
        <DialogHeader>
          <DialogTitle className="mt-2 md:mt-0">
            Политика конфиденциальности
          </DialogTitle>
        </DialogHeader>
        <p>
          Этот сервис создан в качестве пет-проекта. Мы бережно относимся к
          данным пользователей и используем их только для работы приложения.
        </p>
        <p className="mt-1 font-semibold">Какие данные мы собираем:</p>
        <ul className="pl-4 list-disc">
          <li>email-адрес — для авторизации;</li>
          <li>имя и возраст — если пользователь указывает их добровольно.</li>
        </ul>
        <p className="mt-1 font-semibold">Как мы используем данные:</p>
        <ul className="pl-4 list-disc">
          <li>для входа в аккаунт;</li>
          <li>для отображения информации внутри сервиса;</li>
          <li>для корректной работы функций вишлистов.</li>
        </ul>
        <p>
          Мы не используем данные для рекламы, не рассылаем спам и не передаём
          данные третьим лицам.
        </p>
        <p className="mt-1 font-semibold">Хранение и удаление данных</p>
        <p>Данные хранятся только пока существует аккаунт пользователя.</p>
        <p>
          По запросу пользователя аккаунт и связанные с ним данные могут быть
          удалены. По вопросам, связанным с данными и конфиденциальностью, можно
          написать на:{" "}
          <a
            href="mailto:valeria.busyday@yandex.ru"
            className="font-medium text-xs md:text-sm underline"
          >
            valeria.busyday@yandex.ru
          </a>
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="lg">Ок</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
