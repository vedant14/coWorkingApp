const images = [
  {
    src: "https://images.unsplash.com/photo-1664575599730-0814817939de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Two each of gray, white, and black shirts laying flat.",
  },
  {
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    alt: "Model wearing plain black basic tee.",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    alt: "Model wearing plain gray basic tee.",
  },
  {
    src: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Model wearing plain white basic tee.",
  },
];
export function LocationImages() {
  return (
    <div className="mx-auto my-2 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
      <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="h-full shadow w-full object-cover object-center"
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
          <img
            src={images[1].src}
            alt={images[1].alt}
            className="h-full shadow w-full object-cover object-center"
          />
        </div>
        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
          <img
            src={images[2].src}
            alt={images[2].alt}
            className="h-full shadow w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
        <img
          src={images[3].src}
          alt={images[3].alt}
          className="h-full shadow w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
