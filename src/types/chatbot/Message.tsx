import { UserRole } from "./UserRole";

export default interface Message {
  id: string;
  content: string;
  role: UserRole;
  createdAt: string;
}
