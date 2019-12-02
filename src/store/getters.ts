const getters = {
    uiSize: (state: any) => state.elementUi.size,
    listLayout: (state: any) => state.listOne.layout,
    tableData: (state: any) => state.listOne.tableData,
    alb: (state: any) => state.listOne.alb,
    selectData: (state: any) => state.association.selectData,

}
export default getters