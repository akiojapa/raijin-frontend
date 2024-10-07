import { faCreditCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { IPages } from "../interfaces/pages";

export const PAGES: IPages[] = [
        {
          title: 'menu.creditTable',
          path: 'credit-table',
          icon: faCreditCard,
          role: 'none',
        },
        {
          title: 'menu.customerConsult',
          path: 'customer-consult',
          icon: faUser,
          role: 'none',
        }
  ];