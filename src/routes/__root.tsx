import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import {
    MantineProvider,
    AppShell,
    Burger,
    Skeleton,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import useQuery from "../hooks/useQuery";
import { categoriesApi } from "../api/categories";
import type { Category } from "../types";
import { theme } from "../theme";
import NavLink from '../components/nav-link';


const RootLayout = () => {
    const [opened, { toggle }] = useDisclosure();

    const {
        isLoading: isLoadingCategories,
        data: categories,
        error: errorCategories,
    } = useQuery<Category[]>({
        queryFunction: categoriesApi.getAll,
        dependencies: []
    });

    return (
        <>
            <MantineProvider theme={theme}>
                <AppShell
                    padding="md"
                    header={{ height: 60 }}
                    navbar={{
                        width: 300,
                        breakpoint: "sm",
                        collapsed: { mobile: !opened },
                    }}
                >
                    <AppShell.Header>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                        <div>Logo</div>
                    </AppShell.Header>

                    <AppShell.Navbar>
                        {categories === null &&
                            [1, 2, 3, 4, 5].map((index) => (
                                <Skeleton height={35} mb={6} key={`category_skeleton_${index}`} />
                            ))}
                        {categories?.map((category) => (
                            <NavLink key={`link__${category.id}`} to={'/category/' + category.id}>
                                {category.category_name}
                            </NavLink>
                        ))}
                    </AppShell.Navbar>

                    <AppShell.Main>
                        <Outlet />
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>

            <TanStackRouterDevtools />
        </>
    )
}

export const Route = createRootRoute({ component: RootLayout })