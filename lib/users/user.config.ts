// User system configuration for sellor.ai

// User Roles
class UserRoles {
  static ADMIN = 'admin';
  static VENDOR = 'vendor';
  static CUSTOMER = 'customer';
}

// User Settings
class UserSettings {
  static get() {
    return {
      roles: [
        UserRoles.ADMIN,
        UserRoles.VENDOR,
        UserRoles.CUSTOMER
      ],
      defaultRole: UserRoles.CUSTOMER,
      passwordMinLength: parseInt(process.env.USER_PASSWORD_MIN_LENGTH || '8', 10),
      passwordRequireUppercase: process.env.USER_PASSWORD_REQUIRE_UPPERCASE === 'true',
      passwordRequireLowercase: process.env.USER_PASSWORD_REQUIRE_LOWERCASE === 'true',
      passwordRequireNumber: process.env.USER_PASSWORD_REQUIRE_NUMBER === 'true',
      passwordRequireSpecialChar: process.env.USER_PASSWORD_REQUIRE_SPECIAL_CHAR === 'true'
    };
  }
}

export { UserRoles, UserSettings };