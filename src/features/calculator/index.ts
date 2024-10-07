import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface CalculatorData {
    input: string;
    output: string;
};

export interface UnitConversionData {
    inputValue: number;  // The value being converted
    inputUnit: string;   // The unit of the input value
    outputValue: number; // The converted value
    outputUnit: string;  // The unit of the output value
}

interface HistoryItem {
    type: 'calculation' | 'conversion';
    data: CalculatorData | UnitConversionData;
}

interface CalculatorState {
    history: HistoryItem[];
}

const initialState: CalculatorState = {
    history: [],
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addCalculation: (state, action: PayloadAction<CalculatorData>) => {
        state.history.push({ type: 'calculation', data: action.payload });
    },
    addConversion: (state, action: PayloadAction<UnitConversionData>) => {
        state.history.push({ type: 'conversion', data: action.payload });
    },
    clearCalculations: (state) => {
        state.history = state.history.filter(item => item.type !== 'calculation');
      },
      clearConversions: (state) => {
        state.history = state.history.filter(item => item.type !== 'conversion');
      },
  },
});

export const { addCalculation, addConversion, clearCalculations, clearConversions } = calculatorSlice.actions;

export default calculatorSlice.reducer;