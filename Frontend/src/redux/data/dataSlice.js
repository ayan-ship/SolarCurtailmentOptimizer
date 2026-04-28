import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data:  [],
        summary: {},
        meta: {},
        confidence: {},
        energy_mix: {},
        alerts: [],
        status: [],
        table:[],
        comparison:{},
        before:0,
        after:0,
        loading: false,
        error: null
    },

    reducers: {
        callApi: (state)=>{
            //state.data = fetch('https://localhost:8080/fetchData')
            console.log('data was fetched')
        },
        setLoading: (state)=>{
          state.loading = true;
        },
        setError: (state, action)=>{
          state.loading = false
          state.error = action.payload;
        },
        setData:(state,action)=> {
          state.loading = false;
          state.data = action.payload.data.map(item=>({
            time: item.time,
            solar: item.solar_mw,
            demand: item.demand_mw,
            coal: item.coal_mw,
            curtailment: item.curtailment_mw,
            shortage: item.shortage_mw,
            
          }));
            state.summary = action.payload.summary;
            state.meta = action.payload.meta;
            state.confidence = action.payload.confidence;
            state.energy_mix = action.payload.energy_mix;
            state.alerts = action.payload.alerts;
            state.status = action.payload.status;
            state.table = action.payload.table;
            state.comparison = action.payload.comparison;
            state.before = action.payload.comparison.baseline_coal_mwh;
            state.after = action.payload.comparison.optimized_coal_mwh
        },
        
    }

})


export const {callApi, setData, setError, setLoading} = dataSlice.actions

export const fetchData = () => async (dispatch) => {
    dispatch(setLoading());
    const date = new Date().toISOString().split('T')[0];
    try {
        const response = await fetch('https://solar-curtailment-optimizer-backend.onrender.com/optimize/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prediction_date: date,
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const json = await response.json();
        console.log('Successfully fetched optimization data:', json);
        
        dispatch(setData(json));
    } catch (err) {
        dispatch(setError(err.message));
    }
};


export default dataSlice.reducer