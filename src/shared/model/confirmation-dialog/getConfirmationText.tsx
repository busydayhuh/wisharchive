import type { ReactNode } from "react";
import type { Action, ConfirmationTextType } from "./ConfirmationDialogContext";

export function getConfirmationText(
  action?: Action,
  name?: ReactNode,
  isActive?: boolean,
  isOwner?: boolean
) {
  if (!action) return { title: "", description: "", actionText: "" };

  const map: Partial<Record<Action, ConfirmationTextType>> = {
    book: {
      title: isActive ? "Отменить бронь?" : "Забронировать желание?",
      description: isActive ? (
        <p>Вы уверены, что хотите отменить бронирование желания?</p>
      ) : (
        <p>
          Вы уверены, что хотите забронировать это желание? Автор желания не
          узнает, кто его забронировал.
        </p>
      ),
      actionText: isActive ? "Отменить бронь" : "Забронировать",
    },

    delete: {
      title: "Удалить?",
      description: (
        <p>
          Вы действительно хотите удалить <strong>{name}</strong>? Это действие
          нельзя отменить.
        </p>
      ),
      actionText: "Удалить",
    },

    edit: {
      title: "Убрать желание из общего списка?",
      description: (
        <p>
          Желание не будет удалено. {isOwner ? "Вы сможете" : "Автор сможет"}{" "}
          найти его среди своих желаний, но оно больше не будет принадлежать
          этому списку.
        </p>
      ),
      actionText: "Убрать",
    },

    archive: {
      title: isActive ? "Вернуть из архива?" : "Переместить желание в архив?",
      description: isActive ? (
        <p>
          Вернуть желание <strong>{name}</strong> в список актуальных?
        </p>
      ) : (
        <p>
          Вы сможете найти <strong>{name}</strong> позже в разделе «Архив
          желаний». Если желание забронировано,{" "}
          <strong>бронь будет отменена</strong>.
        </p>
      ),
      actionText: isActive ? "Вернуть" : "Переместить",
    },
  };

  return map[action];
}
