import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import record from '../index'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        redirect: '/home',
    },
    {
        name: "Home",
        path: "/home",
        component: record.Home,
        redirect: {name: "RecordContent"},
        children: [
            {
                name: 'RecordContent',
                path: 'recordContent',
                component: record.RecordView
            },
            {
                name: 'CustomTheme',
                path: 'customTheme',
                component: record.CustomTheme
            }
        ]
    },
];

const router = new VueRouter({
    routes,
});

export default router;
