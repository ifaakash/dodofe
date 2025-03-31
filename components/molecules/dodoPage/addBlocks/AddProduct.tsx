import Input from "@components/atoms/Input";
import React, { useState } from "react";
import EmptyImage from "public/assets/emptyImage.svg";
import Image from "next/image";
import NewButton from "@components/atoms/Button/NewButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addBlock } from "store/slice/blocksSlice";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlert } from "lucide-react";

interface ProductData {
  name: string;
  link: string;
  imgUrl: string | File | null;
}

interface AddProductProps {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
}

const AddProduct = ({ dodoPageId, userId, mode }: AddProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [products, setProducts] = useState<ProductData[]>([
    { name: "", link: "", imgUrl: null }, // Product 1
    { name: "", link: "", imgUrl: null }, // Product 2 (optional)
  ]);

  const [errors, setErrors] = useState<{ name: string; link: string; img: string }[]>(
    [{ name: "", link: "", img: "" }, { name: "", link: "", img: "" }]
  );

  const handleInputChange = (index: number, field: keyof ProductData, value: string | File) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value as string;
    setProducts(updatedProducts);
  };

  const validateForm = () => {
    const newErrors = products.map((product, i) => {
      const err = { name: "", link: "", img: "" };
      const isFilled = product.name || product.link || product.imgUrl;

      // Product 1 is required
      if (i === 0 || isFilled) {
        if (!product.name.trim()) err.name = "Product name is required";
        if (!product.link.trim()) {
          err.link = "Product link is required";
        } else if (
          !product.link.startsWith("http://") &&
          !product.link.startsWith("https://")
        ) {
          err.link = "Link must start with http:// or https://";
        }
        if (!product.imgUrl) err.img = "Product image is required";
      }

      return err;
    });

    setErrors(newErrors);
    return newErrors.every((e, i) =>
      i === 0
        ? !e.name && !e.link && !e.img
        : (!products[i].name && !products[i].link && !products[i].imgUrl) ||
        (!e.name && !e.link && !e.img)
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    products.forEach((product, index) => {
      if (!product.name || !product.link || !product.imgUrl) return;

      const formData = new FormData();
      formData.append("productImage", product.imgUrl as File);
      formData.append("blockData[title]", product.name);
      formData.append("blockData[link]", product.link);
      formData.append("blockType", "PRODUCT");
      formData.append("blockCardSize", "MEDIUM");
      formData.append("dodoPageId", dodoPageId);
      formData.append("userId", userId);

      dispatch(
        addBlock({
          id: uuidv4(),
          blockType: "PRODUCT",
          blockCardSize: "MEDIUM",
          blockData: {
            title: product.name,
            link: product.link,
            productImage: product.imgUrl,
          },
          hasMedia: !!product.imgUrl,
          isNew: true,
        })
      );
    });

    router.back();
  };

  const displayImage = (img: string | File | null) => {
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === "string") return img;
    return null;
  };

  return (
    <div className="flex flex-col gap-4 items-center pb-28 pt-10">
      {[0, 1].map((index) => (
        <div key={index} className="w-full flex flex-col gap-3">
          <h2 className="font-bold text-lg">Product {index + 1}</h2>
          <Input
            placeholder="Name of the product"
            value={products[index].name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          {errors[index].name && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {errors[index].name}
            </div>
          )}
          <Input
            placeholder="Paste product link here....."
            value={products[index].link}
            onChange={(e) => handleInputChange(index, "link", e.target.value)}
          />
          {errors[index].link && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {errors[index].link}
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-3 w-full">
        {[0, 1].map((index) => (
          <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
            <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
              {displayImage(products[index].imgUrl) ? (
                <img
                  src={displayImage(products[index].imgUrl)!}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image src={EmptyImage} alt="Empty" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  handleInputChange(index, "imgUrl", e.target.files?.[0] as File)
                }
              />
            </div>
            <p className="text-sm font-medium">
              {products[index].name || `Product ${index + 1}`}
            </p>
            {errors[index].img && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <TriangleAlert size={14} />
                {errors[index].img}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 px-4 w-full">
        <NewButton
          size="large"
          variant="primary"
          onClick={handleSubmit}
          className="w-full"
        >
          Add
        </NewButton>
      </div>
    </div>
  );
};

export default AddProduct;
