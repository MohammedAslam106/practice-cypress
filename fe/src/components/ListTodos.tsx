import { useEffect } from "react";
import { TbLoader2 } from "react-icons/tb";
import useSWRMutation from "swr/mutation";
// import { fakeDelay } from "../lib";
import { TiDelete } from "react-icons/ti";
import useSWR from "swr";
import { fetcher } from "../lib";
import { useSWRConfig } from "swr";

interface Todo {
    _id: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}



function ListTodos() {
    // const [todoId, setTodoId] = useState<null | string>(null)

    console.log('Children')

    const { data, error } = useSWR<{ success: boolean, data: Todo[], message: string }>('/api/todos', fetcher, {
        revalidateOnFocus: false,
        onSuccess: () => {
            console.log('SWR revalidated')
        }
    })


    // useEffect(() => {
    //     // alert(JSON.stringify(todoList))
    //     // async function updateData(){
    //     //     if (data && todoList) {
    //     //         const filterList = todoList.reduce((prevV:Array<Todo>,cur:Todo)=>{
    //     //             if(cur._id==todoId){
    //     //                 prevV.push(data)
    //     //                 return prevV;
    //     //             }
    //     //             prevV.push(cur);
    //     //             return prevV;
    //     //         },[])
    //     //         // filterList.push(data)
    //     //         alert(JSON.stringify(filterList))
    //     //         // await fakeDelay(5000)
    //     //         await mutate(filterList, { revalidate: false })
    //     //     }
    //     // }
    //     // updateData()
    //     // setTodoId(null)

    //     mutate([],{revalidate:true})
    //     // if(data && todoList){
    //     // }
    // }, [ newData])

    useEffect(() => {
        console.log('Children Mounted')
    }, [])

    if (error) {
        return (
            <div>
                {JSON.stringify(error)}
            </div>
        )
    }
    return (
        <div data-testid='cy-todo-cont' style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }} className=''>
            {
                data?.data?.map((todo) => {
                    return <TodoElement todo={todo} />
                })
            }
        </div>
    )
}



function TodoElement({todo}:{todo:Todo}) {
        const {mutate} = useSWRConfig()
        const { trigger, isMutating, data } = useSWRMutation(`/api/todos/${todo._id}`, async (url, { arg }: { arg: { id: string, status: boolean, action: 'delete' | 'update' } }) => {
        const res = await (await fetch(`${url}`, {
            method: arg.action == 'update' ? 'PUT' : 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: arg.status })
        })).json()

        // await fakeDelay(5000)

        if (res.success) {
            return res as { success: boolean, data: Todo, message: string }
        }
        throw Error(res.message)
    })

    useEffect(()=>{
        if(data){
            mutate('/api/todos')
        }
    },[data])
    return (
        <div data-testid={`cy-todo-el-${todo._id}`} style={{ paddingInline: '2rem', paddingBlock: '1.5rem', background: `${todo.status ? '#fafafa' : '#fa4504'}`, border: '1px solid #454545', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={todo._id}>
            <p data-testid={`cy-todo-el-p-${todo._id}`}>
                {todo.title}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                {
                    (!isMutating) ?
                        <input data-testid={`cy-check-todo-${todo._id}`}
                            checked={todo.status}
                            onChange={async (e) => {
                                // setTodoId(todo._id);
                                // alert(e.target.checked)
                                await trigger({ id: todo._id, status: e.target.checked, action: 'update' });
                                // setTodoId(null)
                            }} type="checkbox" />
                        :
                        <TbLoader2 />
                }

                <button data-testid={`cy-delete-todo-${todo._id}`} onClick={async () => {
                    await trigger({ action: 'delete', id: todo._id, status: false })
                }} style={{ padding: 0, margin: 0, fontStyle: 'none' }}>
                    <TiDelete size={15} />
                </button>
            </div>
        </div>
    )
}


export default (ListTodos)