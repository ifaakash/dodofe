import Input from "@components/atoms/Input";
import React, { useState } from "react";
import EmptyImage from "public/assets/emptyImage.svg";
import Image from "next/image";
import NewButton from "@components/atoms/Button/NewButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addBlock, updateBlock } from "store/slice/blocksSlice";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlert } from "lucide-react";

interface ProductData {
  name: string;
  link: string;
  imgUrl: string;
  file?: File;
}

interface AddProductProps {
  dodoPageId: string;
  id?: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  block?: {
    id?: any;
    blockData?: {
      title: string;
      link: string;
      productImage: string;
    };
  };
}

interface FormErrors {
  title: string;
  link: string;
  image: string;
}

const AddProduct = ({ mode, dodoPageId, userId, dodopageUrl, block }: AddProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductData>({
    name: block?.blockData?.title || "",
    link: block?.blockData?.link || "",
    imgUrl: block?.blockData?.productImage || "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    link: "",
    image: "",
  });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProduct({
        ...product,
        imgUrl: reader.result as string,
        file: file,
      });
    };
  };

  const validateForm = (productData: ProductData): boolean => {
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
      newErrors.link = "Please enter a valid URL starting with http:// or https://";
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
      if (!validateForm(product)) {
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
            productImage: product.file,
          },
          hasMedia: !!product.file,
          isNew: true,
        })
      );
      router.back();
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  };
  console.log("Prod Block", block);

  const handleUpdate = async () => {
    const updatedBlock = {
      id: block?.id,
      blockType: "PRODUCT",
      blockCardSize: "MEDIUM",
      blockData: {
        title: product.name,
        link: product.link,
        productImage: product.file || block?.blockData?.productImage,
      },
      isUpdated: true,
    };
    dispatch(updateBlock(updatedBlock as any));
    router.back();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct({ ...product, link: e.target.value })
            }
          />
          {errors.link && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {errors.link}
            </div>
          )}
        </div>
        <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
          <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
            {product.imgUrl && (
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            )}
            {!product.imgUrl && (
              <div className="w-full h-full flex items-center justify-center">
                <Image src={EmptyImage} alt={product.name} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </div>
          <p className="text-sm font-medium">{product.name}</p>
        </div>
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
          onClick={mode === "add" ? handleSubmit : handleUpdate}
          className="w-full"
        >
          {mode === "add" ? "Save" : "Update"}
        </NewButton>
      </div>
    </div>
  );
};

export default AddProduct;
