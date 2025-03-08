"use client"
import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import SortableItem from "../SortableItem";
import { useSortable } from "@dnd-kit/sortable";

type HeadingBlockProps = {
  title: string;
  mode: string;
  id?: string;
};

const HeadingBlock = ({ title, mode = "public", id }: HeadingBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id || "" });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-2 ${mode === "edit" ? "bg-white rounded-xl flex items-center gap-2" : ""
        }`}
    >
      {mode === "edit" && (
        <div {...listeners} className="cursor-grab active:cursor-grabbing">
          <Image src={DragIcon} alt="Drag handle" />
        </div>
      )}
      <div className="font-bold text-[#3D4966]">{title}</div>
    </div>
  );
};

export default HeadingBlock;
