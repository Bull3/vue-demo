const Association = {
    state:{
        selectData: null,
    },
    mutations:{
        select_data:(state:any,data:any)=>{
            state.selectData = data;
        }
    }
};

export default Association;