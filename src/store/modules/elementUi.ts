const elementUi = {
    state: {
        size: "mini"
    },
    mutations: {
        toggle_elementUi_size: (state: any, size: string) => {
            state.size = size;
        }
    }
}

export default elementUi;