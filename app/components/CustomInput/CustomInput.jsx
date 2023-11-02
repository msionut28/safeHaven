import { Input } from "@/components/ui/input"

export default function CustomInput(editor, setter, stat, idValue ) {
  return (
    <>
    {
        editor 
            ?<Input 
            id={idValue}
            className="col-span-3" 
            onChange={(e) => handleInputChange(e, setter)}/> 
            :<Input 
            className="col-span-3"
            value={stat}
            disabled={true}/>
    }
    </>
  )
}
