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
  imgUrl: string | File;
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

const AddProduct = ({
  mode,
  dodoPageId,
  userId,
  dodopageUrl,
  block,
}: AddProductProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductData>({
    name: block?.blockData?.title || "",
    link: block?.blockData?.link || "",
    imgUrl: block?.blockData?.productImage || "",
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // Separate error states for better clarity
  const [titleError, setTitleError] = useState<string>("");
  const [linkError, setLinkError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset all errors first
    setTitleError("");
    setLinkError("");
    setImageError("");

    if (!product.name.trim()) {
      setTitleError("Product name is required");
      isValid = false;
    }

    if (!product.link.trim()) {
      setLinkError("Product link is required");
      isValid = false;
    } else if (
      !product.link.startsWith("http://") &&
      !product.link.startsWith("https://")
    ) {
      setLinkError("Please enter a valid URL starting with http:// or https://");
      isValid = false;
    }

    if (mode === "add" && !uploadedImage) {
      setImageError("Product image is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("productImage", uploadedImage as File);
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
            productImage: uploadedImage,
          },
          hasMedia: !!uploadedImage,
          isNew: true,
        })
      );
      router.back();
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  };
  const handleUpdate = async () => {
    const updatedBlock = {
      id: block?.id,
      blockType: "PRODUCT",
      blockCardSize: "MEDIUM",
      blockData: {
        title: product.name,
        link: product.link,
        productImage: uploadedImage || block?.blockData?.productImage,
      },
      isUpdated: true,
    };
    console.log("updatedBlock", updatedBlock);
    dispatch(updateBlock(updatedBlock as any));
    router.back();
  };

  const displayImage = () => {
    if (uploadedImage) {
      return URL.createObjectURL(uploadedImage);
    }
    if (block?.blockData?.productImage) {
      if (typeof block?.blockData?.productImage === "string") {
        return block?.blockData?.productImage;
      }
      return URL.createObjectURL(block?.blockData?.productImage);
    }
    return null;
  };

  console.log("displayImage", displayImage());

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
          {titleError && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {titleError}
            </div>
          )}
          <Input
            placeholder="Paste product link here....."
            value={product.link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProduct({ ...product, link: e.target.value })
            }
          />
          {linkError && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <TriangleAlert size={14} />
              {linkError}
            </div>
          )}
        </div>
        <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
          <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
            {displayImage() ? (
              <img
                src={displayImage() as string}
                alt={"Product Image"}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
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
        {imageError && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <TriangleAlert size={14} />
            {imageError}
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
          {mode === "add" ? "Save" : "Update"} to draft
        </NewButton>
      </div>
    </div>
  );
};

export default AddProduct;
