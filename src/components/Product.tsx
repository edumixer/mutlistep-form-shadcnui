import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: "vaporfly-3",
    name: "The Vaporfly 3 Electric",
    price: 399,
    image: "https://placehold.co/400x300",
  },
  {
    id: "stay-calm",
    name: "Stay Calm",
    price: 99,
    image: "https://placehold.co/400x300",
  },
  {
    id: "dunk-low",
    name: "Dunk Low Revolution 3",
    price: 299,
    image: "https://placehold.co/400x300",
  },
  {
    id: "jordan-tatum",
    name: "Jordan Tatum 2",
    price: 499,
    image: "https://placehold.co/400x300",
  },
  {
    id: "air-force",
    name: "Air Force EVO",
    price: 399,
    image: "https://placehold.co/400x300",
  },
  {
    id: "air-max",
    name: "Air Max Plus Drift 4 Her",
    price: 399,
    image: "https://placehold.co/400x300",
  },
];

export default function ProductSelection() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          Select the product you want to promote
        </h2>
        <Input
          type="search"
          placeholder="Search products"
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <RadioGroup
        value={selectedProduct}
        onValueChange={setSelectedProduct}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={`relative p-4 cursor-pointer border-2 transition-colors ${
              selectedProduct === product.id
                ? "border-purple-500"
                : "border-transparent hover:border-purple-500"
            }`}
          >
            <RadioGroupItem
              value={product.id}
              id={product.id}
              className="sr-only"
            />
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${product.price}
                </p>
              </div>
              {selectedProduct === product.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
}
