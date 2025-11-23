import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { productId } = Route.useParams()
  
  return <div>{productId}</div>
}
