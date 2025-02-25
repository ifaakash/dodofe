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

const ProductCard = ({
  data,
  onImageUpload,
}: {
  data: { name: string; link: string; imgUrl: string };
  onImageUpload: (file: File) => void;
}) => {
  return (
    <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
      <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
        {data.imgUrl && (
          <img
            src={data.imgUrl}
            alt={data.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
        {!data.imgUrl && (
          <div className="w-full h-full flex items-center justify-center">
            <Image src={EmptyImage} alt={data.name} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
        />
      </div>
      <p className="text-sm font-medium">{data.name}</p>
    </div>
  );
};

const AddProduct = ({
  mode,
  dodoPageId,
  userId,
  dodopageUrl,
  block,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  block?: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSecondProduct, setShowSecondProduct] = useState(false);
  const [product, setProduct] = useState<{
    name: string;
    link: string;
    imgUrl: string;
    file?: File;
  }>({
    name: mode === "edit" ? block?.blockData?.title || "" : "",
    link: mode === "edit" ? block?.blockData?.link || "" : "",
    imgUrl: mode === "edit" ? block?.blockData?.productImage || "" : "",
  });

  const [errors, setErrors] = useState({
    title: "",
    link: "",
    image: "",
  });

  const handleImageUpload = (file: File, productNumber: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProduct({ ...product, imgUrl: reader.result as string, file });
    };
  };

  const validateForm = (
    productData: { name: string; link: string; file?: File },
    productNumber: number
  ) => {
    const newErrors = {
      title: "",
      link: "",
      image: "",
    };

    let isValid = true;

    if (!productData.name.trim()) {
      newErrors.title = "Product name is required";
      isValid = false;
    }

    if (!productData.link.trim()) {
      newErrors.link = "Product link is required";
      isValid = false;
    } else if (
      !productData.link.startsWith("http://") &&
      !productData.link.startsWith("https://")
    ) {
      newErrors.link =
        "Please enter a valid URL starting with http:// or https://";
      isValid = false;
    }

    if (mode === "add" && !productData.file) {
      newErrors.image = "Product image is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      const isProductValid = validateForm(product, 1);

      if (!isProductValid) {
        return;
      }

      const formData = new FormData();
      if (product.file) {
        formData.append("productImage", product.file);
      }
      formData.append("blockData[title]", product.name);
      formData.append("blockData[link]", product.link);
      formData.append("blockType", "PRODUCT");
      formData.append("blockCardSize", "MEDIUM");
      formData.append("dodoPageId", dodoPageId);
      formData.append("userId", userId);

      dispatch(
        addBlock({
          ...formData,
          id: uuidv4(),
          blockType: "PRODUCT",
          blockCardSize: "MEDIUM",
          blockData: {
            title: product.name,
            link: product.link,
            productImage: product.file as File,
          },
          hasMedia: product.file ? true : false,
          isNew: true,
        })
      );
      router.back();
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-[5px]">
          <Input
            placeholder="Product Name"
            value={product.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
          {errors.title && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {errors.title}
            </div>
          )}
          <Input
            placeholder="Paste product link here....."
            value={product.link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const link = e.target.value;
              setProduct({ ...product, link });
            }}
          />
          {errors.link && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {errors.link}
            </div>
          )}
        </div>
        <ProductCard
          data={product}
          onImageUpload={(file) => handleImageUpload(file, 1)}
        />
        {errors.image && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <TriangleAlert size={14} />
            {errors.image}
          </div>
        )}
      </div>
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          size="large"
          variant="primary"
          onClick={handleSubmit}
          className="w-full"
        >
          Save
        </NewButton>
      </div>
    </div>
  );
};

export default AddProduct;
