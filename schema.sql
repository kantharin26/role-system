-- สร้างตาราง roles
CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- สร้างตาราง roles_users
CREATE TABLE roles_users (
  role_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL
);