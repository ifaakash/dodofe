import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the block data structure
interface LinkBlockData {
  title?: string;
  link?: string;
  productImage?: string;
  linkDisplayPicture?: string;
  url?: string;
}

interface ProductBlockData {
  title?: string;
  productImage?: string;
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
  blockData:
    | LinkBlockData
    | ProductBlockData
    | HeadingBlockData
    | SeparatorBlockData
    | PollBlockData;
  blocksChanged?: boolean;
  isNew?: boolean;
}

// Define the initial state
const initialState: {
  blocks: Block[];
  blocksToDelete: string[];
  blocksToArchive: string[];
  isPositionChanged: boolean;
  isNewBlocksAdded: boolean;
  isBlockRemoved: boolean;
  isBlockUpdated: boolean;
  isBlockArchived: boolean;
  isUpdated: boolean;
} = {
  blocks: [],
  blocksToDelete: [],
  blocksToArchive: [],
  isPositionChanged: false,
  isNewBlocksAdded: false,
  isBlockRemoved: false,
  isBlockUpdated: false,
  isBlockArchived: false,
  isUpdated: false,
};

// Create the slice
const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlocksToStore: (state, action: PayloadAction<Block[]>) => {
      console.log("Fetching blocks", action.payload);
      state.blocks = action.payload;
    },
    addBlock: (state, action: PayloadAction<Block>) => {
      console.log("Adding block", action.payload);
      state.blocks.push(action.payload);
      state.isNewBlocksAdded = true;
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      console.log("Removing block", action.payload);
      state.blocksToDelete.push(action.payload);
      state.blocks = state.blocks.filter(
        (block) => block.id !== action.payload
      );
      state.isBlockRemoved = true;
    },
    updateBlock: (state, action: PayloadAction<Block>) => {
      const index = state.blocks.findIndex(
        (block) => block.id === action.payload.id
      );
      if (index !== -1) {
        state.blocks[index] = action.payload;
        state.isBlockUpdated = true;
      }
    },
    archiveBlock: (state, action: PayloadAction<string>) => {
      console.log("Archiving block", action.payload);
      state.blocksToArchive.push(action.payload);
      state.blocks = state.blocks.filter(
        (block) => block.id !== action.payload
      );
      state.isBlockArchived = true;
    },
    reorderBlocks: (
      state,
      action: PayloadAction<{ blocks: { blockId: string; newIndex: number }[] }>
    ) => {
      const { blocks: reorderedBlocks } = action.payload;

      // Create a map of blockId to newIndex for quick lookup
      const indexMap = new Map(
        reorderedBlocks.map(({ blockId, newIndex }) => [blockId, newIndex])
      );

      // Sort the blocks array based on the new indices
      state.blocks.sort((a, b) => {
        const indexA = indexMap.get(a.id as string) ?? a.blockPositionalIndex ?? 0;
        const indexB = indexMap.get(b.id as string) ?? b.blockPositionalIndex ?? 0;
        return indexA - indexB;
      });

      // Update the positional indices
      state.blocks = state.blocks.map((block, index) => ({
        ...block,
        blockPositionalIndex: index,
      }));

      state.isPositionChanged = true;
    },
    updateState: (state) => {
      state.isUpdated = true;
    },
    resetState: (state) => {
      state.isUpdated = false;
      state.isBlockUpdated = false;
      state.isBlockArchived = false;
      state.isBlockRemoved = false;
      state.isPositionChanged = false;
    },
  },
});

// Export actions and reducer
export const {
  addBlocksToStore,
  addBlock,
  removeBlock,
  updateBlock,
  archiveBlock,
  reorderBlocks,
  resetState,
  updateState,
} = blocksSlice.actions;
export default blocksSlice.reducer;
