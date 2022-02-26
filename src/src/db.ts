import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  role: number;
  password: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<User>;

  constructor() {
    super("userManagement");
    this.version(2).stores({
      users: "++id,email,password, name, role, bio, facebook,instagram,linkedin,twitter", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
