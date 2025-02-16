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
    blockType: "LINK" | "PRODUCT" | "HEADING" | "SEPARATOR" | "POLL";
    blockCardSize: "SMALL" | "MEDIUM" | "LARGE";
    blockPositionalIndex?: number;
    isActive: boolean;
    blockData: LinkBlockData | ProductBlockData | HeadingBlockData | SeparatorBlockData | PollBlockData;
}

// Define the initial state
const initialState: { blocks: Block[] } = {
    blocks: [],
};

// Create the slice
const blocksSlice = createSlice({
    name: "blocks",
    initialState,
    reducers: {
        addBlocksToStore: (state, action: PayloadAction<Block[]>) => {
            console.log('Fetching blocks', action.payload)
            state.blocks = action.payload;
        },
        addBlock: (state, action: PayloadAction<Block>) => {
            state.blocks.push(action.payload);
        },
        removeBlock: (state, action: PayloadAction<string>) => {
            state.blocks = state.blocks.filter(block => block.id !== action.payload);
        },
        updateBlock: (state, action: PayloadAction<Block>) => {
            const index = state.blocks.findIndex(block => block.id === action.payload.id);
            if (index !== -1) {
                state.blocks[index] = action.payload;
            }
        },
    },
});

// Export actions and reducer
export const { addBlocksToStore, addBlock, removeBlock, updateBlock } = blocksSlice.actions;
export default blocksSlice.reducer;