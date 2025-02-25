import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the block data structure
interface LinkBlockData {
  title?: string;
  link?: string;
  linkDisplayPicture?: string | File;
  url?: string;
  badge?: {
    text?: string;
    backgroundColor?: string;
    color?: string;
  };
  isNew?: boolean;
  hasMedia?: boolean;
  blogURL?: string;
}

interface ProductBlockData {
  title?: string;
  productImage?: string | File;
  link?: string;
  url?: string;
}

interface HeadingBlockData {
  title?: string;
}

interface SeparatorBlockData {
  separatorType?: string;
}

interface PollBlockData {
  question?: string;
  options?: string[];
  isMultipleOptionsAllowed?: boolean;
  optionCounts?: Record<string, number>;
}

// Define the block structure
interface Block {
  id?: string;
  userId?: string;
  dodoPageId?: string;
  blockType: "LINK" | "PRODUCT" | "HEADING" | "SEPARATOR" | "POLL";
  blockCardSize: "SMALL" | "MEDIUM" | "LARGE";
  blockPositionalIndex?: number;
  isActive?: boolean;
  // blockData:
  //   | LinkBlockData
  //   | ProductBlockData
  //   | HeadingBlockData
  //   | SeparatorBlockData
  //   | PollBlockData;
  blockData: any;
  isNew?: boolean;
  hasMedia?: boolean;
  toRemove?: boolean;
  toArchive?: boolean;
  isUpdated?: boolean;
}

// Define the initial state
interface BlocksState {
  blocks: Block[];
  unPublishedBlocks: boolean;
  isReordered: boolean;
  newBlocksAdded: boolean;
  blocksToBeDeleted: boolean;
  blocksToBeUpdated: boolean;
}

const initialState: BlocksState = {
  blocks: [],
  unPublishedBlocks: false,
  isReordered: false,
  newBlocksAdded: false,
  blocksToBeDeleted: false,
  blocksToBeUpdated: false
};

// Create the slice
const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlocksToStore: (state, action: PayloadAction<Block[]>) => {
      state.blocks = action.payload;
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      state.blocks.push(action.payload);
      state.unPublishedBlocks = true;
      state.newBlocksAdded = true;
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      console.log("Removing block", action.payload);
      const blockIndex = state.blocks.findIndex(
        (block) => block.id === action.payload
      );
      if (blockIndex !== -1) {
        state.blocks[blockIndex].toRemove = true;
        state.unPublishedBlocks = true;
      }
      state.blocksToBeDeleted = true;
    },
    updateBlock: (state, action: PayloadAction<Block>) => {
      console.log("action.payload", action.payload);

      const block = state.blocks.find(
        (block) => block.id === action.payload.id
      );

      switch (block?.blockType) {
        case "HEADING":
          console.log("Heading block", block);
          block.blockData.title = action.payload.blockData.title;
          block.isUpdated = true;
          state.blocksToBeUpdated = true;
          break;
        case "LINK":
          block.blockData.title = action.payload.blockData.title;
          block.blockData.link = action.payload.blockData.link;
          block.blockCardSize = action.payload.blockCardSize;
          block.blockData.linkDisplayPicture = action.payload.blockData.linkDisplayPicture;
          block.blockData.badge = action.payload.blockData.badge;
          block.isUpdated = true;
          state.blocksToBeUpdated = true;
          break;
        case "SEPARATOR":
          block.blockData.separatorType =
            action.payload.blockData.separatorType;
          block.isUpdated = true;
          state.blocksToBeUpdated = true;
          break;
        case "POLL":
          block.blockData.question = action.payload.blockData.question;
          block.isUpdated = true;
          state.blocksToBeUpdated = true;
          break;
        case "PRODUCT":
          block.blockData.title = action.payload.blockData.title;
          block.blockData.link = action.payload.blockData.link;
          block.blockData.productImage = action.payload.blockData.productImage;
          block.isUpdated = true;
          state.blocksToBeUpdated = true;
          break;
      }
    },

    archiveBlock: (state, action: PayloadAction<{ blockId: string }>) => {
      const { blockId } = action.payload;
      const block = state.blocks.find((block) => block.id === blockId);
      if (block) {
        block.toArchive = true;
        block.isActive = false;
      }
      state.unPublishedBlocks = true;
    },
    reorderBlocks: (
      state,
      action: PayloadAction<{
        blocks: { blockId: string; newIndex: number }[];
      }>
    ) => {
      const { blocks } = action.payload;
      console.log("blocks in reducer", blocks);

      // Create a new array with updated positions
      const newBlocksOrder = [...state.blocks];

      // Update indices and create the new order
      blocks.forEach(({ blockId, newIndex }) => {
        const blockIndex = newBlocksOrder.findIndex(
          (block) => block.id === blockId
        );
        if (blockIndex !== -1) {
          const [movedBlock] = newBlocksOrder.splice(blockIndex, 1);
          movedBlock.blockPositionalIndex = newIndex;
          newBlocksOrder.splice(newIndex, 0, movedBlock);
        }
      });

      console.log("newBlocksOrder", newBlocksOrder);

      state.blocks = newBlocksOrder;
      state.isReordered = true;
      state.unPublishedBlocks = true;
    },
    resetUnPublishedBlocks: (state) => {
      state.unPublishedBlocks = false;
    },
  },
});

// Export actions and reducer
export const {
  addBlocksToStore,
  addBlock,
  removeBlock,
  updateBlock,
  reorderBlocks,
  resetUnPublishedBlocks,
  archiveBlock,
} = blocksSlice.actions;
export default blocksSlice.reducer;
