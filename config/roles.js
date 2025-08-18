const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

const PERMISSIONS = {
    CREATE_USER: 'create_user',
    DELETE_USER: 'delete_user',
    VIEW_USERS: 'view_users',
    TEST_PERMISSION: 'test_permission'
};

const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.DELETE_USER,
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.TEST_PERMISSION
    ],
    [ROLES.USER]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.TEST_PERMISSION
    ],
    [ROLES.GUEST]: []
};

module.exports = {
    ROLES,
    PERMISSIONS,
    ROLE_PERMISSIONS
};