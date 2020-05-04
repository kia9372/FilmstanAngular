export class MenuConfig {
    public defaults: any = {
        aside: {
            self: {},
            items: [
                {
                    title: 'داشبود',
                    root: true,
                    icon: 'flaticon2-architecture-and-city',
                    page: '/dashboard',
                    translate: 'MENU.DASHBOARD',
                    bullet: 'dot',
                },
                {
                    title: 'مدیریت وب سایت ',
                    root: true,
                    icon: 'fas fa-rss-square',
                    translate: 'MENU.SITE_MANAGER',
                    bullet: 'dot',
                    submenu: [{
                        title: 'مدیریت نقش ها',
                        root: false,
                        page: '/role-manager',
                        translate: 'MENU.ROLE_MANAGER',
                        bullet: 'dot',
                    },
                    {
                        title: 'تنظیمات',
                        root: false,
                        page: '/setting',
                        translate: 'MENU.SETTING',
                        bullet: 'dot',
                    }]
                },
                {
                    title: 'مدیریت  دسته بندی ها ',
                    root: true,
                    icon: 'fas fa-rss-square',
                    translate: 'MENU.CATEGORY_MANAGER',
                    bullet: 'dot',
                    submenu: [{
                        title: 'ایجاد دسته جدید',
                        root: false,
                        page: '/category-manager/add',
                        translate: 'MENU.ADD_CATEGORY',
                        bullet: 'dot',
                    },
                    {
                        title: 'لیست دسته بندی ها',
                        root: false,
                        page: '/category-manager',
                        translate: 'MENU.LIST_CATEGORY',
                        bullet: 'dot',
                    }]
                },
                {
                    title: 'مدیریت کاربران',
                    root: true,
                    icon: 'flaticon2-architecture-and-city',
                    translate: 'MENU.USER_MANAGER.MANAGER',
                    bullet: 'dot',
                    submenu: [{
                        title: 'ثبت کاربر جدید',
                        root: false,
                        page: '/user-manager/add',
                        translate: 'MENU.USER_MANAGER.ADD',
                        bullet: 'dot',
                    },
                    {
                        title: 'مدیریت نقش ها',
                        root: false,
                        page: '/user-manager',
                        translate: 'MENU.USER_MANAGER.LIST',
                        bullet: 'dot',
                    }]
                }
            ]
        }
    };

    public get configs(): any {
        return this.defaults;
    }
}
