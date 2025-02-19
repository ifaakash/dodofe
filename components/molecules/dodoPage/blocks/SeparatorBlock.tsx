import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";
import SortableItem from "../SortableBlock";
import { useSortable } from "@dnd-kit/sortable";

const SeparatorBlock = ({
  type,
  mode = "public",
  id,
}: {
  type: string;
  mode: string;
  id?: string;
}) => {
  const separator = type;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id || '' });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const renderSeparator = () => {
    switch (type) {
      case "dashed-line":
        return (
          <div>
            <div className="w-full h-[1px] border-b-2 border-dashed border-black"></div>
            <div className="w-full h-[1px] border-b-2 border-dashed border-black"></div>
          </div>
        );
      case "or":
        return (
          <div className="flex items-center gap-2">
            <div className="w-full h-[1px] bg-black" />
            <div>OR</div>
            <div className="w-full h-[1px] bg-black" />
          </div>
        );
      case "solid-line":
        return (
          <div className="w-full h-[1px] border-b-2 border-solid border-black"></div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-2 ${
        mode === "edit"
          ? "bg-white rounded-xl gap-2 py-2 flex items-center"
          : ""
      }`}
    >
      {mode === "edit" && (
        <div {...listeners} className="cursor-grab active:cursor-grabbing">
          <Image src={DragIcon} alt="Drag handle" />
        </div>
      )}
      <div className="w-full">{renderSeparator()}</div>
    </div>
  );
};

export default SeparatorBlock;
