import ListTodos from "../components/ListTodos";
import useSWRMutation from "swr/mutation";
// import useSWR from "swr";
// import { fetcher } from "../lib";
import { useRef, type FormEvent } from "react";
import { useHead } from "@unhead/react";

export default function TodoFormPage( ){
    // const [formData,setFormData] = useState({title:'',description:''})
    const formRef = useRef<HTMLFormElement | null>(null)
    console.log('HELLO THERE!')
    useHead({
        title:'Todo Form'
    })
    
    const {trigger} = useSWRMutation('/api/todos',async(url,{arg}:{arg:{title:string,description:string}})=>{
        console.log(arg.title,arg.description)
        const res = await (await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:arg.title,
                description:arg.description
            })
        })).json()

        return res;
    })

    async function submitForm(e:FormEvent){
        e.preventDefault()
        const form = formRef.current
        if(!form) return;

        const formData = new FormData(form);
        if(!formData.get('title') || !formData.get('description')){
            return alert('Title and description is required!')
        }

        await trigger({title:formData.get('title') as string,description:formData.get('description') as string})

        formRef.current?.reset()
    }

    return(
        <div style={{paddingInline:'1rem',paddingBlock:'2rem',display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%',minHeight:'100vh'}} className=''>
            <div style={{maxWidth:'750px'}}>
                <div style={{width:'100%'}}>
                    <form data-testid='cy-todo-form' ref={formRef} onSubmit={submitForm}>
                        <input data-testid='cy-inp-title' type="text" name="title" id="title" />
                        <input data-testid='cy-inp-description' type="text" name="description" id="description" />

                        <button data-testid="cy-send-todo" id="send-todo" type="submit">
                            Save Todo
                        </button>
                    </form>
                </div>

                {/* LIST TODOS */}
                {
                    // error?
                    // <p>{JSON.stringify(error)}</p>
                    // : 
                    <ListTodos />
                }
            </div>
        </div>
    )
}