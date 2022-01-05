export enum UserStatus {
  /**
   * 待激活
   */
  WAIT_ACTIVATE,

  /**
   * 已激活，正常处于此状态
   */
  ACTIVATED,

  /**
   * 过期，长时间未使用等情况，需要重新激活
   */
  EXPIRED,

  /**
   * 禁用，禁止登陆
   */
  FORBIDDEN,

  /**
   * 注销，账号不可用
   */
  LOGOUT,
}

export type User = {
  id: number;
  username: string;
  nickname: string;
  avatar?: string;
  email?: string;
  status: UserStatus;
  bio?: String;
  createdAt: number;
  updatedAt: number;
  lastLoginAt: number;
};
