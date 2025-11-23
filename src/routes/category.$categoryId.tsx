import {
  Text,
  Card,
  Group,
  Badge,
  Container,
  Flex,
  Button,
  Image,
  SimpleGrid,
} from "@mantine/core";

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { productsApi } from "../api/products";
import type { Product } from "../types";
import useQuery from "../hooks/useQuery";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";

import "../App.css";

import reactLogo from "../assets/react.svg";
import defaultImage from "../assets/default-shoes.png";

export const Route = createFileRoute('/category/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  const navigate = useNavigate({ from: Route.fullPath })

  const {
    isLoading: isLoadingProducts,
    data: products,
    error: errorProducts,
  } = useQuery<Product[]>({
    queryFunction: () => productsApi.getAll([{ field: "category_id", value: categoryId }]),
    dependencies: [categoryId]
  });

  const isLoading = isLoadingProducts;
  const error = errorProducts;

  return (
    <Flex justify="center">
      <Container className="posts" fluid>
        <h2>Markerplace Products</h2>

        {products === null && <p>No products found...</p>}

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {products?.map((product) => {
            return (
              <Card key={`product_${product.id}`} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={defaultImage} alt="Shoes image" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  <Badge color="pink">{product.category_id}</Badge>
                </Group>

                <Group mt="auto" mb="xs" align="baseline">
                  <Text size="xs" c="dimmed">
                    {product.raw_price}
                  </Text>
                  <Text size="lg" c="violet" fw={600}>
                    {product.current_price}
                  </Text>
                </Group>

                <Button color="blue" fullWidth mt="md" radius="md" onClick={
                  () => {
                    navigate({ to: "/order", search: () => ({ productId: product.id })  })
                  }
                }>
                  Order Now!
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>

      {error && <section className="error">{error.message}</section>}

      {isLoading && (
        <img src={reactLogo} className="logo spinner" alt="spinner" />
      )}
    </Flex>
  )
}
