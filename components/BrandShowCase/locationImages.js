export function LocationImages() {
  return (
    <div className="lg:row-end-1 lg:col-span-4">
      <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg"
          alt="{product.imageAlt}"
          className="object-center object-cover"
        />
      </div>
    </div>
  );
}
