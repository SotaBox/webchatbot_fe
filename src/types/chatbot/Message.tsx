import { UserRole } from "./UserRole";

export default interface Message {
  content: string;
  role: UserRole;
}
