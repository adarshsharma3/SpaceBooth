import React from "react";
import { useId } from "react";
function Select({
    options,
    label, //not imp
    className,
    ...props
},
ref){
const id =useId()

return (
<div className="w-full">
{label && <label htmlFor={id} className=''></label>}

<select 
{...props}
 id={id} 
 ref={ref} 
 
className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>

{options?.map((option)=>{ 
    return(  //? is used to tell ki kya pata koi elemnet hi ya na ho
    <option key={option} value={option}>
        {option}
    </option>
    )
})}

</select>



</div>


)
}

export default React.forwardRef(Select) //Check!!