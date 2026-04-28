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
        // const response = await fetch('https://solar-curtailment-optimizer-backend.onrender.com/optimize/schedule', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         prediction_date: date,
        //     }),
        // });

        // if (!response.ok) {
        //     throw new Error(`API Error: ${response.statusText}`);
        // }

        // const json = await response.json();
        // console.log('Successfully fetched optimization data:', json);

        let json = {
  "meta": {
    "time_step_minutes": 15,
    "horizon_hours": 24,
    "generated_at": "2026-04-26T20:44:00.820329",
    "status": "OPTIMAL"
  },
  "summary": {
    "total_demand_mwh": 26941.5,
    "total_solar_mwh": 5742.46,
    "total_coal_mwh": 21701,
    "total_curtailed_mwh": 286.96,
    "total_shortage_mwh": 0,
    "total_overgen_mwh": 225.5,
    "avg_solar_output_mw": 227.31,
    "coal_reduction_percent": 19.45,
    "solar_utilization_percent": 95,
    "coal_saved_mwh": 5240.5,
    "co2_avoided_tons": 5135.69,
    "cost_savings_inr": 24001490
  },
  "peak": {
    "solar_mw": 695.06,
    "time": "12:00"
  },
  "data": [
    {
      "demand_mw": 998.23,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 998,
      "total_mw": 998,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 998.23,
      "timestamp": "2026-04-26T00:00:00",
      "time": "00:00"
    },
    {
      "demand_mw": 997.57,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 997,
      "total_mw": 997,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 997.57,
      "timestamp": "2026-04-26T01:00:00",
      "time": "01:00"
    },
    {
      "demand_mw": 998.71,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 998,
      "total_mw": 998,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 998.71,
      "timestamp": "2026-04-26T02:00:00",
      "time": "02:00"
    },
    {
      "demand_mw": 1025.21,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 1025,
      "total_mw": 1025,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 1025.21,
      "timestamp": "2026-04-26T03:00:00",
      "time": "03:00"
    },
    {
      "demand_mw": 1068.95,
      "solar_mw": 3.06,
      "solar_used_mw": 3,
      "coal_mw": 1065,
      "total_mw": 1068,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.06,
      "net_load_mw": 1065.95,
      "timestamp": "2026-04-26T04:00:00",
      "time": "04:00"
    },
    {
      "demand_mw": 1083.19,
      "solar_mw": 8.83,
      "solar_used_mw": 8,
      "coal_mw": 1075,
      "total_mw": 1083,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.83,
      "net_load_mw": 1075.19,
      "timestamp": "2026-04-26T05:00:00",
      "time": "05:00"
    },
    {
      "demand_mw": 1105.72,
      "solar_mw": 163.75,
      "solar_used_mw": 148.5,
      "coal_mw": 956.5,
      "total_mw": 1105,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 15.25,
      "net_load_mw": 957.22,
      "timestamp": "2026-04-26T06:00:00",
      "time": "06:00"
    },
    {
      "demand_mw": 1140.46,
      "solar_mw": 249.43,
      "solar_used_mw": 249,
      "coal_mw": 891,
      "total_mw": 1140,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.43,
      "net_load_mw": 891.46,
      "timestamp": "2026-04-26T07:00:00",
      "time": "07:00"
    },
    {
      "demand_mw": 1154.42,
      "solar_mw": 360.4,
      "solar_used_mw": 354.5,
      "coal_mw": 799.5,
      "total_mw": 1154,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 5.9,
      "net_load_mw": 799.92,
      "timestamp": "2026-04-26T08:00:00",
      "time": "08:00"
    },
    {
      "demand_mw": 1306.33,
      "solar_mw": 479.61,
      "solar_used_mw": 479,
      "coal_mw": 827,
      "total_mw": 1306,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.61,
      "net_load_mw": 827.33,
      "timestamp": "2026-04-26T09:00:00",
      "time": "09:00"
    },
    {
      "demand_mw": 1314.95,
      "solar_mw": 591.85,
      "solar_used_mw": 583.75,
      "coal_mw": 730.25,
      "total_mw": 1314,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 8.1,
      "net_load_mw": 731.2,
      "timestamp": "2026-04-26T10:00:00",
      "time": "10:00"
    },
    {
      "demand_mw": 1196.83,
      "solar_mw": 666.7,
      "solar_used_mw": 625.75,
      "coal_mw": 570.25,
      "total_mw": 1196,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 40.95,
      "net_load_mw": 571.08,
      "timestamp": "2026-04-26T11:00:00",
      "time": "11:00"
    },
    {
      "demand_mw": 1160.03,
      "solar_mw": 695.06,
      "solar_used_mw": 695,
      "coal_mw": 465,
      "total_mw": 1160,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.06,
      "net_load_mw": 465.03,
      "timestamp": "2026-04-26T12:00:00",
      "time": "12:00"
    },
    {
      "demand_mw": 1138.79,
      "solar_mw": 669.63,
      "solar_used_mw": 669,
      "coal_mw": 469,
      "total_mw": 1138,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.63,
      "net_load_mw": 469.79,
      "timestamp": "2026-04-26T13:00:00",
      "time": "13:00"
    },
    {
      "demand_mw": 1115.05,
      "solar_mw": 592.12,
      "solar_used_mw": 592,
      "coal_mw": 523,
      "total_mw": 1115,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0.12,
      "net_load_mw": 523.05,
      "timestamp": "2026-04-26T14:00:00",
      "time": "14:00"
    },
    {
      "demand_mw": 1082.5,
      "solar_mw": 489.01,
      "solar_used_mw": 483,
      "coal_mw": 599,
      "total_mw": 1082,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 6.01,
      "net_load_mw": 599.5,
      "timestamp": "2026-04-26T15:00:00",
      "time": "15:00"
    },
    {
      "demand_mw": 1052.06,
      "solar_mw": 360.67,
      "solar_used_mw": 355.5,
      "coal_mw": 696.5,
      "total_mw": 1052,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 5.17,
      "net_load_mw": 696.56,
      "timestamp": "2026-04-26T16:00:00",
      "time": "16:00"
    },
    {
      "demand_mw": 1029.76,
      "solar_mw": 244.68,
      "solar_used_mw": 202.25,
      "coal_mw": 826.75,
      "total_mw": 1029,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 42.43,
      "net_load_mw": 827.51,
      "timestamp": "2026-04-26T17:00:00",
      "time": "17:00"
    },
    {
      "demand_mw": 995.09,
      "solar_mw": 162.02,
      "solar_used_mw": 3.5,
      "coal_mw": 1093.5,
      "total_mw": 1097,
      "shortage_mw": 0,
      "overgen_mw": 102,
      "curtailment_mw": 158.52,
      "net_load_mw": 991.59,
      "timestamp": "2026-04-26T18:00:00",
      "time": "18:00"
    },
    {
      "demand_mw": 1286.1,
      "solar_mw": 5.64,
      "solar_used_mw": 3.75,
      "coal_mw": 1292,
      "total_mw": 1295.75,
      "shortage_mw": 0,
      "overgen_mw": 9.75,
      "curtailment_mw": 1.89,
      "net_load_mw": 1282.35,
      "timestamp": "2026-04-26T19:00:00",
      "time": "19:00"
    },
    {
      "demand_mw": 1400.86,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 1400,
      "total_mw": 1400,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 1400.86,
      "timestamp": "2026-04-26T20:00:00",
      "time": "20:00"
    },
    {
      "demand_mw": 1290.29,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 1298.75,
      "total_mw": 1298.75,
      "shortage_mw": 0,
      "overgen_mw": 8.75,
      "curtailment_mw": 0,
      "net_load_mw": 1290.29,
      "timestamp": "2026-04-26T21:00:00",
      "time": "21:00"
    },
    {
      "demand_mw": 1000.24,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 1105,
      "total_mw": 1105,
      "shortage_mw": 0,
      "overgen_mw": 105,
      "curtailment_mw": 0,
      "net_load_mw": 1000.24,
      "timestamp": "2026-04-26T22:00:00",
      "time": "22:00"
    },
    {
      "demand_mw": 1000.16,
      "solar_mw": 0,
      "solar_used_mw": 0,
      "coal_mw": 1000,
      "total_mw": 1000,
      "shortage_mw": 0,
      "overgen_mw": 0,
      "curtailment_mw": 0,
      "net_load_mw": 1000.16,
      "timestamp": "2026-04-26T23:00:00",
      "time": "23:00"
    }
  ],
  "table": [
    {
      "time": "16:00",
      "action": "RAMP_UP",
      "value_mw": 75,
      "reason": "Steepest required coal power increase."
    },
    {
      "time": "06:00",
      "action": "RAMP_DOWN",
      "value_mw": -75,
      "reason": "Steepest required coal power decrease."
    }
  ],
  "alerts": [
    {
      "time": "18:15",
      "action": "SOLAR_CURTAILMENT",
      "value_mw": 162.02,
      "reason": "Excess solar generation could not be utilized."
    }
  ],
  "status": [
    {
      "type": "SAFE_TO_REDUCE",
      "start": "04:00",
      "end": "19:30",
      "message": "Solar power is actively reducing coal generation between 04:00 and 19:30."
    }
  ],
  "confidence": {
    "optimization_score": 98
  },
  "comparison": {
    "baseline_coal_mwh": 26941.5,
    "optimized_coal_mwh": 21701
  },
  "energy_mix": {
    "solar_percent": 20.25,
    "coal_percent": 80.55,
    "other_percent": 0
  }
}
        
        dispatch(setData(json));
    } catch (err) {
        dispatch(setError(err.message));
    }
};


export default dataSlice.reducer