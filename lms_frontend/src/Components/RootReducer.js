

const initialState={
      
    student:{}
  
  }
export default function RootReducer(state=initialState,action)   
{
 switch(action.type)
 {   
     case 'ADD_STUDENT':
         state.student[action.payload[0]]=action.payload[1]
         alert(JSON.stringify(state.student))
         return({student:state.student})

         default:
         return(state)    

 }

}