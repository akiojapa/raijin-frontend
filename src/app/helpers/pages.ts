import { faComment, faTicket } from "@fortawesome/free-solid-svg-icons";
import { IPages } from "../interfaces/pages";

export const PAGES: IPages[] = [
        {
          title: 'menu.chat',
          path: 'chat',
          icon: faComment,
          role: 'none',
        },
        {
          title: 'menu.ticket',
          path: 'menu/ticket',
          icon: faTicket,
          role: 'none',
        }
  ];