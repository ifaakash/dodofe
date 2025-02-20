import Input from "@components/atoms/Input";
import React, { useState } from "react";
import EmptyImage from "public/assets/emptyImage.svg";
import Image from "next/image";
import NewButton from "@components/atoms/Button/NewButton";
import {
  createBlock,
  createBlockWithFormData,
  updateBlockWithFormData,
} from "api";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import plusCircle from "public/icons/plusCircle.svg";
import { toast } from "react-toastify";

const ProductCard = ({
  data,
  onImageUpload,
}: {
  data: { name: string; link: string; imgUrl: string };
  onImageUpload: (file: File) => void;
}) => {
  const displayName = data.name || "Product Name";

  return (
    <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
      <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
        {data.imgUrl && (
          <img
            src={data.imgUrl}
            alt={displayName}
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
        {!data.imgUrl && (
          <div className="w-full h-full flex items-center justify-center">
            <Image src={EmptyImage} alt={displayName} />
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
        {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-opacity rounded-2xl">
          Click to upload image
        </div> */}
      </div>
      <p className="text-sm font-medium">{displayName}</p>
    </div>
  );
};

const AddProduct = ({
  mode,
  dodoPageId,
  userId,
  dodopageUrl,
  blockData,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  blockData?: {
    title: string;
    link: string;
    productImage: string;
    blockId: string;
  };
}) => {
  const router = useRouter();
  const [showSecondProduct, setShowSecondProduct] = useState(false);
  const [product1, setProduct1] = useState<{
    name: string;
    link: string;
    imgUrl: string;
    file?: File;
  }>({
    name: mode === "edit" ? blockData?.title || "" : "",
    link: mode === "edit" ? blockData?.link || "" : "",
    imgUrl: mode === "edit" ? blockData?.productImage || "" : "",
  });

  const [product2, setProduct2] = useState<{
    name: string;
    link: string;
    imgUrl: string;
    file?: File;
  }>({
    name: "",
    link: "",
    imgUrl: "",
  });

  const handleImageUpload = (file: File, productNumber: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (productNumber === 1) {
        setProduct1({ ...product1, imgUrl: reader.result as string, file });
      } else {
        setProduct2({ ...product2, imgUrl: reader.result as string, file });
      }
    };
  };

  const handleSubmit = async () => {
    try {
      // Create FormData for product 1
      const formData1 = new FormData();
      if (product1.file) {
        formData1.append("productImage", product1.file);
      }
      formData1.append("blockData[title]", product1.name);
      formData1.append("blockData[link]", product1.link);
      formData1.append("blockType", "PRODUCT");
      formData1.append("blockCardSize", "MEDIUM");

      if (showSecondProduct) {
        // Create and submit both products if second product is shown
        const formData2 = new FormData();
        if (product2.file) {
          formData2.append("productImage", product2.file);
        }
        formData2.append("blockData[title]", product2.name);
        formData2.append("blockData[link]", product2.link);
        formData2.append("blockType", "PRODUCT");
        formData2.append("blockCardSize", "MEDIUM");

        const [res1, res2] = await Promise.all([
          createBlockWithFormData(formData1, {
            dodoPageId,
            userId,
            dodopageUrl,
          }),
          createBlockWithFormData(formData2, {
            dodoPageId,
            userId,
            dodopageUrl,
          }),
        ]);

        if (res1.success && res2.success) {
          router.back();
        }
      } else {
        // Submit only first product
        const res1 = await createBlockWithFormData(formData1, {
          dodoPageId,
          userId,
          dodopageUrl,
        });

        if (res1.success) {
          router.back();
        }
      }
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  };

  if (mode === "add") {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <div className="font-semibold">Product 1</div>
          <div className="flex flex-col gap-[5px]">
            <Input
              placeholder="Product Name"
              value={product1.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct1({ ...product1, name: e.target.value })
              }
            />
            <Input
              placeholder="Paste product link here....."
              value={product1.link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const link = e.target.value;
                setProduct1({ ...product1, link });
              }}
            />
          </div>
          <ProductCard
            data={product1}
            onImageUpload={(file) => handleImageUpload(file, 1)}
          />
        </div>

        {!showSecondProduct && (
          <div className="flex justify-end w-full">
            <button
              onClick={() => setShowSecondProduct(true)}
              className="text-sm font-medium p-1 rounded-full border-[1px] border-brandPrimary flex items-center gap-1"
            >
              <Image src={plusCircle} alt="Add Product" />
              Add Another Product
            </button>
          </div>
        )}

        {showSecondProduct && (
          <div className="flex flex-col gap-2 w-full">
            <div className="font-semibold">Product 2</div>
            <div className="flex flex-col gap-[5px]">
              <Input
                placeholder="Product Name"
                value={product2.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProduct2({ ...product2, name: e.target.value })
                }
              />
              <Input
                placeholder="Paste product link here....."
                value={product2.link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const link = e.target.value;
                  setProduct2({ ...product2, link });
                }}
              />
            </div>
            <ProductCard
              data={product2}
              onImageUpload={(file) => handleImageUpload(file, 2)}
            />
          </div>
        )}

        <div className="bottom-0 fixed mb-4 px-4 w-full">
          <NewButton
            size="large"
            variant="primary"
            onClick={handleSubmit}
            className="w-full"
          >
            Next
          </NewButton>
        </div>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("blockType", "PRODUCT");
      formData.append("blockCardSize", "MEDIUM");
      formData.append("blockId", blockData?.blockId as string);
      formData.append("userId", userId);

      if (product1.file) {
        formData.append("productImage", product1.file);
      }
      formData.append("blockData[title]", product1.name);
      formData.append("blockData[link]", product1.link);

      const res = await updateBlockWithFormData(formData);

      if (res?.success) {
        toast.success("Product updated successfully");
        router.back();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (mode === "edit") {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 w-full">
          <div className="font-semibold">Product</div>
          <div className="flex flex-col gap-[5px]">
            <Input
              placeholder="Product Name"
              value={product1.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct1({ ...product1, name: e.target.value })
              }
            />
            <Input
              placeholder="Paste product link here....."
              value={product1.link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProduct1({ ...product1, link: e.target.value })
              }
            />
          </div>
          <ProductCard
            data={product1}
            onImageUpload={(file) => handleImageUpload(file, 1)}
          />
        </div>
        <div className="bottom-0 fixed mb-4 px-4 w-full">
          <NewButton
            onClick={handleUpdate}
            size="large"
            variant="primary"
            className="w-full"
          >
            Update
          </NewButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="font-semibold">Product</div>
        <div className="flex flex-col gap-[5px]">
          <Input
            placeholder="Product Name"
            value={blockData?.title}
            disabled={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
          />
          <Input
            placeholder="Paste product link here....."
            value={blockData?.link}
            disabled={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
          />
        </div>
        <div className="flex flex-row gap-2 w-full">
          <div className="p-2 bg-white rounded-2xl w-full h-full flex flex-col gap-2">
            <div className="w-full bg-[#979EAD] rounded-2xl h-[160px] relative group cursor-pointer">
              <img
                src={blockData?.productImage}
                alt={blockData?.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p className="text-sm font-medium">{blockData?.title}</p>
          </div>
        </div>
      </div>
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          onClick={handleUpdate}
          size="large"
          variant={"primary"}
          className="w-full"
        >
          Update
        </NewButton>
      </div>
    </div>
  );
};

export default AddProduct;
