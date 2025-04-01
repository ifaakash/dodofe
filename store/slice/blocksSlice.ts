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
  unpublishedBlocks: boolean;
  isReordered: boolean;
  newBlocksAdded: boolean;
  blocksToBeDeleted: boolean;
  blocksToBeUpdated: boolean;
}

const initialState: BlocksState = {
  blocks: [],
  unpublishedBlocks: false,
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
            state.blocks.unshift(action.payload);
            state.unpublishedBlocks = true;
            state.newBlocksAdded = true;
        },
        removeBlock: (state, action: PayloadAction<string>) => {
            console.log("Removing block", action.payload);
            const blockIndex = state.blocks.findIndex(
                (block) => block.id === action.payload
            );
            if (blockIndex !== -1) {
                const block = state.blocks[blockIndex];
                if (block.isNew) {
                    // If it's a new block, remove it from the state
                    state.blocks.splice(blockIndex, 1);
                } else {
                    // If it's an existing block, mark it for deletion
                    block.toRemove = true;
                    state.blocksToBeDeleted = true;
                }
                state.unpublishedBlocks = true;
            }
        },
        updateBlock: (state, action: PayloadAction<Block>) => {
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
                    block.blockData.linkDisplayPicture =
                        action.payload.blockData.linkDisplayPicture;
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
                    block.blockData.question =
                        action.payload.blockData.question;
                    block.isUpdated = true;
                    state.blocksToBeUpdated = true;
                    break;
                case "PRODUCT":
                    block.blockData.title = action.payload.blockData.title;
                    block.blockData.link = action.payload.blockData.link;
                    block.blockData.productImage =
                        action.payload.blockData.productImage;
                    break;
            }

            if (!block.isNew) {
                // this ensures that if a new block is updated then new block addition update is called only
                block.isUpdated = true;
            }

            state.blocksToBeUpdated = true;

            state.unpublishedBlocks = true;
        },

        archiveBlock: (state, action: PayloadAction<{ blockId: string }>) => {
            const { blockId } = action.payload;
            const block = state.blocks.find((block) => block.id === blockId);
            if (block) {
                block.toArchive = true;
                block.isActive = false;
            }
            state.unpublishedBlocks = true;
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
            state.unpublishedBlocks = true;
        },
        resetUnpublishedBlocks: (state) => {
            state.unpublishedBlocks = false;
        },
        removeIsNewFromBlocks: (state) => {
            state.blocks = state.blocks.map((block) => {
                if (block.isNew) {
                    const { isNew, ...rest } = block;
                    return rest;
                }
                return block;
            });
        },
        removeIsUpdatedFromBlocks: (state) => {
            state.blocks = state.blocks.map((block) => {
                if (block.isUpdated) {
                    const { isUpdated, ...rest } = block;
                    return rest;
                }
                return block;
            });
        },
        removeToRemoveFromBlocks: (state) => {
            state.blocks = state.blocks.map((block) => {
                if (block.toRemove) {
                    const { toRemove, ...rest } = block;
                    return rest;
                }
                return block;
            });
        },
        updateBlockId: (state, action) => {
            const { tempId, newId } = action.payload;
            const blockIndex = state.blocks.findIndex(
                (block) => block.id === tempId
            );
            if (blockIndex !== -1) {
                state.blocks[blockIndex].id = newId;
            }
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
    resetUnpublishedBlocks,
    archiveBlock,
    removeIsNewFromBlocks,
    removeIsUpdatedFromBlocks,
    removeToRemoveFromBlocks,
    updateBlockId,
} = blocksSlice.actions;
export default blocksSlice.reducer;
