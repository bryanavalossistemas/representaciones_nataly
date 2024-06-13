import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { fetchFilteredProducts2 } from "@/data";
import { ProductImageItem } from "./product-image";
import AddDetailSale from "./add-detail-sale";

type ProductsGridProps = {
  query: string;
};

export default async function ProductsGrid({ query }: ProductsGridProps) {
  const products = await fetchFilteredProducts2(query);

  return (
    <ul className="grid sm:grid-cols-2 gap-2">
      {products.map((product) => (
        <Card
          className="p-3 sm:p-5 space-y-4 overflow-hidden"
          key={product.idProduct}
        >
          <div className="flex items-center gap-x-6">
            <Card className="max-w-32 max-h-28 flex items-center justify-center">
              <ProductImageItem
                src={product.productImages[0]?.url}
                width={500}
                height={500}
                alt={product.name}
                className="h-28 object-contain"
              />
            </Card>
            <div className="flex flex-col gap-y-2">
              <h3 className="sm:text-2xl font-bold line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>
          <p className="text-gray-500 line-clamp-2">
            Descripcion Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptas rerum saepe molestiae exercitationem soluta? Rerum laborum
            voluptatum animi natus fugiat corrupti magni enim expedita dolores
            dolorem. Nulla eveniet minus voluptas.
          </p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {formatCurrency(product.price)}
            </h1>
            <AddDetailSale product={product} />
          </div>
        </Card>
      ))}
    </ul>
  );
}
