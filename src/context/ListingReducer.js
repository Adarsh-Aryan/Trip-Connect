export const ListingReducer=(state,action)=>{
    switch (action.type) {
        case 'ADDING_FACILITY':
            
           return{
               ...state,
               byFacilities:[...state.byFacilities,action.payload]
           }

        case 'REMOVE_FACILITY':
            return{
                ...state,
                byFacilities:state.byFacilities.filter(fac=>{
                    return fac!==action.payload
                })
            }

        case 'FILTER_BY_COST':

           return{
               ...state,byCost:action.payload
           }

        case 'FILTER_BY_SORT':
            return{
                ...state,
                bySort:action.payload
            }
    
        default:
            throw new Error('Invalid Action')
    }
}