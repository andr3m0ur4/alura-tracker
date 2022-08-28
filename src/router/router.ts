import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TasksVue from '@/views/TasksVue.vue';
import ProjectsVue from '@/views/ProjectsVue.vue';
import FormProject from '@/views/Projects/FormProject.vue';
import ListProject from '@/views/Projects/ListProject.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: TasksVue
    },
    {
        path: '/projetos',
        component: ProjectsVue,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListProject
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: FormProject
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: FormProject,
                props: true
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
