module.exports = {
    title: 'ZZ-Blog',
    description: '学习笔记',
    port: 3000,
    // dest: "/dist",
    themeConfig: {
        displayAllHeaders: true,
        repo: 'zou-weidong/zz-blog',
        repoLabel: 'GitHub',
        logo: '/assets/img/logo.png',
        docsRepo: 'zou-weidong/zz-blog',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '编辑',
        nav: [
            { text: 'Java', link: '/java/' },
            { text: 'Go', link: '/go/' },
            { text: 'Linux', link: '/linux/' },
            { text: 'Kubernetes', link: '/kubernetes/' },
            { text: 'Network', link: '/network/' }
        ],
        sidebar: {
            "/java/": [
                {
                    title: '前言',
                    collapsable: false,
                    sidebarDepth: 0,
                    children: [
                        ["/java/", "序言"],
                    ]
                },
                {
                    title: 'Spring 相关',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/java/1_spring/bean", "spring中的bean"],
                        ["/java/1_spring/springboot", "springboot"]
                    ]
                },
                {
                    title: 'Java中的锁',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                    ]
                },
                {
                    title: 'JVM',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                    ]
                },
                {
                    title: '多线程',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                    ]
                },
            ],
            "/linux/": [
                {
                    title: '前言',
                    collapsable: false,
                    sidebarDepth: 0,
                    children: [
                        ["/linux/", "序言"],
                    ]
                },
                {
                    title: '操作系统',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/linux/operating-system/alpine", "Alpine"],
                        ["/linux/operating-system/flatcar", "Flatcar Container Linux"]
                    ]
                },
                {
                    title: '内核',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/linux/kernel/", "Linux Kernel"],
                    ]
                },
            ],
            "/kubernetes/": [
                {
                    title: '',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/kubernetes/", "序言"],
                    ]
                },
                {
                    title: 'Kubernetes组件',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/kubernetes/architecture/", "AA"],
                    ]
                },
            ],
            "/network/": [
                {
                    title: '',
                    collapsable: false,
                    sidebarDepth: 3,
                    children: [
                        ["/network/", "网络"],
                    ]
                }
            ]

        },
        lastUpdated: '上次更新',
        smoothScroll: true
    }
}


