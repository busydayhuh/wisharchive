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
        <>Вы уверены, что хотите отменить бронирование желания?</>
      ) : (
        <>
          Вы уверены, что хотите забронировать это желание? Автор желания не
          узнает, кто его забронировал.
        </>
      ),
      actionText: isActive ? "Отменить бронь" : "Забронировать",
    },

    delete: {
      title: "Удалить?",
      description: (
        <>
          Вы действительно хотите удалить <strong>{name}</strong>? Это действие
          нельзя отменить.
        </>
      ),
      actionText: "Удалить",
    },

    edit: {
      title: "Убрать желание из общего списка?",
      description: (
        <>
          Желание не будет удалено. {isOwner ? "Вы сможете" : "Автор сможет"}{" "}
          найти его среди своих желаний, но оно больше не будет принадлежать
          этому списку.
        </>
      ),
      actionText: "Убрать",
    },

    archive: {
      title: isActive ? "Вернуть из архива?" : "Переместить в архив?",
      description: isActive ? (
        <>
          Вернуть желание <strong>{name}</strong> в список актуальных?
        </>
      ) : (
        <>
          <span className="block">
            Вы уверены, что хотите переместить желание <strong>{name}</strong> в
            архив?
          </span>
          <span className="block mt-2">
            Вы сможете найти его позже в разделе «Архив желаний».
          </span>
        </>
      ),
      actionText: isActive ? "Вернуть" : "Переместить",
    },
  };

  return map[action];
}
