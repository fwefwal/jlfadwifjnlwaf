import { createFileRoute } from "@tanstack/react-router";
import { Table, Title } from "@mantine/core";
import useQuery from "../hooks/useQuery";
import { ordersApi } from "../api/orders";
import { productsApi } from "../api/products";

export const Route = createFileRoute("/drugie")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: orderList } = useQuery({
    queryFunction: ordersApi.getAll,
    dependencies: [],
  });

  const { data: productList } = useQuery({
    queryFunction: productsApi.getAll,
    dependencies: [],
  });

  return (
    <>
      <Title order={2} margin-top={1}>
        Заказы
      </Title>

      <Table.Thead style={{ borderBottom: "none" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Имя покупателя</Table.Th>
            <Table.Th>Тип доставки</Table.Th>
            <Table.Th>Название товара</Table.Th>
            <Table.Th>Опции</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {orderList?.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                {item.firstName} {item.lastName}
              </Table.Td>

              <Table.Td>{item.delivery}</Table.Td>

              <Table.Td>
                <ProductTitle productId={item.productId} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table.Thead>
    </>
  );
}

function ProductTitle({ productId }: { productId: number }) {
  const { data: selectedProduct } = useQuery({
    queryFunction: () => productsApi.getById(productId),
    dependencies: [String(productId)],
  });

  if (!selectedProduct) return <>ошибка</>;

  return <>{selectedProduct[0].name}</>;
}
